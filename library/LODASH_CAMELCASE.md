Title: LODASH_CAMELCASE

Table of Contents:
- Purpose and signature
- Word splitting and transformations
- Edge cases and behavior
- Implementation pattern and examples
- Reference details
- Retrieval digest and attribution

Purpose and signature:
camelCase([string='']) -> string
- Converts input to camelCase: words are lowercased, non-alphanumeric separators are removed and subsequent words are capitalized.

Word splitting and transformations:
- Non-alphanumeric characters (spaces, hyphens, underscores, punctuation) are treated as word separators.
- Leading separators are ignored; first word is entirely lowercased; subsequent words have first code point uppercased.
- Unicode letters are supported; casing uses JavaScript's built-in toLowerCase/toUpperCase semantics on code units where appropriate.

Edge cases and behavior:
- Passing null/undefined: lodash coerces to empty string before processing; final result is "".
- Multiple adjacent separators collapse into single word boundaries.
- Numeric segments: preserved and concatenated; e.g. "version 2.0" -> "version20" then camel-cased accordingly.
- Non-ASCII characters: treated as letters; behavior depends on JS Unicode case mappings.

Implementation pattern and examples:
- Implementation outline: normalize input to string, split on non-alphanumeric sequences, lowercase all words, capitalize each word except the first, join without separators.
- Example: camelCase('Foo Bar') -> 'fooBar'
- Example: camelCase('--foo-bar--') -> 'fooBar'

Reference details (API specifics):
- Signature: camelCase(value: any): string
- Behavior: returns a new string; never throws for null/undefined; handles Unicode where JS case conversions are defined.

Retrieval digest:
- Source URL: https://lodash.com/docs/4.17.15#camelCase
- Retrieved: 2026-03-21
- Attribution: Lodash documentation (lodash.com) — technical behavior and options condensed.