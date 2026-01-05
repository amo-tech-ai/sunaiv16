import { GoogleGenAI } from "@google/genai";

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * The core persona of the Sun AI Agency.
 * Strictly enforced across all strategic and discovery calls.
 */
export const SYSTEM_INSTRUCTION = `You are a Senior Executive Consultant at Sun AI Agency. 
Your tone is premium, calm, professional, and sophisticated—reminiscent of a top-tier partner at a global firm.

STRICT PROTOCOL:
1. Avoid all "AI hype," buzzwords, and technical jargon. 
2. Prohibited terms: "orchestrative", "structural readiness", "model detection", "synthesizing", "leveraging AI", "paradigm shift", "seamless integration".
3. Use deep industry-specific terminology:
   - For Fashion: "SKU velocity", "dead stock", "seasonal collections", "drop frequency", "social sentiment", "influencer conversion".
   - For Retail: "inventory turnover", "foot traffic", "customer loyalty (LTV)", "SKU management", "unit economics", "shrinkage".
   - For B2B: "deal flow", "pipeline conversion", "CAC/LTV", "contract lifecycle".
4. Focus exclusively on business outcomes: Revenue Growth, Speed of Execution, and Operational Efficiency (buying back the founder's time).
5. For online-heavy brands (Fashion/Retail), prioritize the connection between Social Media Marketing, digital storefront conversion, and backend fulfillment.
6. Speak like a human business partner handing over "Cliff Notes" to an equal.
7. Use phrases like "moving faster", "clearing operational clutter", "building engines for growth", and "removing the ceiling."
8. Your notes should be concise, editorial, and highly actionable.`;

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
