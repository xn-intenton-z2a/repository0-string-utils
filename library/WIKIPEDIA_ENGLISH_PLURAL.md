WIKIPEDIA_ENGLISH_PLURAL

Table of contents:
- Normalised extract: pluralisation rules (basic)
- Rule order and pattern matching
- Edge cases and notes about irregulars
- Reference details (function signature and algorithm)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
Basic English pluralisation rules relevant to simple algorithmic pluralize implementations:
- If a word ends with s, x, z, ch or sh -> add 'es' (e.g., bus -> buses, box -> boxes).
- If a word ends with a consonant followed by 'y' -> drop 'y' and add 'ies' (e.g., party -> parties). Treat vowels as a,e,i,o,u.
- If a word ends with 'f' or 'fe' -> replace with 'ves' (e.g., knife -> knives). Note exceptions exist (roof -> roofs).
- Otherwise append 's'.

Rule order and pattern matching:
- Apply longest-match rules first (check suffixes 'ch' and 'sh' before single-character rules).
- For consonant+y rule, ensure the character before 'y' is not a,e,i,o,u.
- For f/fe rule, match 'fe' before 'f' to avoid double replacement.

Edge cases and irregulars:
- Irregular plurals (child -> children, mouse -> mice) are out of scope for the mission and must be handled via an exceptions dictionary if desired.
- Some words have locale-dependent plurals or historical forms; the basic algorithm covers the majority of regular cases specified by the mission.

Reference details (function signature and algorithm):
- Signature: pluralize(word: string) -> string
- Algorithmic steps:
  1. If word matches /(s|x|z|ch|sh)$/i return word + 'es'
  2. Else if word matches /([^aeiou])y$/i return word.slice(0,-1) + 'ies'
  3. Else if word matches /(fe?)$/i return word.replace(/(fe?)$/, 'ves')
  4. Else return word + 's'

Detailed digest (excerpt and retrieval):
- Source: https://en.wikipedia.org/wiki/English_plural
- Retrieval date: 2026-03-25
- Data obtained: 281483 bytes
- Digest: Wikipedia provides a taxonomy of plural forms in English and many historical and exception cases; the mission uses the simplified rule set listed above.

Attribution:
Content adapted from Wikipedia: English plural. Data size recorded during crawl: 281483 bytes.