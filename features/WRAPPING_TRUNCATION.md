# WRAPPING_TRUNCATION

Description

Implement Truncate and WordWrap string utilities to support safe shortening of displayed text and wrapping paragraphs for fixed-width layouts.

Behavior

- Truncate: Shorten a string to a maximum length (character count) without breaking words. By default append the ellipsis character … (U+2026) when content is truncated. If the first word is longer than the requested length, place that word alone truncated to length minus suffix length and append the suffix. Accept an optional suffix parameter.
- WordWrap: Soft wrap text at word boundaries to a specified width. Do not break words across lines. If a single word exceeds width, place it on its own line unbroken. Use line break '\n' as the separator. Preserve existing newlines as paragraph breaks.

API

Export named functions from src/lib/main.js: truncate(input, maxLength, suffix="…"), wordWrap(input, width).

Edge cases

- null/undefined => empty string.
- maxLength less than suffix length should return suffix or empty string according to reasonable behavior (documented in tests).
- Unicode characters count as single characters; do not split grapheme clusters intentionally (best-effort within JS string indexing limits).

Acceptance criteria

1. truncate("Hello World", 8) == "Hello…"
2. truncate(null, 10) == ""
3. wordWrap("a b c d e f", 3) results in lines no longer than 3 and words not broken; if a word longer than width appears, it occupies its own line.
4. Unit tests cover behavior with multiple consecutive spaces and existing newlines.
