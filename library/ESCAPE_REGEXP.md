ESCAPE_REGEXP

Table of contents
- Purpose
- Characters that must be escaped
- Implementation pattern
- Usage and examples
- Reference details
- Retrieval digest and attribution

Purpose
escapeRegExp produces a string safe for use inside a RegExp literal or RegExp constructor by escaping the regex metacharacters that would otherwise change pattern semantics.

Characters to escape
The canonical set to escape when embedding user text in a pattern is:
- . * + ? ^ $ { } ( ) | [ ] \ /

Implementation pattern (recommended)
Use a single replace call that targets the known metacharacters. Example implementation pattern (ECMAScript):
- Escaping regex: string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  - The pattern matches all special characters and replaces each with a backslash-escaped equivalent.

Usage
- When constructing a dynamic RegExp from user input: var safe = userInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); var re = new RegExp(safe);
- Ensure input is coerced to string and null/undefined handled as empty string.

Reference details
- Function behavior: escapeRegExp(str) -> string
- Returned string can be safely interpolated into new RegExp(returned) without altering pattern semantics.

Retrieval digest
- Source: Lodash docs (escapeRegExp reference) plus common best-practice pattern
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header for lodash docs endpoint when fetched): 28 (note: some endpoints respond with a small header payload or redirect; see source URL for authoritative docs)

Attribution
- Source URL: https://lodash.com/docs/4.17.15#escapeRegExp
- Also references community best-practice patterns for escaping regex metacharacters.