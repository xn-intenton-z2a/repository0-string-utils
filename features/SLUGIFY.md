# SLUGIFY

# Overview

Slugify converts an input string into a URL-friendly slug. Behaviour: normalise Unicode, remove diacritics, convert to lower case, replace runs of non-alphanumeric characters with a single hyphen, collapse consecutive hyphens, trim leading/trailing hyphens, and return an ASCII-only slug suitable for use in URLs.

# Acceptance Criteria

- Slugifying "Hello World!" produces "hello-world".
- slugify(null) returns an empty string.
- Slugify should remove diacritics via Unicode normalisation: slugify("mañana") yields "manana".
- Multiple separators and punctuation collapse to single hyphens: slugify(" a -- b ") -> "a-b".
- Output contains only lowercase ASCII letters, numbers and hyphens.

# Tests

- Unit tests cover the examples above, very long inputs, and inputs with mixed Unicode punctuation.

# Implementation Notes

- Use String.prototype.normalize("NFKD") and strip combining marks to remove diacritics, then map remaining characters to ASCII as needed, followed by replacement and trimming logic.