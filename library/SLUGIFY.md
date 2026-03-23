SLUGIFY

Table of contents:
1. Purpose and typical usage
2. API signature and options
3. Core algorithm (implementation blueprint)
4. Options semantics and examples
5. Locales, charMap and extending character mappings
6. Digest and attribution

1 Purpose
Provide URL-friendly identifiers: lowercase, hyphen-separated, ASCII-friendly when possible, remove or transliterate non-URL characters.

2 API signature
- slugify(input: string, options?: object) -> string
- Recognized options (based on simov/slugify README):
  - replacement: string; default '-'. Replaces spaces and runs of non-alphanumeric characters.
  - remove: RegExp | undefined; if provided, remove characters matching this regular expression (must be a character class with global flag if a RegExp).
  - lower: boolean; default false; when true convert output to lower case.
  - strict: boolean; default false; when true strip special characters except the replacement.
  - locale: string; optional locale code to apply locale-specific overrides.
  - trim: boolean; default true; trim leading/trailing replacement characters.

3 Core algorithm (blueprint)
1. Coerce input to string; treat null/undefined as empty string.
2. Normalize input using NFKD if transliteration or diacritic removal is desired.
3. Transliterate characters via a character map to ASCII where defined.
4. If options.remove is provided, remove matching characters using the provided RegExp or single-character string rule.
5. Replace runs of spaces/non-alphanumeric with the replacement string.
6. If strict is enabled, remove remaining special characters except the replacement token.
7. Trim repeated replacements and leading/trailing replacements if trim is true.
8. Apply lower casing if lower is true.

4 Options semantics and examples
- remove: must be a character class regex with global flag (example: /[*+~.()'"!:@]/g). If a string is provided it should be a single character.
- replacement: any string used as separator; common choices are '-' or '_'.
- extend: the slugify library exposes an extend method to add or override entries in the character map used for transliteration.

5 Locales and charMap
- The library uses a primary charmap.json with many transliterations; locale overrides can be provided in locales.json to alter transliterations for a specific language.
- To support additional symbols or override mappings for a locale, update charmap or provide locale-specific entries.

6 Digest and attribution
Source: https://github.com/simov/slugify (README extracted)
Date retrieved: 2026-03-23
Bytes retrieved during crawl: 287291 bytes
