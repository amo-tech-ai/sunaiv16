# Prompt 01: Wizard Foundation (State & Routing)

**Role:** Senior Product Engineer  
**Objective:** Transition the Wizard from volatile React state to a persistent, URL-driven architecture.

---

### A) Description
This task establishes the "Skeleton" of the Wizard. It replaces the simple `step` state variable with `react-router-dom` paths and ensures that user data is persisted to `localStorage` and synchronized with the Supabase `wizard_sessions` table.

### B) Purpose & Goals
- [ ] Implement URL paths: `/wizard/1` through `/wizard/5`.
- [ ] Synchronize `userData` state with browser history (Back/Forward buttons).
- [ ] Implement `useWizard` hook with Supabase `upsert` logic for auto-saving.
- [ ] Ensure page refresh on `/wizard/4` does not reset the user to Step 1.

### C) Screens / Routes
- **Routes:** `/wizard/:step`
- **Component:** `App.tsx` and `hooks/useWizard.ts`

### D) UI/UX Layout
- **Left Panel:** The progress bar and "Cognitive Mirror" summary must update based on the URL parameter.
- **Center Panel:** Smooth fade-out/fade-in transitions between steps using `AnimatePresence`.

### E) User Journey
1. User starts at `/wizard/1`.
2. User enters data; a "Saving..." indicator appears in the sidebar.
3. User navigates to `/wizard/2`.
4. User refreshes the page; the app re-hydrates Step 1 and 2 data and lands the user back on Step 2.

### F) Features & Logic
- **Persistence:** Debounced auto-save (1s) to `wizard_answers` table in Supabase.
- **Guards:** Prevent users from deep-linking to Step 5 without completing Step 1.

### G) Success Criteria
- [ ] Browser refresh maintains all form data.
- [ ] Browser "Back" button works as expected.
- [ ] Supabase `wizard_answers` reflects the latest UI state.
