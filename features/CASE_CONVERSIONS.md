# CASE_CONVERSIONS

## Summary
Specification for three case conversion utilities: camelCase, kebabCase and titleCase.

## Description
Provide deterministic, Unicode-aware case conversion helpers exported from src/lib/main.js.

- camelCase: convert a string with spaces, underscores, or punctuation into lowerCamelCase. Preserve non-ASCII characters and remove empty tokens.
- kebabCase: convert a string into lowercase hyphen-separated tokens suitable for URLs and filenames; strip punctuation except hyphens and collapse whitespace.
- titleCase: capitalise the first letter of each word and lower-case the rest of the word where appropriate, preserving Unicode character semantics.

All functions must treat null or undefined as an empty string and return an empty string for empty input.

## Acceptance Criteria
- camelCase: input foo-bar-baz produces fooBarBaz
- camelCase: input Foo  bar produces fooBar
- kebabCase: input Hello World! produces hello-world
- titleCase: input hello world produces Hello World
- Each function returns empty string for null, undefined, or empty string inputs
- Unicode characters are preserved and operated on with correct case mappings

## Implementation Notes
- Follow patterns in library/CASE_CONVERSIONS.md for tokenisation and Unicode handling
- No runtime dependencies; implement using standard JS String and RegExp

## Tests
- Provide unit tests covering normal inputs, multiple separators, leading/trailing separators, null/undefined, and non-Latin characters.
