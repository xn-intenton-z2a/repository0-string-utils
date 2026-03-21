# README_DOCS

Summary

Provide concise usage documentation and examples for each exported function so consumers and tests can rely on documented behaviour.

Documentation requirements

- Add a Usage section to repository README.md demonstrating importing the named functions from src/lib/main.js and showing one example for each function, with exact expected outputs.

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

Acceptance criteria

- README.md contains a Usage section with the examples above and notes on null/undefined handling and Unicode.
- Examples use exact expected outputs so unit tests and documentation stay aligned.
