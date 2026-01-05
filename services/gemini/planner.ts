
import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, DashboardTask } from "../../types";

export async function generateTasksFromRoadmap(userData: UserData): Promise<DashboardTask[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Decompose the 90-day roadmap for ${userData.companyName} into a set of 12-15 specific actionable tasks.
    
    Roadmap: ${JSON.stringify(userData.roadmap)}
    Systems: ${userData.selectedSystems.join(', ')}
    Priority: ${userData.priority}
    
    Each task MUST have an owner (Client, Sun AI, or Automated) and a one-line 'impact' statement describing the business value.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            owner: { type: Type.STRING, enum: ['Client', 'Sun AI', 'Automated'] },
            status: { type: Type.STRING, enum: ['pending'] },
            impact: { type: Type.STRING },
            phaseIdx: { type: Type.NUMBER }
          },
          required: ["id", "title", "owner", "status", "impact", "phaseIdx"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}
