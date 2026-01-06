# Prompt 06: Roadmap Intelligence (Contextual Notes)

**Role:** AI Systems Architect
**Task ID:** P2-008
**Objective:** Add strategic narrative to the Roadmap view.

---

### A) Description
The roadmap should not just be a static list. This agent provides a running narrative on the "Philosophy of Sequencing"—explaining why Phase 1 must precede Phase 2.

### B) Purpose & Goals
- [ ] Implement a specialized `RoadmapIntelligence` stream in the Right Panel.
- [ ] Analyze the current phase blockers and provide "Course Correction" suggestions.
- [ ] Note when a phase is approaching its "Strategic Deadline."

### C) Logic & Tools
- **Model:** `gemini-3-flash-preview`.
- **Context:** Latest `roadmap` JSON + `context_snapshot`.
- **Persona:** Senior Strategic Partner.

### D) Success Criteria
- [ ] Expanding a phase triggers a specific intelligence note about that phase's importance.
- [ ] Narrative is blunt and actionable (e.g., "Phase 2 is ready, but the data cleanup in Phase 1 is currently a hard blocker.").