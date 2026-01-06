# Prompt 05: The Operational Auditor (Step 4)

**Role:** Senior AI Risk Auditor  
**Objective:** Conduct a high-stakes audit of organizational and technical scale readiness.

### A) Description
The Auditor performs a "Reality Check." It evaluates Data Maturity, Infrastructure, and Culture to identify hidden implementation risks that would derail the 90-day plan.

### B) Purpose & Goals
- [ ] Calculate a 0-100 score across 3 key dimensions.
- [ ] Use **Gemini Thinking** to find "Critical Gaps" (e.g., fragmented CRM data).
- [ ] Provide a "Confidence Level" with a blunt, professional justification.

### C) Use Cases & Real-World Apps
- **The "Data-Poor" Startup:** A founder wants a complex AI Analytics engine, but the Auditor detects their data is in scattered Excel sheets. The AI assigns a score of 30 for "Data Maturity" and adds a "Cleanup Phase" to the roadmap.
- **The "Culture-Ready" Enterprise:** AI detects high technical skill but "Siloed Culture." It warns that the AI engine will fail without executive-level change management.

### D) Screens / Routes
- **Route:** `/wizard/4`
- **Viz:** Radar Chart (SVG).

### E) UI/UX Layout
- **Audit Findings:** Split view between the Radar Chart and a list of "Critical Risks" vs. "Quick Wins."
- **Tone:** Blunt, executive-grade. No sugar-coating implementation challenges.

### F) User Journey
1. User sees their "Scale Score."
2. They review the specific "Gaps" identified.
3. The Right Panel explains *why* these gaps exist based on their Step 2 answers.

### G) Features & Logic
- **Gemini Thinking:** Analyzing the "Collision" between selected systems and current business state.
- **Numerical Scoring:** 1:1 mapping of reasoning to scores.

### H) Gemini 3 Intelligence Stack
- **Model:** Gemini 3 Pro.
- **Feature:** Gemini Thinking (4096 token budget).
- **Tool:** Structured Data Viz Mapping.

### I) Success Criteria
- [ ] Radar Chart accurately reflects the generated scores.
- [ ] Risks identified are non-obvious and industry-specific.
