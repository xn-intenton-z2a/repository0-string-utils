# CASE_CONVERSIONS

Summary
Implement camelCase, kebabCase and titleCase functions and export them from src/lib/main.js.

Specification
- All functions accept null or undefined and return an empty string in that case.
- Word boundaries: whitespace, underscore, hyphen and punctuation are treated as separators; collapse multiple separators.
- camelCase: lower-case the first word, capitalise the first letter of subsequent words, remove separators.
- kebabCase: lower-case all words and join with single hyphens, trimming extraneous hyphens.
- titleCase: capitalise the first letter of each word and lower-case the rest of each word.
- Preserve Unicode letters; operate at codepoint level rather than byte level.

Acceptance Criteria
- camelCase("foo-bar-baz") -> "fooBarBaz"
- kebabCase("Hello World") -> "hello-world"
- titleCase("hello WORLD") -> "Hello World"
- Leading, trailing and repeated separators are handled correctly.

Testing
- tests/unit/case-conversions.test.js should cover common separators, Unicode words, and empty/null inputs.
