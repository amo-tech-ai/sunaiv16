import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, DashboardTask } from "../../types";

/**
 * Task Decomposition Service (Dashboard Initialization)
 * Converts high-level roadmap outcomes into granular actionable tasks.
 */
export async function generateTasksFromRoadmap(userData: UserData): Promise<DashboardTask[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Decompose the strategic roadmap for ${userData.companyName} into granular tasks.
    
    ROADMAP: ${JSON.stringify(userData.roadmap)}
    SELECTED ENGINES: ${userData.selectedSystems.join(', ')}
    
    TASK REQUIREMENTS:
    1. Create 5-7 tasks per phase.
    2. Assign owners: 'client' (Executive action) or 'ai' (Automation setup).
    3. Define business impact for each task.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2048 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            owner: { type: Type.STRING, enum: ['client', 'ai'] },
            effort: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
            status: { type: Type.STRING, enum: ['pending', 'in-progress', 'completed'] },
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
