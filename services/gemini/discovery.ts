import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Conducts deep research using Google Search grounding.
 * Identifies business model, service offerings, and digital friction indicators.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  const websiteContext = website 
    ? `Analyze the digital storefront and brand presence at ${website}. 
       Identify visible manual friction like generic lead forms, no live personalization, or manual content updates.` 
    : `Research typical ${industry} friction points for a business described as: "${description}".`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze ${companyName} in the ${industry} space. 
    Context: ${description}
    ${websiteContext}
    
    Executive Briefing:
    1. Summarize their business model in one plain sentence.
    2. Identify 3 specific "money leaks" or "digital friction" indicators.
    3. Note why they need to move faster in today's market.
    
    List extracted URLs as citations.`,
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
    detectedModel: response.text.match(/Business Model:?\s*([^\n\.]+)/i)?.[1]?.trim() || "Growth-Focused Brand"
  };
}

/**
 * Generates personalized diagnostic questions with paired benefit-driven AI solutions.
 */
export async function getIndustrySpecificQuestions(industry: string, context: { 
  researchResults: string, 
  companyName: string, 
  description: string,
  website?: string 
}) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the research for ${context.companyName}: "${context.researchResults}".
    
    Create a 4-step diagnostic focused on Sales & Marketing growth.
    
    RULES:
    1. CATEGORY: "Sales & Marketing Growth". Question: "Where are you losing sales right now?"
    2. CATEGORY: "Online Presence & Content". Options MUST include "AI writes product descriptions," "AI assistant creates social captions," "Influencer outreach automation."
    3. CATEGORY: "Speed to Market". Options MUST include "Automate new product launch content" and "AI-driven promotion scheduling."
    4. SOLUTIONS: Every problem option needs a paired "AI Fix" described as a plain-English win. E.g., "This handles your captions automatically" instead of "Content Generation Engine."
    
    NICHING: Use "SKU velocity," "seasonal drops," "influencer outreach," and "inventory turnover."`,
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
          "dynamicTitle", 
          "salesOptions", "salesAIFeatures", "salesWhy",
          "contentOptions", "contentAIFeatures", "contentWhy",
          "speedOptions", "speedAIFeatures", "speedWhy",
          "priorityOptions", "priorityAIFeatures", "priorityWhy"
        ]
      }
    }
  });
  return JSON.parse(response.text);
}