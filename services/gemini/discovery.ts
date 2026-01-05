import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Screen 1: Strategic Researcher Agent
 * Uses Google Search Grounding to verify market position and digital footprint.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  
  const prompt = `
    Conduct an executive-level market analysis for "${companyName}".
    Sector: ${industry}
    Website: ${website || "Not provided"}
    Description: ${description}

    TASK:
    1. Grounded Search: Use the search tool to find the company's real-world presence, service offerings, and competitive niche.
    2. Model Identification: Classify their business model (e.g., Enterprise B2B, High-Ticket Agency, DTC Luxury).
    3. Strategic Gap Detection: Identify 3 specific areas where their current digital footprint suggests "manual drag" or missed AI opportunities.

    OUTPUT:
    Provide a professional briefing for the executive right-panel. Focus on clarity and authority.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });

  const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'Market Source',
      uri: chunk.web?.uri
    }))
    .filter((c: any) => c.uri) || [];

  return {
    text: response.text,
    citations,
    detectedModel: "High-Velocity Enterprise"
  };
}

/**
 * Screen 2: Diagnostic Architect Agent
 * Generates industry-specific friction points paired with AI solutions.
 * Uses Thinking Mode to reason through industry-specific revenue levers.
 */
export async function getIndustrySpecificQuestions(industry: string, context: any) {
  const ai = getAI();
  
  const prompt = `
    Generate a bespoke operational diagnostic for ${context.companyName}.
    Industry Context: ${industry}
    Research Context: ${context.description}

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
      thinkingConfig: { thinkingBudget: 2048 },
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
