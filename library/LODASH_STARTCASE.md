Title: LODASH_STARTCASE (Title Case)

Table of Contents:
- Purpose and signature
- Transformation rules
- Edge cases and examples
- Reference details
- Retrieval digest

Purpose and signature:
startCase([string='']) -> string
- Converts input into words with the first letter of each word capitalized and words separated by single spaces.

Transformation rules:
- Splits on separators and word boundaries (including camelCase boundaries).
- Uppercases the first character of each resulting word fragment; remaining characters are left as-is (or lowercased if input was normalized beforehand).
- Joins words with single spaces.

Edge cases and examples:
- startCase('fooBar') -> 'Foo Bar'
- startCase('--foo-bar--') -> 'Foo Bar'
- null/undefined -> ''

Reference details:
- Signature: startCase(value: any): string

Retrieval digest:
- Source URL: https://lodash.com/docs/4.17.15#startCase
- Retrieved: 2026-03-21
- Attribution: Lodash documentation.