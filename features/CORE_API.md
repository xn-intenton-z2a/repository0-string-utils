# CORE_API

Summary
Ensure the library exports all required string utilities as named exports from src/lib/main.js and defines standard robustness rules for string inputs.

Specification
- Export the following named functions from src/lib/main.js: slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein.
- Robustness rules: for all functions that accept textual input, treat null or undefined as the empty string. For functions that compute numeric results (levenshtein) treat null/undefined as empty string inputs and return numeric distances.
- No runtime dependencies.

Files to change
- src/lib/main.js: add/organise exports
- tests/unit/core-api.test.js: tests that assert exports exist and basic null-handling
- README.md: add API index and usage example list

Acceptance Criteria
- src/lib/main.js exports the ten named functions listed above.
- A unit test asserts that calling each text function with null returns an empty string and that levenshtein(null, null) returns 0.
- escapeRegex is present and escapes standard regex special characters.

Notes
This feature is meta: it verifies the public surface and common behaviour expected by other features and tests.