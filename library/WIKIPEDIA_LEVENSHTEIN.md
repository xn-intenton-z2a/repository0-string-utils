WIKIPEDIA_LEVENSHTEIN

Table of contents
- Definition and edit operations
- Dynamic programming algorithm and pseudocode
- Complexity and implementation notes

Definition and edit operations
- Levenshtein distance d(a, b) is the minimum number of single-character edits (insertions, deletions, substitutions) required to change string a into b.

Dynamic programming algorithm (implementation-ready)
- Let m = length(a), n = length(b).
- Create matrix D of size (m+1) x (n+1).
- Initialize: D[i][0] = i for i in 0..m; D[0][j] = j for j in 0..n.
- For i from 1..m:
    For j from 1..n:
      cost = a[i-1] === b[j-1] ? 0 : 1
      D[i][j] = min(
        D[i-1][j] + 1,      // deletion
        D[i][j-1] + 1,      // insertion
        D[i-1][j-1] + cost  // substitution
      )
- Result: D[m][n]

Space-optimized implementation
- Keep only two rows prev and curr of length (n+1) to reduce memory to O(n).

Complexity
- Time: O(m*n)
- Space: O(n) with row optimization

Reference details (function signature)
- function levenshtein(a: string, b: string): number
  - Handles null/undefined by treating as empty string.
  - Use code-point aware iteration (Array.from) if counting grapheme clusters is required; basic algorithm operates on code units or code points depending on preprocessing.

Digest
- Source: Wikipedia — Levenshtein distance; retrieved: 2026-03-21; data size: (HTML crawl captured).

Attribution
- Wikipedia contributors — https://en.wikipedia.org/wiki/Levenshtein_distance
