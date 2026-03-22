# CASES

Summary
Implement casing helpers: camelCase, kebabCase and titleCase to convert human-readable strings between common naming conventions.

Specification
- camelCase(input: string): string — convert separators (spaces, hyphens, underscores) and case variations into lowerCamelCase. Null/undefined -> empty string.
- kebabCase(input: string): string — produce lowercase-hyphen-separated output. Null/undefined -> empty string.
- titleCase(input: string): string — capitalise the first letter of each word and lower-case the rest.

Examples
- camelCase "foo-bar-baz" -> "fooBarBaz".

Files to change
- src/lib/main.js: add camelCase, kebabCase, titleCase
- tests/unit/cases.test.js: tests for each function including separators, mixed case, and null input
- README.md: usage examples

Acceptance Criteria
- camelCase("foo-bar-baz") returns "fooBarBaz".
- kebabCase("Hello World") returns "hello-world".
- titleCase("hello world") returns "Hello World".
