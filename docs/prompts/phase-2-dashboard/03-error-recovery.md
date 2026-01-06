# Prompt 03: Dashboard Error Recovery

**Role:** Senior Frontend Engineer (Stability focus)
**Task ID:** P2-006
**Objective:** Implement graceful degradation and recovery for sync failures.

---

### A) Description
Real-time systems can fail. This task ensures the executive dashboard remains useful even during network instability or rate-limiting events.

### B) Purpose & Goals
- [ ] Implement a subtle "Offline / Reconnecting" indicator in the left panel.
- [ ] Handle 429 (Rate Limit) errors with a "Strategy Paused" narrative in the Intelligence panel.
- [ ] Implement a local operation queue so task toggles are synced once the connection returns.
- [ ] Add "Retry" buttons to individual cards that fail to fetch.

### C) Logic & Constraints
- **Retry Logic:** Exponential backoff (1s, 2s, 4s, 8s).
- **Feedback:** Error messages must use the editorial consultant tone (e.g., "Strategic link interrupted. Re-establishing...").

### D) Success Criteria
- [ ] The app does not crash or show raw console errors on disconnect.
- [ ] User can continue working (read-only) while offline.
- [ ] Reconnection triggers an immediate "Catch-up" sync.