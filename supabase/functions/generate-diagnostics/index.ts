// Declare Deno and process globals for the Supabase Edge Function environment
declare const Deno: any;
declare const process: any;

import { GoogleGenAI, Type } from "@google/genai";
import { validateUser, getAdminClient, corsHeaders } from "../_shared/supabase.ts";

/**
 * Industry Diagnostic Generator (Prompt 02)
 * Orchestrates the transition from Screen 1 context to Screen 2 diagnostics.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { org_id, industry, research_context, company_name } = await req.json();
    
    // Security and tenant validation
    await validateUser(req, org_id);

    // Initialize Gemini API using the strictly required process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are the Diagnostic Architect for Sun AI Agency. 
      Your task is to generate a high-fidelity business diagnostic for ${company_name} in the ${industry} sector.
      
      RESEARCH CONTEXT FROM SCREEN 1:
      ${research_context}
      
      INDUSTRY GUIDELINES:
      - Real Estate: Focus on lead-to-viewing conversion, listing velocity, and buyer/renter matching.
      - Fashion & Luxury: Focus on SKU management, creative asset production, and social media marketing automation.
      - Travel & Hospitality: Focus on smart concierge features, booking automation, and hyper-local scheduling.
      - Startups & SaaS: Focus on founder-led sales bottlenecks, MVP scaling, and automated top-of-funnel outreach.
      - Agencies: Focus on client reporting, proposal speed, and project delivery velocity.

      REQUIRED SCHEMA:
      You must pair every "Business Problem" with a specific "AI Agent Solution".
      For example, if the problem is "Manual lead follow-up", the AI solution is "Automated SMS/Email Concierge".
      
      Generate a diagnostic that drills down into:
      1. Sales & Growth Blockers
      2. Content & Presence Drag
      3. Operational Speed
      4. Executive Priorities`,
      config: {
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dynamicTitle: { type: Type.STRING, description: "Bespoke audit title (e.g., 'Luxury Brand Velocity Audit')" },
            salesQuestion: { type: Type.STRING },
            salesOptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 business problems" },
            salesAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 corresponding AI Agent solutions" },
            salesWhy: { type: Type.STRING, description: "Consultant note on revenue impact" },
            contentQuestion: { type: Type.STRING },
            contentOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentWhy: { type: Type.STRING },
            speedOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            speedAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            speedWhy: { type: Type.STRING },
            priorityQuestion: { type: Type.STRING },
            priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            priorityAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            priorityWhy: { type: Type.STRING }
          },
          required: [
            "dynamicTitle", "salesQuestion", "salesOptions", "salesAIFeatures", "salesWhy",
            "contentQuestion", "contentOptions", "contentAIFeatures", "contentWhy",
            "speedOptions", "speedAIFeatures", "speedWhy",
            "priorityQuestion", "priorityOptions", "priorityAIFeatures", "priorityWhy"
          ]
        }
      },
    });

    const result = JSON.parse(response.text);

    // Persist as Step 2 diagnostics
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
    console.error("Diagnostic generation failed:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});