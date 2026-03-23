# CASE_CONVERSION

Status: IMPLEMENTED — Implemented in src/lib/main.js (see issue #90)

Summary

Provide camelCase, kebabCase, and titleCase functions exported from src/lib/main.js. Each function accepts a string and returns a transformed string. Null or undefined inputs return an empty string.

Specification

- camelCase: convert separators (spaces, underscores, hyphens) into lower camel case. Example separators and mixed-case input should be normalised.
- kebabCase: convert input into lowercase words separated by single hyphens. Collapse repeated separators.
- titleCase: capitalise the first letter of each word and lowercase the rest of the letters in each word.
- All functions should trim leading and trailing whitespace, collapse multiple separators, and handle Unicode letters.

Acceptance criteria

- camelCase of foo-bar-baz returns fooBarBaz
- kebabCase of Foo Bar returns foo-bar
- titleCase of hello world returns Hello World
- Null or undefined inputs return an empty string
- Functions correctly handle mixed separators and Unicode text

Notes

- Unit tests should include inputs with spaces, hyphens, underscores, mixed casing, and Unicode characters.
