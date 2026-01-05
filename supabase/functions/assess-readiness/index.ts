// Assess Readiness - Step 4 Audit
declare const Deno: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders, checkRateLimit, createErrorResponse } from "../_shared/supabase.ts";

/**
 * Audits operational readiness and creates versioned snapshots.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    const { org_id, project_id, wizard_data } = await req.json();
    if (!org_id || !project_id || !wizard_data) throw new Error("Missing required fields");

    await validateUser(req, org_id);
    await checkRateLimit(org_id);

    const admin = getAdminClient();
    
    // 1. Verify Project
    const { data: project, error: pErr } = await admin.from("projects").select("id").eq("id", project_id).eq("org_id", org_id).single();
    if (pErr || !project) throw new Error("Project not found");

    // 2. Determine Snapshot Version
    const { data: latestSnapshot } = await admin
      .from("context_snapshots")
      .select("version")
      .eq("project_id", project_id)
      .order("version", { ascending: false })
      .limit(1)
      .single();
    
    const nextVersion = (latestSnapshot?.version || 0) + 1;

    // 3. AI Audit
    const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY") });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Conduct audit for ${wizard_data.companyName}: ${JSON.stringify(wizard_data)}`,
      config: {
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            areaScores: {
              type: Type.OBJECT,
              properties: { data: { type: Type.NUMBER }, infrastructure: { type: Type.NUMBER }, culture: { type: Type.NUMBER } },
              required: ["data", "infrastructure", "culture"]
            },
            feedback: { type: Type.STRING },
            criticalGaps: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "areaScores", "feedback", "criticalGaps"]
        }
      }
    });

    let result;
    try {
      result = JSON.parse(response.text);
    } catch {
      throw new Error("AI output was invalid JSON");
    }

    // 4. Atomic Snapshot Update (Versioning)
    await admin.from("context_snapshots").update({ is_active: false }).eq("project_id", project_id);
    
    const { error: insErr } = await admin.from("context_snapshots").insert({
      org_id,
      project_id,
      version: nextVersion,
      summary: result.feedback,
      metrics: result.areaScores,
      is_active: true
    });
    if (insErr) throw new Error("Failed to save snapshot");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return createErrorResponse(error);
  }
});
