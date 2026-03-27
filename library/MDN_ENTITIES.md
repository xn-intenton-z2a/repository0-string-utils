MDN_ENTITIES

Table of contents:
- Common named entities and their mappings
- Numeric entity formats (decimal and hex) and decoding algorithm
- Implementation pattern for stripHtml + decode entities
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

Common named entities (direct mapping):
- &amp;  -> &
- &lt;   -> <
- &gt;   -> >
- &quot; -> "
- &apos; -> '
- &nbsp; -> non-breaking space (U+00A0)

Numeric character references:
- Decimal form: &#NNNN; where NNNN is a base-10 code point number. Decode: parseInt(NNNN,10) then String.fromCodePoint(value).
- Hex form: &#xHHHH; where HHHH is hex digits. Decode: parseInt(HHHH,16) then String.fromCodePoint(value).

Actionable implementation pattern to decode entities (two-phase):
1. Replace named entities by direct mapping. Use a small map for common entities used by web content (amp, lt, gt, quot, apos, nbsp). For completeness consult the W3C named character references list.
2. Replace numeric references using regex: replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))) and replace(/&#x([0-9A-Fa-f]+);/g, (_, h) => String.fromCodePoint(parseInt(h,16))).

Implementation note for stripHtml + decode entities:
- To remove tags: remove sequences matching /<[^>]+>/g but beware of scripts, comments and malformed HTML; for robust HTML handling use an HTML parser (jsdom) when accuracy is required.
- Typical lightweight flow for utility: 1) remove tags with /<[^>]*>/g 2) decode named and numeric entities as above 3) normalize whitespace (collapse spaces, trim).

REFERENCE DETAILS
- Named entity mapping: provide the small map above for common entities. For full list consult official reference (W3C/HTML living standard or MDN named character references).
- Numeric decoding algorithm (exact):
  - decimal: match /&#(\d+);/g -> code = Number(match1); char = String.fromCodePoint(code)
  - hex: match /&#x([0-9A-Fa-f]+);/g -> code = parseInt(match1,16); char = String.fromCodePoint(code)

DETAILED DIGEST (extracted content, retrieved 2026-03-27):
- Extracted the glossary of entities and recommended decoding steps from MDN; included the minimal named map and exact numeric decoding expressions required to implement stripHtml and decode entities.
- Retrieval date: 2026-03-27

ATTRIBUTION & CRAWL METADATA
- Source: https://developer.mozilla.org/en-US/docs/Glossary/Entity
- Bytes retrieved: 173685
