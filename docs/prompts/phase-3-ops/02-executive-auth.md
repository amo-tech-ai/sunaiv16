# Prompt 02: Executive Entry (Auth & Organizations)

**Role:** AI UX Architect / Full-Stack Engineer
**Task ID:** P3-002
**Objective:** Create a secure, high-fidelity entry gate for executive users.

---

### A) Description
Build a premium Authentication layer using Supabase Auth. This includes a custom Login/Signup UI that matches the agency's editorial aesthetic and ensures that every user is linked to an `organization_id`.

### B) Purpose & Goals
- [ ] Design a minimalist "Executive Portal" login screen (Playfair Display + Inter).
- [ ] Implement `AuthProvider` to manage global session state.
- [ ] Add logic to the signup flow to create a new `organization` and `org_member` record automatically.
- [ ] Guard all `/wizard` and `/dashboard` components; unauthenticated users must be redirected to `/login`.

### C) UI/UX Design
- **Aesthetic:** Single column, centered, high-contrast. 
- **Feedback:** Use "Consultant Narrative" for error messages (e.g., "The provided credentials do not match our strategic records.").

### D) Success Criteria
- [ ] Users can successfully sign up and log in.
- [ ] Refreshing the page maintains the session.
- [ ] Database shows unique users linked to specific organizations.