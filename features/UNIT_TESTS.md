# UNIT_TESTS

Summary

Provide a deterministic unit test suite that verifies each function's behaviour including the mission acceptance examples and edge cases.

Test structure

- Single test file tests/unit/main.test.js is acceptable and recommended for simplicity.
- Tests must be runnable with npm test and make explicit equality assertions.

Required test cases (each must be present)

- slugify("Hello World!") => "hello-world"
- truncate("Hello World", 8) => "Hello…"
- camelCase("foo-bar-baz") => "fooBarBaz"
- kebabCase("Hello World") => "hello-world"
- titleCase("hello world") => "Hello World"
- wordWrap("a b c", 1) => "a\nb\nc"
- stripHtml("<b>Bold</b>") => "Bold"
- stripHtml("<p>Hello &amp; welcome</p>") => "Hello & welcome"
- escapeRegex("a+b(c)") => "a\\+b\\(c\\)"
- pluralize("box") => "boxes"
- pluralize("party") => "parties"
- pluralize("leaf") => "leaves"
- levenshtein("kitten", "sitting") => 3
- Edge cases: null/undefined for several functions return empty string and do not throw
- Unicode: examples include accented characters and emoji and assert preservation where appropriate

Coverage goal

- Aim for line coverage >= 50% as a minimum project goal.

Acceptance criteria

- tests/unit/main.test.js contains the concrete test cases above and asserts exact outputs.
- npm test runs the suite (CI will verify) and the suite is deterministic and self-contained.
