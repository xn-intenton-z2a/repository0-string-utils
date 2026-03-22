# E2E_BEHAVIOUR

Overview
Provide a reproducible Playwright behaviour (E2E) test that exercises the web demo and asserts the library's rendered diff output. This ensures the browser demo, web integration, and formatted rendering remain correct as code evolves.

Behavior
- Add a Playwright test that opens src/web/index.html (or built docs page), feeds a deterministic before/after schema pair, waits for the demo output to render, and then asserts the page contains an expected change record (path and changeType) and visible classification label (breaking/compatible/informational).
- The test must be deterministic and not rely on network calls. Use in-repo fixtures or inline schema objects that the demo page can consume.
- The test file should live at tests/behaviour/render-diff.test.js and be runnable via npm run test:behaviour.

Acceptance criteria
- A Playwright test exists at tests/behaviour/render-diff.test.js and is checked into the repository.
- The test loads the demo page, triggers rendering for a known before/after schema pair, and asserts at least one specific change is present: for example, property added at /properties/active with classification "compatible" or a removed required property classified as "breaking".
- The test runs successfully locally with npx playwright test and in CI when invoked by the repository test script.
- The test does not perform network access; it uses inline fixtures or in-repo assets.

Notes
- Reference related issue: #66 (Playwright behaviour test for demo page).
- Keep the test small and focused: one scenario that covers rendering, formatting, and classification display is sufficient.