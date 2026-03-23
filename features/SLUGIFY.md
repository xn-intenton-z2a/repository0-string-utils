# SLUGIFY

Summary

Provide a slugify function exported from src/lib/main.js that converts input text into a URL-friendly slug. The function handles empty, null, and undefined inputs by returning an empty string and is Unicode-aware.

Specification

- Input: any string, null, or undefined. Null/undefined return an empty string.
- Normalise whitespace and punctuation into single hyphens. Collapse multiple hyphens into one and trim leading/trailing hyphens.
- Lowercase the result.
- Prefer removing diacritical marks (for example, convert é to e) while preserving base letters and numbers.
- Allow Unicode letters and numbers; remove other non-alphanumeric characters except hyphens.

Acceptance criteria

- Slugify Hello World! returns hello-world
- Slugify multiple spaces or punctuation collapses into single hyphens (for example, Hello   World -> hello-world)
- Slugify preserves and normalises unicode characters (for example, Café au lait -> cafe-au-lait)
- Null or undefined input returns an empty string
- Result contains only lowercase letters, numbers, and hyphens, with no leading or trailing hyphens

Notes

- No external dependencies. Implementation must be plain JavaScript suitable for Node.js >= 24.
- Unit tests should include ASCII and Unicode examples and edge cases.
