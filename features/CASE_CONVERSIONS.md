# CASE_CONVERSIONS

Description

Define string case conversion utilities and expose them from src/lib/main.js. This feature implements three named functions: camelCase, kebabCase, and titleCase. Each function accepts a string (or null/undefined) and returns a normalized string handling Unicode and common separators (spaces, underscores, hyphens).

Behavior

- camelCase: Convert input to lower-first camel case by splitting on non-alphanumeric boundaries, removing separators, and capitalising each subsequent word, preserving Unicode characters.
- kebabCase: Convert input to lowercase words separated by hyphens; collapse multiple separators; strip leading/trailing separators; remove non-alphanumeric except Unicode letters/numbers.
- titleCase: Capitalise the first letter of each word (Unicode-aware), lowercasing the rest of the word; words are split on whitespace and common separators.

API

Export named functions from src/lib/main.js: camelCase(input), kebabCase(input), titleCase(input).

Edge cases

- If input is null or undefined, return empty string.
- Preserve non-ASCII letters (e.g., accented characters) when casing.
- Collapse consecutive separators into a single separator for kebabCase.

Acceptance criteria

1. camelCase("foo-bar-baz") == "fooBarBaz"
2. kebabCase("Hello World!") == "hello-world"
3. titleCase("hello WORLD") == "Hello World"
4. camelCase(null) == "" and kebabCase(undefined) == ""
5. Functions are exported as named exports from src/lib/main.js and have unit tests covering the above examples and Unicode cases.
