# Prompt 03: The Diagnostic Architect (Step 2)

**Role:** Senior Strategic Consultant  
**Objective:** Transition from generic forms to a bespoke industry audit.

---

### A) Description
Step 2 generates an industry-specific diagnostic based on the research from Step 1. It pairs every "Business Problem" with a "Proposed AI Fix" to educate the executive on the value of the platform.

### B) Purpose & Goals
- [ ] Use Thinking Mode to reason through the primary bottlenecks for the detected business model.
- [ ] Generate 4 diagnostic blocks: Growth, Content, Speed, and Priority.
- [ ] Pair every multiple-choice option with a hidden "AI Engine Preview" that reveals upon selection.

### C) Logic & Tools
- **Model:** `gemini-3-pro-preview`
- **Thinking Budget:** 2048 tokens.
- **Input:** `researchContext` from Step 1.

### D) UI/UX (Center Panel)
- **Selection Interaction:** When an option is clicked, an amber-bordered card appears below it: "Solution: Automated SKU Orchestration. Business Impact: Reclaims 15 hours/week."

### E) Success Criteria
- [ ] > 90% of questions use terminology specific to the user's industry.
- [ ] The "Proposed Fix" connects directly to the selected "Problem."
