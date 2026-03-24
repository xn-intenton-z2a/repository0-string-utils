# TRUNCATE

Summary
Provide a truncate function that shortens text to a maximum length without breaking words and appends a suffix (default ellipsis) when truncation occurs.

API
Exported function: truncate(input, maxLength, suffix)
- maxLength: positive integer length limit (required)
- suffix: string appended when truncation occurs (default is the single character ellipsis)

Behavior
- Return empty string for null or undefined input.
- If input length is less than or equal to maxLength, return input unchanged.
- If truncation is required, reserve space for suffix; do not break mid-word when a word boundary exists before the cutoff. If no word boundary is found within the allowed prefix, truncate at the prefix length and append suffix.

Acceptance criteria
- truncate Hello World with maxLength 8 -> Hello…
- truncate short text with larger maxLength returns original text
- truncate handles suffix parameter when provided
- truncate null/undefined -> empty string
- Exported from src/lib/main.js and unit tests in tests/unit/truncate.test.js

Implementation notes
- Document the exact truncation strategy in README
- Tests should cover ASCII and Unicode text and cases where the first word exceeds maxLength