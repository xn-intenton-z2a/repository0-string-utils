# TESTS_AND_DOCS

Status: IMPLEMENTED — Tests and documentation created and linked to src/lib/main.js (see issue #90)

Summary

Provide a feature that describes the test and documentation work required to complete the mission: comprehensive unit tests for every exported function and README updates with usage examples for each function.

Specification

- Tests: add unit tests in tests/unit/ that verify each function and all acceptance criteria in the mission and in the feature specs. Each exported function must have tests covering:
  - Typical use cases
  - Edge cases: empty string, null, undefined
  - Unicode examples where behaviour differs from ASCII
  - Behavioural examples listed in the acceptance criteria for each feature
- Documentation: update README.md with a Usage section showing short examples for each exported function demonstrating typical inputs and outputs.

Acceptance criteria

- Unit tests exist for slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, and levenshtein and cover the cases listed in the feature specs
- README contains a short example for each function and demonstrates the expected output for the canonical examples from the mission (for example, slugify Hello World! -> hello-world and levenshtein kitten vs sitting -> 3)
- All tests are runnable via the npm test script and fail if any of the acceptance criteria are not met

Notes

- Tests should be precise and assert exact returned strings where examples are specified.
- This feature coordinates writer work; implementation lives in src/lib/main.js and tests in tests/unit/.
