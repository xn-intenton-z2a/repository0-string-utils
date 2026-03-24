# ESCAPE_REGEX

Summary
Provide an escapeRegex function that returns a string safe to insert into a regular expression by escaping all regex metacharacters.

API
Exported function: escapeRegex(input) -> string

Behavior
- Return empty string for null or undefined input.
- Escape characters: - [ ] / { } ( ) * + ? . ^ $ | \ and any other characters that have special meaning in JS regular expressions.

Acceptance criteria
- escapeRegex a.b -> a\.b (dot escaped)
- escapeRegex (hello) -> \(hello\)
- escapeRegex null/undefined -> empty string
- Exported from src/lib/main.js and tests in tests/unit/escape-regex.test.js

Implementation notes
- Use a single canonical replacement using a character class and replace with backslash escapes
- Add tests verifying round-tripping when used inside new RegExp(escaped)