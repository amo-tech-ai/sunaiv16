# Prompt 07: Launch Orchestrator (Finalization)

**Role:** Principal Systems Integrator  
**Objective:** Securely finalize the strategy session and hand off to the persistent Dashboard.

### A) Description
The Orchestrator is the bridge between discovery and execution. It commits the final "Active Strategy" to the database and initializes the Executive Dashboard with all generated context.

### B) Purpose & Goals
- [ ] Trigger the "Task Generation" engine to populate the dashboard.
- [ ] Commit the final `is_active` snapshot to Supabase.
- [ ] Implement a premium "Fade-to-Black" transition into the Hub.

### C) Use Cases & Real-World Apps
- **The Handoff:** Moving from the "Abstract Vision" of the wizard to the "Concrete Action" of the Dashboard.
- **Data Continuity:** Ensuring the "Consultant" on the Dashboard remembers every nuance from the Step 2 diagnostics.

### D) Screens / Routes
- **Transition:** `/wizard/5` -> `/dashboard`.
- **Logic:** Cleanup of transient wizard state.

### E) UI/UX Layout
- **The "Seal":** A high-fidelity confirmation screen: "Your Strategic Command is initializing."
- **Visuals:** Minimalist loading animation showing the 3 selected engines "Loading."

### F) User Journey
1. User clicks "Open Your Hub."
2. The UI fades.
3. The Dashboard initializes with their company name, priority, and 90-day tasks pre-populated.

### G) Features & Logic
- **Function Calling:** Initializing the task decomposition engine.
- **State Handoff:** Clean handoff between Wizard and Dashboard UI components.

### H) Gemini 3 Intelligence Stack
- **Role:** Systems Integrator.
- **Feature:** Interaction Continuity.

### I) Success Criteria
- [ ] Dashboard is 100% populated on first load.
- [ ] No wizard data is lost during the transition.
- [ ] Returning to `/wizard` redirects to `/dashboard` (Strategy is locked).
