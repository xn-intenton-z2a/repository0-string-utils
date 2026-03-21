# TEXT_WRAPPING

## Summary
Specification for two text-processing utilities: wordWrap and stripHtml.

## Description
- wordWrap: soft-wrap text at word boundaries to a specified width. Never break a word; if a single word exceeds width, place it on its own line unbroken. Use line separator character LF (\n). Preserve existing line breaks by treating them as paragraph boundaries.
- stripHtml: remove HTML tags and decode common entities such as &amp; &lt; &gt; &quot; and numeric entities. Collapse multiple whitespace characters into single spaces except for intentional line breaks.

For null or undefined inputs return empty string.

## Acceptance Criteria
- wordWrap: given a long sentence and width N, output lines no longer than N except where a single word exceeds N; words must not be split across lines
- wordWrap: input The quick brown fox jumps over the lazy dog with width 10 produces lines The quick, brown fox, jumps over, the lazy, dog (words grouped without splitting)
- stripHtml: input with a simple HTML element and entity, for example a strong element and an ampersand entity produces plain text without tags and with the entity decoded to &
- Both functions handle Unicode and return empty string for null/undefined

## Implementation Notes
- Follow guidance in library/TEXTWRAP.md and library/HTML_ENTITIES.md for wrapping heuristics and entity decoding
- No external libraries; decode common entities using a small mapping and numeric entity parsing

## Tests
- Unit tests covering line break preservation, long single-word behaviour, HTML fragments, nested tags, and entity decoding
