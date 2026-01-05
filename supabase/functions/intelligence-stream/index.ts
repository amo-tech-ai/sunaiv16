// Intelligence Stream - Dashboard
declare const Deno: any;

import { GoogleGenAI } from "@google/genai";
import { validateUser, corsHeaders, createErrorResponse } from "../_shared/supabase.ts";

/**
 * Streams narrative with robust error handling.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    const { org_id, prompt } = await req.json();
    if (!org_id || !prompt) throw new Error("Missing required fields");
    
    await validateUser(req, org_id);

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) throw new Error("Internal Server Error: AI Key missing");
    
    const ai = new GoogleGenAI({ apiKey });
    
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a Senior Strategic Partner. Provide short, executive insights.",
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (streamErr) {
          console.error("Streaming interrupted:", streamErr);
          controller.error(streamErr);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
