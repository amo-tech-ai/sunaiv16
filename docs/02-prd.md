# Product Requirements Document: Sun AI Agency

## 1. Product Purpose
Sun AI Agency is a premium AI-powered consulting platform designed for founders, owners, and operators. It facilitates the design of intelligent business systems to improve revenue, sales/marketing performance, and operational efficiency. Unlike traditional SaaS tools, it acts as a "Senior Consultant," providing bespoke strategic roadmaps rather than pre-built software features.

## 2. User Journey
1.  **Onboarding (Wizard):** The user enters a 5-step interactive consultation.
2.  **Context Building:** AI researches and analyzes the business in real-time.
3.  **Diagnostic:** The user identifies industry-specific friction points.
4.  **Architectural Design:** AI recommends specific systems (e.g., Growth Engine, Ops Autopilot).
5.  **Assessment:** AI evaluates the business's readiness to implement these systems.
6.  **Strategic Output:** A 90-day execution roadmap is generated.
7.  **Dashboard:** The user enters a persistent client hub for execution management.

## 3. Wizard Screens (Core)

| Screen Name | Purpose | Left Panel | Main Panel | Right Panel | AI Interaction |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Business Context** | Establish business baseline | Progress & Step ID | Name, Company, Industry, Description | Market Observations | `gemini-3-flash-preview`: Model detection |
| **2. Deep Dive** | Identify friction points | Company/Industry context | Industry-specific diagnostic questions | Why these questions matter | `gemini-3-flash-preview`: Dynamic Title/Options |
| **3. System Selection** | Map problems to systems | Summary of issues | Selection of 5 distinct AI systems | Mapping logic & rationale | Recommended badge logic |
| **4. Readiness** | Gauge execution risk | Step progress | 0-100 score & feedback | Risk assessment notes | `gemini-3-flash-preview`: Scoring & Audit |
| **5. Strategy** | Finalize execution plan | Progress completion | 3-Phase 90-day Roadmap | Implementation sequencing | `gemini-3-flash-preview`: Roadmap generation |

## 4. Client Dashboard
The dashboard serves as the landing zone post-wizard.
-   **Systems Overview:** Lists the systems selected in Step 3 with their current implementation status.
-   **Tasks & Roadmap:** Provides high-level visibility into the upcoming 90-day phases.
-   **AI Recommendations:** Dynamic feed of strategic advice based on the readiness assessment.
-   **Note:** Current implementation utilizes high-fidelity placeholders for future task management features.

## 5. AI Architecture (Product View)
-   **Core Model:** `gemini-3-flash-preview` for high-speed analysis and dynamic UI generation.
-   **Grounding:** Utilizes system instructions to enforce a senior-consultant persona (sophisticated, no hype).
-   **Structured Output:** All AI responses are enforced via JSON schemas to ensure UI stability.
-   **Non-permitted AI behaviors:** The AI is not allowed to use technical jargon, reference specific SaaS tools unless requested, or provide generic "AI hype" marketing speak.

## 6. Automations & Logic
-   **Trigger-based Inference:** AI calls are triggered by UI transitions or substantial input changes (e.g., completing a description).
-   **Deterministic Fallbacks:** The UI provides pre-set industry options if the AI service experiences latency.
-   **Context Retention:** User data is passed through each step to provide a cumulative context for the final roadmap.

## 7. Non-Goals
-   **Not a Project Management Tool:** Sun AI Agency provides the strategy; it does not replace Jira or Asana.
-   **Not a Development IDE:** It does not write the code for the systems it recommends.
-   **No Generic Templates:** Every roadmap is generated dynamically based on specific user inputs.

## 8. Risks & Constraints
-   **Latency:** AI synthesis can take 2-5 seconds; managed via "Sun Intelligence" loading states.
-   **Accuracy:** Business model detection depends on description quality.
-   **State Persistence:** Current version relies on React state; page refresh resets the wizard context.