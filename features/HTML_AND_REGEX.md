# HTML_AND_REGEX

Description

Two related utilities: stripHtml and escapeRegex. stripHtml converts an HTML fragment to plain text and decodes common entities. escapeRegex returns a string safe for inclusion in a RegExp constructor or literal by escaping metacharacters.

API

stripHtml(input): string
- If input is nullish return empty string.
- Preferred implementation in browsers: parse with DOMParser and read textContent to get decoded entities.
- Fallback for non-DOM environments: remove tags with a conservative regex (for example replace any '<...>' with '') then decode common named entities (&amp;, &lt;, &gt;, &quot;, &apos;) and numeric entities (decimal and hex) to characters.
- Remove script and style content prior to extracting visible text when using a regex-based fallback.

escapeRegex(input): string
- If input is nullish return empty string.
- Exact operation: escape the following regex metacharacters so the result can be used as a literal in a RegExp: . * + ? ^ $ { } ( ) | [ ] \ /
- Canonical implementation pattern: replace occurrences of the character class [.*+?^${}()|[\]\\] with a backslash-escaped version (replacement '\\$&' when using a replace callback).

Acceptance Criteria

- stripHtml of "<p>Hello &amp; welcome</p>" produces "Hello & welcome".
- stripHtml decodes numeric entities such as "&#39;" to "'" and hexadecimal numeric entities to the correct character.
- escapeRegex of a string containing regex metacharacters returns a string where each metacharacter is prefixed with a backslash so that new RegExp(escaped) matches the literal text.
- Both functions return empty string for null and undefined inputs.

Tests (implementation guidance)

- Unit tests should assert entity decoding for named and numeric entities and verify that escapeRegex output, when used in a RegExp, matches the original literal input string.