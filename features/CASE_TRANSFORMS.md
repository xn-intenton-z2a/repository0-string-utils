# CASE_TRANSFORMS

Summary

Provide three case transformation functions: camelCase, kebabCase, and titleCase. Each function is exported as a named function from src/lib/main.js and implemented as a pure, dependency-free utility.

Acceptance criteria

- camelCase of "foo-bar-baz" produces "fooBarBaz"
- camelCase of empty string, null, or undefined returns an empty string
- kebabCase of "Foo BarBaz" produces "foo-bar-baz"
- titleCase of "hello world" produces "Hello World"
- titleCase preserves and properly capitalises Unicode first graphemes; example: "élan coupe" -> "Élan Coupe"

Implementation notes

- Split input on non-letter/digit boundaries, normalise Unicode where appropriate, and use locale-aware case methods for initial letters.
- Add unit tests in tests/unit/case-transforms.test.js covering the examples and edge cases.
