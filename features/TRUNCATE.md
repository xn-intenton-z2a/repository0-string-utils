# TRUNCATE

Summary
Implement truncate(input, maxLength, suffix = "…") that returns a string no longer than maxLength and avoids breaking words where possible.

Specification
- Treat null or undefined as empty string.
- maxLength is the maximum total length of the returned string including the suffix.
- If input length is less than or equal to maxLength, return the original string unchanged.
- If truncation is required, attempt to include as many whole words as will fit when the suffix is appended.
- If no whole word fits and maxLength > suffix.length, truncate the first word to fit and append the suffix.
- If maxLength is less than or equal to suffix.length, return the suffix truncated to maxLength.

Acceptance Criteria
- truncate("Hello World", 8) -> "Hello…"
- truncate("Short", 10) -> "Short"
- truncate(null, 5) -> ""
- For a single very long word, result length must be <= maxLength and include suffix when truncated.

Testing
- Add tests at tests/unit/truncate.test.js covering multi-word truncation, tiny maxLength, suffix overrides, and Unicode input.
