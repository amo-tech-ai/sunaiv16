// Declare Deno and process globals, update Gemini API import and initialization to follow strict coding guidelines.
declare const Deno: any;
declare const process: any;

import { GoogleGenAI } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, industry, description, company_name, website } = await req.json();
    await validateUser(req, org_id);

    // Initialize Gemini with the required process.env.API_KEY variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Step 1: Market Research with Google Search Grounding
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Research and analyze the business model and digital friction points for ${company_name} in the ${industry} sector. 
      Website: ${website || "N/A"}
      Context: ${description}
      
      Extract:
      1. Plain-English Business Model.
      2. 3 Specific "Money Leaks" (manual friction).
      3. Citations for verified market data.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const result = {
      text: response.text,
      citations: response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => ({ title: chunk.web?.title, uri: chunk.web?.uri }))
        .filter((c: any) => c.uri) || [],
    };

    // Step 2: Persist to database
    const admin = getAdminClient();
    await admin.from("wizard_answers").insert({
      org_id,
      screen_id: "step-1",
      data: result,
    });

    // Step 3: Log AI run
    await admin.from("ai_run_logs").insert({
      org_id,
      agent_name: "Researcher",
      model_name: "gemini-3-flash-preview",
      input_tokens: 0, // Mocked for now
      output_tokens: 0,
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