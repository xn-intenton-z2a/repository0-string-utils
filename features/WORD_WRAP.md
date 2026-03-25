# WORD_WRAP

# Overview

Soft wrap text to a given column width using the newline character \n as the line separator. Wrapping must happen at word boundaries; never split a word across lines. If a single word is longer than width, that single word should appear on its own line unbroken.

# Acceptance Criteria

- wordWrap of "The quick brown fox" with width 10 returns two lines where the first line is at most 10 characters and words are not split; for example "The quick\nbrown fox".
- wordWrap(null, any) returns an empty string.
- A single long word longer than width remains unbroken on its own line.
- No output line exceeds width except when a single word itself is longer than width.

# Tests

- Unit tests assert line lengths, correct breaking at word boundaries, preservation of existing newline paragraph breaks, and Unicode word handling.

# Implementation Notes

- Treat existing paragraphs (separated by blank lines) independently and wrap each paragraph separately. Collapse runs of whitespace when measuring but preserve single spaces between wrapped tokens.