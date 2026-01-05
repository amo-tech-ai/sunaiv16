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
| **Text Generation** | Streams the "Consultant's Briefing" in the right panel. |

---

## 3. The Implementation Prompt (Internal)

> **AGENT_TASK:** *The Strategic Researcher*  
> **INPUT:** `companyName`, `industry`, `websiteUrl`, `businessDescription`.  
> **ACTION:** 
> 1. Use `googleSearch` to find the company's digital footprint.
> 2. Analyze the `websiteUrl` to identify current "Manual Drag" indicators (e.g., lack of AI chat, static landing pages).
> 3. Synthesize a "Market Briefing" for the Right Panel.
> **OUTPUT_STRUCTURE:**
> - `detectedModel`: (e.g., "B2B SaaS focused on mid-market logistics")
> - `marketObservations`: (3 sharp insights about their specific niche)
> - `readinessBaseline`: (Preliminary assessment based on digital footprint)

---

## 4. Real-World Execution Examples

### Example: Real Estate Agency ("Haven Realty")
- **User Input:** "Luxury boutique agency in Miami."
- **AI Research:** Finds their Zillow profile and Instagram. Sees they have 50+ listings but low engagement on social.
- **Intelligence Note:** "Haven Realty has significant inventory velocity but lacks automated lead nurture. Grounding suggests Miami luxury buyers expect 24/7 concierge response."

### Example: Fashion Brand ("Aura Couture")
- **User Input:** "Sustainability-focused luxury silk brand."
- **AI Research:** Crawls their Shopify store. Notes high-quality imagery but static product descriptions.
- **Intelligence Note:** "Aura Couture occupies the 'Quiet Luxury' niche. Digital footprint shows a gap in personalized styling orchestration."

---

## 5. Success Metrics
- **Verification:** User sees their own brand name and real-world context reflected in the "Sun Intelligence" panel.
- **Trust:** The user realizes the system is "already working" before they even finish the wizard.

---
*Created by Sun AI Architectural Council*