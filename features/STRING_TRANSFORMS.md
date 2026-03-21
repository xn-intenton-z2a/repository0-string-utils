# STRING_TRANSFORMS

Description

Group feature covering case transformations and slug generation. Implements four named exports: Slugify, camelCase, kebabCase, and titleCase. Each function must be exported as a named function from src/lib/main.js and be safe for null/undefined input, returning an empty string for nullish values.

API

Slugify(input): string
- Normalize input with String.prototype.normalize('NFKD') where available, remove combining diacritics (U+0300–U+036F), lowercase, replace any sequence of non-ASCII alphanumeric characters with a single hyphen, collapse multiple hyphens, trim leading/trailing hyphens.
- Unicode characters that do not map to ASCII letters are removed.

camelCase(input): string
- Convert a string of words or separators into camelCase: lower-case the first word, capitalize the first letter of subsequent words, remove separators (spaces, underscores, hyphens, punctuation).

kebabCase(input): string
- Convert input to lower-case, split on word boundaries and separators, and join with single hyphens. Collapse multiple separators.

titleCase(input): string
- Capitalize the first letter of each word, lower-case other letters in the word. Preserve culturally appropriate casing for Unicode where possible (use toLocaleUpperCase/toLocaleLowerCase if required).

Edge cases

- Input null or undefined returns empty string.
- Input that is already ASCII should be processed deterministically.
- Preserve characters where applicable after normalization; remove diacritics for slug output.

Acceptance Criteria

- Slugify of "Hello World!" produces "hello-world".
- camelCase of "foo-bar-baz" produces "fooBarBaz".
- kebabCase of "Foo Bar Baz" produces "foo-bar-baz".
- titleCase of "hello world" produces "Hello World".
- All four functions return empty string for null and undefined inputs.
- All functions are exported as named exports from src/lib/main.js.
- Unit tests exist for ASCII, accented characters, multiple separators, and empty inputs.

Tests (implementation guidance)

- Provide unit tests that assert exact string outputs for the examples above and include Unicode examples such as "Café au lait" -> slugify -> "cafe-au-lait".