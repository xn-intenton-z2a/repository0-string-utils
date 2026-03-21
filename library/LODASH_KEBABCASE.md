Title: LODASH_KEBABCASE

Table of Contents:
- Purpose and signature
- Transformation rules
- Edge cases
- Examples
- Reference details
- Retrieval digest

Purpose and signature:
kebabCase([string='']) -> string
- Converts input to kebab-case: lowercased words separated by hyphens ('-').

Transformation rules:
- Splits on non-alphanumeric boundaries and transitions from lower-to-upper-case (word boundaries).
- Lowercases all word fragments and joins them with '-'.
- Collapses multiple separators into a single hyphen.

Edge cases:
- null/undefined -> returns empty string.
- Leading/trailing separators are removed in the output.
- Unicode letters preserved and lowercased per JS locale-insensitive rules.

Examples:
- kebabCase('Foo Bar') -> 'foo-bar'
- kebabCase('fooBarBaz') -> 'foo-bar-baz'

Reference details:
- Signature: kebabCase(value: any): string

Retrieval digest:
- Source URL: https://lodash.com/docs/4.17.15#kebabCase
- Retrieved: 2026-03-21
- Attribution: Lodash documentation.