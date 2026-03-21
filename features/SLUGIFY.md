# SLUGIFY

Overview
Convert free-form text into a URL-friendly slug suitable for use in paths: lowercase, words separated by single hyphens, remove punctuation, strip diacritics, and trim hyphens. Treat null or undefined as an empty string.

Acceptance criteria
- Exported function name: slugify
- slugify of Hello World! -> hello-world
- slugify of null or undefined -> (empty string)
- slugify of Café au lait -> cafe-au-lait
- slugify of "  --Foo  Bar-- " -> foo-bar
- Implementation uses Unicode normalization (NFKD) and removes combining marks when available

Implementation notes
- Use s.normalize('NFKD') and remove combining marks (/\p{Mn}/u or a fallback range) to strip diacritics
- Remove characters that are not letters, numbers, spaces or hyphens, collapse whitespace to single hyphen, collapse repeated hyphens, trim leading/trailing hyphens
- No external dependencies

Tests
- Unit tests must include the acceptance examples and edge cases: empty, null, long strings, strings with multiple separators.
