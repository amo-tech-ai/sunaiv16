
import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Conducts deep research on a company using Google Search grounding.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  const websiteContext = website 
    ? `Analyze the digital presence and storefront at ${website}. 
       Identify:
       - The primary business model (e.g., DTC Fashion, B2B Marketing Agency).
       - Visible manual friction indicators (e.g., slow product updates, lack of personalization).
       - Market positioning compared to competitors.` 
    : `Analyze typical ${industry} bottlenecks for a brand like ${companyName}.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Help me understand ${companyName} in the ${industry} space. 
    Context: ${description}
    ${websiteContext}
    
    Executive Briefing:
    1. What is their real business model?
    2. Where are they likely losing money or time right now? (Identify 3 "money leaks").
    3. What is the one big growth opportunity they are missing?
    
    Write a short, friendly summary with zero jargon. Use citations where you found real web data.`,
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
 * Generates a deeply personalized diagnostic with paired AI solutions.
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
    
    Create a 4-step diagnostic focused on Sales, Marketing, and Content growth.
    
    RULES:
    - CATEGORIES: "Sales & Marketing Growth", "Online Presence & Content", "Execution Speed", and "Your #1 Priority".
    - PHRASING: Use plain English business frustrations. E.g., "We struggle to keep up with trends on social media" or "Writing product descriptions takes too long."
    - AI SOLUTIONS: For EVERY problem option, provide a corresponding AI Fix described as a simple win. E.g., "This handles all your social captions automatically."
    - NICHING: Use industry-specific terms like "seasonal drops", "SKU velocity", "inventory turnover".`,
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
          priorityQuestion: { type: Type.STRING },
          priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          priorityAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
          priorityWhy: { type: Type.STRING }
        },
        required: [
          "dynamicTitle", 
          "salesOptions", "salesAIFeatures", "salesWhy",
          "contentOptions", "contentAIFeatures", "contentWhy",
          "speedOptions",
          "priorityOptions", "priorityAIFeatures", "priorityWhy"
        ]
      }
    }
  });
  return JSON.parse(response.text);
}
