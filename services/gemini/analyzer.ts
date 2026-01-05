import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData } from "../../types";

/**
 * Executive Risk Audit Agent
 * Analyzes dashboard execution health and provides proactive narrative guidance.
 */
export async function getRiskAssessment(userData: UserData): Promise<string> {
  const completedCount = userData.tasks?.filter(t => t.status === 'completed').length || 0;
  const totalCount = userData.tasks?.length || 0;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  const ai = getAI();
  
  const prompt = `
    Conduct a Proactive Risk Audit for ${userData.companyName}.
    
    DATA STATE:
    - Phase: ${userData.roadmap?.[0]?.title}
    - Progress: ${completedCount}/${totalCount} tasks (${Math.round(progressPercent)}%)
    - Active Architecture: ${userData.selectedSystems.join(', ')}
    - Core Priority: ${userData.priority}

    TASK:
    Generate a 3-sentence narrative for the Executive Command Center.
    - Sentence 1: Direct assessment of current velocity.
    - Sentence 2: Identify one "High-Leverage" next step or potential risk area.
    - Sentence 3: Connect current actions to the long-term ROI of the ${userData.selectedSystems[0]}.

    TONE: Senior Partner. Direct. Sophisticated.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });

  return response.text;
}
