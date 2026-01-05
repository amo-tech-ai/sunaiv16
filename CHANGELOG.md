# Changelog: Sun AI Agency

All notable changes to the Sun AI Agency platform will be documented in this file.

## [1.2.0] - Production Logic & Secure Orchestration
### Added
- **Supabase Edge Functions:** Implemented a full suite of server-side functions in `/supabase/functions` to handle sensitive AI logic and multi-tenant database writes.
    - `analyze-business`: Market research with Google Search grounding.
    - `generate-diagnostics`: Industry-specific audits with thinking budgets.
    - `recommend-systems`: High-stakes architecture mapping.
    - `assess-readiness`: Deep reasoning operational audits.
    - `generate-roadmap`: 90-day execution sequencing.
    - `task-generator`: Decomposing strategy into granular dashboard tasks.
    - `intelligence-stream`: Real-time executive narrative streaming.
- **Security Infrastructure:** Shared Supabase utility for JWT validation, organization membership checks, and RLS enforcement.
- **Global Language Guard:** Strict system instructions (Prompt 01) to ensure all AI communications remain professional, jargon-free, and executive-ready.
- **SVG Architecture Generator:** Dynamic generation of system blueprints within the wizard to visualize the technical logic.

### Changed
- Moved all Gemini API calls to server-side Edge Functions to protect API keys and ensure data integrity.
- Transitioned dashboard tasks and roadmap phases to a structured database schema (Supabase Strategy v2.2).

## [1.1.0] - Executive Dashboard & Advanced Intelligence
### Added
- **Executive Command Center:** A post-wizard dashboard featuring specialized tabs:
    - **Overview:** Strategic North Star and execution velocity metrics.
    - **Roadmap:** Interactive Gantt-lite visualization of the 90-day plan.
    - **Tasks:** Actionable item tracking with owner categorization (Founder vs AI).
    - **Systems:** Health monitoring and configuration status for deployed AI engines.
- **Gemini 3 Integration:** Upgraded all core agents to utilize Gemini 3 Pro and Flash capabilities.
    - **Search Grounding:** Live market verification in Step 1.
    - **Thinking Mode:** Allocated reasoning budgets (1k-4k tokens) for complex strategic steps (Readiness & Roadmap).
    - **Structured Output:** Mandatory JSON schema enforcement across all services.

### Improved
- **Streaming Narrative:** Implemented real-time intelligence streaming in the right panel via `generateContentStream`.
- **UI Aesthetics:** Finalized the "Charon/Editorial" visual language—warm neutrals, high-contrast typography, and structured white space.

## [1.0.0] - Core Strategic Wizard
### Added
- **Three-Panel Layout:** Established the foundational UI shell (Context / Work / Intelligence).
- **5-Step Strategic Discovery:**
    - **Step 1:** Business Context capture.
    - **Step 2:** Dynamic Industry Diagnostics.
    - **Step 3:** System Architecture selection.
    - **Step 4:** Readiness Audit with Radar Chart visualization.
    - **Step 5:** 90-Day Roadmap generation.
- **Persona Alignment:** Established the "Senior Executive Consultant" tone for all AI outputs.
- **Technical Documentation:** Comprehensive PRDs and technical maps in `/docs`.

### Infrastructure
- **React 19 Shell:** Optimized frontend orchestration.
- **Import Maps:** Modular dependency management via ESM.
- **Shared Types:** Robust TypeScript interfaces for the "Strategic Data Object."

---
*End of initial changelog.*
