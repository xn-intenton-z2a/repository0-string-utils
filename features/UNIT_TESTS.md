# UNIT_TESTS

Overview
Add comprehensive unit tests that verify all 10 string utility functions exported from src/lib/main.js. Tests must cover normal behavior, edge cases (empty string, null, undefined), Unicode handling, and the specific rules described in the mission and existing feature specs.

Test plan
- Provide unit tests under tests/unit/ that import the named exports from src/lib/main.js and exercise each function with multiple assertions.
- Slugify: assert slugify("Hello World!") === "hello-world".
- Truncate: assert truncate("Hello World", 8) === "Hello…" using the default suffix; assert provided suffix is used when supplied.
- camelCase: assert camelCase("foo-bar-baz") === "fooBarBaz" and null/undefined returns "".
- kebabCase: assert kebabCase("Hello World") === "hello-world" and separators collapse correctly.
- titleCase: assert titleCase("hello WORLD") === "Hello World".
- wordWrap: assert wordWrap("The quick brown fox jumps over the lazy dog", 10) splits into lines "The quick", "brown fox", "jumps over", "the lazy", "dog"; a single very long word stays on its own line.
- stripHtml: assert stripHtml("a &amp; b <strong>bold</strong>") === "a & b bold" and named/numeric entities are decoded.
- escapeRegex: assert escapeRegex("a.b*c?") === "a\\.b\\*c\\?" and all regex metacharacters are escaped.
- pluralize: assert pluralize("box") === "boxes", pluralize("party") === "parties", pluralize("knife") === "knives", pluralize("car") === "cars".
- levenshtein: assert levenshtein("kitten","sitting") === 3 and levenshtein treats null/undefined as empty string.

Edge cases
- Every function that returns a string must return an empty string for null or undefined input.
- Unicode inputs such as "café" are preserved and handled without throwing exceptions.
- Tests include very short and very long inputs to validate boundaries.

Acceptance Criteria
- Tests covering all 10 functions exist under tests/unit/ and can be run with npm test.
- All tests pass in CI locally when run with the repository test script.
- Assertions cover the exact expected outputs listed above and the edge cases.
