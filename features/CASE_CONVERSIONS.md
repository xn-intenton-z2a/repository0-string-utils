# CASE_CONVERSIONS

# Overview

This feature provides three related utilities: camelCase, kebabCase and titleCase. All functions accept strings with spaces, underscores, hyphens and other separators; they are Unicode-aware and handle leading/trailing separators gracefully. The functions return an empty string for null/undefined inputs.

# Acceptance Criteria

- camelCase of "foo-bar-baz" produces "fooBarBaz".
- kebabCase of "Foo BarBaz" produces "foo-bar-baz".
- titleCase of "hello world" produces "Hello World".
- camelCase(null) returns an empty string.

# Tests

- Unit tests cover mixed separators, multiple adjacent separators, Unicode tokens, leading/trailing separators and empty inputs.

# Implementation Notes

- Tokenize using a Unicode-aware word separator pattern, lower-case tokens as appropriate, and apply the standard casing rules: first token lowercased for camelCase, subsequent tokens capitalised; kebabCase joins lowercased tokens with hyphens; titleCase capitalises first letter of each token.