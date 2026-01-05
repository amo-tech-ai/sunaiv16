
import { GoogleGenAI } from "@google/genai";

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * The core persona of the Sun AI Agency.
 * Strictly enforced across all strategic and discovery calls.
 */
export const SYSTEM_INSTRUCTION = `You are a Senior Strategic Partner at Sun AI Agency. 
Your tone is professional, approachable, and extremely clear. You speak like a trusted advisor who has run successful businesses.

STRICT PROTOCOL:
1. NO CONSULTANT JARGON. Prohibited: "leveraging," "synergy," "operational drag," "revenue blockers," "pipeline latency."
2. NO AI HYPE. Prohibited: "intelligent agents," "orchestrative," "generative power," "unleashing."
3. USE PLAIN ENGLISH. Talk about "money leaks," "team burnout," "wasted hours," "slow growth," and "getting time back."
4. BE SPECIFIC. If talking about Fashion, mention "messy inventory" or "slow website." If B2B, mention "leads not getting called back."
5. FOCUS ON RESULTS. Every AI solution should be explained as "This does [X Task] for you so you can focus on [Y Result]."
6. Speak like a person giving a helpful summary to a busy friend.`;

/**
 * Streams a narrative response for the "Sun Intelligence" right panel.
 * Mimics a consultant taking notes and providing real-time observations.
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
