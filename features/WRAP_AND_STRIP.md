# WRAP_AND_STRIP

Summary
Provide two text-cleaning utilities: wordWrap for soft wrapping lines at word boundaries and stripHtml for removing HTML tags and decoding common entities.

Specification
- wordWrap(input: string, width: number): string
  - If input is null/undefined return empty string. Default width if omitted is 80.
  - Soft wrap at word boundaries producing lines separated by the newline character \n. Never break a word. If a single word length exceeds width, place that word on its own line unbroken.

- stripHtml(input: string): string
  - Remove HTML tags and decode common named entities: &amp;, &lt;, &gt;, &quot;, &#39;, and numeric entities.
  - Trim leading/trailing whitespace. Null/undefined -> empty string.

Files to change
- src/lib/main.js: add wordWrap and stripHtml
- tests/unit/wrap_and_strip.test.js: unit tests covering wrapping rules, long-word behavior, HTML stripping and entity decoding
- README.md: examples showing both functions

Acceptance Criteria
- wordWrap respects width and never breaks words; a single overlong word is placed on its own line.
- stripHtml("<p>Hello &amp; world</p>") returns "Hello & world".
- Null/undefined input returns empty string for both functions.
