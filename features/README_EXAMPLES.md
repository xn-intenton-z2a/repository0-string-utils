# README_EXAMPLES

Overview
Ensure repository README contains concise usage examples for each exported function and references unit tests. This feature ensures the mission acceptance criterion requiring README documentation is met.

Acceptance criteria
- README includes one-line example usage and expected result for each exported function: slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, and levenshtein
- README examples match the unit test examples (consistency)
- README mentions handling of null/undefined and Unicode edge cases

Implementation notes
- Update README.md in the project root with a short Examples section listing each function and a sample input -> expected output
- Keep examples terse and machine-checkable (so tests can copy the strings if needed)

Tests
- Unit tests and manual inspection should confirm README contains the expected example strings.
