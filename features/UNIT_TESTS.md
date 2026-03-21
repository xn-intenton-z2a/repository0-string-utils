# UNIT_TESTS

Summary

Provide a deterministic unit test suite that verifies each exported function's behaviour including the mission acceptance examples and edge cases. Tests must live at tests/unit/main.test.js and be runnable with npm test.

Test file location

- tests/unit/main.test.js

Test structure and requirements

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
- wordWrap("supercalifragilisticexpialidocious", 10) => the long word appears alone on a single line (assert with .toBe)
- stripHtml("<b>Bold &amp; Brave</b>") => "Bold & Brave"
- escapeRegex("a+b(c)") => "a\\+b\\(c\\)"
- pluralize("box") => "boxes"
- pluralize("party") => "parties"
- pluralize("leaf") => "leaves"
- levenshtein("kitten", "sitting") => 3

Edge case tests

- Passing null/undefined to string-producing functions returns "" and does not throw (test a sample set: slugify(null), truncate(undefined, 5), camelCase(undefined), stripHtml(null), escapeRegex(undefined), pluralize(null)).
- Unicode: slugify("Café au lait") === "cafe-au-lait"; wordWrap preserves emoji pairs (e.g., wordWrap("🙂🙂 🙂", 1) splits on spaces but preserves emoji characters); levenshtein handles Unicode (e.g., levenshtein("a\u0301","á") === 0 when normalization applied by implementation).

Test execution

- Running npm test must execute tests/unit/main.test.js and the file must contain the concrete assertions above.
- Tests should be deterministic and self-contained.

Coverage goal

- Aim for line coverage >= 50% as a project goal.

Acceptance criteria (testable)

- tests/unit/main.test.js exists and contains the concrete test cases above with exact equality assertions.
- npm test runs the file and the tests are deterministic and pass against the implementation in src/lib/main.js.
- Null/undefined and Unicode edge cases are asserted and verified.
