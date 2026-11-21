---
description: Run unit tests, production build check, and verify ScamShield core flows
---
1. Run `npx vitest run` and fix any failing heuristic scoring or URL extraction assertions.
2. Run `npm run build` and resolve any import, JSX, or Tailwind bundling warnings/errors.
3. Confirm all 4 demo presets produce accurate risk scores and non-empty explanations.