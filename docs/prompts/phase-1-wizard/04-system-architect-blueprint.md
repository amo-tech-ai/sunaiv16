# Prompt 04: The Modular Architect (Step 3)

**Role:** AI UX Architect  
**Objective:** Map pain points to a modular system architecture and visualize it.

---

### A) Description
This agent selects the best 5 AI engines to solve the problems identified in Step 2. It then generates a "Blueprint" (SVG) that shows the data flow between these systems and the user's website.

### B) Purpose & Goals
- [ ] Recommend 5 specific AI systems with custom "Why this matters" text.
- [ ] Generate a valid XML SVG showing the connection: Website -> [Selected Systems].
- [ ] Persist the SVG string to `context_snapshots.metrics` JSONB.
- [ ] Implement a `BlueprintViewer` with pan and zoom.

### C) Logic & Tools
- **Model:** `gemini-3-flash-preview` (for SVG) and `gemini-3-pro-preview` (for selection logic).
- **Format:** Minimalist architectural style (black lines, transparent background).

### D) User Journey
1. User selects 3 systems.
2. An architectural blueprint appears below the cards.
3. User zooms into the blueprint to see how data flows from their CRM to the AI engine.

### E) Success Criteria
- [ ] SVG renders without broken XML.
- [ ] Blueprint survives page refresh.
- [ ] Selecting a different system updates the blueprint correctly.
