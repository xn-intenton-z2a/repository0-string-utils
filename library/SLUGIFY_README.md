SLUGIFY_README

NORMALISED EXTRACT

Table of contents
- Purpose and behavior
- Public API and options
- Transliteration and char map
- Recommended slugification pipeline

1. Purpose and behavior
- slugify provides a deterministic way to convert arbitrary strings to URL-friendly slugs by transliterating foreign characters, replacing spaces with a separator, removing disallowed characters, collapsing repeated separators, and optionally lowercasing the result.
- It is implemented in vanilla JavaScript and ships a charMap to transliterate many Unicode characters to ASCII equivalents.

2. Public API and options
- Primary usage patterns:
  - slugify(input) -> string (default separator is '-')
  - slugify(input, replacement) -> string (replacement is a character like '_' )
  - slugify(input, { replacement: '-', remove: undefined, lower: false, strict: false, locale: 'vi', trim: true }) -> string
- Options explained:
  - replacement: character used to replace whitespace (default '-')
  - remove: a regex (character class with global flag) to remove matched characters from the result before collapsing separators; or a single-character string to remove
  - lower: convert result to lower case when true
  - strict: if true, strip special characters except the replacement character
  - locale: string code to select locale-specific overrides in transliteration
  - trim: trim leading/trailing replacement characters (default true)

3. Transliteration and char map
- The module ships a charMap mapping many foreign characters to ASCII equivalents and a locales map to override transliteration for specific languages.
- Extending transliteration: slugify.extend({ '☢': 'radioactive' }) updates the in-memory char map for subsequent calls.

4. Recommended slugification pipeline (derived from README)
- Step 1: Transliterate characters using char map (map known Unicode characters to ASCII equivalents).
- Step 2: If normalization is required, apply normalize('NFKD') and remove combining marks before transliteration.
- Step 3: Replace whitespace and separator characters with replacement.
- Step 4: Remove characters matching the remove option or those outside allowed ranges.
- Step 5: Collapse multiple replacements into one, trim replacements from ends, and apply lower-case if requested.

SUPPLEMENTARY DETAILS
- The remove option must be a character class regex with the global flag if provided as a regex (e.g., /[*+~.()'"!:@]/g). If a string is provided it should be a single character.
- Extending the charMap mutates module state; to revert to a fresh charMap delete the module from the require cache and re-import.

REFERENCE DETAILS
- Module functions:
  - slugify(input[, replacement|stringOrOptions]) -> string
  - slugify.extend(mapObject) -> void (mutates the char map used by future calls)
- Behaviour guarantees: no external runtime dependencies; transliteration is best-effort for characters present in charMap.json; unknown characters are stripped when strict mode is used.

DETAILED DIGEST
- Source: https://raw.githubusercontent.com/simov/slugify/master/README.md
- Retrieved: 2026-03-22T23:43:31.711Z
- Bytes fetched: 4185

ATTRIBUTION
- Content extracted from slugify README (simov/slugify).