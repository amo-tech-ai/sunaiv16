
import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData } from "../../types";

/**
 * Analyzes the current dashboard state to find risks or narrative breakthroughs.
 */
export async function getRiskAssessment(userData: UserData): Promise<string> {
  const completedCount = userData.tasks?.filter(t => t.status === 'completed').length || 0;
  const totalCount = userData.tasks?.length || 0;
  
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the execution progress for ${userData.companyName}.
    
    Stats: ${completedCount}/${totalCount} tasks completed.
    Current Priority: ${userData.priority}
    Selected Systems: ${userData.selectedSystems.join(', ')}
    
    Provide a professional, human-like narrative note (2-3 sentences) for the executive. 
    If progress is slow, explain why the "Foundational Drag" is expected. 
    If progress is good, explain the "Scale Opportunity" ahead.
    Avoid jargon. Use Lora font style (editorial).`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });

  return response.text;
}
