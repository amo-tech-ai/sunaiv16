import { GoogleGenAI, Type } from "@google/genai";
import { UserData, RoadmapPhase, SystemRecommendation } from "../types";

// Always initialize with the latest API key from the environment
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a Senior Executive Consultant at Sun AI Agency. 
Your tone is premium, calm, professional, and sophisticated. 
Avoid AI hype, buzzwords, and technical jargon. 
Focus on business outcomes: Revenue, Speed of Execution, and Operational Efficiency. 
You are speaking to founders and owners who value their time and clear, practical strategy.`;

export async function getBusinessIntelligence(industry: string, description: string, companyName: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this business for initial strategy: 
    Company: ${companyName}
    Industry: ${industry}
    Description: ${description}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessModel: { type: Type.STRING, description: "e.g., B2B High-Ticket Services, DTC Luxury Retail" },
          observations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3 strategic observations about their current position"
          },
          initialReadinessNote: { type: Type.STRING }
        },
        required: ["businessModel", "observations", "initialReadinessNote"]
      },
    }
  });
  return JSON.parse(response.text);
}

export async function getIndustrySpecificQuestions(industry: string, businessModel: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Design a diagnostic for a ${businessModel} in the ${industry} sector. 
    Focus on where revenue is lost or speed is throttled.`,
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
    contents: `Based on these business problems, recommend 5 AI systems:
    Problem: ${userData.blocker}
    Manual Work: ${userData.manualWork}
    Priority: ${userData.priority}`,
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
    contents: `Audit the readiness of ${data.companyName} for AI implementation.
    Systems selected: ${data.selectedSystems.join(', ')}
    Context: ${data.description}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2048 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          consultantNote: { type: Type.STRING },
          criticalGaps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "feedback", "consultantNote", "criticalGaps"]
      }
    }
  });
  return JSON.parse(response.text);
}

export async function getRoadmap(data: UserData): Promise<RoadmapPhase[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a 90-day strategy for ${data.companyName}.
    Selected systems: ${data.selectedSystems.join(', ')}
    Targeting priority: ${data.priority}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2048 },
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
