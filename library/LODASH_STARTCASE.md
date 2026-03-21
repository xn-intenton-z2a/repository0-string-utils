LODASH_STARTCASE

Table of contents
- Purpose
- Signature
- Behavior and examples
- Implementation notes
- Retrieval digest and attribution

Purpose
startCase converts a string to Start Case: words separated and each capitalised. Useful for Title/Headline-like formatting when input may be camelCase, snake_case, kebab-case or space-separated.

Signature
- _.startCase([string='']) -> string

Behavior
- Splits words on whitespace and punctuation and also separates camelCase boundaries, then capitalizes the first letter of each resulting word and joins with single spaces.
- Examples: _.startCase('fooBar') -> 'Foo Bar'; _.startCase('--foo-bar--') -> 'Foo Bar'; _.startCase('foo_bar') -> 'Foo Bar'

Implementation notes
- Normalizes separators, collapses multiple adjacent separators into single spaces, capitalizes each word's first character and lowercases the rest.
- Null/undefined input -> ''

Retrieval digest
- Source: Lodash startCase docs
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header for lodash docs endpoint when fetched): 28

Attribution
- Source URL: https://lodash.com/docs/4.17.15#startCase