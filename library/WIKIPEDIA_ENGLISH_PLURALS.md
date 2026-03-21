WIKIPEDIA_ENGLISH_PLURALS

Table of contents
- Core pluralization rules (actionable)
- Implementation ordering and edge cases
- Examples

Core pluralization rules
1. If word ends with s, x, z, ch, sh -> add 'es' (e.g., 'bus' -> 'buses', 'box' -> 'boxes')
2. If word ends with consonant + 'y' -> replace 'y' with 'ies' (e.g., 'city' -> 'cities')
3. If word ends with 'f' or 'fe' -> replace with 'ves' (e.g., 'wife' -> 'wives', 'leaf' -> 'leaves')
4. Otherwise add 's' (e.g., 'dog' -> 'dogs')

Implementation ordering (must check in this sequence)
- Check irregulars first if included (out of scope for this mission).
- Apply special endings (s/x/z/ch/sh) before generic rules.
- For f/fe rule, ensure exceptions handled (e.g., 'roof' -> 'roofs' is exception if exceptions list provided).

Examples
- 'bus' -> 'buses'
- 'baby' -> 'babies'
- 'knife' -> 'knives'
- 'cat' -> 'cats'

Reference details (function signature)
- function pluralize(word: string): string
  - Treat null/undefined as empty string -> return ''
  - Apply regex tests in order: /(s|x|z|ch|sh)$/i -> word + 'es'
  - /([^aeiou])y$/i -> replace y with 'ies'
  - /(fe?)$/i -> replace with 'ves'
  - fallback -> word + 's'

Digest
- Source: Wikipedia — English plurals; retrieved: 2026-03-21; data size: (HTML crawl captured).

Attribution
- Wikipedia contributors — https://en.wikipedia.org/wiki/English_plural
