import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, RoadmapPhase, SystemRecommendation } from "../../types";

/**
 * Screen 3: The Modular Architect
 * Recommends 5 specific AI engines from the agency library based on diagnostics.
 */
export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Design a technical architecture suite for ${userData.companyName}.
    PRIMARY BLOCKER: ${userData.blocker}
    MANUAL DRAG: ${userData.manualWork}
    PRIORITY: ${userData.priority}
    
    TASK:
    1. Select the 5 most relevant AI "Engines" from a strategic library.
    2. Provide a sophisticated name (e.g., 'Omni-Channel Lead Concierge' instead of 'Chatbot').
    3. Define the 'Business Impact' in revenue or time terms.
    4. Highlight one 'Optimal Configuration' (recommended: true).`,
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
 * Generates a technical diagram of the selected systems.
 */
export async function getArchitectureBlueprint(userData: UserData): Promise<string> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a raw SVG architectural diagram for ${userData.companyName}.
    SELECTED ENGINES: ${userData.selectedSystems.join(', ')}
    
    STYLE GUIDELINES:
    - Minimalist, technical blueprint aesthetic.
    - Transparent background.
    - Black lines (stroke: #1A1A1A).
    - Use 'Inter' or generic sans-serif for labels.
    - Flow: [Client Website] --(data)--> [Sun AI Core] --(orchestration)--> [${userData.selectedSystems.join('] & [')}] --(impact)--> [ROI Outcome].
    
    Output ONLY raw valid <svg> XML code. No markdown formatting.`,
    config: {
      systemInstruction: "You are a Technical Systems Architect. You specialize in minimalist, high-fidelity system flow diagrams.",
    }
  });
  
  let svg = response.text.trim();
  // Cleanup any potential markdown wrapper
  svg = svg.replace(/```svg/g, '').replace(/```/g, '');
  const svgMatch = svg.match(/<svg[\s\S]*?<\/svg>/i);
  return svgMatch ? svgMatch[0] : '';
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
