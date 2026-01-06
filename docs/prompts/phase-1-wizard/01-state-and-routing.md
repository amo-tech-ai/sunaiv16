# Prompt 01: Wizard Foundation (State & Routing)

**Role:** Senior Full-Stack Engineer  
**Objective:** Establish a persistent, URL-driven executive experience that ensures zero data loss.

### A) Description
The foundation layer transitions the application from a simple state machine to a RESTful, multi-page wizard. It synchronizes the complex "Strategic Data Object" across browser history and persistent storage.

### B) Purpose & Goals
- [ ] Implement `react-router-dom` for paths `/wizard/1` through `/wizard/5`.
- [ ] Ensure the "Cognitive Mirror" (Left Panel) and "Consultant Feed" (Right Panel) maintain state across transitions.
- [ ] Implement a `useWizard` hook that handles debounced auto-saves to `localStorage`.

### C) Use Cases & Real-World Apps
- **The Interrupted Executive:** A founder starts the audit on a laptop, closes it for a meeting, and resumes on a mobile device later—picking up exactly where they left off.
- **Strategic Re-calibration:** A user goes back to Step 2 to change a priority; the app dynamically recalculates subsequent step placeholders without clearing valid data.

### D) Screens / Routes
- **Routes:** `/wizard/:step`
- **Fallback:** Redirect to Step 1 if foundational context (Name/Company) is missing.

### E) UI/UX Layout (3-Panel Core)
- **Transitions:** Use `framer-motion` for editorial cross-fades between routes.
- **Persistence Indicator:** A small, amber "Synchronized" dot in the footer that pulses during background saves.

### F) User Journey
1. User enters the site and is routed to `/wizard/1`.
2. As they progress, the URL updates (e.g., `/wizard/3`).
3. If they refresh, the `useWizard` hook rehydrates the state from storage and returns them to the active URL.

### G) Features & Logic
- **Interactions API:** Logic to handle the "Back" button while preserving AI-generated intelligence in the Right Panel.
- **Data Guard:** Schema validation on mount to prevent corrupt state from loading.

### H) Gemini 3 Intelligence Stack
- **Modality:** Text-based state mapping.
- **Role:** Structural integrity.

### I) Success Criteria
- [ ] Refreshing the browser does not result in a blank form.
- [ ] Browser "Back" button moves through steps correctly.
- [ ] `localStorage` matches the UI state 1:1.
