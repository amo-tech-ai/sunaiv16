# Prompt 01: The Security Bridge (Edge Proxying)

**Role:** Senior Backend Engineer / Security Architect
**Task ID:** P3-001
**Objective:** Secure all Gemini API keys by moving AI orchestration to the server.

---

### A) Description
Currently, `services/gemini/` calls the Google API directly from the browser, exposing the `API_KEY`. This task migrates all frontend logic to use `supabase.functions.invoke()`, calling the pre-written Edge Functions in `/supabase/functions/`.

### B) Purpose & Goals
- [ ] Remove all direct imports of `@google/genai` in the frontend (except for type definitions).
- [ ] Implement a unified `useEdgeAI` hook to handle authenticated requests to Supabase Edge Functions.
- [ ] Ensure that every AI call includes the user's JWT in the `Authorization` header.
- [ ] Map existing services (`discovery.ts`, `strategy.ts`) to their respective Edge Function endpoints.

### C) Logic & Workflows
- **Trigger:** Frontend needs AI analysis.
- **Action:** Frontend calls `supabase.functions.invoke('analyze-business', { body: { ... } })`.
- **Validation:** Edge Function verifies the user's session before calling Gemini.

### D) Success Criteria
- [ ] Zero instances of `process.env.API_KEY` remain in the frontend bundle.
- [ ] The browser Network tab shows requests to `functions.supabase.co`, not `googleapis.com`.
- [ ] AI responses are successfully received and update the UI state.