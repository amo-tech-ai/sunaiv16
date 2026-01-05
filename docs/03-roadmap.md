# Execution Roadmap: Sun AI Agency

## 1. Roadmap Overview
This roadmap outlines the evolution of the Sun AI Agency platform from its current wizard-driven prototype to a production-ready consulting ecosystem. The guiding principles are **sophistication, stability, and executive trust.**

## 2. Phase 1 — Core Stability
Focuses on technical reliability and polishing the high-end consultative experience.

| Phase | Focus | Deliverables | Dependencies | Status |
| :--- | :--- | :--- | :--- | :--- |
| **1.1** | **State Persistence** | LocalStorage/Session backup for Wizard progress | Browser Storage API | Planned |
| **1.2** | **Error Resilience** | Graceful retry logic for Gemini API failures | geminiService update | Planned |
| **1.3** | **Visual Polish** | Micro-interactions for the "Intelligence" panel | Framer Motion / CSS | In Progress |
| **1.4** | **Input Validation** | Advanced URL and industry-specific validation | Standard Regex | Planned |

## 3. Phase 2 — Client Execution
Transitioning the dashboard from a high-fidelity placeholder to an actionable tool.

| Phase | Focus | Deliverables | Dependencies | Status |
| :--- | :--- | :--- | :--- | :--- |
| **2.1** | **Task Engine** | Conversion of Roadmap outcomes into trackable tasks | Dashboard Backend | Planned |
| **2.2** | **Strategy Export** | PDF/Editorial export of the 90-day plan | jspdf / html2canvas | Planned |
| **2.3** | **Context Locker** | Multi-business support (Switch between profiles) | Identity System | Planned |
| **2.4** | **Roadmap Edits** | Ability for users to refine the AI-generated plan | UI State Management | Planned |

## 4. Phase 3 — Advanced Intelligence
Leveraging Gemini 3's advanced reasoning for deeper consulting value.

| Phase | Focus | Deliverables | Dependencies | Status |
| :--- | :--- | :--- | :--- | :--- |
| **3.1** | **Thinking Mode** | Switch Screen 4/5 to high-budget "Thinking" models | gemini-3-pro-preview | Planned |
| **3.2** | **Continuous Chat** | Consultant Sidebar for real-time plan adjustments | Live API / Stream | Planned |
| **3.3** | **Search Grounding** | Live competitor research in Screen 1 | Google Search Tool | Planned |
| **3.4** | **Multimodal Audit** | Allow users to upload business docs for analysis | Gemini 1.5/3 Pro | Planned |

## 5. Success Metrics
-   **Wizard Completion Rate:** % of users who reach the Dashboard.
-   **Intelligence Coherence:** User rating of the "Readiness Score" accuracy.
-   **Time-to-Value:** Average duration from landing to Strategy generation.
-   **Session Retention:** Return rate to the Dashboard after 24 hours.

## 6. Risks & Dependencies
-   **Technical:** API Rate limits on Gemini 3 during high traffic.
-   **AI:** Hallucinations in industry-specific jargon or time-sink estimates.
-   **UX:** Overwhelming the user with too much data in the Right Panel.
-   **Data:** Maintaining privacy of sensitive business descriptions.