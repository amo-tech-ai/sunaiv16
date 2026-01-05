
import { GoogleGenAI, Type } from "@google/genai";
import { UserData, RoadmapPhase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBusinessIntelligence(industry: string, description: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this business: Industry: ${industry}. Description: ${description}. 
    Provide: 1. Detected Business Model (e.g., B2B SaaS, Luxury Retail, Professional Services), 
    2. Three concise consultant-level early observations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessModel: { type: Type.STRING },
          observations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["businessModel", "observations"]
      },
      systemInstruction: "You are a senior executive consultant at Sun AI. Your tone is calm, professional, and sophisticated. No jargon, no hype."
    }
  });
  return JSON.parse(response.text);
}

export async function getIndustrySpecificQuestions(industry: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide industry-specific questions for: ${industry}. 
    We need: 
    1. A dynamic title.
    2. 4 industry-specific options for 'Sales & Growth' blocker.
    3. 4 industry-specific options for 'Manual Work'.
    4. 4 options for 'Priority' mapping to Revenue, Time, Cost, or Experience.`,
    config: {
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

export async function getReadinessAssessment(data: UserData) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Evaluate readiness for AI systems based on: ${JSON.stringify(data)}.
    Provide:
    1. Score (0-100).
    2. Honest, simple feedback.
    3. A brief consultant note on trust-building (critical but encouraging).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          consultantNote: { type: Type.STRING }
        },
        required: ["score", "feedback", "consultantNote"]
      }
    }
  });
  return JSON.parse(response.text);
}

export async function getRoadmap(data: UserData) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 90-day roadmap for these selected systems: ${data.selectedSystems.join(', ')}. 
    Business: ${data.companyName} (${data.industry}).
    Provide 3 phases. Each phase has a title, duration (e.g., Day 1-30), and 3 outcomes.`,
    config: {
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
