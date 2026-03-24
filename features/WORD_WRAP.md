# WORD_WRAP

Summary
Provide a wordWrap function that soft-wraps text at word boundaries to a specified width. Never break words; if a single word is longer than the width, place it on its own line unbroken.

API
Exported function: wordWrap(input, width) -> string
- width: positive integer describing the maximum line width
- Lines separated by the newline character \n
Behavior
- Return empty string for null or undefined input.
- Wrap at spaces so that no line exceeds width except when a single word is longer than width; in that case the long word occupies its own line.
- Preserve existing whitespace inside words but collapse multiple spaces between words for wrap calculations.

Acceptance criteria
- wordWrap The quick brown fox with width 10 -> The quick\nbrown fox
- A single longwordthatexceedswidth with width 5 -> longwordthatexceedswidth on a single line unchanged
- wordWrap null/undefined -> empty string
- Exported from src/lib/main.js and tested in tests/unit/word-wrap.test.js

Implementation notes
- Use simple greedy algorithm: build lines by appending words until adding the next word would exceed width
- Write tests for Unicode and mixed whitespace input