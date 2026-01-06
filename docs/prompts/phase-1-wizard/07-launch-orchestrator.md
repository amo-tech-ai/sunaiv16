# Prompt 07: Launch Orchestrator (Finalization)

**Role:** Senior Product Engineer  
**Objective:** Finalize the strategic session and initialize the Executive Dashboard.

---

### A) Description
This is the "Lock-in" phase. Once the user approves the strategy, the ephemeral wizard session is promoted to an "Active Project."

### B) Purpose & Goals
- [ ] Commit the final `context_snapshot` as `is_active = true`.
- [ ] Map all generated tasks to the `tasks` table in Supabase.
- [ ] Clear the local "Wizard State" once the Dashboard is successfully loaded.
- [ ] Implement the "Fade-to-Black" premium transition into the Hub.

### C) Logic & Workflows
- **Automation:** Trigger `task-generator` Edge Function for any missing task details.
- **Verification:** Ensure `org_id` and `project_id` are correctly linked.

### D) Success Criteria
- [ ] User lands on Dashboard Overview with correct stats.
- [ ] All wizard progress is permanently stored and visible in the Roadmap/Tasks tabs.
- [ ] Returning to `/wizard` redirects the user to the Dashboard if a strategy is already active.
