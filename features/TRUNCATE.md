# TRUNCATE

Summary
Implement truncate that shortens text without breaking words and appends a suffix when truncation occurs.

Specification
- Function name: truncate(input: string, maxLength: number, suffix?: string): string
- Defaults: suffix = the single-character ellipsis "…". If input is null or undefined return empty string.
- Behavior: If input length is less than or equal to maxLength return input unchanged. When truncation is required, prefer truncation at the last word boundary that keeps the output length (including suffix) <= maxLength. If no earlier word boundary exists (first word longer than maxLength), return the first maxLength - suffix.length characters followed by the suffix.

Examples
- truncate "Hello World" with maxLength 8 returns "Hello…".

Files to change
- src/lib/main.js: add truncate implementation
- tests/unit/truncate.test.js: unit tests for the example, edge cases, and null input
- README.md: usage example

Acceptance Criteria
- truncate("Hello World", 8) returns "Hello…".
- truncate handles null/undefined by returning empty string.
- Behavior does not split words except when a single word exceeds maxLength (that word is then clipped and suffixed).
