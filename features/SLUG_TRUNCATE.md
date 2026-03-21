# SLUG_TRUNCATE

Overview
Implement slugify and truncate utilities and expose them from src/lib/main.js. These helpers are used for generating URL-friendly identifiers and safely shortening display strings.

Specification
- slugify: convert input to lowercase, remove characters that are not letters, digits, spaces, underscores or hyphens, replace sequences of whitespace or separators with a single hyphen, and trim leading and trailing hyphens.
- truncate: truncate a string to a maximum output length maxLength (inclusive of the suffix). The function accepts an optional suffix (default is the single character ellipsis). Do not break words; prefer to include whole words so that the returned string length is less than or equal to maxLength. If the first word is longer than maxLength, return that word truncated to fit with the suffix.

Acceptance Criteria
- The library exports slugify and truncate.
- slugify of "Hello World!" produces "hello-world".
- truncate of "Hello World" with maxLength 8 produces "Hello…" using the default suffix.
- truncate returns empty string for null or undefined input.
- Provided suffix is used when supplied.
