# WORD_WRAP

Overview
Implement wordWrap exported from src/lib/main.js. This function performs soft wrapping of text at word boundaries and never breaks words unless a single word exceeds the requested width.

Specification
- wordWrap(text, width): returns a string containing the input text wrapped with the newline character as line separator. Lines must break at whitespace boundaries. Consecutive whitespace should be treated as a single separator. If a single word is longer than width, it must be placed on its own line unbroken.

Acceptance Criteria
- The library exports wordWrap.
- wordWrap uses a newline character as the line separator.
- Given the input "The quick brown fox jumps over the lazy dog" and width 10, the output lines (split on newline) are: "The quick", "brown fox", "jumps over", "the lazy", "dog".
- A single very long word longer than width appears on its own line and is not split.
- wordWrap of null or undefined returns empty string.
