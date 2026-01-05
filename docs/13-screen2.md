# 13: Screen 2 — Industry Diagnostics & Solution Mapping

**Status:** 🟢 Production Ready  
**Agent:** *The Diagnostic Architect*  
**Core Purpose:** Drill down into sector-specific pain points and map them to high-impact AI Agent features.

---

## 1. Executive Purpose
Screen 2 is the "Diagnostic" phase. It uses the context established in Screen 1 (Research) to present a bespoke audit. We replace generic questions with "Leverage Points" that matter to that specific industry.

## 2. AI Feature Orchestration

| Feature | Application in Screen 2 |
| :--- | :--- |
| **Gemini Thinking (4k)** | Used to reason through the *cause-and-effect* of industry problems. |
| **Structured Outputs** | Enforces the `DiagnosticQuestionSet` schema for the Problem-Solution pairing. |
| **Industry Grounding** | Filters diagnostic options based on the sector detected in Screen 1. |
| **RAG (Logic)** | Cross-references user blockers against a library of 15+ specialized AI Agents. |

---

## 3. The "Problem-Solution" Pairing Logic

Screen 2 is where the AI proves its value by pairing a business friction point with a technical engine.

### Real Estate & Development
- **Problem:** "Lead leakage during listing follow-up."
- **AI Solution:** *Lead-to-Viewing Orchestrator* (RAG-trained on listing data to handle SMS inquiries).
- **Executive Outcome:** 40% higher viewing conversion.

### Fashion & Luxury
- **Problem:** "High-velocity SKU marketing production."
- **AI Solution:** *Creative Asset Engine* (Imagen-4 for mockup generation + Automated luxury copy).
- **Executive Outcome:** Reclaims 20+ hours of creative team time.

### Travel & Hospitality
- **Problem:** "Manual scheduling for restaurant/tour concierge."
- **AI Solution:** *Hyper-Local Concierge Agent* (Gemini + Maps Grounding for real-time local booking).
- **Executive Outcome:** 5-star experience delivery at 0 marginal cost.

---

## 4. The Multi-Step Agent Logic

1. **Step 1: Context Ingestion:** The agent reads the `researchContext` from the Researcher Agent (Screen 1).
2. **Step 2: Thinking Loop:** The agent reasons through the "Primary Revenue Lever" for that specific company.
3. **Step 3: Question Generation:** A set of 4 questions is generated using industry-specific nouns and scenarios.
4. **Step 4: Pairing:** For every option (Problem), a "Proposed Fix" (AI Feature) is mapped.
5. **Step 5: Narrative Synthesis:** The Right Panel explains *why* these specific diagnostics were chosen for the user's sector.

---

## 5. Success Metrics
- **Relevance:** > 95% of users identify with the problems presented.
- **Education:** The user understands that an AI Agent is a "Fix" for a specific "Leak."
- **Conversion:** User proceeds to Step 3 with a clear intent for which systems they need.

---
*Created by Sun AI Architectural Council*