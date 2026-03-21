ENGLISH_PLURALS

Table of contents:
- Purpose
- Scope and limitations
- Exact pluralization rules required by mission
- Regex patterns and replacement rules (exact)
- Function signature
- Examples
- Edge cases and notes about irregulars
- Detailed digest
- Attribution and data size

Purpose:
Provide a deterministic, rule-based English pluralization function covering common regular rules required by the mission (irregulars out of scope).

Scope and limitations:
- Handles a basic set of English pluralization rules specified by the mission.
- Irregular plurals (mouse/mice, child/children) and uncountable nouns are out of scope and should be handled via an exceptions map if needed.

Exact pluralization rules (implementation-ready):
1. If word ends with s, x, z, ch, or sh (case-insensitive), append "es".
   - Pattern: (?:s|x|z|ch|sh)$  -> replacement: word + 'es'
2. If word ends with a consonant followed by 'y', replace 'y' with 'ies'.
   - Pattern: ([^aeiou])y$  -> replacement: '\1ies'
3. If word ends with 'f' or 'fe', replace with 'ves'.
   - Patterns: f$ -> replace with 'ves'; fe$ -> replace with 'ves'
   - Note: This will cover words like 'leaf' -> 'leaves', 'knife' -> 'knives'
4. Otherwise append 's'.

Regex patterns and replacement rules (exact expressions):
- Rule 1: /(?:s|x|z|ch|sh)$/i  => word + 'es'
- Rule 2: /([^aeiou])y$/i       => word.replace(/y$/i, 'ies') with preserved prefix
- Rule 3: /(fe)$|f$/i           => word.replace(/(fe|f)$/i, 'ves')
- Fallback: append 's'

Function signature (exact):
pluralize(word: string): string
- Input normalized to lower-case only for matching; return should preserve original case if required by caller (optional enhancement).

Examples (expected):
- 'bus' -> 'buses'
- 'box' -> 'boxes'
- 'baby' -> 'babies'
- 'leaf' -> 'leaves'
- 'cat' -> 'cats'

Edge cases and irregulars:
- Some words ending in 'f' simply add 's' (e.g., 'roof' -> 'roofs'); to handle these correctly maintain an exceptions map.
- Words ending in 'o' sometimes take 'es' (e.g., 'hero' -> 'heroes', but 'photo' -> 'photos'); out of scope unless exceptions map provided.

Detailed digest:
Rules compiled from English pluralization summaries and examples; retrieval date: 2026-03-21.

Attribution and data size:
Source: https://en.wikipedia.org/wiki/English_plurals
Bytes retrieved during crawl: 281098
