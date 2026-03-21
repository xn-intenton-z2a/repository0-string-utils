MDN_STRING

TABLE OF CONTENTS
- Key APIs and signatures
- Unicode normalization and diacritic removal
- Case conversion and trimming
- Replacement patterns used for slugify/kebab
- Implementation patterns (slugify, truncate, camelCase, kebabCase, titleCase, wordWrap)
- Supplementary details and edge cases
- Reference details (exact method signatures and regexes)
- DETAILED DIGEST
- ATTRIBUTION

KEY APIS AND SIGNATURES
- String.prototype.normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD") -> string
- String.prototype.trim() -> string
- String.prototype.toLowerCase() -> string
- String.prototype.toUpperCase() -> string
- String.prototype.slice(start?: number, end?: number) -> string
- String.prototype.split(separator?: string|RegExp, limit?: number) -> string[]
- String.prototype.replace(searchValue: string|RegExp, replaceValue: string|function) -> string
- String.prototype.length -> number
- String.prototype.codePointAt(pos: number) -> number | undefined

UNICODE NORMALIZATION & DIACRITIC REMOVAL (actionable)
- Use normalization form NFKD (compatibility decomposition) to separate base characters from combining marks: normalize('NFKD')
- Remove combining marks using Unicode property escapes: replace(/\p{M}/gu, '')  (\p{M} matches marks)
- Combined pattern to remove diacritics: s.normalize('NFKD').replace(/\p{M}/gu, '')
- Use the 'u' flag and property escapes; Node >=24 supports this reliably.

CASE CONVERSION & TRIMMING
- Convert to lower case with toLowerCase(). Use toUpperCase() for title-case first letters.
- Trim whitespace with trim() before further processing to avoid leading/trailing separators.

REPLACEMENT PATTERNS (slugify/kebab)
- Keep only letters and numbers (Unicode-aware): replace(/[^\p{L}\p{N}\s-]/gu, '')
- Collapse whitespace/underscore to single separator: replace(/[\s_]+/g, '-')
- Collapse repeated separators: replace(/-+/g, '-')
- Trim leading/trailing separators: replace(/^-+|-+$/g, '')
- Full slug pipeline (conceptual):
  1. s = input || '' (handle null/undefined)
  2. s = s.normalize('NFKD').replace(/\p{M}/gu, '')
  3. s = s.replace(/[^\p{L}\p{N}\s-]/gu, '')
  4. s = s.replace(/[\s_]+/g, '-')
  5. s = s.replace(/-+/g, '-')
  6. s = s.replace(/^-+|-+$/g, '')
  7. return s.toLowerCase()

IMPLEMENTATION PATTERNS (concise actionable rules)
- Slugify(input: string): string
  - Normalise and remove diacritics, remove non-alphanumerics, convert whitespace to hyphens, collapse, trim, lowercase.
  - Edge cases: empty/null -> '' ; preserve Unicode letters; use 'u' flag in regex.

- Truncate(input: string, maxLen: number, suffix: string = '…') -> string
  - If input is null/undefined return ''
  - If input.length <= maxLen return input
  - Let allow = maxLen - suffix.length; if allow <= 0 return suffix.slice(0, maxLen)
  - Find last whitespace index <= allow; if found return input.slice(0, lastSpaceIndex).trimEnd() + suffix
  - Otherwise return input.slice(0, allow) + suffix
  - Do not break words unless single word longer than maxLen in which case place it unbroken and append suffix if truncated

- camelCase(input: string) -> string
  - Normalize, remove non-letter/number separators, split on separators and case transitions, lowercase all tokens, keep first token lowercased, capitalize first letter of subsequent tokens, then join.
  - Example: "foo-bar-baz" -> "fooBarBaz"

- kebabCase(input: string) -> string
  - Same tokenisation as camelCase but join tokens with '-' and lowercase all tokens.
  - Example: "Hello World" -> "hello-world"

- titleCase(input: string) -> string
  - Tokenize on whitespace/separators, for each token uppercase first code point and lowercase remainder, join with single space.

- wordWrap(text: string, width: number) -> string
  - If width <= 0 return original text
  - Split text into words on whitespace
  - Iterate words appending to current line while (currentLineLength + 1 + word.length) <= width; else push current line and start new line
  - If a single word.length > width, place that word on its own line unbroken
  - Use '\n' as line separator

- stripHtml(s: string) -> string
  - Remove tags with a simple safe pass: replace(/<[^>]*>/g, '') ; note this is not an HTML parser; for robust decoding use an HTML parser when available
  - Decode entities after tag removal using entity decoding rules (see MDN_ENTITIES)

- escapeRegex(s: string) -> string
  - Escape regex special characters with: replace(/[.*+?^${}()|[\]\\]/g, '\\$&') ; this pattern lists all JS regex-special characters and uses replacement of matched text prefixed with backslash

PLURALIZE (summary of rules required by mission)
- If word ends with s/x/z/ch/sh -> add 'es' (regex: /(?:s|x|z|ch|sh)$/i)
- If word ends with consonant + 'y' -> replace 'y' with 'ies' (regex: /([b-df-hj-np-tv-z])y$/i)
- If word ends with 'f' or 'fe' -> replace with 'ves' (regex: /(f|fe)$/i)
- Otherwise add 's'
- Irregulars (mouse/mice etc.) are out of scope

SUPPLEMENTARY DETAILS & EDGE CASES
- Always guard for null/undefined inputs and return '' per mission requirement
- Use Unicode-aware regex (u flag) and property escapes (\p{L}, \p{N}, \p{M}) for correct multilingual behavior
- For environments lacking Unicode property escapes, fallback to a simpler ASCII-only approach or a normalization map

REFERENCE DETAILS (exact patterns & signatures)
- Remove diacritics: normalize('NFKD') then replace(/\p{M}/gu, '')
- Keep only letters/numbers: replace(/[^\p{L}\p{N}\s-]/gu, '')
- Separator collapse: replace(/[\s_]+/g, '-') and replace(/-+/g, '-')
- Trim separators: replace(/^-+|-+$/g, '')
- escapeRegex pattern: /[.*+?^${}()|[\]\\]/g replacement: '\\$&'

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- Retrieved at: 2026-03-21T16:53:58Z
- Bytes retrieved: 197349
- Extract: authoritative list of String.prototype methods and behavior used above. Key actionable items extracted: normalize forms, importance of 'u' flag for Unicode property escapes, exact method names and parameter semantics.

ATTRIBUTION
- Content derived from MDN Web Docs: JavaScript String reference (see above URL). Data fetched on 2026-03-21T16:53:58Z, 197349 bytes.
