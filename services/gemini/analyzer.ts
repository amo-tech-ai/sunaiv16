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
  
  // Identify if founder-led tasks are the current bottleneck
  const pendingClientTasks = userData.tasks?.filter(t => t.owner === 'client' && t.status === 'pending').length || 0;
  const pendingAITasks = userData.tasks?.filter(t => t.owner === 'ai' && t.status === 'pending').length || 0;
  
  const ai = getAI();
  
  const prompt = `
    Conduct a Proactive Risk Audit for ${userData.companyName}.
    
    DATA STATE:
    - Phase: ${userData.roadmap?.[0]?.title}
    - Progress: ${completedCount}/${totalCount} tasks (${Math.round(progressPercent)}%)
    - Pending Founder Tasks: ${pendingClientTasks}
    - Pending AI Execution: ${pendingAITasks}
    - Active Architecture: ${userData.selectedSystems.join(', ')}

    TASK:
    Generate a 3-sentence narrative for the Executive Command Center.
    - Sentence 1: Analyze current velocity. (e.g., "We are maintaining strong velocity in Phase 1.")
    - Sentence 2: Identify the primary bottleneck. If Pending Founder Tasks > 0, highlight the need for executive signature.
    - Sentence 3: Connect actions to the ROI of ${userData.selectedSystems[0]}.

    TONE: Senior Partner. Editorial. Direct.
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