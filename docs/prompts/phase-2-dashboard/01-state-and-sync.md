# Prompt 01: Dashboard Live Data Sync

**Role:** Senior Full-Stack Engineer / Real-time Systems Architect
**Task ID:** P2-001
**Objective:** Wire the Dashboard UI to Supabase using Realtime subscriptions.

---

### A) Description
The dashboard currently relies on local React state. This task implements Supabase Realtime listeners so that changes to tasks, roadmap phases, or system statuses are reflected instantly across all executive devices without a page refresh.

### B) Purpose & Goals
- [ ] Establish a single, persistent Supabase Realtime connection for the dashboard.
- [ ] Implement `useRealtimeSync` hook to manage subscriptions to `tasks`, `roadmaps`, and `systems`.
- [ ] Implement "Optimistic Updates" for task toggling to maintain the premium, snappy feel.
- [ ] Ensure Row Level Security (RLS) is respected so users only receive their organization's data.

### C) Logic & Workflows
- **Trigger:** Dashboard mount initiates connection.
- **Action:** Listen to `INSERT`, `UPDATE`, `DELETE` on relevant tables.
- **Workflow:** When a task is updated on a mobile device, the desktop dashboard's "Velocity" KPI must recalculate in real-time.

### D) Success Criteria
- [ ] Toggling a task on one tab/device updates all other instances < 500ms.
- [ ] No "Data Flashing" occurs when the subscription initializes.
- [ ] Manual database edits in the Supabase console appear instantly in the UI.