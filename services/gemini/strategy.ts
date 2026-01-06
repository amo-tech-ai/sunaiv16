import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, RoadmapPhase, SystemRecommendation } from "../../types";

/**
 * Screen 3: The Modular Architect
 * Recommends systems based on friction points.
 */
export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Recommend a high-fidelity AI architecture suite for ${userData.companyName}.
    
    DIAGNOSTICS:
    - Primary Blocker: ${userData.blocker}
    - Manual Workload: ${userData.manualWork}
    - Priority Goal: ${userData.priority}
    
    TASK:
    Select 5 specific AI "Engines". Provide business impact and optimal configuration logic.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 4096 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            problem: { type: Type.STRING },
            ai_system: { type: Type.STRING },
            business_impact: { type: Type.STRING },
            recommended: { type: Type.BOOLEAN },
            whyItMatters: { type: Type.STRING }
          },
          required: ["id", "name", "description", "problem", "ai_system", "business_impact", "recommended", "whyItMatters"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}

/**
 * SVG Architecture Visualization
 */
export async function getArchitectureBlueprint(userData: UserData): Promise<string> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a raw SVG architectural diagram for ${userData.companyName}.
    SELECTED ENGINES: ${userData.selectedSystems.join(', ')}
    Include data flow paths. Output ONLY raw valid <svg> XML code.`,
    config: {
      systemInstruction: "You are a Technical Systems Architect specializing in minimalist, high-fidelity system flow diagrams.",
    }
  });
  
  let svg = response.text.trim();
  svg = svg.replace(/```svg/g, '').replace(/```/g, '');
  const svgMatch = svg.match(/<svg[\s\S]*?<\/svg>/i);
  return svgMatch ? svgMatch[0] : '';
}

/**
 * Screen 4: Operational Auditor (Step 4)
 * Analyzes risks and calculates maturity scores.
 */
export async function getReadinessAssessment(data: UserData) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Conduct a high-stakes operational audit for ${data.companyName} as they implement ${data.selectedSystems.join(', ')}.
    
    CONTEXT:
    - Industry: ${data.industry}
    - Priority: ${data.priority}
    - Operational Drag: ${data.manualWork}
    
    TASK:
    1. Calculate scores (0-100) for Data, Infrastructure, and Culture.
    2. Identify Phase 0 remediation actions.
    3. Evaluate strategic confidence.`,
    config: {
      systemInstruction: "You are a Senior AI Risk Auditor. Blunt, professional, and focused on operational reality.",
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
          phase0Actions: { type: Type.ARRAY, items: { type: Type.STRING } },
          quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidence: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["level", "reason"]
          }
        },
        required: ["score", "areaScores", "feedback", "phase0Actions", "quickWins", "confidence"]
      }
    }
  });
  return JSON.parse(response.text);
}

/**
 * Screen 5: The Strategy Sequencer (Step 5)
 * Sequences implementation into a 90-day execution plan.
 */
export async function getRoadmap(data: UserData): Promise<RoadmapPhase[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Sequence a 90-day execution roadmap for ${data.companyName}.
    
    INPUTS:
    - Priority: ${data.priority}
    - Architecture: ${data.selectedSystems.join(', ')}
    - Readiness Feedback: ${data.readinessFeedback}
    
    TASK:
    Create 3 distinct phases (Days 1-30, 31-60, 61-90). Focus on ROI and Foundation first.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 4096 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            duration: { type: Type.STRING },
            outcomes: { type: Type.ARRAY, items: { type: Type.STRING } },
            roiProjection: { type: Type.STRING }
          },
          required: ["title", "duration", "outcomes", "roiProjection"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}
