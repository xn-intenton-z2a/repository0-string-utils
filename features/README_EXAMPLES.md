# README_EXAMPLES

Overview
Provide clear, minimal usage examples in README.md for each exported function so library users and reviewers can verify behaviour quickly. Each example must show an input and the exact expected output.

Examples to include in README.md
- Slugify: input Hello World! -> output hello-world
- Truncate: input Hello World with maxLength 8 -> output Hello… (default suffix)
- camelCase: input foo-bar-baz -> output fooBarBaz
- kebabCase: input Hello World -> output hello-world
- titleCase: input hello WORLD -> output Hello World
- wordWrap: input The quick brown fox jumps over the lazy dog with width 10 -> output lines: The quick; brown fox; jumps over; the lazy; dog (each on its own line separated by newline)
- stripHtml: input a &amp; b <strong>bold</strong> -> output a & b bold
- escapeRegex: input a.b*c? -> output a\\.b\\*c\\?
- pluralize: examples: box -> boxes, party -> parties, knife -> knives, car -> cars
- levenshtein: input kitten, sitting -> output 3

Acceptance Criteria
- README.md contains a section for each function with a short example and the exact expected output matching tests.
- README links to the unit tests and to src/lib/main.js exports.
- Examples are concise, use plain text, and are easily copy-pastable by users into a REPL or test file.
