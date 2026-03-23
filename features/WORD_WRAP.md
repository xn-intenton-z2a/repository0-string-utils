# WORD_WRAP

Summary

Provide a wordWrap function exported from src/lib/main.js that soft wraps text at word boundaries. It must never break a word across lines. If a single word is longer than the requested width, place that word alone on a line unbroken. The line separator must be a newline character.

Specification

- Signature: wordWrap(text, width) where width is a positive integer (default may be 80).
- Null or undefined text returns an empty string.
- Break lines only at whitespace boundaries so that each line length is less than or equal to width.
- If a single word exceeds width, place that word on its own line unbroken.
- Preserve single spaces between words in the output lines; do not introduce trailing spaces at line ends.

Acceptance criteria

- wordWrap The quick brown fox with width 10 returns The quick\nbrown fox
- A single word longer than width is placed on a single line unchanged
- Multiple consecutive whitespace characters in input are treated as a single separator
- Null or undefined input returns an empty string

Notes

- Unit tests should include normal ASCII text and Unicode words, and ensure no lines exceed the specified width except when a single word itself is longer than width.
