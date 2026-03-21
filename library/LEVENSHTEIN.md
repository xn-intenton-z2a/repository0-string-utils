LEVENSHTEIN

Table of contents:
1. Purpose
2. Definition
3. Algorithm (dynamic programming) with exact steps
4. Memory-optimized variant
5. Complexity
6. Reference details
7. Detailed digest
8. Attribution

1. Purpose
Provide a precise, implementable algorithm for computing the Levenshtein (edit) distance between two strings.

2. Definition
Levenshtein distance between strings a (length m) and b (length n) is the minimum number of single-character insertions, deletions, or substitutions required to change a into b.

3. Algorithm (explicit DP steps)
- Create a matrix d with dimensions (m+1) x (n+1).
- Initialize d[i][0] = i for i from 0..m and d[0][j] = j for j from 0..n.
- For i from 1..m:
  For j from 1..n:
    cost = (a[i-1] === b[j-1]) ? 0 : 1
    d[i][j] = min( d[i-1][j] + 1,    // deletion
                   d[i][j-1] + 1,    // insertion
                   d[i-1][j-1] + cost ) // substitution
- Return d[m][n]
- Example: distance('kitten','sitting') = 3 (substitute k->s, e->i, insert g)

4. Memory-optimized variant
- Only two rows are required at a time: previous and current. Use arrays of length n+1 and update in-place, keeping a temporary variable for the diagonal value.
- This reduces space complexity from O(mn) to O(n).

5. Complexity
- Time: O(m * n)
- Space: O(m * n) for full matrix, O(min(m, n)) for optimized two-row approach.

6. Reference details
- Function signature: levenshtein(a: string, b: string): number
- Ensure correct handling of empty and null/undefined inputs: treat null/undefined as '' (empty string).

7. Detailed digest
- Source: https://en.wikipedia.org/wiki/Levenshtein_distance
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched: 220940
- Key technical points used: DP formulation, initialization, recurrence relation, and optimized memory variant.

8. Attribution
- Wikipedia — Levenshtein distance, retrieved 2026-03-21, 220940 bytes.
