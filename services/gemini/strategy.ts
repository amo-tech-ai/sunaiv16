import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, RoadmapPhase, SystemRecommendation } from "../../types";

/**
 * Problem -> System Mapping Validator (Prompt 03)
 */
export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Validate business logic and map problems to systems.
    Industry: ${userData.industry}
    Problems: ${userData.blocker}, ${userData.manualWork}
    Priority: ${userData.priority}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            problem: { type: Type.STRING, description: "The specific problem this addresses" },
            ai_system: { type: Type.STRING, description: "The system name" },
            business_impact: { type: Type.STRING, description: "How it helps sales or marketing in one sentence" },
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
 * Architecture Blueprint SVG Generator (Prompt 04)
 */
export async function getArchitectureBlueprint(userData: UserData): Promise<string> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a SIMPLE SVG diagram showing data flow between selected AI systems and business tools.
    Systems: ${userData.selectedSystems.join(', ')}
    Tools: Website, CRM, Email, Social Media.
    
    RULES:
    - SVG must be valid
    - Simple boxes and arrows
    - No technical jargon
    - Business-friendly naming`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });
  
  // Extract SVG code from the response
  const svgMatch = response.text.match(/<svg[\s\S]*?<\/svg>/i);
  return svgMatch ? svgMatch[0] : '';
}

/**
 * Evidence-Based Readiness Audit (Prompt 05 + Prompt 08)
 */
export async function getReadinessAssessment(data: UserData) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Conduct an evidence-based operational audit for ${data.companyName}.
    Selected Systems: ${data.selectedSystems.join(', ')}
    Context: ${data.description}
    Diagnostics: ${data.blocker}, ${data.manualWork}`,
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
          risks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 Key Risks" },
          wins: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 Quick Wins" },
          evidence: { type: Type.STRING, description: "Evidence Notes" },
          confidence: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              reason: { type: Type.STRING }
            },
            required: ["level", "reason"]
          }
        },
        required: ["score", "areaScores", "feedback", "risks", "wins", "evidence", "confidence"]
      }
    }
  });
  return JSON.parse(response.text);
}

export async function getRoadmap(data: UserData): Promise<RoadmapPhase[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a 90-day plan for ${data.companyName}.
    Priority: ${data.priority}
    Systems: ${data.selectedSystems.join(', ')}`,
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