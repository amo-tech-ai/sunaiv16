// Recommend Systems - Step 3
declare const Deno: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders, checkRateLimit, createErrorResponse } from "../_shared/supabase.ts";

/**
 * Recommends systems and persists them to the wizard state.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    const { org_id, session_id, diagnostics } = await req.json();
    if (!org_id || !session_id || !diagnostics) throw new Error("Missing required parameters");

    await validateUser(req, org_id);
    await checkRateLimit(org_id);

    const admin = getAdminClient();
    const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY") });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Recommend systems: ${JSON.stringify(diagnostics)}`,
      config: {
        thinkingConfig: { thinkingBudget: 1024 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: { id: { type: Type.STRING }, name: { type: Type.STRING }, description: { type: Type.STRING }, whyItMatters: { type: Type.STRING }, recommended: { type: Type.BOOLEAN } },
            required: ["id", "name", "description", "whyItMatters", "recommended"]
          }
        }
      }
    });

    const result = JSON.parse(response.text);

    // Persist as Step 3 answers
    await admin.from("wizard_answers").insert({
      org_id,
      session_id,
      screen_id: "step-3",
      data: result,
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
