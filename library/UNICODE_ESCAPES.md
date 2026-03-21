UNICODE_ESCAPES

Table of contents:
1. Purpose
2. Syntax and flags
3. Common properties used in text processing
4. Implementation patterns
5. Caveats and runtime support
6. Reference details
7. Detailed digest
8. Attribution

1. Purpose
Explain Unicode property escapes in JavaScript RegExp and how to use them to target classes such as marks, letters, numbers, punctuation and separators for text-normalisation tasks.

2. Syntax and flags
- Syntax: Use the property escape form within a RegExp: \p{PropertyName} or \p{Script=...}
- Required flags: the 'u' (unicode) flag is required for property escapes; use 'g' for global matching when replacing multiple occurrences.

3. Common properties for string utilities
- \p{M}: Mark (combining marks). Use to strip diacritics after NFKD decomposition.
- \p{L}: Letter (all scripts). Useful when extracting words in Unicode-aware ways.
- \p{N}: Number (digits in all scripts).
- \p{P}: Punctuation.
- \p{Z}: Separator (spaces, line separators).

4. Implementation patterns
- To remove diacritics: after normalize('NFKD') replace all matches of \p{M} with ''. Use RegExp with flags 'gu'.
- To extract words across scripts: match sequences of letters and numbers using a pattern combining \p{L} and \p{N} with the 'gu' flags, then join segments.
- Use property escapes in char classes as needed to compose precise matching sets; always include 'u' flag.

5. Caveats and runtime support
- Older JavaScript engines may not support \p{}; verify Node/V8 or browser support. If unavailable fall back to explicit combining-mark ranges or a small library.
- Property names and script names are case-insensitive on MDN; prefer canonical names (L, M, N, P, Z) for portability.

6. Reference details
- Practical RegExp construction: new RegExp('\\p{M}', 'gu') to match all combining marks; in string-literal form escape backslashes appropriately.

7. Detailed digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_property_escapes
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched: 204282
- Key technical points used: property escape syntax, required 'u' flag, common property categories (L, N, M, P, Z) and usage patterns for removal and tokenisation.

8. Attribution
- MDN Web Docs — Unicode property escapes, retrieved 2026-03-21, 204282 bytes.
