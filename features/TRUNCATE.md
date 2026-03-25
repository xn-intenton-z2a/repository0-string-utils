# TRUNCATE

# Overview

Truncate shortens text to a requested maximum length and appends a suffix (default the ellipsis character …) while avoiding breaking words when possible. The suffix counts towards the maximum length. If the first token (word) is longer than the requested length, permit truncation of that token so a suffix can be appended to fit the limit.

# Acceptance Criteria

- Truncating "Hello World" to length 8 produces "Hello…".
- truncate(null, any) returns an empty string.
- Default suffix is the single character … when suffix is omitted.
- When the first word is longer than the allowed length, truncate mid-word and append the suffix so the returned string length does not exceed the requested length.
- If requested length is less than or equal to the suffix length, return the suffix trimmed to the requested length.

# Tests

- Unit tests include examples for default and custom suffix, behaviour at word boundaries, single long word behaviour, and Unicode strings.