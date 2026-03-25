SLUGIFY_README

Table of contents:
- Normalised extract: behaviour and options
- Transliteration and charMap
- Options and defaults
- Reference details (API signature and examples)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
The slugify implementation transliterates non-ASCII characters to ASCII equivalents using a charMap, replaces spaces and separators with a replacement character (default '-'), optionally lowercases the result, and can remove characters matching a provided regex. It supports extend() to add or override mappings.

Transliteration and charMap:
- A charMap maps Unicode characters to ASCII sequences (for example: 'é' -> 'e').
- The library builds a charmap index and applies mappings before separator normalization so that diacritics are replaced rather than removed when possible.

Options and defaults (exact):
- replacement: '-' (string used between tokens)
- remove: undefined (optional RegExp to remove characters; when provided it should be a character-class global regex)
- lower: false (if true, output is lowercased)
- strict: false (strip special characters except replacement when true)
- locale: 'vi' (locale code used to override transliteration for specific languages)
- trim: true (trim leading and trailing replacement chars)

Reference details (API signature and examples):
- Signature: slugify(input: string, options?: { replacement?: string, remove?: RegExp, lower?: boolean, strict?: boolean, locale?: string, trim?: boolean }) -> string
- Example transformations:
  - slugify('some string') -> some-string
  - slugify('some string', '_') -> some_string
- Extensibility: slugify.extend(object) merges provided mappings into the in-memory charMap for subsequent calls. To reset, clear the module cache and require again.

Detailed digest (excerpt and retrieval):
- Source: https://github.com/simov/slugify (README)
- Retrieval date: 2026-03-25
- Data obtained: 1837 bytes (raw README fetched)
- Digest: The README documents usage examples, option semantics, the charmap approach to transliteration and guidance on providing a remove RegExp to strip unwanted characters.

Attribution:
Content adapted from simov/slugify README on GitHub. Data size recorded during crawl: 1837 bytes.