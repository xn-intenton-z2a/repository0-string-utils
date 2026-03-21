# CASE_CONVERSIONS

Overview
Implement three case conversion utilities: camelCase, kebabCase, and titleCase. Each function accepts a string or null/undefined and returns an empty string for null/undefined. Functions must accept Unicode and treat any sequence of non-letter-or-digit as word separators.

Specification
- camelCase: split on whitespace, hyphens, underscores and other punctuation; lowercase the first token and capitalize the first letter of subsequent tokens; remove other punctuation.
- kebabCase: produce lowercase words separated by single hyphens; collapse multiple separators into a single hyphen; trim hyphens at ends.
- titleCase: capitalize the first letter of each word and lowercase the rest of the word; treat separators as word boundaries.

Acceptance Criteria
- The library exports camelCase, kebabCase, titleCase from src/lib/main.js.
- camelCase of "foo-bar-baz" produces "fooBarBaz".
- camelCase of empty string, null, or undefined produces empty string.
- kebabCase of "Hello World" produces "hello-world".
- titleCase of "hello WORLD" produces "Hello World".
- Functions handle Unicode input such as "café au lait" without throwing exceptions.
