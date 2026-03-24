# CASE_TRANSFORMS

Summary
Provide three related case transformation functions: camelCase, kebabCase, and titleCase. These are small utilities to normalize word separators and casing.

API
Exported functions:
- camelCase(input) -> string
- kebabCase(input) -> string
- titleCase(input) -> string

Behavior
- Accept null/undefined and return empty string.
- Treat any sequence of spaces, underscores, dots, and hyphens as word boundaries.
- Preserve Unicode letters; only alter ASCII casing where applicable.
- camelCase: lower first word then capitalize subsequent word initials and remove separators. Example: foo-bar-baz -> fooBarBaz
- kebabCase: lower-case all words and join with hyphens. Example: Foo Bar -> foo-bar
- titleCase: Capitalize first character of each word and lower-case the rest. Example: hello world -> Hello World

Acceptance criteria
- camelCase foo-bar-baz -> fooBarBaz
- kebabCase Foo Bar -> foo-bar
- titleCase hello world -> Hello World
- All functions return empty string for null/undefined input
- Exported from src/lib/main.js and covered by tests in tests/unit/case-transforms.test.js

Implementation notes
- Implement helper to split words by separators to reuse across functions
- Add tests for Unicode input and mixed separators
- Update README with examples for each function