HTML_ENTITIES

Table of contents:
1. Purpose
2. Common named entities and mapping
3. Numeric entities (decimal and hex) handling
4. Implementation pattern for decode
5. Edge cases and security notes
6. Reference details
7. Detailed digest
8. Attribution

1. Purpose
Provide exact decoding rules for HTML character references used in stripHtml: decode named entities, decimal numeric references, and hexadecimal numeric references into their Unicode characters.

2. Common named entities (explicit mapping)
- &amp; => &
- &lt; => <
- &gt; => >
- &quot; => "
- &apos; => '
- &nbsp; => non-breaking space (U+00A0)
Include additional named entities as needed; many are available in authoritative lists (HTML spec / MDN).

3. Numeric entities handling (explicit)
- Decimal form: &#NNNN; where NNNN is one or more decimal digits. Interpret NNNN as a base-10 code point and convert to the corresponding Unicode character.
- Hex form: &#xHHHH; or &#XHHHH; where HHHH is hex digits. Interpret as base-16 code point.
- If code point is out-of-range or malformed, fall back to leaving the entity as-is or replace with U+FFFD as a safe fallback.

4. Implementation pattern (exact)
- Use a global RegExp to find entities: &(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+); (match group identifies hex, decimal, or named)
- For numeric matches: parse digits and convert to the Unicode character (use String.fromCodePoint for code points above BMP).
- For named matches: look up in a small mapping table and replace with mapped character.
- After decoding entities, remove any residual HTML tags via a simple tag-stripping pass if required for stripHtml.

5. Edge cases and security notes
- Beware of malformed entities and overlong numeric values; validate code points before converting.
- Do not run arbitrary HTML through entity decoding that could reopen XSS vectors; entity decoding should be performed within a safe parser or when the output will be escaped again for HTML contexts.

6. Reference details
- MDN and the HTML specification define the full named-entity set; implement the small set needed for typical text decoding (amp, lt, gt, quot, apos, nbsp) and expand as required.

7. Detailed digest
- Source: https://developer.mozilla.org/en-US/docs/Glossary/Entity
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched: 173689
- Key technical points used: named entity mappings, numeric decimal and hex forms, pattern for matching and conversion.

8. Attribution
- MDN Web Docs — Character entity references / Glossary, retrieved 2026-03-21, 173689 bytes.
