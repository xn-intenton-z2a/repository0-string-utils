# LIBRARY_API

Summary

Ensure all ten required utilities are exported from src/lib/main.js, provide comprehensive unit tests, and document usage examples in README so the library is consumable and verifiable.

Acceptance criteria

- All ten functions are exported with these exact names: slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein
- README contains at least one short usage example for each function demonstrating inputs and expected outputs, including the mission examples such as slugify of Hello World! -> hello-world, truncate of Hello World to length 8 -> Hello…, and camelCase of foo-bar-baz -> fooBarBaz
- Unit tests under tests/unit cover the acceptance criteria examples and edge cases (empty string, null/undefined, Unicode) and run successfully with npm test
- No external runtime dependencies are added

Implementation notes

- Modify src/lib/main.js to export named functions and keep implementations minimal and well-documented.
- Add or update tests under tests/unit/ and examples in README to prove acceptance criteria.
- Keep each function small, well-tested, and independent to match the bag-of-functions mission.
