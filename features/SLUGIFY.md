# SLUGIFY

Summary
Provide a slugify function that converts arbitrary text into a URL-friendly slug.

Specification
- Function name: slugify(input: string): string
- Behavior: If input is null or undefined, return empty string. Normalize Unicode using NFKD where appropriate, remove combining marks, then convert to lowercase. Replace any run of one or more whitespace or separator characters with a single hyphen. Remove characters that are not letters, numbers, or hyphens. Collapse multiple hyphens and trim hyphens from ends.

Examples
- slugify "Hello World!" should produce "hello-world".

Files to change
- src/lib/main.js: add slugify implementation and export
- tests/unit/slugify.test.js: unit tests for examples, empty input, and Unicode input
- README.md: usage example snippet for slugify

Acceptance Criteria
- slugify("Hello World!") returns "hello-world".
- slugify handles null and undefined by returning an empty string.
- Tests include a Unicode example and assert results are deterministic.
