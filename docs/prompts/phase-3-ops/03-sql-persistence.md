# Prompt 03: Relational Persistence (SQL Migration)

**Role:** Senior Database Engineer
**Task ID:** P3-003
**Objective:** Migrate the "Strategic Data Object" from localStorage to Supabase Postgres.

---

### A) Description
Executives need to start an audit on one device and finish on another. This task replaces the `useWizard` localStorage logic with real-time SQL persistence using the schema defined in `docs/supabase-plan.md`.

### B) Purpose & Goals
- [ ] Refactor `useWizard.ts` to perform `upsert` operations on the `wizard_answers` table.
- [ ] Implement a debounced auto-save (1000ms) for all form inputs.
- [ ] Fetch the latest `wizard_session` on app mount to rehydrate the UI.
- [ ] Ensure `org_id` is applied to every query to satisfy RLS policies.

### C) Success Criteria
- [ ] Clearing browser cache does not result in data loss for logged-in users.
- [ ] Strategic data is visible in the Supabase Table Editor.
- [ ] A "Saved" indicator pulses in the UI when the database update completes.