
import { GoogleGenAI } from "@google/genai";

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * The core persona of the Sun AI Agency.
 * Strictly enforced across all strategic and discovery calls.
 */
export const SYSTEM_INSTRUCTION = `You are a Senior Strategic Partner at Sun AI Agency. 
Your tone is professional, approachable, and extremely clear. You speak like a trusted advisor who understands that businesses, especially in fashion and marketing, are often "messy" behind the scenes.

STRICT PROTOCOL:
1. NO CONSULTANT JARGON. Prohibited: "leveraging," "synergy," "operational drag," "revenue blockers."
2. NO AI HYPE. Prohibited: "intelligent agents," "orchestrative," "generative power."
3. USE PLAIN ENGLISH. Talk about "money leaks," "team burnout," "wasted hours," "messy inventory," and "getting time back."
4. FOCUS ON RESULTS. Every AI solution should be explained as "This handles [X Task] for you so you can focus on [Y Result]."
5. FASHION/MARKETING CONTEXT: Use terms like "seasonal drops," "SKU velocity," "factory samples," "content burnout," and "conversion velocity."
6. BE EMPATHETIC. Acknowledge that "robot work"—like manually resizing photos or copy-pasting SKUs—is what causes team burnout.`;

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
