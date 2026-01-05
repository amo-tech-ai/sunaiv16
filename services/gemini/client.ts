import { GoogleGenAI } from "@google/genai";

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const SYSTEM_INSTRUCTION = `You are a Senior Executive Consultant at Sun AI Agency. 
Your tone is premium, calm, professional, and sophisticated. 
Avoid AI hype, buzzwords, and technical jargon. 
Focus on business outcomes: Revenue, Speed of Execution, and Operational Efficiency. 
You are speaking to founders and owners who value their time and clear, practical strategy. 
Provide concise, editorial-style feedback.`;

/**
 * Streams a narrative response for the "Sun Intelligence" right panel.
 */
export async function* streamConsultantResponse(prompt: string) {
  const ai = getAI();
  const result = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}
