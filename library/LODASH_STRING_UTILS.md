LODASH_STRING_UTILS

Table of contents
- camelCase behavior and rules
- kebabCase behavior and rules
- escapeRegExp behavior

camelCase behavior
- Signature: _.camelCase([string='']) -> string
- Behavior: Converts string to lower-case words, removes non-alphanumeric separators, capitalises first letter of each word except first, and concatenates (example: 'Foo Bar' -> 'fooBar').
- Word boundaries: splits on whitespace and punctuation; treat separators as word breaks.

kebabCase behavior
- Signature: _.kebabCase([string='']) -> string
- Behavior: Convert to lower-case words separated by single hyphen '-' with non-alphanumeric removed (example: 'Foo Bar' -> 'foo-bar').

escapeRegExp behavior
- Signature: _.escapeRegExp([string='']) -> string
- Behavior: Escapes RegExp special characters: [\^$.*+?()[]{}|\\] by prefixing with backslash so the result can be used in a literal RegExp.

Reference details (implementation patterns)
- camelCase algorithm: split by non-letter/number, lowercase all words, capitalize leading letter of subsequent words, join without separator.
- kebabCase algorithm: split by non-letter/number, lowercase all words, join with '-'.
- escapeRegExp pattern: string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

Digest
- Source: Lodash docs (camelCase, kebabCase, escapeRegExp); retrieved: 2026-03-21; data size: (HTML crawl captured).

Attribution
- Lodash documentation — https://lodash.com/docs/4.17.21
