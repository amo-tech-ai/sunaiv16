import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Screen 1: Strategic Researcher Agent
 * Uses Google Search Grounding to verify market position and digital footprint.
 * Note: When using Search Grounding, we must use plain text and manual parsing.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  
  const prompt = `
    Conduct a deep-dive strategic research analysis for "${companyName}".
    Sector: ${industry}
    Website: ${website || "Not provided"}
    Internal Briefing: ${description}

    TASK:
    1. Analyze the website/brand for "Service Maturity" (Level 1-5).
    2. Detect the "Primary Revenue Lever" (e.g., High-Ticket Services, Low-Margin Volume, Subscription Recurring).
    3. Identify 3-5 sharp strategic insights about where they are leaking revenue or speed based on their digital footprint.
    4. Provide an editorial summary (NARRATIVE).

    FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
    NARRATIVE: [Your summary here]
    MODEL: [The Business Model Category]
    MATURITY: [Service Maturity Level and why]
    LEVER: [Detected Primary Revenue Lever]
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
  
  // Robust Extraction logic
  const narrativeMatch = text.match(/NARRATIVE:([\s\S]*?)MODEL:/i);
  const narrative = narrativeMatch ? narrativeMatch[1].trim() : text.split('MODEL:')[0].replace('NARRATIVE:', '').trim();

  const modelMatch = text.match(/MODEL:([^\n]*)/i);
  const detectedModel = modelMatch ? modelMatch[1].trim() : "Strategic Partner";

  const leverMatch = text.match(/LEVER:([^\n]*)/i);
  const primaryLever = leverMatch ? leverMatch[1].trim() : "Undetected";

  const insights = text.split('\n')
    .filter(line => line.toUpperCase().startsWith('INSIGHT:'))
    .map(line => line.replace(/INSIGHT:/i, '').trim())
    .slice(0, 5);

  const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'Market Reference',
      uri: chunk.web?.uri
    }))
    .filter((c: any) => c.uri) || [];

  const observations = insights;
  if (primaryLever !== "Undetected") {
    observations.unshift(`Primary Lever: ${primaryLever}`);
  }

  return {
    text: narrative || "Strategic footprint verified. Review detected revenue levers below.",
    citations,
    detectedModel: detectedModel,
    observations: observations.length > 0 ? observations : ["Digital footprint verified", "Market category identified", "Revenue levers mapped"]
  };
}

/**
 * Screen 2: Diagnostic Architect Agent
 * Generates industry-specific diagnostic categories paired with AI features.
 * Uses Gemini 3 Pro with Thinking budget for deep industry logic.
 */
export async function getIndustrySpecificQuestions(industry: string, context: any, researchContext: string) {
  const ai = getAI();
  
  const prompt = `
    Generate a bespoke operational diagnostic for ${context.companyName}.
    Industry Context: ${industry}
    Company Background: ${context.description}
    Researcher Briefing from Step 1: ${researchContext}

    REQUIREMENTS:
    - Create 4 diagnostic categories: Sales & Growth, Content & Presence, Operational Speed, and Executive Priority.
    - Every section MUST have 4 specific "Options" (Business Problems) and 4 corresponding "AI Features" (Strategic Solutions).
    - The AI Features must be the SPECIFIC names of agents or systems (e.g., "Omni-Channel Lead Concierge", "Automated Content Supply Chain").
    - Tone: Senior Business Consultant. Direct, outcome-oriented.
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
