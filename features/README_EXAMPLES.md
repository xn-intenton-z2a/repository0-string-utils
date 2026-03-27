# README_EXAMPLES

Summary
Ensure README.md documents every exported function with concise usage examples and links to the corresponding unit tests.

Specification
- For each function required by the mission include:
  - A one-line description of the function's purpose.
  - A single-line example invocation and the expected return value.
  - Notes on edge-case behaviour (null/undefined handling, Unicode remarks).
- Include the test command used to run unit tests for the project.
- Keep examples short and ensure they match unit tests exactly.

Acceptance Criteria
- README contains documented examples for slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize and levenshtein.
- Examples in README match the unit tests and acceptance criteria.

Testing
- Manual verification and ensure each example is exercised by at least one unit test where applicable.
