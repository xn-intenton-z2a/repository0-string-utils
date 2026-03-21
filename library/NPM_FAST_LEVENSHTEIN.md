Title: NPM_FAST_LEVENSHTEIN

Table of Contents:
- Purpose and signature
- Algorithmic behavior
- API surface and usage patterns
- Edge cases and performance notes
- Retrieval digest and attribution

Purpose and signature:
- Compute Levenshtein edit distance (minimum edits: insertions, deletions, substitutions) between two strings.
- Common API: levenshtein.get(a: string, b: string): number
  - Returns integer >= 0 representing edit distance.

Algorithmic behavior:
- Typically implements dynamic programming matrix (row-by-row) optimized for speed and memory.
- Time complexity O(m*n) where m and n are lengths of inputs; optimized implementations reduce memory to O(min(m,n)).

Edge cases and performance:
- null/undefined inputs: coerce to '' before computation.
- Unicode: algorithm works on JS string code units; for grapheme/Unicode-aware distance use a preprocessing step that tokenizes by grapheme clusters.
- Large strings: distance computation can be expensive; consider early exit when distance exceeds a threshold.

Retrieval digest:
- Source URL: https://www.npmjs.com/package/fast-levenshtein
- Retrieved: 2026-03-21
- Note: npm site returned Cloudflare JS challenge HTML during automated crawl; API above reflects the common exported function of the package (levenshtein.get). Validate exact export name when importing (some packages export as a default function or as an object with .get).
- Attribution: fast-levenshtein (npm).