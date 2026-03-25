LODASH_CAMELCASE

Table of contents:
- Normalised extract: algorithmic behavior
- Word boundary and separator handling
- Unicode and normalization guidance
- Reference details (function signature and behavior)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
camelCase converts a string to lower camel case by splitting the input into words using non-alphanumeric separators, lowercasing the words, joining them with no separators, and capitalizing the first letter of each word except the first. Separators include spaces, hyphens, underscores and punctuation; consecutive separators collapse into a single boundary. Leading separators are ignored and trailing separators trimmed. For example: 'foo-bar baz' -> 'fooBarBaz'.

Word boundary handling:
- Tokenize on Unicode-aware word boundaries; treat digits and letters as word characters.
- Collapse multiple separators into single word breaks.
- Preserve alphanumeric sequences; remove or transliterate diacritics prior to tokenization for consistent results.

Reference details (exact behavior):
- Function signature: camelCase(input: string) -> string
- Implementation pattern: normalize input, transliterate/remove diacritics if necessary, split on separators, lowercase all tokens, first token remains lowercase, subsequent tokens capitalize first grapheme and append remainder, join tokens without separators.

Detailed digest (excerpt and retrieval):
- Source: https://lodash.com/docs/4.17.15#camelCase
- Retrieval date: 2026-03-25
- Data obtained: 549947 bytes
- Digest: Lodash documents a robust camelCase implementation that handles multiple separators and Unicode-aware tokenization; it lowercases and then concatenates tokens with capitalization of interior words.

Attribution:
Content adapted from Lodash documentation: camelCase. Data size recorded during crawl: 549947 bytes.