# Project Rules: ScamShield (PS01 - Prompt Wars)

## Tech Stack & Commands
- Framework: React 18 + Vite + Tailwind CSS + Lucide React icons
- Test Runner: Vitest (`npx vitest run`)
- Production Build Check: `npm run build`

## Strict Invariants
1. **Offline-First Guarantee:** The app MUST work 100% client-side with zero required API keys. Put all scam detection, URL parsing, and risk scoring in `src/utils/urlParser.js` and `src/utils/scamAnalyzer.js`.
2. **Graceful AI Hook:** Keep UI components strictly presentational (no regex rules or scoring weights inside JSX).
3. **Self-Verification Gate:** After creating or editing files in `src/utils/` or `src/components/`, run `npx vitest run` and `npm run build` to confirm zero errors.
4. **UI Standard:** High-contrast dark cybersecurity theme (`#0B1120` canvas, `#111827` cards), responsive mobile/desktop layout, Emerald/Amber/Red risk badges, and an "Elder-Friendly Simple Mode" toggle.