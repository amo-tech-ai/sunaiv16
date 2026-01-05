# PRD: Core Foundation — Sun AI Agency

## 1. Executive Summary
Sun AI Agency is a premium AI-driven consulting platform that helps businesses design intelligent automation systems. The core product is a 5-step interactive "Strategic Wizard" that culminates in a custom 90-day execution roadmap.

## 2. Core User Experience
The platform utilizes a strict **Three-Panel Layout** to maintain context and provide real-time value.
- **Left (Context):** Progress tracking and summary of captured business data.
- **Center (Work):** Primary decision-making area with premium form controls.
- **Right (Intelligence):** The "Consultant's Feed" containing AI observations and logic.

## 3. Screen Requirements (Implemented)

### Screen 1: Business Context
- **Purpose:** Collect identity and foundational data.
- **Inputs:** Name, Company, Website, Industry, Description.
- **Logic:** Triggers `getBusinessIntelligence` call once industry is selected and description exceeds 20 characters.

### Screen 2: Industry Deep Dive
- **Purpose:** Diagnostic stage to identify friction points.
- **Logic:** Uses `getIndustrySpecificQuestions` to fetch dynamic titles and radio-option content specific to the user's sector.
- **Content:** Sales/Growth blockers, Manual work areas, Execution speed, and Top priorities.

### Screen 3: System Selection
- **Purpose:** Map identified problems to architectural systems.
- **Current State:** Hardcoded set of 5 systems (Growth, Content, Ops, Support, Analytics).
- **Interaction:** Multi-select (up to 3) with "Recommended" badges.

### Screen 4: Readiness Assessment
- **Purpose:** Reality check on the user's operational maturity.
- **Logic:** Triggers `getReadinessAssessment` to calculate a score (0-100) and provide critical feedback.

### Screen 5: Strategy Generation
- **Purpose:** Final strategic output.
- **Logic:** Triggers `getRoadmap` to generate a structured 3-phase, 90-day plan with specific outcomes per phase.

## 4. Technical Constraints
- **State:** Pure React state (no persistence on refresh).
- **AI Model:** `gemini-3-flash-preview` for all modules.
- **Outputs:** Strictly enforced JSON via `responseSchema`.
- **Persona:** Senior Executive Consultant (sophisticated, professional).