# Prompt 07: Systems Vitals & Health Monitoring

**Role:** Operational AI Engineer / Monitoring Expert
**Task ID:** P2-007 & P2-009
**Objective:** Replace hardcoded labels with real (or simulated) health vitals.

---

### A) Description
The Systems tab must transition from a list of "Deployment" labels to a real-time monitor. This task implements integration status and health checks.

### B) Purpose & Goals
- [ ] Replace "In Deployment" static badges with a status enum: `Operational`, `Degraded`, `Offline`, `Configuring`.
- [ ] Implement a `check-system-health` Edge Function that pings simulated system endpoints.
- [ ] Display "Last Heartbeat" timestamps on each system card.
- [ ] Flag "Integration Errors" with direct instructions on how to fix (e.g., "Awaiting API Key").

### C) Logic
- **Simulated Health:** Every 60 seconds, "ping" the system. If it's a new project, show `Configuring`. If tasks are 50% done, show `Operational`.
- **UI:** Status dot (Green/Amber/Red/Gray).

### D) Success Criteria
- [ ] Status changes in the database update the UI instantly (Realtime).
- [ ] Critical system failures trigger a "Red Alert" in the Intelligence panel.