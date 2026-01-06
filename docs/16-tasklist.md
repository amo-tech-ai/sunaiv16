# 16: Sun AI Agency — Production Readiness Task List

**Auditor:** Senior Product Engineer + AI Systems Architect  
**Current State:** High-Fidelity Local Prototype / Detached Backend  
**Security Rating:** 🔴 CRITICAL (Client-side API Key Exposure)

---

## A) Executive Summary
The Sun AI Agency application is a visually stunning and logically sound strategic platform that is currently architected as a **Local-First Prototype**. While the UI/UX for the 5-step wizard and the executive dashboard is ~95% complete, the application suffers from a critical architectural gap: it performs high-stakes AI reasoning and market research on the client-side, exposing the `GEMINI_API_KEY` to the browser. To transition to a production-ready "Executive Command Center," the platform requires a migration to its detached Supabase backend, implementation of a secure Auth layer, and the transition of state management from ephemeral React/LocalStorage to a persistent, URL-driven database architecture.

---

## B) Task List

| # | Priority | Area | Task Description | Why This Is Needed | Files / Modules Involved | Depends On | Definition of Done |
|---|---|---|---|---|---|---|---|
| 1 | **P0** | Security | **Kill Client-Side Keys** | Prevent API key theft from browser network/source tabs. | `services/gemini/client.ts` | #2 | All `process.env.API_KEY` references removed from frontend. |
| 2 | **P0** | Backend | **Edge Function Proxying** | Frontend must call `supabase.functions.invoke()` instead of local Gemini services. | `App.tsx`, `services/gemini/` | #1 | Wizard steps successfully receive AI data via Edge Functions. |
| 3 | **P0** | Auth | **Implement Executive Entry** | Multi-tenancy and data privacy depend on a secure login/signup gate. | `App.tsx`, `index.tsx` | N/A | Auth provider wrapping App; `/login` route exists. |
| 4 | **P1** | Persistence | **SQL Schema Migration** | Real tables must replace `localStorage` for cross-device executive usage. | `docs/supabase-plan.md` | #3 | SQL script executed in Supabase; Tables visible in dashboard. |
| 5 | **P1** | Routing | **URL-Driven State** | Prevent data loss on page refresh; allow deep-linking to specific tabs. | `App.tsx`, `index.html` | N/A | Install `react-router-dom`; Steps mapped to `/wizard/:step`. |
| 6 | **P1** | Dashboard | **Live Data Synchronization** | Connect Task status and Roadmap phases to Supabase DB Realtime. | `TasksTab.tsx`, `RoadmapTab.tsx` | #4 | Toggling a task updates the database, not just local state. |
| 7 | **P1** | Product | **Architecture SVG Reification** | Ensure SVG blueprints are generated and stored in DB, not just memory. | `Step3Systems.tsx`, `strategy.ts` | #2 | SVG displays correctly from a DB-fetched project snapshot. |
| 8 | **P2** | AI Agents | **Thinking Budget Optimization** | Fine-tune `thinkingBudget` values to balance latency vs strategic depth. | `supabase/functions/` | #2 | Response times < 10s for Pro steps; < 5s for Flash steps. |
| 9 | **P2** | UX | **Loading / Error Refinement** | Implement high-fidelity skeleton states for all async AI transitions. | `SkeletonLoading.tsx`, `App.tsx` | #5 | No layout shifts; Clear "Strategic Offline" error messages. |
| 10 | **P2** | Dashboard | **Real Health Check Logic** | Replace hardcoded "In Deployment" status with real system vitals logic. | `SystemsTab.tsx`, `analyzer.ts` | #6 | System status reflects actual database connection/pings. |
| 11 | **P3** | Advanced | **Narrative Audio Briefing** | Use `gemini-tts` for daily executive strategy briefings. | `ClientDashboard.tsx` | #2 | "Listen to Strategy" button functional in Dashboard. |
| 12 | **P3** | Stability | **Rate Limiting Enforcement** | Apply per-org/per-user rate limits to prevent API cost spikes. | `supabase/functions/_shared/` | #2 | Users receive 429 errors gracefully after 100 runs/hr. |

---

## C) Phase Grouping

### Phase 1 – Core Wizard & Security (The Secure Foundation)
- Tasks: #1, #2, #3, #5.
- **Focus:** Stop the bleeding. Move keys to the server, implement Auth, and fix the routing/refresh bug. Ensure the Wizard "feels" professional by not resetting on refresh.

### Phase 2 – Dashboard Execution (The Living Strategy)
- Tasks: #4, #6, #7, #10.
- **Focus:** Turn the static roadmap into a living document. Sync everything to Supabase so the "Strategic North Star" is persistent across sessions and devices.

### Phase 3 – Production & Scale (Optimization)
- Tasks: #8, #9, #11, #12.
- **Focus:** Polish the experience for enterprise-grade reliability. Refine latency, handle edge-case errors, and add premium "delighters" like audio briefings.

---

## D) Final Sanity Check

**What breaks if we launch today?**
1. **Financial Ruin:** A user can inspect the source code, find your `GEMINI_API_KEY`, and use it to run millions of tokens on their own projects.
2. **Data Fragility:** An executive spends 15 minutes finishing a roadmap, refreshes the page to show a colleague, and is redirected to Step 1 with a blank form.
3. **Privacy Violation:** Every user is using the same "Local State." There is no isolation between Brand A and Brand B data.

**What is the single most dangerous missing piece?**
The **Auth-to-Database link**. Currently, there is no way to save a user's strategy to their specific account, making the "Consulting Platform" effectively a "One-Time Generator."

**What can safely wait until after launch?**
- Real-time ROI analytics (Mock data is acceptable for the first 5 clients).
- Audio briefings.
- Advanced multi-user org permissions (Admin vs Member).

---
*Generated by the Sun AI Architectural Council*