MDN_STRING

Table of contents
- Core string primitives and signatures
- Normalization and Unicode handling
- Useful methods for implementation

Core string primitives and signatures
- String(value) -> string (constructor/coercion)
- length: integer property returning UTF-16 code unit length
- Methods (signatures):
  - toLowerCase() -> string
  - toUpperCase() -> string
  - trim() -> string
  - charAt(index: number) -> string
  - indexOf(searchValue: string, fromIndex?: number) -> number
  - slice(beginIndex: number, endIndex?: number) -> string
  - substring(start: number, end?: number) -> string
  - replace(searchValue: string|RegExp, replaceValue: string|Function) -> string
  - split(separator?: string|RegExp, limit?: number) -> string[]
  - normalize([form: "NFC"|"NFD"|"NFKC"|"NFKD"]) -> string

Normalization and Unicode handling
- Use str.normalize('NFC') to canonicalize composed characters before comparisons or regex processing.
- For iteration by user-perceived characters use Array.from(str) or for-of iteration to avoid splitting surrogate pairs and combining marks.
- length counts UTF-16 code units; for code point-aware logic use [...str].length.

Useful methods for implementation tasks
- Slugify: sequence: trim -> normalize('NFKD') -> remove non-alphanumerics (use Unicode property escapes) -> toLowerCase -> replace spaces with '-'
- Truncate: measure by code points (Array.from(str)) to avoid breaking surrogate pairs; for "don't break mid-word" find last whitespace before cutoff.
- wordWrap: split on whitespace sequences, accumulate words into lines <= width, place single-overflowing word on its own line unbroken.

Supplementary details
- Regular expressions: use Unicode flag (u) and property escapes (\p{L}, \p{N}) when Node/engine supports it: e.g., /[^\p{L}\p{N}]+/gu to match non-letter/number sequences.
- Entity decoding: use dedicated decoder (see MDN Entity glossary) or map common entities (&amp;, &lt;, &gt;, &quot;, &apos;).

Reference details (exact API snippets)
- String.prototype.replace(searchValue, replaceValue): when searchValue is RegExp with g flag, replaceValue can be string or function(match, p1..., offset, string) returning replacement string.
- String.prototype.normalize(form?: string): forms 'NFC'|'NFD'|'NFKC'|'NFKD'.

Digest
- Source: MDN Web Docs — String reference; retrieved: 2026-03-21; data size: (HTML crawl captured).

Attribution
- MDN contributors (Mozilla) — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
