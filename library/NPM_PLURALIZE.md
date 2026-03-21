Title: NPM_PLURALIZE

Table of Contents:
- Purpose and capabilities
- API and method signatures
- Rules covered and examples
- Edge cases and notes
- Retrieval digest and attribution

Purpose and capabilities:
- Provide English pluralization and singularization utilities (basic and irregular handling depending on library data). Typical features: pluralize(word), singular(word), plural(word, count, inclusive?).

API and method signatures (common):
- pluralize(word: string, count?: number, inclusive?: boolean): string
  - If count provided and inclusive=true, returns 'count word(s)' (e.g., pluralize('apple', 2, true) -> '2 apples'). If inclusive=false or absent, returns plural or singular form depending on count.
- pluralize.plural(word: string): string
- pluralize.singular(word: string): string

Rules covered by typical library (note: mission requires a basic rule set implemented separately, but this documents the npm package):
- Adds 'es' for words ending in s/x/z/ch/sh
- Replaces consonant+y -> ies
- Replaces f/fe -> ves
- Default: add 's'
- Irregular forms may be included in package dictionaries (e.g., 'children', 'mice') but mission scope excludes irregulars.

Edge cases and notes:
- null/undefined -> coerce to '' before processing.
- Proper nouns and acronyms: pluralization may be naive; review context when used in UI strings.

Retrieval digest:
- Source URL: https://www.npmjs.com/package/pluralize
- Retrieved: 2026-03-21
- Note: npm page returned Cloudflare challenge HTML during automated crawl; API and behaviors above reflect the common interface of the 'pluralize' package; verify details on the live package documentation.