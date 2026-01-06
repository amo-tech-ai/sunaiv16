# Prompt 04: Strategic Navigation (URL Routing)

**Role:** Senior Frontend Engineer
**Task ID:** P3-004
**Objective:** Transition the SPA state-machine to a RESTful URL structure.

---

### A) Description
The current app uses a `step` variable. This task implements `react-router-dom` so that every part of the strategy has a shareable, bookmarkable URL.

### B) Purpose & Goals
- [ ] Implement paths: `/login`, `/wizard/:step`, `/dashboard/:tab`.
- [ ] Ensure the browser's "Back" and "Forward" buttons correctly navigate the wizard steps.
- [ ] Implement Route Guards to prevent users from skipping steps without required data.
- [ ] Design a premium "Strategic Dead-end" (404) page.

### C) Interaction Design
- **Animations:** Use `<AnimatePresence>` to maintain the editorial fade-in transitions between routes.
- **Deep Linking:** Ensure `/dashboard/tasks` lands directly on the Tasks tab if the user is authenticated.

### D) Success Criteria
- [ ] Refreshing the browser on Step 4 keeps the user on Step 4.
- [ ] URLs are clean and reflect the application state.