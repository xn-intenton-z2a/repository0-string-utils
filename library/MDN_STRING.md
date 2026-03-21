MDN_STRING

Table of Contents
- Overview
- Prototype methods and signatures
- Normalised extract: implementation-relevant details
- Supplementary details: Unicode, edge cases, null/undefined handling
- Reference details: full method signatures and effects
- Digest: source section and retrieval date
- Attribution and data size

Overview
The JavaScript String object represents immutable sequences of UTF-16 code units. Strings may contain Unicode code points encoded as one or two code units; functions should treat input as a sequence of code points when needed (use Intl or [...str] for true code points).

Prototype methods and signatures
- length (property): number of UTF-16 code units
- charAt(index): returns single 16-bit unit as string
- codePointAt(pos): returns numeric Unicode code point
- fromCodePoint(...codePoints): creates string from code points
- concat(...strings): returns concatenated string
- includes(searchString, position=0): boolean
- indexOf(searchValue, fromIndex=0): number
- lastIndexOf(searchValue, fromIndex=Infinity): number
- slice(start, end): substring between code unit indices
- substring(start, end): similar to slice but swaps args when negative
- split(separator, limit): array of substrings
- replace(searchValue, replaceValue): supports string or RegExp
- replaceAll(searchValue, replaceValue): replaces all occurrences
- toLowerCase()/toUpperCase(): locale-insensitive case mapping
- normalize(form="NFC"): Unicode normalization (NFC/NFD/NFKC/NFKD)

Normalised extract: implementation-relevant details
- Use String.prototype.normalize('NFC') to canonicalise composed characters before operations that compare glyphs (slugify, pluralize, equality).
- To iterate real Unicode code points use for...of or Array.from(str) or [...str] so surrogate pairs are preserved.
- When truncating by character count to be visually correct with Unicode combine marks, normalize to NFC and operate on code points.
- Treat null or undefined inputs as empty string; coerce via String(value || '').

Supplementary details
- length counts UTF-16 code units; emoji and many non-BMP characters count as length 2; prefer codePoint-aware operations when measuring "characters".
- toLowerCase/toUpperCase are not locale-aware enough for some languages (Turkish I); avoid assuming perfect case folding unless Intl.Collator or locale options used.

Reference details (exact signatures and behavior)
- String.prototype.includes(searchString[, position]) -> Boolean: returns true if searchString present.
- String.prototype.indexOf(searchValue[, fromIndex]) -> Number
- String.prototype.replace(searchValue, replaceValue) -> String: if searchValue is a RegExp with global flag, use replaceAll for all occurrences. If replaceValue is a function, it receives (match, p1.., offset, string).
- String.prototype.normalize([form]) -> String: form is one of NFC, NFD, NFKC, NFKD. Default is NFC.

Digest
Source: MDN String reference. Retrieval date: 2026-03-21. Extracted content focuses on methods, Unicode handling, normalization guidance, and exact method signatures necessary for implementing robust string utilities.

Attribution and data size
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
Data retrieved: ~198.7 KB
Attribution: MDN Web Docs (Mozilla)