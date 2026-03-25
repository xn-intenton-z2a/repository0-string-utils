LODASH_KEBABCASE

Table of contents:
- Normalised extract: algorithmic behavior
- Separator and character handling
- Unicode and normalization guidance
- Reference details (function signature and behavior)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
kebabCase converts a string to lower-case words separated by hyphens. The algorithm splits the input into words using non-alphanumeric separators (spaces, underscores, punctuation), lowercases tokens, removes or transliterates diacritics if needed, collapses repeated separators, and joins tokens with a single hyphen. For example: 'Foo Bar' -> 'foo-bar'.

Separator and character handling:
- Remove characters that are not word characters except those allowed by locale-specific transliteration.
- Trim leading/trailing separators and collapse multiple separators into one.

Reference details (exact behavior):
- Function signature: kebabCase(input: string) -> string
- Implementation pattern: normalize input, transliterate diacritics, tokenise on non-word separators, lowercase tokens, join with '-'.

Detailed digest (excerpt and retrieval):
- Source: https://lodash.com/docs/4.17.15#kebabCase
- Retrieval date: 2026-03-25
- Data obtained: 549947 bytes
- Digest: Lodash provides a stable kebab-case implementation with consistent rules for tokenization, casing and separator collapse; it recommends normalization/transliteration for consistent behavior across Unicode inputs.

Attribution:
Content adapted from Lodash documentation: kebabCase. Data size recorded during crawl: 549947 bytes.