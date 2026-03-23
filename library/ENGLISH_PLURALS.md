NORMALISED EXTRACT

Table of contents
- Core pluralization rules (implementation-ready)
- Edge cases and exceptions (notes)
- Implementation algorithm (step-by-step)
- Examples
- Reference and retrieval metadata

Core pluralization rules (implementation-ready)
1. Words ending in s, x, z, ch, sh: add 'es'
   - Examples: bus -> buses, box -> boxes, buzz -> buzzes, church -> churches, dish -> dishes
2. Words ending with a consonant + 'y': replace 'y' with 'ies'
   - Determine: last letter is 'y' and the preceding character is not a vowel (a, e, i, o, u).
   - Examples: party -> parties, sky -> skies
   - Exceptions: if the preceding letter is a vowel, just add 's' (boy -> boys, day -> days)
3. Words ending in 'f' or 'fe': replace terminal 'f'/'fe' with 'ves'
   - Examples: leaf -> leaves, wife -> wives
   - Note: Not universal; many words simply add 's' (chef -> chefs) — exceptions list required for full correctness.
4. All other regular nouns: add 's'
   - Examples: cat -> cats, book -> books

Edge cases and exceptions
- Irregular plurals (mouse -> mice, child -> children) are explicitly out of scope for the mission; treat these as exceptions if a dictionary is available, otherwise follow rules above.
- Loanwords and words of Latin/Greek origin may have alternate plural forms (analysis, analyses; cactus, cacti); these are out of scope unless an exceptions table is supplied.
- Preserve case and punctuation: apply rules to the alphabetic portion of the token; preserve trailing punctuation; maintain original capitalization where appropriate (Cat -> Cats).

Implementation algorithm (step-by-step, pseudocode-ready)
1. If input is null/undefined/empty -> return empty string (handle edge-case).
2. Extract the core token (strip surrounding punctuation but preserve it to re-attach after pluralizing if desired).
3. Lowercase a temporary copy only for rule checks if case-insensitive checks are easier; apply rules against lowercase but reconstruct capitalization after.
4. Apply rules in order:
   a. If token endsWith any of ["s","x","z","ch","sh"] -> return token + 'es'
   b. Else if token endsWith 'y' and length > 1 and preceding char is consonant -> return token[0:-1] + 'ies'
   c. Else if token endsWith 'fe' -> return token[0:-2] + 'ves'
   d. Else if token endsWith 'f' -> return token[0:-1] + 'ves'
   e. Else -> return token + 's'
5. Re-attach punctuation and restore capitalization pattern if required.

Examples
- bus -> buses
- fox -> foxes
- baby -> babies
- knife -> knives
- book -> books

Reference and retrieval metadata
- Source: English plurals overview (Wikipedia)
- Retrieved: 2026-03-23
- URL: https://en.wikipedia.org/wiki/English_plurals
- Data obtained during crawl: approximately 274.5 KB (HTML page content)

Attribution
- Rules condensed from English plurals reference material (Wikipedia and descriptive sources). Use an exceptions table for production-grade pluralization beyond the mission's basic rules.
