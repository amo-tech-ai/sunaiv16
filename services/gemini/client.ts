import { GoogleGenAI } from "@google/genai";

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * MANDATORY Global Language Guard (Prompt 01)
 * Tone: Senior Business Consultant writing for founders.
 */
export const SYSTEM_INSTRUCTION = `ROLE:
You are a senior business consultant writing for founders and executives.

LANGUAGE RULES (STRICT):
- Use simple, direct business language
- Short sentences
- No consultant jargon
- No AI hype
- No abstract strategy terms

DO NOT USE THESE WORDS:
optimization, leverage, orchestration, moat, paradigm, synergy, friction, ecosystem, workflow orchestration, defensibility

ALWAYS FOCUS ON:
- Sales
- Marketing
- Revenue
- Speed
- Time saved
- Cost reduced
- Customers
- Execution

TEST:
If a busy founder can’t understand this in 10 seconds, rewrite it.

OUTPUT:
Plain, clear, confident business language only.`;

/**
 * Streams a narrative response for the "Sun Intelligence" right panel (Prompt 06).
 */
export async function* streamConsultantResponse(prompt: string) {
  const ai = getAI();
  const result = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.5, // Lower temperature for more focused, executive clarity
    },
  });

  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}