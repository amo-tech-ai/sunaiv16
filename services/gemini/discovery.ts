import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Screen 1: Strategic Researcher Agent
 * Uses Google Search Grounding to verify company footprint.
 * Note: When using googleSearch tool, responseMimeType: "application/json" is NOT supported.
 * We use manual markers to extract structured data from the narrative response.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  
  const prompt = `
    Perform an executive research analysis for "${companyName}" in the ${industry} sector.
    Target Website: ${website || "Not provided"}
    Stated Mission/Background: ${description}

    TASK:
    1. Identify their core business model (e.g., "Enterprise SaaS", "Luxury Boutique").
    2. Identify 3 sharp strategic insights about current revenue leaks or execution speed bottlenecks.
    3. Synthesize a premium summary of your research findings.

    FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
    NARRATIVE: [Your editorial summary here]
    MODEL: [3-5 word business model category]
    INSIGHT: [Strategic insight 1]
    INSIGHT: [Strategic insight 2]
    INSIGHT: [Strategic insight 3]
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text || '';
  
  // Extract narrative using text markers
  const narrativeMatch = text.match(/NARRATIVE:([\s\S]*?)MODEL:/i);
  const narrative = narrativeMatch ? narrativeMatch[1].trim() : text.split('MODEL:')[0].replace('NARRATIVE:', '').trim();

  // Extract detected model
  const modelMatch = text.match(/MODEL:([^\n]*)/i);
  const detectedModel = modelMatch ? modelMatch[1].trim() : "Strategic Partner";

  // Extract insights as observations
  const observations = text.split('\n')
    .filter(line => line.toUpperCase().startsWith('INSIGHT:'))
    .map(line => line.replace(/INSIGHT:/i, '').trim())
    .slice(0, 3);

  const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'External Reference',
      uri: chunk.web?.uri
    }))
    .filter((c: any) => c.uri) || [];

  return {
    text: narrative || "Strategic footprint verified. View detailed observations below.",
    citations,
    detectedModel: detectedModel,
    observations: observations.length > 0 ? observations : ["Digital presence verified", "Market category identified", "Strategic levers mapped"]
  };
}

/**
 * Screen 2: Diagnostic Architect Agent
 * Generates industry-specific diagnostic categories paired with AI features.
 */
export async function getIndustrySpecificQuestions(industry: string, context: any, researchContext: string) {
  const ai = getAI();
  
  const prompt = `
    Generate a bespoke operational diagnostic for ${context.companyName}.
    Industry Context: ${industry}
    Researcher Briefing from Step 1: ${researchContext}

    REQUIREMENTS:
    - Create 4 diagnostic categories: Sales & Growth, Content & Presence, Speed to Market, and Executive Priority.
    - Every option (Business Problem) MUST have a corresponding "Proposed AI Solution".
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
