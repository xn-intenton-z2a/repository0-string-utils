# SLUG_TRUNCATE

## Summary
Specification for Slugify and Truncate utilities.

## Description
- Slugify: produce a URL-friendly slug by lowercasing, replacing spaces and separators with a single hyphen, removing non-alphanumeric characters (except hyphen), and trimming hyphens from ends. Preserve Unicode letters where possible.
- Truncate: shorten a string to a maximum length and append the ellipsis character … when truncated. Do not break words: if truncation point falls inside a word, trim back to the previous word boundary. If a single word exceeds the requested width, place it on its own line when appropriate; for Truncate return the truncated prefix plus suffix.

Treat null or undefined as empty string and return empty string.

## Acceptance Criteria
- Slugify: input Hello World! produces hello-world
- Truncate: input Hello World truncated to length 8 produces Hello…
- Truncate does not break words: truncating "The quick brown" to length 10 produces The quick… (not The quic…)
- Both functions handle Unicode characters and return empty string for null/undefined

## Implementation Notes
- Use normalization from library/STRING_NORMALIZE.md when appropriate
- Slugify should collapse multiple separators into a single hyphen and remove diacritics only if necessary for safe URLs

## Tests
- Unit tests for slug edges: leading/trailing separators, multiple spaces, punctuation-heavy input
- Unit tests for truncate: exact-length inputs, shorter-than-length, single long word, null/undefined
