# UNIT_TESTS

Status: NEEDS EXPANDED TESTS (tests currently cover identity only)

Summary

Provide a deterministic unit test suite that verifies each exported function's behaviour including the mission acceptance examples and edge cases. Tests must live at tests/unit/ and be runnable with npm test.

Test file locations and structure

- Primary tests should live in tests/unit/string-utils.test.js (create this file if not present).
- Import the named functions from src/lib/main.js using:
  import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from "../../src/lib/main.js";

- Use vitest describe/test/expect and assert exact outputs with expect(...).toBe(...).

Required test cases (each must assert exact outputs)

- slugify("Hello World!") => "hello-world"
- truncate("Hello World", 8) => "Hello…"
- camelCase("foo-bar-baz") => "fooBarBaz"
- kebabCase("Hello World") => "hello-world"
- titleCase("hello world") => "Hello World"
- wordWrap("a b c", 1) => "a\nb\nc"
- wordWrap("supercalifragilisticexpialidocious", 10) => the long word appears alone on a single line (assert exact string equality)
- stripHtml("<b>Bold &amp; Brave</b>") => "Bold & Brave"
- escapeRegex("a+b(c)") => "a\\+b\\(c\\)"
- pluralize("box") => "boxes"
- pluralize("party") => "parties"
- pluralize("leaf") => "leaves"
- levenshtein("kitten", "sitting") => 3

Edge case tests (must be included)

- Passing null/undefined to string-producing functions returns "" and does not throw (test sample: slugify(null), truncate(undefined, 5), camelCase(undefined), stripHtml(null), escapeRegex(undefined), pluralize(null)).
- Unicode: slugify("Café au lait") === "cafe-au-lait"; wordWrap preserves emoji pairs and does not split surrogate pairs; levenshtein handles Unicode code points (e.g., levenshtein("a\u0301","á") === 0 if implementation normalises).

Test execution

- Running npm test must execute tests/unit/*.test.js and tests should be deterministic and self-contained.
- Aim for line coverage >= 50%.

Acceptance criteria (testable)

- A test file tests/unit/string-utils.test.js exists and contains the concrete test cases above with exact equality assertions.
- npm test runs the file and the tests pass against the implementation in src/lib/main.js.
- Null/undefined and Unicode edge cases are asserted and verified.

Implementation note

- Currently tests/unit/main.test.js only verifies identity exports; expand or add a focused test file for string utilities and ensure CI runs it (npm test already targets tests/unit/*.test.js).
- If tests fail due to environment (node version), document the failure and create a follow-up issue rather than changing implementation behaviour silently.
