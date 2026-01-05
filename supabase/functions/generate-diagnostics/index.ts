// Declare Deno and process globals, update Gemini API import and initialization to follow strict coding guidelines.
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, industry, research_context } = await req.json();
    await validateUser(req, org_id);

    // Initialize Gemini with the required process.env.API_KEY variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate industry-specific diagnostic questions for a ${industry} business.
      Research Context: ${research_context}
      
      Focus on Sales, Content Production, Speed to Market, and Executive Priorities.`,
      config: {
        thinkingConfig: { thinkingBudget: 2048 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dynamicTitle: { type: Type.STRING },
            salesOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            salesAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            speedOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["dynamicTitle", "salesOptions", "contentOptions", "speedOptions", "priorityOptions"]
        }
      },
    });

    const result = JSON.parse(response.text);

    const admin = getAdminClient();
    await admin.from("wizard_answers").insert({
      org_id,
      screen_id: "step-2",
      data: result,
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