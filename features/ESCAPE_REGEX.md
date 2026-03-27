# ESCAPE_REGEX

Summary
Implement escapeRegex(input) exported from src/lib/main.js to escape characters that have special meaning in regular expressions.

Specification
- Treat null or undefined as an empty string.
- For the input string, escape the following characters by prefixing with a backslash: \\ ^ $ . | ? * + ( ) [ ] { }.
- The returned string should be safe to insert into a RegExp constructor when treated as a literal pattern.

Acceptance Criteria
- escapeRegex(".+*?^$()[]{}|\\") -> a string where each special character is escaped with a backslash.
- escapeRegex(null) -> ""

Testing
- tests/unit/escape-regex.test.js should assert that the escaped string, when used in new RegExp(escaped), matches the original literal characters and not as regex metacharacters.

Notes
- Follow MDN guidance for escaping regex metacharacters.
