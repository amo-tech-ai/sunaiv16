# 13: Screen 2 — Industry Diagnostics & Solution Mapping

**Status:** 🟢 Production Ready  
**Agent:** *The Diagnostic Architect*  
**Core Purpose:** Drill down into sector-specific pain points and map them to high-impact AI Agent features.

---

## 1. Executive Purpose
Screen 2 is the "Diagnostic" phase. It uses the context established in Screen 1 to present a bespoke audit. We replace generic questions with "Leverage Points" that matter to that specific industry.

## 2. AI Feature Orchestration

| Feature | Application in Screen 2 |
| :--- | :--- |
| **Gemini Thinking (2k)** | Used to reason through the *cause-and-effect* of industry problems. |
| **Structured Outputs** | Enforces a strict JSON schema for the Problem-Solution pairing. |
| **Maps Grounding** | Used for **Real Estate** and **Hospitality** to identify local market friction. |
| **RAG (Logic)** | Cross-references the user's "Blockers" against our library of AI Systems. |

---

## 3. Industry-Specific Logic Modules

The AI Agent generates unique options based on the detected sector:

### A. Real Estate & Development
- **Pain Point:** "Lead leak between listing and viewing."
- **AI Solution:** *Lead-to-Viewing Orchestrator* (Automated SMS/Email nurture + Calendar sync).
- **Executive Outcome:** 40% increase in viewing conversion.

### B. Fashion & Luxury
- **Pain Point:** "High SKU count slowing down marketing production."
- **AI Solution:** *Creative Asset Engine* (Image generation for mockups + Automated SEO descriptions).
- **Executive Outcome:** Reclaim 20+ hours of creative team time weekly.

### C. Startups & SaaS (MVP Focus)
- **Pain Point:** "Founder-led sales is a scaling bottleneck."
- **AI Solution:** *Founder-Clone Agent* (RAG-trained on founder's voice for initial outreach).
- **Executive Outcome:** Automated top-of-funnel without losing personal touch.

### D. Travel & Hospitality
- **Pain Point:** "Manual concierge work for restaurant/tour recs."
- **AI Solution:** *Hyper-Local Concierge* (Gemini + Maps Grounding for real-time local booking).
- **Executive Outcome:** 5-star experience delivery at 0 marginal cost.

---

## 4. The Implementation Prompt (Internal)

> **AGENT_TASK:** *The Diagnostic Architect*  
> **CONTEXT:** Ingest `Screen 1` research (Industry, Model, Market Positioning).  
> **ACTION:** 
> 1. Use `Thinking Mode` to identify the "Primary Revenue Lever" for this specific industry.
> 2. Generate 4 diagnostic questions where every "Problem" option is paired with a specific "AI Agent Feature."
> 3. Ensure "Why it Matters" notes focus on **Cash, Time, or Speed**.
> **OUTPUT_SCHEMA:** 
> - Must follow the `DiagnosticQuestionSet` TypeScript interface.

---

## 5. User Experience: The "Proposed Fix"
When a user clicks a problem (e.g., "Slow listing uploads"), the UI immediately displays a "Proposed Fix" box:
- **Feature Name:** "Visual Listing Engine"
- **Logic:** "Uses Nano Banana Pro to auto-tag photos and generate luxury copy in < 2 seconds."
- **Goal:** This educates the user on the value of the systems they will select in Step 3.

---
*Created by Sun AI Architectural Council*