SLUGIFY

Table of contents
- Overview
- API
- Options (replacement, remove, lower, strict, locale, trim)
- Implementation notes (transliteration, character map, removal rules)
- Examples
- Supplementary details
- Reference details (signatures, behaviors)
- Retrieval digest and attribution

Overview
The slugify function converts arbitrary Unicode strings into URL-friendly slugs using a Unicode charmap transliteration followed by normalization: collapse whitespace to a single replacement, remove characters matching the `remove` pattern, optionally lowercase, optionally enforce strict removal of non-alphanumeric (except replacement), then trim leading/trailing replacement characters.

API
slugify(input[, replacementOrOptions]) -> string
- input: string (coerced). Null/undefined -> empty string.
- replacementOrOptions: either a single-character replacement string or an options object.

Options (explicit)
- replacement (string) — separator replacing whitespace and removed characters. Default: '-'.
- remove (RegExp) — characters to remove from the result after transliteration. If provided it must be a global character-class RegExp (example: /[*+~.()'"!:@]/g).
- lower (boolean) — convert final slug to lower case. Default: false.
- strict (boolean) — if true, strip characters other than alphanumeric and the replacement. Default: false.
- locale (string) — locale code used to override default transliterations when available.
- trim (boolean) — trim leading/trailing replacement chars. Default: true.

Implementation notes
- Transliteration: a charMap maps many Unicode codepoints to ASCII sequences; the library performs a mapping pass before any regexp-based removals.
- Replacement collapsing: consecutive whitespace + punctuation replaced by a single replacement character.
- remove must be a character-class global RegExp when used for predictable behavior.
- Extending charMap: slugify.extend({ '☢': 'radioactive' }) mutates the mapping for the process; to reset, clear module cache and re-require.
- Null/undefined input handling: treat as empty string and return ''.

Examples
- slugify('some string') -> 'some-string'
- slugify('some string', '_') -> 'some_string'
- slugify('unicode ♥ is ☢') -> 'unicode-love-is' (default charMap maps heart to 'love')
- slugify('Some Title', { lower: true, strict: true }) -> 'some-title'

Supplementary details
- Character map: large JSON of codepoint-to-string mappings; prefer adding locale-specific overrides to the locales file rather than editing the shared charMap.
- Performance: single-pass transliteration + a few regex replacements; no external dependencies.

Reference details (concrete)
- Signature: slugify(string, options?) -> string
- remove example: remove: /[*+~.()'"!:@]/g (must be global and a character class)
- Behavior: apply transliteration -> apply remove -> collapse whitespace/separators into replacement -> optionally lowercase/strict -> trim.

Retrieval digest
- Source: simov/slugify README (raw)
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header): 4185

Attribution
- Source URL: https://github.com/simov/slugify (README)
- License and authorship preserved in the original repository.