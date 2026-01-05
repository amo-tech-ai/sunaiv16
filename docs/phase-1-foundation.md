# Phase 1: Core Wizard Foundation

**Status:** 🟡 In Progress
**Timeline:** Weeks 1-4
**Priority:** P0 - Critical Path

---

## Progress Tracker
- [x] Three-Panel Layout Architecture
- [x] Step-based State Management
- [x] Screen 1: Business Context UI
- [x] Screen 2: Dynamic Industry Diagnostics
- [ ] Real-time Streaming Integration (Phase 2)
- [ ] Google Search Grounding (Phase 2)

---

## Executive Summary
Phase 1 establishes the "Consultant-Client" relationship through a high-fidelity 3-panel interface. It focuses on the transition from generic forms to a context-aware diagnostic tool. The system instructions are tuned to a "Senior Executive Consultant" persona—sophisticated, concise, and outcome-oriented.

---

## Analysis & Logic

### 1. The Three-Panel Intent
- **Left (Context):** Serves as a "Cognitive Mirror." By showing the user what the AI has already captured, it builds trust and allows the user to focus purely on the current decision.
- **Center (Work):** Adheres to "One Decision per Section." This reduces executive fatigue and ensures high data quality.
- **Right (Intelligence):** Acts as the "Digital Consultant." It doesn't just show data; it explains *why* the current step matters for the user's specific industry.

### 2. Screen 1: Business Context
The logic here is "Identity Verification." We capture the business essence.
- **Trigger:** AI analysis initiates only after a substantive description (>20 chars) to ensure the Gemini model has enough signal to detect a business model (e.g., "High-ticket B2B Service" vs "DTC Luxury Retail").

### 3. Screen 2: Industry Deep Dive
This is a "Diagnostic Filter." Generic questions like "What is your goal?" are replaced with industry-specific friction points.
- **Mechanism:** Screen 1 results drive the options in Screen 2. If "Real Estate" is detected, the options focus on "Lead response time" and "Listing velocity" rather than "Cart abandonment."

### 4. Visual Language
- **Colors:** Off-white (#FDFCFB) for calm; Deep charcoal (#1A1A1A) for authority.
- **Typography:** Playfair Display for headings (Luxury/Editorial); Lora for AI thoughts (Academic/Narrative).