# Prompt 06: The Strategy Sequencer (Step 5)

**Role:** Senior Product Strategist  
**Objective:** Synthesize all data into a 90-day execution roadmap.

---

### A) Description
The final step of the wizard. This agent sequences implementation into 3 phases (Foundation, Scale, Optimization) and decomposes them into actionable tasks for the dashboard.

### B) Purpose & Goals
- [ ] Generate a 3-phase vertical roadmap with specific outcomes.
- [ ] Decompose phases into 5-10 "High-Velocity Tasks."
- [ ] Assign ownership: `client` (Founder) vs `ai` (Automation).
- [ ] Calculate ROI projections (Time/Revenue).

### C) Logic & Tools
- **Model:** `gemini-3-pro-preview`
- **Thinking Budget:** 4096 tokens.
- **Workflow:** When the user clicks "Initialize Hub," tasks are committed to the `tasks` table.

### D) User Journey
1. User reviews the 90-day plan.
2. User sees "Phase 1: Foundation" is 60% Founder-led tasks (Cleaning data).
3. User clicks "Initialize," triggering the transition to the Dashboard.

### E) Success Criteria
- [ ] Roadmap phases follow a logical technical sequence.
- [ ] Tasks are realistic and categorized by owner.
