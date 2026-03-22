MDN_ENTITY

NORMALISED EXTRACT

Table of contents
- HTML character/entity reference essentials
- Named vs numeric entities
- Decoding strategies
- Common entities to decode

1. HTML character/entity reference essentials
- HTML supports named character references (entities) like &amp; &lt; &gt; &quot; and numeric references like &#34; (decimal) or &#x22; (hex). Entities are terminated by a semicolon.
- Named entities map to a single Unicode character or sequence. Numeric entities give numeric code points.

2. Named vs numeric entities
- Named entity example: &amp; -> & ; &lt; -> < ; &gt; -> > ; &quot; -> " ; &apos; or &#39; -> '
- Numeric decimal: &#38; -> &, numeric hex: &#x26; -> &

3. Decoding strategies
- In browsers, safe decoding in JS can be done by leveraging the HTML parser: assign the entity text to an element's innerHTML and read the textContent or value. In environments without DOM, implement a small entity table for common entities and a regex to replace numeric references:
  - Replace numeric references with String.fromCodePoint(parsedNumber)
  - Replace named entities using a mapping lookup
- A robust decoding step: replace all entity-like sequences using a single global regex that matches numeric and named references and resolves each match via numeric parsing or mapping lookup.

4. Common entities to decode (minimum set for stripHtml)
- &amp; -> &
- &lt; -> <
- &gt; -> >
- &quot; -> "
- &apos; or &#39; -> '
- nbsp (non-breaking space) -> U+00A0 (often normalized to regular space)

SUPPLEMENTARY DETAILS
- When stripping HTML tags, remove tags first then decode entities; otherwise tag-like sequences inside entities may be lost. Use a tag-stripping regex that removes angle-bracketed sequences and attributes conservatively, then perform entity decoding.
- Beware of tricky inputs where entity names are not terminated with semicolon; recommend requiring semicolon for correct decoding.

REFERENCE DETAILS
- Decoding numeric entity: decimal &#NNN; -> String.fromCodePoint(NNN)
- Decoding hex entity: &#xHHH; -> String.fromCodePoint(parseInt(HHH, 16))
- Named-entity fallback: use a mapping object for common names and fallback to numeric parsing for others.

DETAILED DIGEST
- Source: https://developer.mozilla.org/en-US/docs/Glossary/Entity
- Retrieved: 2026-03-22T23:43:31.711Z
- Bytes fetched: 178878

ATTRIBUTION
- Content extracted from MDN Web Docs (Entity glossary and references).