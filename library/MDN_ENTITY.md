MDN_ENTITY

Table of contents
- HTML character/entity references
- Common entities and their decoded characters
- Implementation notes for decoding

HTML character/entity references
- Named entities: &amp; -> &, &lt; -> <, &gt; -> >, &quot; -> ", &apos; -> '
- Numeric character references: &#NNNN; (decimal) and &#xHHHH; (hex) map to Unicode code points.

Common entities and mapping (actionable)
- &amp; -> U+0026
- &lt; -> U+003C
- &gt; -> U+003E
- &quot; -> U+0022
- &apos; -> U+0027
- nbsp: &nbsp; -> U+00A0 (non-breaking space) — treat as space for wrapping/truncation unless preserving.

Implementation notes
- Decode numeric references by parsing decimal/hex and using String.fromCodePoint(value).
- For named entities, include a small lookup table for the common HTML five and additional ones required by input.
- Beware of double-encoding; decode once.

Reference details
- Numeric entity decoding: pattern: /&#(x?[0-9A-Fa-f]+);/ -> parseInt(value, base) -> String.fromCodePoint(codePoint).
- Named entity decoder: map common names to code points and replace with characters using replace and a RegExp matching &name;.

Digest
- Source: MDN Glossary — Entity; retrieved: 2026-03-21; data size: (HTML crawl captured).

Attribution
- MDN contributors — https://developer.mozilla.org/en-US/docs/Glossary/Entity
