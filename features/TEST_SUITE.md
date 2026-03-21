# TEST_SUITE

Description

Specification for unit tests required to validate the library functions. Tests live under tests/unit/ and must be runnable with the existing npm test script.

Requirements

- Provide unit tests for each exported function: slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein.
- Include edge-case tests for null, undefined, and empty string inputs for every function (assert empty string or expected numeric result for levenshtein).
- Include Unicode tests for functions where applicable (slugify, stripHtml, levenshtein, case transforms, wordWrap).
- Verify exact outputs for the mission acceptance examples:
  - Slugify: "Hello World!" -> "hello-world".
  - Truncate: "Hello World" with maxLength 8 -> "Hello…".
  - camelCase: "foo-bar-baz" -> "fooBarBaz".
  - Levenshtein: "kitten" vs "sitting" -> 3.
- Tests should be deterministic and not rely on external network or platform-specific features.

Acceptance Criteria for test suite

- All unit tests for the functions pass when running npm test.
- Tests assert both correct outputs and correct handling of null/undefined inputs.
- Test coverage includes the specific examples given in the mission and at least one Unicode-focused test per applicable function.

Implementation guidance

- Use Vitest as configured in the repository; add tests to tests/unit/ naming them to match the function names (for example tests/unit/slugify.test.js).
- Keep tests small and focused; one assertion per behavior where appropriate.