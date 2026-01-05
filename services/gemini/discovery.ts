import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Screen 1: Strategic Researcher Agent
 * Uses Google Search Grounding to verify market position and digital footprint.
 * Specifically prioritizes analyzing the company's website for service offerings and friction.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  
  const prompt = `
    Perform a deep-dive research analysis for "${companyName}" in the ${industry} sector.
    Target Website: ${website || "Not provided"}
    Stated Mission: ${description}

    TASK PRIORITY:
    1. Website Analysis: Use the search tool to prioritize crawling the provided URL. Extract a specific list of their current service offerings.
    2. Manual Friction Audit: Identify indicators on their website or digital presence that suggest manual processes (e.g., static forms instead of interactive lead capture, absence of AI chat, generic scheduling tools).
    3. Market Positioning: Determine their core business model (e.g., "Enterprise SaaS", "Luxury Boutique Retail", "High-Ticket Consulting").
    4. Strategic Insight: Synthesize 3 high-leverage observations about where they are leaking revenue or speed.

    OUTPUT SCHEMA:
    - narrativeBriefing: A high-end, editorial summary of your research findings.
    - detectedModel: A 3-5 word label identifying the business model.
    - marketObservations: Exactly 3 sharp strategic insights.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          narrativeBriefing: { type: Type.STRING },
          detectedModel: { type: Type.STRING },
          marketObservations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Exactly 3 observations about the market and operational gaps."
          }
        },
        required: ["narrativeBriefing", "detectedModel", "marketObservations"]
      }
    },
  });

  const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'External Source',
      uri: chunk.web?.uri
    }))
    .filter((c: any) => c.uri) || [];

  const data = JSON.parse(response.text);

  return {
    text: data.narrativeBriefing,
    citations,
    detectedModel: data.detectedModel,
    observations: data.marketObservations
  };
}

/**
 * Screen 2: Diagnostic Architect Agent
 * Generates industry-specific friction points paired with AI solutions.
 * Uses Thinking Mode to reason through industry-specific revenue levers.
 */
export async function getIndustrySpecificQuestions(industry: string, context: any, researchContext: string) {
  const ai = getAI();
  
  const prompt = `
    Generate a bespoke operational diagnostic for ${context.companyName}.
    Industry Context: ${industry}
    Company Background: ${context.description}
    Researcher Briefing from Step 1: ${researchContext}

    REQUIREMENTS:
    - Use Thinking Mode to reason through the primary "Revenue Lever" for this specific business model.
    - Create 4 diagnostic categories: Sales & Acquisition, Content & Presence, Operational Speed, and Executive Priority.
    - For EVERY option (Business Problem), you MUST provide a corresponding "Proposed AI Solution".
    - Tone: Senior Business Consultant. Avoid technical jargon.

    SCHEMA RULES:
    - salesOptions[i] must pair with salesAIFeatures[i].
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 4096 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dynamicTitle: { type: Type.STRING },
          salesQuestion: { type: Type.STRING },
          salesOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          salesAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
          salesWhy: { type: Type.STRING },
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
    }
  });

  return JSON.parse(response.text);
}
