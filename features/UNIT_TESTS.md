# UNIT_TESTS

Summary

Provide a comprehensive, deterministic test suite that verifies each function's behaviour including normal cases, edge-cases, and the mission's acceptance examples. Tests must live in tests/unit/ and target exact expected outputs.

Test requirements

- One test file per function is acceptable, or a single file covering all functions; tests must be under tests/unit/ and runnable via npm test.

- For each function include tests for:
  - Typical inputs (normal sentences, punctuation)
  - Specified examples from the mission (slugify, truncate, camelCase, levenshtein)
  - Edge cases: null, undefined, empty string, Unicode, long words
  - Failure modes: ensure no exceptions are thrown for documented inputs

Concrete test cases (examples to include verbatim):
- slugify("Hello World!") => "hello-world"
- truncate("Hello World", 8) => "Hello…"
- camelCase("foo-bar-baz") => "fooBarBaz"
- kebabCase("Hello World") => "hello-world"
- titleCase("hello world") => "Hello World"
- wordWrap("a b c", 1) => "a\nb\nc"
- stripHtml("<b>Bold</b>") => "Bold"
- escapeRegex("a+b(c)") => "a\+b\(c\)"
- pluralize("box") => "boxes"; pluralize("party") => "parties"; pluralize("leaf") => "leaves"
- levenshtein("kitten", "sitting") => 3

Coverage and quality

- Aim for line coverage >= 50% as a minimum project goal; tests should be deterministic and avoid network or environment dependencies.
- Tests must assert specific string equality rather than loose matches.

Acceptance criteria

- Unit tests cover each function and include the concrete examples above.
- Running npm test exits with success (this is verified by CI / later transform).
