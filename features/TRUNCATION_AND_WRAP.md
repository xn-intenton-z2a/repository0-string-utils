# TRUNCATION_AND_WRAP

Description

Feature grouping for text length management: Truncate and WordWrap. Both functions must handle null/undefined by returning an empty string and must work with Unicode.

API

Truncate(input, maxLength, suffix = '…'): string
- Purpose: shorten text to a readable snippet without breaking words when possible and append suffix if the original text was shortened.
- Behaviour rules:
  - If input is nullish return empty string.
  - If maxLength is not a positive integer, throw an error or treat as no-op (implementer choice; tests should assert behaviour).
  - If input length is less than or equal to maxLength return input unchanged.
  - When the text must be shortened, prefer to cut at the last word boundary that leaves room for the suffix; if no word boundary fits (the first word alone exceeds maxLength - suffix.length), hard-truncate the first word to maxLength - suffix.length characters, then append suffix.
  - Suffix defaults to the single-character ellipsis '…'. The returned string length may be less than maxLength when truncation occurs at a whole-word boundary.

WordWrap(text, width): string
- Purpose: soft-wrap text at word boundaries using '\n' as the line separator. Never break words; if a single word exceeds width place it alone on its own line unbroken.
- Behaviour rules:
  - If text is nullish return empty string.
  - width must be a positive integer; if width <= 0 return text unchanged.
  - Respect existing paragraphs: wrap each paragraph (split on '\n') independently and preserve blank lines.

Acceptance Criteria

- Truncating "Hello World" to length 8 produces "Hello…".
- Truncating a short string that fits exactly returns the original string (no suffix appended).
- When the first word exceeds the available length the function hard-truncates the word then appends the suffix.
- WordWrap of "The quick brown fox" with width 10 produces two lines: "The quick" and "brown fox" separated by a single newline.
- WordWrap never inserts hyphenation or breaks words; long words that exceed width appear alone on their own line.

Tests (implementation guidance)

- Include unit tests covering exact outputs for example cases above plus Unicode containing words and multiple whitespace sequences.