// Declare Deno and process globals, update Gemini API import and initialization to follow strict coding guidelines.
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, project_id, wizard_data } = await req.json();
    await validateUser(req, org_id);

    // Initialize Gemini with the required process.env.API_KEY variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Conduct a Strategic Readiness Audit for ${wizard_data.companyName}.
      Context: ${JSON.stringify(wizard_data)}
      
      Evaluate Data Maturity, Technical Infrastructure, and Organizational Culture. 
      Identify critical gaps that will prevent scaling.`,
      config: {
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            areaScores: {
              type: Type.OBJECT,
              properties: {
                data: { type: Type.NUMBER },
                infrastructure: { type: Type.NUMBER },
                culture: { type: Type.NUMBER }
              },
              required: ["data", "infrastructure", "culture"]
            },
            feedback: { type: Type.STRING },
            criticalGaps: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "areaScores", "feedback", "criticalGaps"]
        }
      },
    });

    const result = JSON.parse(response.text);

    const admin = getAdminClient();
    await admin.from("context_snapshots").insert({
      org_id,
      project_id,
      summary: result.feedback,
      metrics: result.areaScores,
      is_active: true
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});