import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, DashboardTask } from "../../types";

/**
 * Task Decomposition (Prompt 07)
 */
export async function generateTasksFromRoadmap(userData: UserData): Promise<DashboardTask[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Turn strategy into action for ${userData.companyName}.
    Roadmap: ${JSON.stringify(userData.roadmap)}
    Systems: ${userData.selectedSystems.join(', ')}
    
    Generate realistic tasks that improve sales, marketing, or revenue speed.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING, description: "Clear action" },
            owner: { type: Type.STRING, enum: ['client', 'ai'], description: "Who does it" },
            effort: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
            status: { type: Type.STRING, enum: ['pending'] },
            impact: { type: Type.STRING },
            phaseIdx: { type: Type.NUMBER }
          },
          required: ["id", "title", "owner", "effort", "status", "impact", "phaseIdx"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}