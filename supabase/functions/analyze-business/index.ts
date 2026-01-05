// Analyze Business - Step 1 Research
declare const Deno: any;

import { GoogleGenAI } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders, checkRateLimit, createErrorResponse } from "../_shared/supabase.ts";

/**
 * Analyzes business context using Google Search Grounding.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    // 1. Validate Request Body
    let body;
    try {
      body = await req.json();
    } catch {
      throw new Error("Invalid JSON in request body");
    }

    const { org_id, session_id, industry, description, company_name, website } = body;

    // 2. Input Validation
    if (!org_id || !session_id || !industry || !description || !company_name) {
      throw new Error("Missing required fields: org_id, session_id, industry, description, company_name");
    }
    if (description.length < 30) throw new Error("Description too short (minimum 30 characters)");

    // 3. Security & Rate Limiting
    await validateUser(req, org_id);
    await checkRateLimit(org_id);

    // 4. Verify Session
    const admin = getAdminClient();
    const { data: session, error: sessionErr } = await admin
      .from("wizard_sessions")
      .select("id")
      .eq("id", session_id)
      .eq("org_id", org_id)
      .single();
    if (sessionErr || !session) throw new Error("Invalid session provided");

    // 5. AI Call with Timeout
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("Internal Server Error: AI Key missing");
    const ai = new GoogleGenAI({ apiKey });

    const aiCall = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze ${company_name} in ${industry}. Website: ${website || "N/A"}. Context: ${description}`,
      config: { tools: [{ googleSearch: {} }] },
    });

    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request Timeout: AI processing exceeded limit")), 60000)
    );

    const response: any = await Promise.race([aiCall, timeout]);

    // 6. Process Result & Usage
    const result = {
      text: response.text,
      citations: response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => ({ title: chunk.web?.title, uri: chunk.web?.uri }))
        .filter((c: any) => c.uri) || [],
    };

    const usage = response.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0 };

    // 7. Persist Result
    const { error: insertErr } = await admin.from("wizard_answers").insert({
      org_id,
      session_id,
      screen_id: "step-1",
      data: result,
    });
    if (insertErr) throw new Error("Internal Server Error: Database write failed");

    // 8. Log Run
    await admin.from("ai_run_logs").insert({
      org_id,
      agent_name: "Researcher",
      model_name: "gemini-3-flash-preview",
      input_tokens: usage.promptTokenCount,
      output_tokens: usage.candidatesTokenCount,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return createErrorResponse(error);
  }
});
