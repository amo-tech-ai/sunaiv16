# 12: Screen 1 — Executive Context & Market Grounding

**Status:** 🟢 Production Ready  
**Agent:** *The Strategic Researcher*  
**Core Purpose:** Transform raw user input into a validated business context using real-world market data.

---

## 1. Executive Purpose
Screen 1 is the "Initialization" phase. We don't just collect data; we **verify** it. By the time the user clicks "Continue," our AI agents have already "read" their website and understood their competitive landscape.

## 2. AI Feature Orchestration

| Feature | Application in Screen 1 |
| :--- | :--- |
| **Google Search Grounding** | Verifies the company's existence, reviews, and market reputation. |
| **URL Context Tool** | Crawls the provided website to extract service offerings and brand voice. |
| **Deep Research** | Identifies the primary business model (e.g., "High-ticket B2B" vs "DTC Subscription"). |
| **Text Generation** | Streams the "Consultant's Briefing" in the right panel using `gemini-3-flash-preview`. |

---

## 3. The Multi-Step Agent Logic

1. **Step 1: Input Detection:** As soon as a URL and a substantive description (>30 chars) are entered, the session initializes.
2. **Step 2: Grounded Search:** The agent uses `googleSearch` to cross-reference the `companyName` with current market data.
3. **Step 3: Business Model Mapping:** The agent categorizes the business into one of the core industries (e.g., Real Estate, Luxury Fashion, SaaS).
4. **Step 4: Right-Panel Synthesis:** A real-time executive brief is streamed to the user, reflecting their own business data back to them with high-end strategic insights.

---

## 4. Real-World Execution Examples

### Example: Luxury Fashion ("Aura Couture")
- **User Input:** "Sustainability-focused luxury silk brand."
- **AI Research:** Crawls their Shopify store. Notes high-quality imagery but static product descriptions.
- **Intelligence Note:** "Aura Couture occupies the 'Quiet Luxury' niche. Digital footprint shows a gap in personalized styling orchestration. We have identified SKU management as a potential scale ceiling."

### Example: SaaS Startup ("LogiScale")
- **User Input:** "Mid-market logistics optimization platform."
- **AI Research:** Finds their LinkedIn page and crunchbase profile. Notes recent Series A funding.
- **Intelligence Note:** "LogiScale is entering a high-velocity growth phase. Current digital footprint suggests founder-led sales is reaching its limit. Transition to automated top-of-funnel is critical."

---

## 5. Success Metrics
- **Verification:** User sees their own brand name and real-world context reflected in the "Sun Intelligence" panel.
- **Trust:** The user realizes the system is "already working" before they even finish the wizard.

---
*Created by Sun AI Architectural Council*