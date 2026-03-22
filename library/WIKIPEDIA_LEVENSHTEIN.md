WIKIPEDIA_LEVENSHTEIN

NORMALISED EXTRACT

Table of contents
- Definition
- Dynamic programming algorithm (matrix form)
- Space-optimised implementations
- Complexity and practical notes

1. Definition
- Levenshtein distance is the minimum number of single-character edits (insertions, deletions, substitutions) required to change one string into another.

2. Dynamic programming algorithm (matrix form)
- Let a be source string of length m and b be target string of length n.
- Build a matrix d with dimensions (m+1) x (n+1).
- Initialize d[i][0] = i for 0 <= i <= m and d[0][j] = j for 0 <= j <= n.
- For i from 1 to m and j from 1 to n compute:
  - cost = 0 if a[i-1] == b[j-1] else 1
  - d[i][j] = minimum of:
    - d[i-1][j] + 1    (deletion)
    - d[i][j-1] + 1    (insertion)
    - d[i-1][j-1] + cost (substitution)
- The distance is d[m][n].
- Example: distance between "kitten" and "sitting" is 3.

3. Space-optimised implementations
- Only the previous row is required to compute the current row; using two arrays of length n+1 reduces memory from O(m*n) to O(n).
- For further optimisation when n << m swap roles so the smaller string determines array size (use O(min(m,n)) memory).

4. Complexity and practical notes
- Time complexity O(m * n).
- Space complexity O(min(m, n)) with row-optimised approach.
- Unicode considerations: operate on code points rather than UTF-16 code units; use Array.from or for...of to enumerate user-perceived characters when computing the distance for Unicode strings.

SUPPLEMENTARY DETAILS
- When comparing large texts consider alternative metrics (e.g., Damerau–Levenshtein for transpositions) or approximate algorithms for performance.
- For short strings the standard dynamic programming algorithm is appropriate and straightforward to implement.

REFERENCE DETAILS
- Function signature: levenshtein(a: string, b: string) -> integer distance
- Implementation pattern: coerce inputs to strings, normalize inputs (optional), convert to arrays of code points, run DP with row optimisation for memory.

DETAILED DIGEST
- Source: https://en.wikipedia.org/wiki/Levenshtein_distance
- Retrieved: 2026-03-22T23:43:31.711Z
- Bytes fetched: 233656

ATTRIBUTION
- Content extracted from Wikipedia (Levenshtein distance).