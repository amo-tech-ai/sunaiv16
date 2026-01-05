import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, RoadmapPhase, SystemRecommendation } from "../../types";

export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
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
    model: 'gemini-3-flash-preview',
    contents: `Detailed Readiness Audit for ${data.companyName}.
    Selected Systems: ${data.selectedSystems.join(', ')}
    Industry: ${data.industry}
    Description: ${data.description}
    
    Evaluate three key dimensions: Data Maturity, Technical Infrastructure, and Organizational Culture. Be critical but constructive.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 4096 }, // Adjusted for Flash efficiency
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
    model: 'gemini-3-flash-preview',
    contents: `Final 90-Day Execution Roadmap for ${data.companyName}.
    Systems to Implement: ${data.selectedSystems.join(', ')}
    Executive Priority: ${data.priority}
    Readiness Context: ${data.readinessFeedback}
    
    Create a highly sequenced, outcome-driven roadmap.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2048 }, // Flash-optimized reasoning
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
