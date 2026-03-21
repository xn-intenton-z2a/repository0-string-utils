# ESCAPE_REGEX

Overview
Escape special characters in a string so it can be used in a regular expression literal or constructor without changing meaning. Treat null/undefined as empty string.

Acceptance criteria
- Exported function name: escapeRegex
- escapeRegex of a+b -> a\+b
- escapeRegex of (test) -> \(test\)
- escapeRegex preserves other characters and only prefixes regex metacharacters with a backslash

Implementation notes
- Characters to escape include: - [ ] { } ( ) * + ? . ^ $ | \ and / where applicable
- Implement by replacing occurrences of the metacharacters with a backslash-escaped version

Tests
- Unit tests for all metacharacters, empty input, and null/undefined.
