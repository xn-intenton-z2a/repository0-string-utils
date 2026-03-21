ENGLISH_PLURALS

Table of contents
- Overview
- Core pluralisation rules (concrete)
- Implementation pattern for basic pluralize function
- Examples
- Edge cases and limitations
- Retrieval digest and attribution

Overview
Basic English pluralisation rules implemented in many simple pluralize utilities are rule-based and not exhaustive. They cover the regular plural forms required by the mission: s/x/z/ch/sh -> add 'es'; consonant+y -> change to 'ies'; f/fe -> change to 'ves'; default -> add 's'. Irregular nouns (mouse/mice, child/children) are out of scope.

Core rules (applied in order)
1. If the word ends with s, x, z, ch or sh -> append 'es'. Examples: 'bus' -> 'buses', 'box' -> 'boxes', 'match' -> 'matches'.
2. If the word ends with a consonant followed by 'y' -> replace 'y' with 'ies'. Examples: 'party' -> 'parties'. If vowel+y (e.g., 'boy'), just add 's' -> 'boys'.
3. If the word ends with 'f' or 'fe' -> replace 'f'/'fe' with 'ves'. Examples: 'wolf' -> 'wolves', 'wife' -> 'wives'.
4. Otherwise -> append 's'. Examples: 'cat' -> 'cats'.

Implementation pattern (pseudo-JS)
- Coerce input to string and handle null/undefined -> ''
- lower-case matching when necessary (original case preserved optionally)
- if (/([sxz]|ch|sh)$/.test(word)) return word + 'es'
- if (/[^aeiou]y$/.test(word)) return word.slice(0,-1) + 'ies'
- if (/(?:fe|f)$/.test(word)) return word.replace(/(?:fe|f)$/, 'ves')
- return word + 's'

Examples
- pluralize('bus') -> 'buses'
- pluralize('box') -> 'boxes'
- pluralize('party') -> 'parties'
- pluralize('boy') -> 'boys'
- pluralize('knife') -> 'knives'

Edge cases and limitations
- Irregular plurals are not handled; callers can supply an exceptions map to override. Example: exceptions = { 'mouse': 'mice', 'child': 'children' }.
- Proper nouns and uncountable nouns require domain-specific exceptions.
- Unicode and diacritics: rules operate on codepoints; normalization may be required for accented endings.

Retrieval digest
- Source: Wiktionary Appendix: English plurals (rules and examples)
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header): 38840

Attribution
- Source URL: https://en.wiktionary.org/wiki/Appendix:English_plurals
- Wiktionary content licensed under CC-BY-SA; consult source for full text.