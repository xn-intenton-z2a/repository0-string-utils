LEVENSHTEIN

Normalised extract
Overview
Levenshtein distance: the minimum number of single-character edits (insertions, deletions, substitutions) required to change one string into another. Common algorithm: Wagner–Fischer dynamic programming.

Table of contents
1. Definition and use
2. Wagner–Fischer algorithm (DP)
3. Time and space complexity
4. Space-optimised variant
5. Implementation notes and Unicode

1. Definition and use
- Distance between strings a (length m) and b (length n). Useful for fuzzy matching, spell-check, and similarity ranking.

2. Wagner–Fischer algorithm (DP) — steps
- Allocate a matrix d with dimensions (m+1) x (n+1).
- Initialize d[i][0] = i for i in 0..m and d[0][j] = j for j in 0..n.
- For i from 1 to m:
    For j from 1 to n:
      cost = (a[i-1] === b[j-1]) ? 0 : 1
      d[i][j] = min(
        d[i-1][j] + 1,      // deletion
        d[i][j-1] + 1,      // insertion
        d[i-1][j-1] + cost  // substitution
      )
- Result: d[m][n]

3. Time and space complexity
- Time: O(m * n)
- Space: O(m * n) for full matrix

4. Space-optimised variant
- Only two rows are needed at any time (current and previous), reducing space to O(min(m, n)) if rows are chosen for the shorter string.
- Pseudocode for two-row variant: keep arrays prev[n+1] and cur[n+1], initialize prev with 0..n, then iterate i, compute cur[0]=i, fill cur[j] using prev and cur values, swap prev and cur.

5. Implementation notes and Unicode
- When strings are treated as sequences of code points rather than UTF-16 code units, split into arrays of code points (Array.from(string) or use spread [...string]) to correctly handle surrogate pairs and combined grapheme clusters. Consider normalization before comparison if canonical equivalence is required.

Reference details
- Formal description and pseudocode: Wagner–Fischer algorithm (Wagner–Fischer) and Levenshtein distance (Wikipedia) — retrieved sources.
- Example: distance("kitten", "sitting") = 3

Detailed digest
Sources:
- https://en.wikipedia.org/wiki/Levenshtein_distance (retrieved 2026-03-21, bytes fetched: 233657)
- https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm (retrieved 2026-03-21, bytes fetched: 107189)

Attribution
Wikipedia — Levenshtein distance; Wagner–Fischer algorithm.