HTML_ENTITIES

Normalised extract
Overview
HTML character/entity references encode characters that either have special meaning in HTML (e.g., <, >, &) or are not present in the document encoding. Decoding must handle named entities (e.g., &amp;) and numeric references (decimal and hexadecimal).

Table of contents
1. Common named entities
2. Numeric character references
3. Decoding strategies (browser and manual)
4. Edge cases and security considerations

1. Common named entities
- &amp; -> &
- &lt; -> <
- &gt; -> >
- &quot; -> "
- &apos; -> '
- &nbsp; -> U+00A0 (non-breaking space)

2. Numeric character references
- Decimal: &#DDDD; where DDDD is base-10 code point. Example: &#169; -> ©
- Hexadecimal: &#xHHHH; or &#XHHHH; where HHHH is hex digits. Example: &#x1F600; -> 😀
- Implementation: parse numeric value and convert via String.fromCodePoint(value).

3. Decoding strategies
- Browser DOM (recommended in browser context): create a DOM element, set element.innerHTML = input, then read element.textContent (or innerText) to get decoded string.
- Manual regex-based decoder (server or runtime without DOM): use a replacement function that matches /&(#x?[0-9A-Fa-f]+|[A-Za-z][A-Za-z0-9]+);/g and handles:
  - if token starts with '#x' or '#X': value = parseInt(hexPart, 16); return String.fromCodePoint(value)
  - if token starts with '#': value = parseInt(decimalPart, 10); return String.fromCodePoint(value)
  - else: lookup in NAMED_ENTITIES map; if unknown, leave original entity or decide fallback.
- Provide a minimal named-entities map for common entities and prefer the DOM approach for complete coverage.

4. Edge cases and security
- Numeric references for invalid code points should be handled gracefully (e.g., skip or replace with replacement character U+FFFD).
- Avoid using innerHTML with untrusted content unless content is known safe; decoding with DOMParser or textContent on a detached element is commonly used and generally safe for decoding entities.

Reference details
- Named entity mapping required for full coverage is large; implement a small map for the common entities above and fall back to DOM decoding when available.
- Example decoder outline: replace(/&(#x?[0-9A-Fa-f]+|[A-Za-z][A-Za-z0-9]+);/g, (m, token) => { if (token[0]==='#') { if (token[1]==='x' || token[1]==='X') return String.fromCodePoint(parseInt(token.slice(2),16)); return String.fromCodePoint(parseInt(token.slice(1),10)); } return NAMED[token] || m; })

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Glossary/Entity
Retrieved: 2026-03-21
Bytes fetched: 178878

Attribution
MDN Web Docs — Character entity references (Glossary).