# Roadmap V2: Screen-by-Screen Execution Plan

## Phase 1: The "Live" Consultant (Streaming & Persona)
**Focus:** Fix the static feel of the current intelligence feed.
- **All Screens:** Implement `generateContentStream` for the Right Panel.
- **All Screens:** Add `systemInstruction` to every service call to ensure persona consistency.
- **Screen 3 Fix:** Implement AI-powered system recommendations instead of hardcoded cards.

## Phase 2: Deep Analysis (Thinking & Search)
**Focus:** Elevate the quality of insights.
- **Screen 1:** Add Google Search grounding to `getBusinessIntelligence`.
- **Screen 2:** Add Thinking Budget (2048) to `getIndustrySpecificQuestions`.
- **Screen 4:** Add Thinking Budget (4096) to `getReadinessAssessment`.
- **Screen 5:** Add Thinking Budget (2048) to `getRoadmap`.

## Phase 3: Infrastructure & Continuity
**Focus:** Stability and persistence.
- **State Management:** Implement LocalStorage backup for `UserData`.
- **Error Handling:** Add retry logic for API failures and graceful fallbacks.
- **Input Validation:** Advanced URL checking and description length requirements.

---

## Screen-by-Screen Detail

### [Screen 1] Business Context
- **Left Panel:** Step 1/5, Progress (20%).
- **Main Panel:** Core form fields.
- **Right Panel:** Live research feed (Streaming + Search results).
- **Logic:** Verification via Google Search; Identification of B2B/B2C model.

### [Screen 2] Industry Deep Dive
- **Left Panel:** Summary of Screen 1 info (Read-only).
- **Main Panel:** 4 Sections of diagnostic questions.
- **Right Panel:** Thinking-driven explanation of industry metrics.
- **Logic:** Dynamic question generation based on detected industry.

### [Screen 3] System Architecture
- **Left Panel:** Summary of top friction points from Screen 2.
- **Main Panel:** 5 AI-recommended cards (selected from a library of 10+).
- **Right Panel:** "Why we recommend these" logic (Mapping problems to systems).
- **Logic:** Multi-factor matching based on Screen 2 priorities.

### [Screen 4] Strategic Audit
- **Left Panel:** Step 4/5, Progress (80%).
- **Main Panel:** Score visualization + Gap analysis cards.
- **Right Panel:** Detailed consultant notes on data/process maturity.
- **Logic:** Thinking Mode analysis of operational bottlenecks.

### [Screen 5] Execution Roadmap
- **Left Panel:** Completion summary.
- **Main Panel:** 3-Phase vertical timeline.
- **Right Panel:** Final summary of the "Philosophy of Implementation."
- **Logic:** Strategic sequencing based on Readiness score.