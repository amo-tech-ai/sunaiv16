
import { GoogleGenAI } from "@google/genai";

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const SYSTEM_INSTRUCTION = `You are a Senior Executive Consultant at Sun AI Agency. 
Your tone is premium, calm, professional, and sophisticated. 
Avoid all AI hype, buzzwords, and technical jargon like "orchestrative", "structural readiness", "model detection", or "synthesizing".
Focus exclusively on business outcomes: Revenue, Speed of Execution, and Operational Efficiency. 
You are speaking to founders and owners who value their time and clear, practical strategy. 
Use real industry terms (e.g., for Fashion use "collections/SKUs", for Real Estate use "listings/leads").
Provide concise, editorial-style feedback as if you are a human partner handing over "Cliff Notes".
Always speak in terms of "moving faster", "clearing clutter", and "building growth engines".`;

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
