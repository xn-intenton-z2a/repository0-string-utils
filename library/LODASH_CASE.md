LODASH_CASE

Table of contents:
- Function signatures
- Word extraction rules used by lodash for case conversion
- Algorithmic steps for camelCase and kebabCase
- Edge cases and behavior notes
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

Function signatures:
- _.camelCase(input: any) -> string
- _.kebabCase(input: any) -> string

Word extraction and processing (authoritative behavior):
- Lodash first converts the input to string and trims surrounding whitespace.
- Words are extracted by splitting on sequences of non-alphanumeric characters and by detecting case transitions (lower-to-upper boundaries) so inputs like "foo-bar_Baz qux" produce words: ["foo","bar","Baz","qux"].
- The extracted words are lowercased for kebabCase; for camelCase the first word is lowercased and subsequent words have their first code unit uppercased while the rest are lowercased.
- Non-alphanumeric characters are removed when joining; underscores, spaces, punctuation act as separators.

Algorithmic steps (direct, implementable):
1. Convert input to string; return empty string for null/undefined input.
2. Split into words by matching sequences of letters and numbers, also split at case transitions.
3. Normalize words by lowercasing (for kebab) or lower-first + capitalize subsequent words (for camel).
4. Join words: kebab uses '-' as separator, camel uses concatenation with initial capital letter on subsequent words.

Edge cases:
- Input with multiple adjacent separators collapses into single separator in kebab-case; camelCase collapses them into word boundaries.
- Locale-sensitive characters are lowercased using default JS toLowerCase (not locale-specific by default).

REFERENCE DETAILS
- camelCase(input) -> string: returns an ASCII/Unicode-preserving camelCased string as described.
- kebabCase(input) -> string: returns a hyphen-joined lowercased string.

DETAILED DIGEST (extracted content, retrieved 2026-03-27):
- Extracted algorithmic behavior for lodash case converters, including word extraction rules and join semantics necessary to reproduce camelCase and kebab-case behavior.
- Retrieval date: 2026-03-27

ATTRIBUTION & CRAWL METADATA
- Source: https://lodash.com/docs/4.17.15#camelCase
- Bytes retrieved: 546681
