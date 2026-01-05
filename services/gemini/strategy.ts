import { Type } from "@google/genai";
import { getAI, SYSTEM_INSTRUCTION } from "./client";
import { UserData, RoadmapPhase, SystemRecommendation } from "../../types";

/**
 * Problem -> System Mapping Validator (Prompt 03)
 * Architecting a modular engine suite based on Step 2 diagnostics.
 */
export async function getSystemRecommendations(userData: UserData): Promise<SystemRecommendation[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Architect a bespoke modular AI system suite for ${userData.companyName}.
    Industry: ${userData.industry}
    Revenue Blocker: ${userData.blocker}
    Manual Drag: ${userData.manualWork}
    Velocity Target: ${userData.speed}
    Executive Priority: ${userData.priority}

    TASK:
    Identify 5 specific AI engines from our library that directly plug the identified revenue leaks.
    
    GUIDELINES:
    - Focus on the outcome (e.g., "Automated Lead Capture" rather than "chatbot").
    - Provide a "Why this matters" narrative in editorial consultant tone.
    - Match systems specifically to the blockers identified in Step 2.`,
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
            description: { type: Type.STRING, description: "Bespoke system description (max 15 words)." },
            problem: { type: Type.STRING, description: "The specific operational friction this removes" },
            ai_system: { type: Type.STRING, description: "Technical engine name" },
            business_impact: { type: Type.STRING, description: "Direct revenue or time benefit" },
            recommended: { type: Type.BOOLEAN },
            whyItMatters: { type: Type.STRING, description: "Strategic justification for the executive." }
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
    - Minimalist black lines on transparent background
    - No text-shadows or gradients.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });
  
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
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          wins: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidence: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
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