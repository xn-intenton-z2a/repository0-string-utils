SLUGIFY

Table of contents:
- Purpose
- Implementation steps
- Regex patterns and semantics
- Function signature
- Edge cases and Unicode handling
- Examples
- Supplementary details
- Reference details
- Detailed digest
- Attribution and data size

Purpose:
Produce deterministic URL-friendly slugs: lowercase, hyphen-separated ASCII words, no leading/trailing hyphens, collapse consecutive separators, strip non-alphanumeric characters.

Implementation steps (directly actionable):
1. Input guard: if input is null or undefined return empty string.
2. Unicode compatibility decomposition: use String.prototype.normalize('NFKD') to separate base letters and diacritics.
3. Remove combining diacritics: remove code points in the combining marks block using the Unicode range U+0300–U+036F.
4. Lowercase the string using locale-insensitive toLowerCase().
5. Replace any sequence of non-ASCII-alphanumeric characters with a single hyphen.
6. Trim leading and trailing hyphens and collapse multiple hyphens to one.
7. Return the resulting string.

Regex patterns and semantics (exact):
- Combining marks removal: [\u0300-\u036f]
- Replace non-alphanumeric sequences (ASCII): [^a-z0-9]+ (use after toLowerCase)
- Trim hyphens: ^-+|-+$
- Collapse hyphens: -+

Function signature:
slugify(input: string): string
- input: any; treat null/undefined as empty string
- returns: ASCII-only hyphen-separated slug string

Edge cases and Unicode handling:
- Use 'NFKD' normalization to decompose compatibility equivalents and separate diacritics; remove combining marks to reduce characters like "é" -> "e" + combining acute -> after removal becomes "e".
- Characters that do not decompose to ASCII letters will be removed by the non-alphanumeric replacement step.
- Extremely long inputs: consider truncation after normalization and before trimming to avoid cutting a hyphen or leaving empty output.
- If environment lacks String.prototype.normalize, provide a fallback transliteration map for common accents or return a simplified ASCII-filtered string.

Examples (expected):
- Input: Hello World! -> Output: hello-world
- Input: Café au lait -> Output: cafe-au-lait

Supplementary details:
- Prefer NFKD to NFD when you want compatibility decomposition (e.g., ligatures) before removing diacritics.
- Keep logic deterministic: always lower-case then apply replacements.
- For configurable behavior, allow an optional separator parameter and an optional maximum length.

Reference details (implementation pattern and exact replacements):
function slugify(input: string): string
if (!input) return ''
let s = input.normalize('NFKD')
s = s.replace(/[\u0300-\u036f]/g, '')
s = s.toLowerCase()
s = s.replace(/[^a-z0-9]+/g, '-')
s = s.replace(/^-+|-+$/g, '')
return s

Detailed digest (content sourced and retrieval date):
Extracted core algorithmic steps and canonical patterns from the slugify package README and MDN normalization notes; retrieval date: 2026-03-21.

Attribution and data size:
Source: https://github.com/sindresorhus/slugify
Bytes retrieved during crawl: 392236
