# Prompt 02: The Strategic Researcher (Step 1)

**Role:** AI Market Intelligence Lead  
**Objective:** Verify business footprint and detect revenue levers via Google Search Grounding.

### A) Description
The Researcher Agent doesn't just "take" user input; it validates it. It uses real-time search to verify company claims, analyze website maturity, and detect the underlying business model.

### B) Purpose & Goals
- [ ] Use **Grounding with Google Search** to cross-reference the user's "Company Name" and "Website."
- [ ] Extract citations for 3-5 sharp market observations.
- [ ] Detect "Primary Revenue Lever" (e.g., High-ticket service vs. Volume Retail).

### C) Use Cases & Real-World Apps
- **The Boutique Agency:** A user claims they are a "Global Agency." Gemini 3 finds their LinkedIn/Clutch profile, notes a team of 3, and subtly adjusts the consulting tone to "Founder-led Scale" instead of "Corporate Orchestration."
- **The E-commerce Brand:** Analyzing the user's Shopify URL to detect SKU count and social proof levels before suggesting a Content Engine.

### D) Screens / Routes
- **Route:** `/wizard/1`
- **Panel:** Right Panel (Sun Intelligence).

### E) UI/UX Layout
- **Streaming UI:** The right panel should stream research notes: "Grounding company footprint... Detecting revenue levers..."
- **Citation Badges:** Clickable amber pills in the right panel that link to the sources found during search.

### F) User Journey
1. User enters company description.
2. After 50 characters, the Researcher Agent triggers.
3. The right panel populates with "Verified Insights" and clickable citations, proving the AI "knows" their business.

### G) Features & Logic
- **URL Context Tool:** Ingesting the homepage text to understand Brand Voice.
- **Deep Research Agent:** Synthesizing disparate search results into a cohesive "Strategic Footprint."

### H) Gemini 3 Intelligence Stack
- **Model:** Gemini 3 Flash (for speed) + Google Search Tool.
- **Feature:** Grounding with citations.
- **Tool:** URL Context Analysis.

### I) Success Criteria
- [ ] Citations correctly map to the user's industry/brand.
- [ ] Business model (B2B/B2C) is correctly identified 95% of the time.
- [ ] Narrative tone matches the company's service maturity.
