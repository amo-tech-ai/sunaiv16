# Prompt 07: Observability (Monitoring)

**Role:** DevOps Engineer / SRE
**Task ID:** P3-007
**Objective:** Monitor production health, performance, and AI hallucination rates.

---

### A) Description
Establish visibility into how the app performs in the wild. This includes error tracking and performance metrics.

### B) Purpose & Goals
- [ ] Integrate Sentry (or equivalent) for frontend error tracking.
- [ ] Implement server-side logging for Edge Function latency and Gemini response times.
- [ ] Create a "Health Check" endpoint for the database and Edge Functions.

### C) Success Criteria
- [ ] Frontend errors are automatically reported with stack traces.
- [ ] Team receives alerts when the AI "Thinking" time exceeds 60 seconds.