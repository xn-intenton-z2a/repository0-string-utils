# SLUGIFY

Summary
Implement a slugify function exported from src/lib/main.js that converts arbitrary input into a URL-friendly slug.

Specification
- Function signature: slugify(input)
- Treat null or undefined as an empty string.
- Normalize Unicode to NFKD and remove combining marks so accents are folded to base characters.
- Replace any sequence of one or more non-alphanumeric characters with a single hyphen.
- Convert to lowercase and trim leading/trailing hyphens.
- Result contains only ASCII letters, digits and hyphens.

Acceptance Criteria
- slugify("Hello World!") -> "hello-world"
- slugify(null) -> ""
- slugify("École Nationale") -> "ecole-nationale"
- slugify("  a--b__c  ") -> "a-b-c"
- No runtime dependencies; uses built-in Unicode normalization and regexes.

Testing
- Add unit tests at tests/unit/slugify.test.js that verify the acceptance criteria and edge cases.
- Include examples in README.
