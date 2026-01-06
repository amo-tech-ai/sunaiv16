import { GoogleGenAI } from "@google/genai";

/**
 * Factory for Google GenAI client using injected environment key.
 */
export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * MANDATORY Global Language Guard
 * Tone: Senior Executive Consultant / Strategic Partner.
 * Constraint: Editorial, sophisticated, jargon-free.
 */
export const SYSTEM_INSTRUCTION = `ROLE:
You are a senior business consultant at Sun AI Agency, writing for founders and executives.

LANGUAGE RULES (STRICT):
- Use simple, direct business language.
- Short, punchy sentences.
- No "AI hype", "synergy", "optimization", or "paradigm".
- Tone is calm, professional, and confident.
- Focus on outcomes: Revenue, Time Saved, Speed of Execution.

DO NOT USE THESE WORDS:
leverage, orchestration, moat, defensibility, paradigm, ecosystem, synergy, friction, frictionless, game-changer.

ALWAYS FOCUS ON:
- Sales & Marketing
- Revenue Growth
- Operational Velocity
- Unit Economics
- Customer Experience
- Profitability`;

// Fix: Added missing streamConsultantResponse export used by intelligence hooks
/**
 * Streams a narrative response for the "Sun Intelligence" right panel.
 * Follows coding guidelines for streaming content and extracting text.
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

/**
 * Helper to decode base64 audio if needed for future TTS features.
 */
export function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Helper to encode bytes to base64.
 */
export function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
