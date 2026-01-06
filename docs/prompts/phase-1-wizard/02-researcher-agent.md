# Prompt 02: The Strategic Researcher (Step 1)

**Role:** AI Systems Architect  
**Objective:** Ground the strategic audit in real-world market data using Google Search.

---

### A) Description
In Step 1, we don't just "take" the user's word. We verify it. This agent uses Google Search grounding to research the company's digital footprint, brand reputation, and core service offerings.

### B) Purpose & Goals
- [ ] Verify company identity and market category.
- [ ] Analyze the provided website URL for service maturity.
- [ ] Detect the "Primary Revenue Lever" (B2B SaaS, DTC Luxury, etc.).
- [ ] Provide 3-5 sharp strategic observations with citations.

### C) Logic & Tools
- **Model:** `gemini-3-flash-preview`
- **Tool:** `googleSearch`
- **Trigger:** Description length > 50 characters AND Website URL provided.

### D) Right Panel (Intelligence)
- **Streaming:** Real-time narrative: "Connecting to server... Found Shopify storefront... Competitor analysis suggests high churn in your niche..."
- **Citations:** List of extracted URLs from `groundingChunks`.

### E) User Journey
1. User enters "Luxe Threads" and "https://luxethreads.com".
2. Researcher Agent crawls the site.
3. Right panel reflects: "We've analyzed your storefront. Your current high-ticket B2C model is well-established, but lead capture is manual."

### F) Workflows
| Trigger | Action | Stored Where |
|---------|--------|--------------|
| Input Debounce | `analyze-business` Edge Function | `wizard_answers` (step-1) |
