# Prompt 05: Resiliency Layer (Stability)

**Role:** Lead Frontend Engineer (Reliability focus)
**Task ID:** P3-005
**Objective:** Prevent "White Screen" crashes and handle environment failures gracefully.

---

### A) Description
Production apps must fail gracefully. This task implements high-fidelity error handling and startup validation.

### B) Purpose & Goals
- [ ] Implement `ErrorBoundary` components for each of the 3 panels (Left, Center, Right).
- [ ] Create an `EnvironmentValidator` that checks for required Supabase keys on startup and shows a "Configuration Error" screen if missing.
- [ ] Add "Retry Analysis" buttons to panels that fail to load AI data.

### C) Error UI
- **Persona:** "Strategic Interruption" — elegant, minimalist error cards that explain the issue in business terms, not code.

### D) Success Criteria
- [ ] A crash in the "Intelligence" panel does not stop the user from filling out the "Work" panel.
- [ ] The app fails fast and clearly if the backend is unreachable.