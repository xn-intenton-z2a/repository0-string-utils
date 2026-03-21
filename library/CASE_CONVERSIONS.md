CASE_CONVERSIONS

Table of contents:
1. Purpose
2. API signatures
3. Normalisation and tokenisation rules
4. camelCase algorithm
5. kebab-case algorithm
6. Unicode considerations and examples
7. Reference details
8. Detailed digest
9. Attribution

1. Purpose
Algorithms and precise steps to convert arbitrary Unicode-containing input into camelCase and kebab-case forms suitable for identifiers and slugs.

2. API signatures
- camelCase(input: string): string
- kebabCase(input: string): string

3. Normalisation and tokenisation rules (exact)
- Step 0: If input is null/undefined return empty string.
- Step 1: Normalize input with normalize('NFKD') and remove combining marks (Unicode Mark category) to reduce diacritics.
- Step 2: Tokenise into word segments by extracting runs of letters and numbers across scripts; use Unicode-aware matching (property escapes for L and N) to gather segments.
- Step 3: Discard empty segments; for each segment perform case folding via toLowerCase().

4. camelCase algorithm (explicit)
- After tokenisation and lowercasing: keep the first segment as-is (lowercased). For each following segment, uppercase the first grapheme of the segment and append the rest unchanged. Concatenate segments without separators.
- Edge cases: If segments contain digits only, preserve digits unchanged.

5. kebab-case algorithm (explicit)
- After tokenisation and lowercasing: join segments with the ASCII hyphen '-' as separator. Remove any leading/trailing hyphens and collapse repeated non-alphanumeric separators into a single hyphen.
- Ensure output is lowercased.

6. Unicode considerations and examples
- Use Unicode property escapes for tokenisation: match sequences of letters and numbers with a global unicode RegExp to capture multilingual tokens.
- Example mapping (informal): "Foo-Bar_baz" -> tokens ["Foo","Bar","baz"] -> camelCase: "fooBarBaz"; kebab-case: "foo-bar-baz".

7. Reference details
- Lodash implementations are reference implementations; their docs for camelCase and kebabCase informed splitting rules.
- Source canonical behaviour: split on non-letter/number boundaries, preserve numerics, apply lowercasing and joining rules as described.

8. Detailed digest
- Sources: https://lodash.com/docs/4.17.21#camelCase and https://lodash.com/docs/4.17.21#kebabCase
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched: 546681 (each anchor resolved to same page), used to derive tokenisation and join behaviour.

9. Attribution
- Lodash docs (camelCase/kebabCase), retrieved 2026-03-21, 546681 bytes.
