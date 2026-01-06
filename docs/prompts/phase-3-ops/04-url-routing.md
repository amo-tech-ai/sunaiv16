# Prompt 04: URL-Driven Strategic Routing

### A) Task Reference
- **Task ID:** #5
- **Name:** URL-Driven State
- **Priority:** P1 (High)
- **Why:** Using a single `step` state variable is brittle. Users expect the "Back" button to work and to be able to bookmark the "Roadmap."

### B) Description
Transitioning the application from a "Single Page State Machine" to a RESTful URL structure using `react-router-dom`.

### C) Purpose & Goals
- [ ] Implement persistent paths: `/wizard/1`, `/wizard/2`, etc.
- [ ] Implement dashboard paths: `/dashboard/overview`, `/dashboard/tasks`.
- [ ] Ensure the "Back" button in the browser correctly navigates the wizard steps.
- [ ] Handle 404s with a premium "Strategic Dead-end" page.

### D) Screens / Routes
- **Base:** `/` (Home/Landing).
- **Auth:** `/login`.
- **Wizard:** `/wizard/:step`.
- **Dashboard:** `/dashboard/:tab`.

### E) UI/UX Layout (3-Panel Core Model)
- **Left Panel (Context):** The progress bar should be driven by the current URL `:step` param, not local state.
- **Transitions:** Use `<AnimatePresence>` to maintain the editorial fade-in effect when the URL changes.

### F) User Journey (Step-by-Step)
1. User finishes Step 1.
2. User clicks "Continue."
3. App calls `navigate('/wizard/2')`.
4. Browser URL changes to `sunai.agency/wizard/2`.
5. User hits "Back."
6. Browser URL changes to `sunai.agency/wizard/1` and the UI reverts correctly.

### G) Features & Logic
- **Guard Logic:** If a user tries to access `/wizard/5` but hasn't completed Step 1, redirect them to Step 1.
- **Deep Linking:** If a user is logged in and visits `/dashboard/tasks`, they should land directly on the task tab.

### H) AI Agents
- **N/A** (Infrastructure).

### I) Gemini 3 Features & Tools
- **N/A** (Infrastructure).

### J) Workflows & Automations
| Trigger | Agent / Service | Action | Output | Stored Where |
|------|---------------|--------|--------|-------------|
| Navigate Click | React Router | Push State | New URL | Browser History |

### K) Success Criteria
- [ ] Browser refresh on `/wizard/3` stays on Step 3.
- [ ] Browser "Back" button works.
- [ ] No "Flash of Step 1" when deep-linking to a higher step.

### L) Production-Ready Checklist
- [ ] UX: Scroll-to-top on route change.
- [ ] Performance: Code-splitting routes via `React.lazy`.

### M) Mermaid Diagram
```mermaid
graph LR
    A[/wizard/1] -->|Next| B[/wizard/2]
    B -->|Back| A
    B -->|Next| C[/wizard/3]
    C -->|Finish| D[/dashboard/overview]
```