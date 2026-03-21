MDN_REGEX_ESCAPING

Table of Contents
- Purpose
- Canonical escaping pattern
- Implementation notes
- Examples (pattern-level)
- Supplementary details: character classes and flags
- Reference details: exact replacement expression
- Digest and attribution

Purpose
Provide a canonical, safe method to escape arbitrary strings so they can be used as literal parts of a RegExp.

Canonical escaping pattern
- Use: str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  - Explanation: bracketed character class lists all RegExp metacharacters; global replace prefixes each match with a backslash. The replacement string uses $& to insert the matched character.

Implementation notes
- Always run escaping before building RegExp from user input.
- When constructing new RegExp(escaped, flags) ensure flags do not include u if codepoint-aware behavior is desired unless string has been normalized.
- For literal bracket contexts inside character classes, additionally escape '-' when used between characters, and '^' when at start.

Examples (pattern-level)
- To match a user-supplied filename literally: const re = new RegExp(escapeRegex(userInput), 'u');
- escapeRegex signature: function escapeRegex(s) -> string

Supplementary details
- Character classes, quantifiers, assertions, and grouping tokens are handled by the single pattern above; it escapes: . * + ? ^ $ { } ( ) | [ ] \ /
- When using the RegExp constructor with dynamic flags, validate flags against /^[gimsuyd]*$/ to prevent injection of unsupported flags.

Reference details
- Exact replacement expression to implement: return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

Digest
Source: MDN Regular Expressions guide (escaping section). Retrieval date: 2026-03-21.

Attribution and data size
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
Data retrieved: ~216.6 KB
Attribution: MDN Web Docs (Mozilla)