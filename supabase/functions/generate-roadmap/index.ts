// Declare Deno and process globals, update Gemini API import and initialization to follow strict coding guidelines.
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, project_id, snapshot_id, wizard_data } = await req.json();
    await validateUser(req, org_id);

    // Initialize Gemini with the required process.env.API_KEY variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate a 90-day execution roadmap for ${wizard_data.companyName}.
      Systems: ${wizard_data.selectedSystems.join(', ')}
      Constraints: ${JSON.stringify(wizard_data.diagnostics)}
      
      Phase 1 MUST be foundational. Phase 3 MUST focus on ROI acceleration.`,
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
                properties: {
                  title: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  outcomes: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "duration", "outcomes"]
              }
            }
          },
          required: ["total_duration", "roi_projection", "phases"]
        }
      },
    });

    const result = JSON.parse(response.text);

    const admin = getAdminClient();
    
    // Create Roadmap
    const { data: roadmap, error: rError } = await admin.from("roadmaps").insert({
      org_id,
      snapshot_id,
      total_duration: result.total_duration,
      roi_projection: result.roi_projection
    }).select().single();

    if (rError) throw rError;

    // Create Phases
    const phasesToInsert = result.phases.map((p: any, i: number) => ({
      roadmap_id: roadmap.id,
      org_id,
      title: p.title,
      order_index: i,
      outcomes: p.outcomes
    }));
    await admin.from("roadmap_phases").insert(phasesToInsert);

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