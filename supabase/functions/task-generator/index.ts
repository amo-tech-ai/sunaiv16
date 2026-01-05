// Declare Deno and process globals, update Gemini API import and initialization to follow strict coding guidelines.
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, phase_id, phase_title, outcomes } = await req.json();
    await validateUser(req, org_id);

    // Initialize Gemini with the required process.env.API_KEY variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Decompose the following roadmap phase into granular tasks.
      Phase: ${phase_title}
      Outcomes: ${outcomes.join(', ')}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              owner: { type: Type.STRING, enum: ['Client', 'Sun AI', 'Automated'] },
              impact: { type: Type.STRING }
            },
            required: ["title", "owner", "impact"]
          }
        }
      },
    });

    const tasks = JSON.parse(response.text);

    const admin = getAdminClient();
    const tasksToInsert = tasks.map((t: any) => ({
      org_id,
      phase_id,
      title: t.title,
      owner: t.owner,
      status: 'pending'
    }));
    
    await admin.from("tasks").insert(tasksToInsert);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});