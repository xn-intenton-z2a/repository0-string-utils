MDN_ENTITY

Table of Contents
- Overview of HTML entities
- Common entities and replacements
- Implementation: decode strategy
- Performance and edge cases
- Reference details: mapping table and algorithm
- Digest and attribution

Overview
HTML entities are textual encodings representing reserved characters (e.g., &amp;, &lt;, &gt;), numeric entities (&#34;, &#x22;), and named entities (e.g., &nbsp;). When stripping HTML, decode common entities to their Unicode equivalents.

Common entities and replacements
- &amp; -> &
- &lt; -> <
- &gt; -> >
- &quot; -> "
- &#39; or &apos; -> '
- &nbsp; -> non-breaking space (U+00A0)
- Numeric decimal: &#DDDD; -> String.fromCharCode(DDDD)
- Numeric hex: &#xHHHH; -> String.fromCodePoint(parseInt(HHHH,16))

Implementation: decode strategy
- Use a small mapping for common named entities and fall back to numeric parse for patterns: /&#(x?)([0-9A-Fa-f]+);/ to convert numeric entities.
- Implementation signature: function decodeEntities(str) -> string
- Steps: 1) Replace named entities using mapping. 2) Replace numeric hex/decimal entities by parsing and converting to code point. 3) Leave unknown entities intact or remove trailing semicolon-tolerant forms depending on strictness.

Performance and edge cases
- Avoid constructing a DOM (innerHTML) in server-side contexts for security. Use deterministic string replacements.
- For very long strings, perform a single pass using a RegExp that matches both named and numeric entities and resolves them in a replacer function.

Reference details (mapping and algorithm)
- Mapping object: {"amp":"&","lt":"<","gt":">","quot":"\"","apos":"'","nbsp":"\u00A0"}
- Numeric handling: match /&#(x?)([0-9A-Fa-f]+);?/ and use parseInt(m2, x?16:10). If value <= 0x10FFFF use String.fromCodePoint(value) else replace with Unicode replacement char U+FFFD.

Digest
Source: MDN Glossary - Entity. Retrieval date: 2026-03-21.

Attribution and data size
Source URL: https://developer.mozilla.org/en-US/docs/Glossary/Entity
Data retrieved: ~174.7 KB
Attribution: MDN Web Docs (Mozilla)