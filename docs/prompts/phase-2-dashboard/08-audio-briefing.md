# Prompt 08: Narrative Audio Briefing

**Role:** Senior AI UX Architect
**Task ID:** P2-002
**Objective:** Implement the "Listen to Strategy" feature using Gemini TTS.

---

### A) Description
Premium executive experience for founders on the move. This task converts the Right Panel intelligence into a calm, professional spoken briefing.

### B) Purpose & Goals
- [ ] Add a minimalist "Listen to Briefing" button in the Dashboard header.
- [ ] Call `gemini-2.5-flash-preview-tts` to generate a 60-90 second briefing script based on current dashboard state.
- [ ] Implement the PCM decoding logic for gapless playback.
- [ ] Voice Config: Use `Zephyr` or `Kore` for a sophisticated consultant tone.

### C) Technical Implementation
- **Modality:** `Modality.AUDIO`.
- **Decoding:** Follow the PCM raw bytes decoding pattern (AudioContext).
- **Controls:** Minimalist Play/Pause/Stop floating bar.

### D) Success Criteria
- [ ] Audio starts playing within 3 seconds of click.
- [ ] Briefing captures: Current Phase, Last 3 Tasks Done, 1 Critical Risk.
- [ ] Background playback: Audio continues if the user switches dashboard tabs.