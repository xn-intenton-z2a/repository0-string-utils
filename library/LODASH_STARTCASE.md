LODASH_STARTCASE

Normalised extract — table of contents:
- Overview
- Signature
- Behaviour details
- Unicode & edge cases
- Examples

Overview:
startCase converts an input value into Start Case (space-separated words, each word capitalised).

Signature:
startCase([string='']) -> string

Behaviour details:
- Input coercion: null or undefined is treated as an empty string. Non-string inputs are coerced to string.
- Word detection: splits the input on non-alphanumeric separators and on case transitions (camelCase boundaries), preserving digit groups.
- Transformation: the algorithm lowercases the input, splits into words, capitalises the first grapheme of each word, and joins words with single ASCII spaces.
- Output: returns a plain ASCII/Unicode string with words separated by single spaces and each word initial capitalised.

Unicode & edge cases:
- Works with Unicode characters; splitting follows typical word boundary heuristics. Surrogate-pair code points are preserved in practice but implementations operate on UTF-16 code units, so extreme edge-cases should be tested with astral symbols.
- Empty input -> empty string.

Examples (illustrative):
- startCase("foo-bar_baz") -> "Foo Bar Baz"
- startCase("fooBar") -> "Foo Bar"
- startCase(123) -> "123"

Supplementary details:
- There are no optional parameters. The function is idempotent: repeated application yields the same result.
- Typical use: producing human-readable labels or titles from identifiers.

Reference details (API):
- Function: startCase([string=''])
- Parameters:
  - string: (String|any) Optional. Input value to convert. If omitted or nullish, treated as an empty string.
- Returns: String — the Start Case converted string.
- Implementation pattern: to implement, coerce input to string, split on separators and case transitions, lowercase each token, uppercase the first character of each token, join with single spaces.

Detailed digest:
- Source: https://lodash.com/docs/4.17.15#startCase
- Retrieved: 2026-03-25
- Data fetched (HTML): ~537.0 KB
- Extracted technical content: official function signature, behaviour semantics, examples, and notes on Unicode and edge cases.

Attribution:
- Content derived from Lodash documentation (lodash.com), retrieved on 2026-03-25. Lodash is MIT-licensed.