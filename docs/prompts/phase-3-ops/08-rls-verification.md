# Prompt 08: RLS Verification (Security Testing)

**Role:** Security Engineer / Database Administrator  
**Task ID:** P3-008  
**Objective:** Validate that Row Level Security (RLS) policies effectively isolate organization data and prevent cross-tenant leakage.

---

### A) Description
Before the platform is opened to public users, we must mathematically and operationally prove that Organization A cannot see Organization B's data. This task involves writing an automated verification script and performing a manual audit of the Supabase policy engine.

### B) Purpose & Goals
- [ ] Verify that `ENABLE ROW LEVEL SECURITY` is called on every table in the `public` schema.
- [ ] Implement a `security_audit` test suite that attempts to fetch data using a JWT from one organization while targeting the UUID of another.
- [ ] Confirm that the `service_role` key is restricted strictly to Edge Functions and never used in the frontend.
- [ ] Audit the `org_members` table to ensure that role-based access (Owner vs. Client) is enforced at the DB level.

### C) Logic & Workflow
- **The "Attacker" Test:** Create two test users in different organizations. Log in as User A. Attempt a `SELECT *` from `roadmaps` where `org_id` matches User B. The database must return 0 rows or a 403.
- **The "Clean Write" Test:** Ensure that `INSERT` operations into `wizard_answers` automatically fail if the provided `org_id` does not match the user's JWT membership.

### D) Success Criteria
- [ ] 100% of tables in the `public` schema have active RLS policies.
- [ ] Zero cross-tenant data leakage detected in the test suite.
- [ ] Documentation of the "Security Proof" is available for the Technical Due Diligence file.

### E) Production-Ready Checklist
- [ ] DB Performance: Ensure indexes exist on all `org_id` columns to prevent RLS-related slow-downs.
- [ ] Integrity: Every table (Tasks, Snapshots, Roadmaps) is verified.
