# Copilot / AI agent instructions for ai-recipe-generator

Purpose: provide targeted, actionable guidance so an AI coding agent can be immediately productive in this repository.

1. Big-picture architecture
- Frontend: Create React App (React 19) single-page app. Entrypoint: `src/main.tsx` -> `src/App.tsx`.
- Hosting/Cloud integration: the app depends on AWS Amplify (`aws-amplify`, `@aws-amplify/ui-react`). Look for Amplify-generated config in `src/aws-exports.js`.
- Data flow: UI collects ingredients in `App.tsx` and calls an Amplify data client via `generateClient()` (imported from `aws-amplify/data`). This implies server/backend stubs may be expected in an `amplify` folder (not present in repo).

2. Key files to inspect
- `package.json`: shows scripts (`npm start`, `npm test`, `npm run build`) and dependencies.
- `src/App.tsx`: central UI and main place for feature work; currently incomplete/has a stray character and imports a missing `../amplify/data/resource` type.
- `src/aws-exports.js`: Amplify config (if present) — required for real AWS integration.
- `public/index.html`: static HTML shell.

3. Developer workflows / commands
- Install dependencies: `npm install`
- Run dev server: `npm start` (CRA default, opens http://localhost:3000)
- Run tests: `npm test`
- Build production bundle: `npm run build`

4. Project-specific conventions & caveats
- Mixed JS/TSX: repository contains both `.js` and `.tsx` files. Follow existing typing only where present; prefer minimal, local TypeScript additions.
- Amplify integration is referenced but Amplify backend code is missing. Before implementing Amplify-backed features, verify `src/aws-exports.js` exists or generate it with the Amplify CLI. If backend artifacts are absent, create a local mock for `generateClient()` during development.
- UI Auth: `@aws-amplify/ui-react`'s `Authenticator` is used; keep authentication UI within `App.tsx` and prefer the provided UI components rather than rewriting auth flows.

5. Patterns & examples from codebase
- Data client usage (in `src/App.tsx`):
  - `import { generateClient } from "aws-amplify/data"`
  - Ensure calling code handles missing client (fallback to mock) and is async-aware.
- Types: `App.tsx` imports `type { Schema } from "../amplify/data/resource"`. If adding types, mirror this pattern and colocate small types near the consumers when backend types are unavailable.

6. Integration points & external dependencies
- AWS Amplify: `aws-amplify`, `@aws-amplify/ui-react` — any change touching auth or data should consider Amplify config and the possibility of missing `amplify` artifacts.
- Testing libraries: `@testing-library/react`, `@testing-library/jest-dom` — follow testing patterns in `src/App.test.js` when adding tests.

7. Troubleshooting notes for agents (do these first)
- If `npm start` fails with module-not-found for `../amplify/...`, either add a small mock module under `src/amplify/` to let the app run, or guard imports with dynamic import + try/catch.
- `src/App.tsx` currently contains a stray `c` and an unfinished implementation; avoid committing broken UI — fix or stub before running the dev server.

8. Recommended first tasks for an agent
- Fix `src/App.tsx` syntax error and add a minimal working flow that uses a mock `generateClient()` if the real client is missing.
- Add a short unit test demonstrating the main UI interaction (use existing testing setup).
- Add a short comment in `src/aws-exports.js` (or create a stub) documenting how to replace it with real Amplify config.

9. Communication rules for generated changes
- Keep PRs small and focused: one atomic change per PR (e.g., "fix App.tsx runtime error" or "add mock amplify client").
- When adding Amplify-backed features, include clear instructions in the PR about required Amplify CLI steps to reproduce the backend (if applicable).

If anything here is unclear or you'd like the drafted file to emphasize different areas (e.g., more testing guidance, CI commands, or Amplify setup steps), tell me which sections to expand. 
