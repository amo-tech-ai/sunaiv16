# 11: Industry Focus & Editorial Strategy

This document details the architectural logic used to create a "bespoke" feel for every user, regardless of their sector. It focuses on the transition from **Step 1 (Context)** to **Step 2 (Diagnostics)**.

---

## 1. The Language Engine: "The Editorial Guard"
To achieve a premium consulting feel, we implemented a **Global Language Guard** (found in `services/gemini/client.ts`).

### The Philosophy
Busy executives are repelled by "AI Hype" and technical jargon. We replaced "AI orchestration" with "Speed to Market" and "Synergistic Paradigms" with "Cost Reduction."

### The "Prompt 01" Constraint
Every AI call is wrapped in a system instruction that strictly forbids:
- *Optimization, Leverage, Moat, Paradigm, Synergy, Friction.*
It mandates the use of:
- *Sales, Marketing, Revenue, Execution, Customers, Time Saved.*

**Impact:** The AI sounds like a human partner rather than a software tool.

---

## 2. Screen 2: Dynamic Industry Diagnostics
Step 2 is not a static form. It is a **Generative Audit** tailored to the data captured in Step 1.

### The Mechanism
1. **Step 1 Research:** Gemini 3 uses `googleSearch` to verify the company.
2. **Context Injection:** The research result is passed to `getIndustrySpecificQuestions`.
3. **Generative Schema:** Gemini generates 4 diagnostic blocks (Sales, Content, Speed, Priority) where:
    - **Questions** use industry-specific nouns (e.g., "Real Estate: Listing Throughput" vs "SaaS: Monthly Churn").
    - **Options** represent realistic business problems.
    - **Proposed Fixes** map each selection to a specific AI solution in real-time.

---

## 3. Technical File Index

The following files orchestrate the industry-focus experience:

| File Path | Role in Strategy | Key Logic |
| :--- | :--- | :--- |
| `services/gemini/client.ts` | **Persona Baseline** | Contains the `SYSTEM_INSTRUCTION` (Language Guard). |
| `services/gemini/discovery.ts` | **Logic Layer** | `getIndustrySpecificQuestions` - The generator function. |
| `supabase/functions/generate-diagnostics/index.ts` | **Server Layer** | Validates the schema and handles thinking budgets. |
| `components/wizard/Step2Diagnostics.tsx` | **UI Layer** | Renders the Problem-Solution pairing visualization. |
| `types.ts` | **Schema Definition** | `DiagnosticQuestionSet` interface ensures data integrity. |

---

## 4. Implementation Example
If a user enters **"Luxury Jewelry Brand"** in Step 1:

- **Step 2 Title:** "Protecting the Craft: Diagnostic Audit"
- **Sales Question:** "Where is your client acquisition slowing down?"
- **Option:** "Bespoke consultation follow-ups."
- **AI Pairing:** "Automated Concierge Agent" (Appears when selected).
- **Why it matters:** "Maintains high-touch feel while reducing founder manual work."

---

## 5. Success Metrics for Industry Focus
- **Relevance:** The user should feel that Sun AI "understands" their specific niche within 10 seconds.
- **Authority:** The "Proposed Fix" must reference industry outcomes (Revenue/Time) rather than technical features (LLMs/Agents).
- **Engagement:** Selection of a "Problem" should feel like identifying a "Revenue Leak," making the solution (Screen 3) a logical necessity rather than a sales pitch.

---
*Created by Sun AI Architectural Council*
