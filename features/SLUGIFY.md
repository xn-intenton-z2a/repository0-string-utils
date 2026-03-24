# SLUGIFY

Summary
Provide a slugify function that converts arbitrary text into a URL-friendly slug suitable for paths and filenames.

API
Exported function: slugify(input) -> string

Behavior
- Convert to lowercase.
- Replace any run of non-alphanumeric characters with a single hyphen.
- Collapse multiple hyphens and trim leading/trailing hyphens.
- Normalize Unicode using NFKD and strip common diacritics so accented letters become ASCII equivalents where reasonable.
- Return empty string for null or undefined input.

Acceptance criteria
- slugify Hello World! -> hello-world
- slugify "" and slugify null and slugify undefined -> empty string
- slugify Café au lait -> cafe-au-lait (diacritics removed)
- Implementation exported from src/lib/main.js as named export slugify
- Unit tests exist in tests/unit/slugify.test.js and README includes a usage example

Implementation notes
- Modify src/lib/main.js to add and export slugify
- Add unit tests verifying normal and edge cases
- Update README examples and examples/ to demonstrate usage
- Do not add runtime dependencies; use built-in Unicode normalization and plain JS