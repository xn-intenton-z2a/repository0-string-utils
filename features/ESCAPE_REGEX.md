# ESCAPE_REGEX

# Overview

escapeRegex returns a string where every character that has special meaning in regular expressions is escaped with a single backslash so the result can be safely used in RegExp constructors as a literal.

# Acceptance Criteria

- escapeRegex(null) returns an empty string.
- All regex special characters are escaped, including . * + ? ^ $ { } ( ) | [ ] \\ /. For example, given the input a+b the returned value is a\+b where the plus sign is escaped.

# Tests

- Unit tests verify each special character is escaped when present and combinations of specials are handled correctly.

# Implementation Notes

- Implement as a simple replace over a character class of special characters, prefixing each with a backslash. Ensure the backslash itself is escaped when necessary.