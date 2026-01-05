import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";

/**
 * Conducts deep research on a company using Google Search grounding.
 * Analyzes market position, website content, and business model.
 */
export async function getBusinessIntelligence(industry: string, description: string, companyName: string, website?: string) {
  const ai = getAI();
  const websiteContext = website 
    ? `Analyze the digital presence and website at ${website}. 
       Identify:
       - Core service offerings and niche expertise.
       - Evident manual friction (e.g., generic contact forms, lack of real-time scheduling).
       - Current technology and market positioning.` 
    : "Since no website was provided, rely on current market data and sector trends for this niche.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Conduct a Strategic Research Audit for ${companyName} in the ${industry} sector. 
    Context: ${description}
    ${websiteContext}
    
    Executive Requirements:
    1. EXPLICITLY state the Business Model (e.g., Business Model: High-Ticket B2B).
    2. Extract 3-4 specific operational friction points verified through search or market context.
    3. Identify the "Scale Ceiling" — what is preventing them from 10x growth?
    
    Output a professional, editorial summary for the executive.`,
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
    citations,
    // Extract business model reliably from the narrative text
    detectedModel: response.text.match(/Business Model:?\s*([^\n\.]+)/i)?.[1]?.trim() || "Executive Service Provider"
  };
}

/**
 * Generates a deeply personalized diagnostic based on Screen 1 research.
 * Uses Thinking Mode to map specific business problems to high-value AI solutions.
 */
export async function getIndustrySpecificQuestions(industry: string, context: { 
  researchResults: string, 
  companyName: string, 
  description: string,
  website?: string 
}) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the Strategic Research: "${context.researchResults}" for ${context.companyName}.
    
    Design a bespoke operational diagnostic for the ${industry} sector.
    
    CRITICAL REQUIREMENTS:
    - Generate 4 options for: Revenue Blocks, Operational Drag, and Strategic Priorities.
    - For EVERY individual problem option, generate a corresponding AI Solution Feature.
    - Use real-world jargon (e.g., "deal decay", "pipeline leakage", "SKU sprawl").
    - The AI Solution must describe the bottom-line value and the "Engine" being deployed.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2048 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dynamicTitle: { type: Type.STRING, description: "An editorial heading for the diagnostic." },
          salesOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          salesAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "AI solutions mapped 1:1 to salesOptions." },
          manualWorkOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          manualWorkAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "AI solutions mapped 1:1 to manualWorkOptions." },
          priorityOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
          priorityAIFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "AI solutions mapped 1:1 to priorityOptions." }
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
