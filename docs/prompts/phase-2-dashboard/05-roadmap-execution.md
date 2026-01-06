# Prompt 05: Strategic Roadmap Visualization

**Role:** Senior Strategic Consultant / UI Engineer
**Task ID:** P2-005
**Objective:** Visualize the 90-day execution plan with live progress tracking.

---

### A) Description
The Roadmap tab provides the long-term view. This task creates a vertical, interactive Gantt-lite timeline that reflects the phases generated in Step 5 of the wizard.

### B) Purpose & Goals
- [ ] Implement an interactive vertical timeline of Roadmap Phases.
- [ ] Expanding a phase reveals the specific "Strategic Outcomes" and their completion status.
- [ ] Highlight the "Active Focus" (Current Phase) based on the project timeline.
- [ ] Visual progress bars for each phase derived from linked tasks.

### C) Interaction Design
- **Animation:** Use smooth height transitions (AnimatePresence) when phases expand.
- **Navigation:** Deep-link from Overview "Current Phase" directly to the Roadmap tab.

### D) Success Criteria
- [ ] Roadmap reflects the exact outcomes stored in `roadmap_phases`.
- [ ] Completing all tasks in Phase 1 automatically marks the phase as "Complete" in the UI.