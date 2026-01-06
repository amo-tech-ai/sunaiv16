# Prompt 06: Operational Control (Rate Limiting)

**Role:** Systems Architect
**Task ID:** P3-006
**Objective:** Protect API costs and prevent abuse via server-side throttling.

---

### A) Description
Every AI run costs money. This task implements the `checkRateLimit` logic in the Edge Functions to ensure a single organization doesn't exceed 100 strategic runs per hour.

### B) Purpose & Goals
- [ ] Enable the `ai_run_logs` table to track usage per `org_id`.
- [ ] Implement the `429 Too Many Requests` response logic in the Edge Function shared utility.
- [ ] Design a "Strategic Capacity" UI state for the frontend to handle rate-limited responses.

### C) Success Criteria
- [ ] Attempting to run 101 AI calls in an hour results in a graceful "Strategic Pause" message.
- [ ] Usage is logged accurately in the database.