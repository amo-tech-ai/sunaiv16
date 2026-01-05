import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Screen 1 Research (Grounding)
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze ${companyName} in the ${industry} space. 
    Context: ${description}
    Website: ${website || "N/A"}
    
    Executive Briefing:
    - Business model summary (plain English)
    - 3 specific revenue leaks or speed bottlenecks
    - Growth readiness notes`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });

  const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri
    }))
    .filter((c: any) => c.uri) || [];

  return {
    text: response.text,
    citations,
    detectedModel: "Strategy Partner"
  };
}

/**
 * Industry Diagnostic Generator (Prompt 02)
 */
export async function getIndustrySpecificQuestions(industry: string, context: { 
  companyName: string, 
  description: string,
  website?: string 
}) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate industry-specific diagnostics for ${context.companyName} in the ${industry} sector.
    Context: ${context.description}
    
    RULES:
    - Every question must be specific to ${industry}
    - Every option must reflect how this industry makes money
    - Focus on sales and marketing outcomes
    - No generic options`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dynamicTitle: { type: Type.STRING, description: "Industry-specific title" },
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