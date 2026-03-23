MDN_STRING

Table of contents:
1. Purpose
2. Unicode and normalization
3. Key String methods (signatures)
4. Implementation notes for slugify / casing / truncate / wordWrap
5. Supplementary details and pitfalls
6. Reference details (signatures, behavior)
7. Detailed digest (source extract)
8. Attribution and crawl size

1 Purpose
The JavaScript String object represents a sequence of UTF-16 code units. Practical implementation notes: convert inputs to string early, treat null/undefined as empty string, and be explicit about Unicode normalization when comparing or transforming text.

2 Unicode and normalization
- Normalization forms: NFC, NFD, NFKC, NFKD. Use String.prototype.normalize(form) to normalize. Use NFKD to decompose compatibility characters when removing diacritics.
- JavaScript string length is code unit count (UTF-16). For grapheme-aware operations, use Intl.Segmenter or iterate via spread operator to get code points or grapheme clusters.

3 Key String methods (signatures)
- String.prototype.toLowerCase(): string
- String.prototype.toUpperCase(): string
- String.prototype.toLocaleLowerCase(locales?): string
- String.prototype.normalize(form?: "NFC"|"NFD"|"NFKC"|"NFKD"): string
- String.prototype.trim(): string
- String.prototype.replace(searchValue, replaceValue): string
- String.prototype.split(separator?, limit?): Array<string>
- String.prototype.slice(beginIndex?, endIndex?): string
- String.prototype.charCodeAt(index): number (UTF-16 code unit)
- String.prototype.codePointAt(index): number | undefined (ES6 code point)

4 Implementation notes (practical patterns)
- Slugify (recommended pipeline):
  1. Normalize using NFKD to separate diacritics: s = String(v).normalize('NFKD')
  2. Remove combining marks using Unicode property escape: s = s.replace(/[\p{M}]+/gu, '')
  3. Lowercase (consider locale when needed): s = s.toLowerCase()
  4. Replace non-alphanumeric runs with hyphen: s = s.replace(/[^\p{L}\p{N}]+/gu, '-')
  5. Collapse repeated hyphens: s = s.replace(/-+/g, '-')
  6. Trim leading/trailing hyphens: s = s.replace(/(^-|-$)/g, '')
  This pipeline yields url-friendly ASCII-compatible slugs while preserving Unicode handling.

- camelCase / kebabCase / titleCase (word extraction approach):
  1. Split into words using a Unicode-aware word matcher (examples: match sequences of letters or numbers using \p{L} and \p{N} with flag u).
  2. For camelCase: lowercase first word; capitalize first grapheme of subsequent words; join without separator.
  3. For kebabCase: lowercase all words; join with '-'.
  4. For titleCase: uppercase first grapheme of each word; lowercase remainder of each word.

- Truncate with suffix without breaking words:
  1. If input shorter than or equal to max length, return input.
  2. Otherwise compute available = maxLength - suffix.length.
  3. Take prefix = slice(0, available). If prefix contains whitespace, cut at last whitespace index; otherwise use prefix as-is.
  4. Append suffix. Edge cases: if available <= 0 return suffix truncated to maxLength.

- wordWrap (soft wrap) algorithm:
  1. Split input into paragraphs on existing newline sequences.
  2. For each paragraph, split into tokens by whitespace preserving token boundaries.
  3. Accumulate tokens into lines until adding the next token would exceed width; then start a new line.
  4. If a single token length exceeds width, place it on its own unbroken line.
  5. Join lines with '\n'.

- stripHtml: remove tags first using a conservative tag-removal pattern (e.g., remove <...> sequences while avoiding script/style edge cases), then decode HTML entities (use a library like he to decode numeric and named entities and to handle ambiguous ampersands according to HTML parsing rules).

- escapeRegex: to safely place arbitrary text inside a RegExp, escape the following characters: . * + ? ^ $ { } ( ) | [ ] \ and the backslash. Pattern replacement recommended: replace(/[.*+?^${}()|[\]\\]/g, '\\$&') (use Unicode flags where appropriate).

5 Supplementary details and pitfalls
- Locale-specific casing: toLowerCase()/toLocaleLowerCase() differences exist (Turkish dotted/dotless I). If language-specific correctness is required, use locale-aware methods with appropriate locale parameter.
- Unicode property escapes (\p{...}) require the u flag on RegExp and Node versions that support Unicode property escapes (Node 10+; current Node engines support them).
- Normalization and combining marks: many languages use combining marks; removing them may change meaning in some scripts; only remove when output intent (slug/identifier) tolerates loss.

6 Reference details (implementation-ready)
- Slug normalization example regexes (Unicode-aware):
  - Remove combining marks: /[\p{M}]+/gu
  - Replace non-alphanumeric runs: /[^\p{L}\p{N}]+/gu
  - Collapse hyphens: /-+/g
  - Trim hyphens: /(^-|-$)/g
- Escape regex exact replacer: input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
- Word extraction suggestion (Unicode-aware): use match with /\p{L}+\p{M}*|\p{N}+/gu to extract words and numbers while keeping diacritics attached prior to normalization.

7 Detailed digest (selected technical extracts)
- String normalization forms and usage as per MDN: normalize(form) where form is one of NFC, NFD, NFKC, NFKD; use NFKD to decompose diacritics before stripping them. JavaScript's length is UTF-16 code units; use codePointAt or Intl.Segmenter for grapheme-aware operations.

Date retrieved: 2026-03-23

8 Attribution and crawl data
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
Bytes retrieved during crawl: 197351 bytes

