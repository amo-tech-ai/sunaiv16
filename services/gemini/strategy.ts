import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, RoadmapPhase, SystemRecommendation } from "../../types";

/**
 * Screen 3: The Modular Architect
 * Recommends 5 specific AI engines from the agency library.
 */
export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Architect a bespoke AI system suite for ${userData.companyName}.
    Blocker: ${userData.blocker}
    Manual Drag: ${userData.manualWork}
    Priority: ${userData.priority}`,
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
 * Screen 4: Operational Auditor
 * Audits readiness across Data, Infrastructure, and Culture.
 */
export async function getReadinessAssessment(data: UserData) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Evaluate scale readiness for ${data.companyName} implementing ${data.selectedSystems.join(', ')}.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
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
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          wins: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidence: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["level", "reason"]
          }
        },
        required: ["score", "areaScores", "feedback", "risks", "wins", "confidence"]
      }
    }
  });
  return JSON.parse(response.text);
}

/**
 * Screen 5: Roadmap Strategist
 * Generates a phased 90-day plan.
 */
export async function getRoadmap(data: UserData): Promise<RoadmapPhase[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Sequence 90-day execution plan for ${data.companyName}.`,
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
            outcomes: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "duration", "outcomes"]
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
    contents: `Generate a raw SVG architectural diagram for ${userData.companyName} featuring ${userData.selectedSystems.join(', ')}. 
    Style: Minimalist, black lines, transparent bg, Inter font nodes.
    Flow: User Website -> AI Core -> ROI Outcome.`,
    config: {
      systemInstruction: "You are a Technical Systems Architect. Output raw valid SVG XML only. No markdown.",
    }
  });
  
  let svg = response.text.trim();
  svg = svg.replace(/```svg/g, '').replace(/```/g, '');
  const svgMatch = svg.match(/<svg[\s\S]*?<\/svg>/i);
  return svgMatch ? svgMatch[0] : '';
}
