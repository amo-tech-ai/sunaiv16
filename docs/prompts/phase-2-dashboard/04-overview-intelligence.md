# Prompt 04: Executive Overview (The Command Hub)

**Role:** AI UX Architect
**Task ID:** P2-003
**Objective:** Build the primary data-viz and intelligence center for the dashboard.

---

### A) Description
The Overview tab is the "Strategic North Star." It must calculate live metrics based on database state and stream proactive intelligence notes.

### B) Purpose & Goals
- [ ] Implement 4 Dynamic KPI Cards:
    - **Scale Score:** From Step 4 audit.
    - **Execution Velocity:** % of tasks completed vs. total.
    - **Active Engines:** Count of deployed systems.
    - **Risk Level:** (Low/Med/High) derived from task age/blockers.
- [ ] Integrate "The Analyzer" agent to stream observations about progress (e.g., "Velocity is 12% above forecast. On track for Month 2.").

### C) Intelligence Logic
- **Agent:** The Analyzer (Gemini 3 Flash).
- **Trigger:** Any update to the `tasks` table triggers a debounced (30s) re-analysis.
- **Output:** Streams to the Right Panel.

### D) Success Criteria
- [ ] Metrics update in real-time as tasks are checked off.
- [ ] "Weekly Focus" list correctly filters the top 3 highest-priority pending tasks.
- [ ] High-risk items are highlighted with a subtle amber border.