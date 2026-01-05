
import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Conducts deep research on a company using Google Search grounding.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  const websiteContext = website 
    ? `Take a look at ${website}. 
       What do they actually do? Who are they helping? 
       Find 3 things that probably feel slow or manual for them right now based on their site setup.` 
    : "Look at common trends for a business like this in the ${industry} niche.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Help me understand ${companyName} in the ${industry} space. 
    Description: ${description}
    ${websiteContext}
    
    1. What's their main way of making money? (e.g. Selling clothes online, B2B services).
    2. What's likely slowing them down right now?
    3. What's the 'Big Goal' they are missing out on?
    
    Write a short, friendly summary as if we're just chatting about their business strategy.`,
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
    detectedModel: response.text.match(/Business Model:?\s*([^\n\.]+)/i)?.[1]?.trim() || "Independent Business"
  };
}

/**
 * Generates a deeply personalized diagnostic.
 * Phrased in simple, everyday business language.
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
    contents: `Based on what we know about ${context.companyName}: "${context.researchResults}".
    
    Create a simple 4-question checkup for them.
    
    RULES:
    - Phrasing: Use "I'm losing money because..." or "My team is stuck doing..."
    - No corporate jargon. No "Revenue Blocks." Use "Sales Frustrations."
    - AI Solutions: Describe them as a helpful teammate. "This bot handles all your emails" instead of "Deploying an Email Orchestration Engine."
    - Make it feel personal to their specific niche.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2048 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dynamicTitle: { type: Type.STRING, description: "A friendly, clear heading like 'Where does it hurt most?'" },
          salesOptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phrased as 'We aren't [Result] because [Reason]'" },
          salesAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phrased as 'This will fix it by doing [Task] for you.'" },
          manualWorkOptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phrased as 'We waste too many hours on [Task]'" },
          manualWorkAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phrased as 'This handles [Task] automatically.'" },
          priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phrased as 'My #1 goal is to [Outcome]'" },
          priorityAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Phrased as 'This makes [Goal] happen faster.'" }
        },
        required: [
          "dynamicTitle", 
          "salesOptions", "salesAIFeatures", 
          "manualWorkOptions", "manualWorkAIFeatures", 
          "priorityOptions", "priorityAIFeatures"
        ]
      }
    }
  });
  return JSON.parse(response.text);
}
