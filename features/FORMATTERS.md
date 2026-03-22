# CI_GREEN

Overview
Stabilise unit tests and CI so the mission acceptance criteria depending on passing tests and documented examples can be validated. This feature focuses on ensuring npm test passes in CI and that coverage meets repository thresholds.

Behavior
- Investigate failing unit tests and fix issues in code or tests so that npm test (vitest) exits with success.
- Ensure test coverage meets the repository goals (min-line-coverage: 50%, min-branch-coverage: 30%) by adding or adjusting tests where necessary.
- Ensure the test scripts in package.json (test, test:unit) run deterministically in CI (node >=24) and that Playwright tests are gated behind test:behaviour when not required.

Acceptance criteria
- All unit tests pass locally using npm test and in CI when the test workflow runs.
- Coverage reported by vitest meets or exceeds 50% line coverage and 30% branch coverage.
- Any test flakiness is addressed (no intermittent failures observed across three consecutive CI runs for the changed tests).
- Open issues that tracked failing tests (for example issue #68) are referenced and closed when fixes are merged.

Notes
- Prefer small, surgical fixes to tests or library code; avoid large refactors.
- If increasing coverage requires only additional tests, add them under tests/unit using minimal inline fixtures.
- Keep CI changes limited to test config or timeouts; do not introduce third-party runtime dependencies.