MDN_ENTITIES

TABLE OF CONTENTS
- Entity types (named, numeric decimal, numeric hex)
- Exact matching regex and decoding algorithm
- Common named entity map (practical set)
- Browser vs server decoding notes
- Reference signatures and patterns
- DETAILED DIGEST
- ATTRIBUTION

ENTITY TYPES
- Named entities: &amp;, &lt;, &gt;, &quot;, &apos;, and many others documented by HTML spec
- Numeric decimal: &#NNN; where NNN is base-10 code point
- Numeric hex: &#xHEX; where HEX is hex code point

MATCHING REGEX (exact)
- Use: /&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+);/g to capture named and numeric entities
  - Group 1 contains either ' #xHEX' or '#NNN' or the name

DECODING ALGORITHM (step-by-step)
1. s.replace(/&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+);/g, function(match, body){
     if body starts with '#x' or '#X': code = parseInt(body.slice(2), 16)
     else if body starts with '#': code = parseInt(body.slice(1), 10)
     else if body is in namedMap: return namedMap[body]
     else: return match (leave unknown entity unchanged)
     return String.fromCodePoint(code)
   })
- The numeric branches handle both decimal and hex. Return the original match for unknown named entities.

COMMON NAMED ENTITY MAP (practical subset)
- amp -> &
- lt -> <
- gt -> >
- quot -> "
- apos -> '
- nbsp -> non-breaking space (U+00A0)
- Provide additional mappings as needed; prefer a small, well-known subset for minimal implementation.

BROWSER VS SERVER
- Browsers expose parsers/DOM that can decode entities (e.g., DOMParser or setting innerHTML on an element). Node without DOM must decode with the algorithm above or use a library.
- For this mission avoid external runtime deps; implement the decoding algorithm above and include a small named map for common entities.

REFERENCE SIGNATURE
- decodeEntities(s: string): string
- Entity regex: /&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+);/g

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Glossary/Entity
- Retrieved at: 2026-03-21T16:53:58Z
- Bytes retrieved: 173689
- Extract: entity categories and recommended decoding strategy; numeric entity decoding via parseInt and String.fromCodePoint; browsers provide DOM-based decoders but server-side needs explicit decode routine.

ATTRIBUTION
- MDN Glossary: Entity. Data fetched on 2026-03-21T16:53:58Z, 173689 bytes.
