import { GoogleGenAI, Type } from "@google/genai";
import { UserData, RoadmapPhase, SystemRecommendation } from "../types";

// Always initialize with the latest API key from the environment
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a Senior Executive Consultant at Sun AI Agency. 
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

export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Recommend 5 specific AI systems tailored for a company in ${userData.industry} dealing with ${userData.blocker} and ${userData.manualWork}. The executive priority is ${userData.priority}.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 1024 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            whyItMatters: { type: Type.STRING },
            recommended: { type: Type.BOOLEAN }
          },
          required: ["id", "name", "description", "whyItMatters", "recommended"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}

export async function getReadinessAssessment(data: UserData) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Detailed Readiness Audit for ${data.companyName}.
    Selected Systems: ${data.selectedSystems.join(', ')}
    Industry: ${data.industry}
    Description: ${data.description}
    
    Evaluate three key dimensions: Data Maturity, Technical Infrastructure, and Organizational Culture.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      // Optimized budget for deep reasoning
      thinkingConfig: { thinkingBudget: 4096 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          areaScores: {
            type: Type.OBJECT,
            properties: {
              data: { type: Type.NUMBER },
              infrastructure: { type: Type.NUMBER },
              culture: { type: Type.NUMBER }
            },
            required: ["data", "infrastructure", "culture"]
          },
          feedback: { type: Type.STRING },
          consultantNote: { type: Type.STRING },
          criticalGaps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "areaScores", "feedback", "consultantNote", "criticalGaps"]
      }
    }
  });
  return JSON.parse(response.text);
}

export async function getRoadmap(data: UserData): Promise<RoadmapPhase[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Final 90-Day Execution Roadmap for ${data.companyName}.
    Systems to Implement: ${data.selectedSystems.join(', ')}
    Executive Priority: ${data.priority}
    Readiness Context: ${data.readinessFeedback}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      // Optimized budget for complex sequencing
      thinkingConfig: { thinkingBudget: 4096 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            duration: { type: Type.STRING },
            outcomes: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "duration", "outcomes"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}