
import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Conducts research using Google Search grounding.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  const websitePrompt = website ? `Specifically analyze the website at ${website} to understand their digital maturity and service offerings.` : "";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Conduct professional research on the business model and market position of ${companyName} operating in the ${industry} sector. 
    Context: ${description}
    ${websitePrompt}
    
    Provide:
    1. A clear identification of their business model.
    2. Three sharp strategic observations about their current position.
    3. A brief preliminary note on their AI implementation readiness.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });

  const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'Market Reference',
      uri: chunk.web?.uri
    }))
    .filter((c: any) => c.uri) || [];

  return {
    text: response.text,
    citations
  };
}

/**
 * Generates a deeply personalized diagnostic based on Step 1 research.
 */
export async function getIndustrySpecificQuestions(industry: string, researchContext: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this executive research: "${researchContext}", design a customized operational diagnostic for this business in the ${industry} sector.
    
    For each problem category (Sales, Manual Work, Priorities), generate 4 highly specific options.
    For EACH problem option, generate a corresponding AI Solution that describes how an AI engine would solve that specific friction point.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dynamicTitle: { type: Type.STRING },
          salesOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          salesAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "AI solutions corresponding 1:1 to salesOptions" },
          manualWorkOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          manualWorkAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "AI solutions corresponding 1:1 to manualWorkOptions" },
          priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          priorityAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "AI solutions corresponding 1:1 to priorityOptions" }
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
