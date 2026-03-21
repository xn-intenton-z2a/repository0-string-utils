# TRUNCATE_WRAP

Summary

Provide two related text functions: truncate and wordWrap. Both are pure utilities exported from src/lib/main.js and handle edge cases and Unicode.

Acceptance criteria

- Truncating "Hello World" to length 8 produces "Hello…"
- Truncate never breaks a word in the middle; when the limit would split a word, the result ends at the previous whole word plus the suffix
- Truncate accepts a suffix parameter (default is the single-character ellipsis) and counts available space so the suffix fits within the requested length
- wordWrap soft-wraps text at word boundaries using the newline character; it never breaks words. If a single word exceeds width, it must appear on its own line unbroken
- wordWrap of "The quick brown fox" with width 10 produces "The quick\nbrown fox"
- Both functions return empty string for null, undefined, or empty input

Implementation notes

- Truncate: count visible characters and choose the last whitespace boundary before the limit, adjusting for suffix length.
- wordWrap: accumulate words into lines without exceeding width, special-case long words by placing them alone on a line.
- Add tests in tests/unit/truncate-wrap.test.js covering examples and edge cases.
