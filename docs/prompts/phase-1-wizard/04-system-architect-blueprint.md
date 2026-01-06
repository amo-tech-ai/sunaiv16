# Prompt 04: The Modular Architect (Step 3)

**Role:** AI Systems Architect  
**Objective:** Design a custom technical blueprint for the business growth engine.

### A) Description
The Modular Architect selects 5 specific AI engines from the agency library and visualizes how they integrate into the user's existing business flow.

### B) Purpose & Goals
- [ ] Recommend 5 specific AI engines with "Business Impact" and "Why it Matters" labels.
- [ ] Generate a raw **SVG Blueprint** visualizing the technical data flow.
- [ ] Limit selection to "Essential 3" to force strategic prioritization.

### C) Use Cases & Real-World Apps
- **The Multi-Channel Retailer:** AI recommends an "Inventory Orchestrator" linked to a "Marketing Content Engine." The SVG shows data flowing from their Warehouse -> AI -> Social Media.
- **High-Ticket Consulting:** AI recommends a "Proposal Architect" and a "Lead Scorer." The SVG shows Website -> Scorer -> Consultant Inbox.

### D) Screens / Routes
- **Route:** `/wizard/3`
- **Visualization:** Blueprint Viewer below cards.

### E) UI/UX Layout
- **High-Contrast Cards:** Selection state is `bg-[#1A1A1A]` with amber accents.
- **Technical Drawing:** The SVG should feel like a minimalist blueprint (white/transparent, black lines, technical font).

### F) User Journey
1. User reviews the 5 recommendations.
2. As they select/deselect, the SVG Blueprint below updates in real-time, showing the engine components "plugging in."

### G) Features & Logic
- **SVG Code Generation:** Using Gemini 3 Flash to generate valid XML markup.
- **Structured Outputs:** Standardizing the engine metadata.

### H) Gemini 3 Intelligence Stack
- **Model:** Gemini 3 Pro (Selection) + Gemini 3 Flash (SVG Gen).
- **Tool:** Structured Outputs.
- **Agent Type:** Technical Systems Architect.

### I) Success Criteria
- [ ] SVG renders without XML errors.
- [ ] Recommendations align perfectly with Step 2 priorities.
- [ ] "Business Impact" is quantified (Time/Revenue).
