import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Conducts research using Google Search grounding.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Conduct professional research on the business model and market position of a company like ${companyName} operating in the ${industry} sector. 
    Context: ${description}
    
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

export async function getIndustrySpecificQuestions(industry: string, businessModel: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Design a diagnostic for a ${businessModel} in the ${industry} sector.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dynamicTitle: { type: Type.STRING },
          salesOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          manualWorkOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["dynamicTitle", "salesOptions", "manualWorkOptions", "priorityOptions"]
      }
    }
  });
  return JSON.parse(response.text);
}
