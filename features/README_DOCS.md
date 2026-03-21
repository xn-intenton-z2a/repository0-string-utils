# README_DOCS

Summary

Provide concise usage documentation and examples for each exported function so consumers and tests can rely on documented behaviour.

Documentation requirements

- Add or update a Usage section in repository README.md demonstrating importing the named functions from src/lib/main.js and showing one example for each function with exact expected outputs.

- For each function include:
  - One-line description
  - Example call and expected literal output
  - Notes on edge cases (null/undefined behaviour and Unicode support)

Required examples (exact outputs)

- slugify("Hello World!") => "hello-world"
- truncate("Hello World", 8) => "Hello…"
- camelCase("foo-bar-baz") => "fooBarBaz"
- kebabCase("Hello World") => "hello-world"
- titleCase("hello world") => "Hello World"
- wordWrap("a b c", 1) => "a\nb\nc"
- stripHtml("<b>Bold &amp; Brave</b>") => "Bold & Brave"
- escapeRegex("a+b(c)") => "a\\+b\\(c\\)"
- pluralize("box") => "boxes"
- levenshtein("kitten","sitting") => 3

Acceptance criteria (testable)

- README.md contains a Usage section with the exact examples above.
- Each example in README matches the unit test expectations exactly (so tests can depend on documented outputs).
- README includes a short note that null/undefined inputs result in empty strings for string-producing functions and that Unicode is supported.
