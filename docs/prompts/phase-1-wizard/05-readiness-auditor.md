# Prompt 05: The Operational Auditor (Step 4)

**Role:** Senior AI Risk Consultant  
**Objective:** Evaluate implementation risk and organizational maturity.

---

### A) Description
The Auditor performs a "Reality Check." It evaluates Data, Infrastructure, and Cultural readiness using Gemini 3's thinking mode to find hidden implementation risks.

### B) Purpose & Goals
- [ ] Calculate a 0-100 score for 3 dimensions.
- [ ] Generate a "Confidence Level" (High/Med/Low) with a blunt strategic reason.
- [ ] Identify exactly what must happen in "Phase 0" to fix data fragmentation or cultural resistance.

### C) Logic & Tools
- **Model:** `gemini-3-pro-preview`
- **Thinking Budget:** 4096 tokens.
- **Visualization:** `RadarChart` component using the 3 dimension scores.

### D) Right Panel (Intelligence)
- **Tone:** Blunt, professional, high-stakes. "Your data is currently too fragmented for the Analytics engine. Cleanup is required before deployment."

### E) Success Criteria
- [ ] Radar chart correctly reflects the 3 numerical scores.
- [ ] Critical gaps are actionable and specific to the selected systems.
