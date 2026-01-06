// Generate Roadmap - Step 5 Finalization
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders, checkRateLimit, createErrorResponse } from "../_shared/supabase.ts";

/**
 * Generates execution roadmap with failure cleanup.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    const { org_id, snapshot_id, wizard_data } = await req.json();
    if (!org_id || !snapshot_id || !wizard_data) throw new Error("Missing required fields");

    await validateUser(req, org_id);
    await checkRateLimit(org_id);

    const admin = getAdminClient();
    
    // 1. Verify Snapshot
    const { data: snapshot, error: sErr } = await admin.from("context_snapshots").select("id").eq("id", snapshot_id).eq("org_id", org_id).single();
    if (sErr || !snapshot) throw new Error("Valid active snapshot not found");

    // Fix: Using process.env.API_KEY directly for initialization as per guidelines
    // 2. AI Roadmap Generation
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Plan: ${JSON.stringify(wizard_data)}`,
      config: {
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            total_duration: { type: Type.STRING },
            roi_projection: { type: Type.STRING },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { title: { type: Type.STRING }, duration: { type: Type.STRING }, outcomes: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["title", "duration", "outcomes"]
              }
            }
          },
          required: ["total_duration", "roi_projection", "phases"]
        }
      }
    });

    const result = JSON.parse(response.text);

    // 3. Simulated Transaction: Insert Roadmap
    const { data: roadmap, error: rErr } = await admin.from("roadmaps").insert({
      org_id,
      snapshot_id,
      total_duration: result.total_duration,
      roi_projection: result.roi_projection
    }).select().single();

    if (rErr) throw new Error("Failed to create roadmap header");

    try {
      // 4. Insert Phases
      const phasesToInsert = result.phases.map((p: any, i: number) => ({
        roadmap_id: roadmap.id,
        org_id,
        title: p.title,
        order_index: i,
        outcomes: p.outcomes
      }));
      
      const { error: pErr } = await admin.from("roadmap_phases").insert(phasesToInsert);
      if (pErr) throw pErr;

    } catch (phaseError) {
      // Rollback logic
      console.error("Phase insertion failed, cleaning up roadmap header");
      await admin.from("roadmaps").delete().eq("id", roadmap.id);
      throw new Error("Internal Server Error: Roadmap sequencing failed");
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return createErrorResponse(error);
  }
});
