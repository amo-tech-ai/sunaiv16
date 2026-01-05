// Declare Deno and process globals, fix indentation, and update Gemini API initialization.
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, diagnostics } = await req.json();
    await validateUser(req, org_id);

    // Initialize Gemini with the required process.env.API_KEY variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Based on these diagnostics: ${JSON.stringify(diagnostics)}, recommend 5 specific AI engines. 
      Focus on solving their primary blocker: ${diagnostics.blocker}.`,
      config: {
        thinkingConfig: { thinkingBudget: 1024 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              whyItMatters: { type: Type.STRING },
              recommended: { type: Type.BOOLEAN }
            },
            required: ["id", "name", "description", "whyItMatters", "recommended"]
          }
        }
      },
    });

    const result = JSON.parse(response.text);

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