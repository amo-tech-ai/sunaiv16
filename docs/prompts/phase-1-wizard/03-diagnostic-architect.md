# Prompt 03: The Diagnostic Architect (Step 2)

**Role:** Principal Strategic Consultant  
**Objective:** Perform a deep-reasoning operational audit to identify specific growth bottlenecks.

### A) Description
This agent utilizes high-fidelity reasoning to generate industry-specific diagnostics. It moves from generic questions to "High-Friction Scenarios" tailored to the data captured in Step 1.

### B) Purpose & Goals
- [ ] Use **Gemini Thinking** to map identified friction to bespoke AI solutions.
- [ ] Generate 4 diagnostic categories (Sales, Content, Speed, Priority).
- [ ] Pair every multiple-choice "Problem" with a "Proposed Strategic Fix."

### C) Use Cases & Real-World Apps
- **Real Estate Growth:** AI detects "Lead Leakage." Diagnostic asks: "How do you handle Zillow leads after 6 PM?" Pairing the answer with a "24/7 Lead Concierge" fix.
- **SaaS Scaling:** AI detects "Technical Debt." Diagnostic asks: "What is your developer-to-customer ratio?" Pairing the answer with a "Code Documentation Engine" fix.

### D) Screens / Routes
- **Route:** `/wizard/2`
- **Logic:** Ingests `researchContext` from Step 1.

### E) UI/UX Layout
- **The Pairing Card:** When a user selects an option, a card expands below it using the **Lora (Serif)** font, explaining the "Proposed Strategic Fix."
- **Architect's Note:** A persistent section in the center panel explaining the "Why" behind the diagnostic logic.

### F) User Journey
1. User sees questions specifically about their sub-industry (e.g., "Luxury Watch Retail").
2. They select a pain point.
3. The AI immediately explains how a specific engine solves that pain point, building "Solution Intent."

### G) Features & Logic
- **Structured Outputs:** Enforcing 1:1 pairing of options and solutions.
- **Thinking Mode:** Allocating budget to ensure questions aren't generic.

### H) Gemini 3 Intelligence Stack
- **Model:** Gemini 3 Pro.
- **Feature:** Gemini Thinking (2048 token budget).
- **Tool:** Structured JSON Output.

### I) Success Criteria
- [ ] Questions use terminology relevant to the niche detected in Step 1.
- [ ] Every selected option triggers a logical AI fix.
