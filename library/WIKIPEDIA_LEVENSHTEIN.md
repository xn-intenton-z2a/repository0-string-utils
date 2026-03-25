WIKIPEDIA_LEVENSHTEIN

Table of contents:
- Normalised extract: recurrence relation and DP algorithm
- Space-optimised implementation
- Complexity and correctness notes
- Reference details (function signature and pseudocode)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
Levenshtein distance between strings a (length m) and b (length n) is defined by the minimal number of single-character edits (insertions, deletions, substitutions) required to change a into b. The dynamic programming recurrence is:
- d(0, j) = j for j in 0..n
- d(i, 0) = i for i in 0..m
- d(i, j) = min( d(i-1, j) + 1, d(i, j-1) + 1, d(i-1, j-1) + cost )
where cost = 0 if a[i-1] == b[j-1], otherwise 1.

Space-optimised implementation:
- Only two rows of the DP table are necessary: previous and current. Iterate i from 1..m, compute current row from previous, then swap rows. This yields O(n) extra memory and O(m*n) time.

Complexity and correctness:
- Time complexity: O(m * n)
- Space complexity: O(min(m, n)) with row-swapping optimization
- Correctness follows from optimal substructure: each prefix solution depends only on smaller prefixes and the three elementary edit operations.

Reference details (function signature and pseudocode):
- Signature: levenshtein(a: string, b: string) -> number
- Pseudocode (row-optimised):
  1. If length(a) < length(b) swap a and b (ensures b is shorter for memory)
  2. Initialize prev row as 0..n
  3. For i from 1 to m:
     - Set current[0] = i
     - For j from 1 to n:
         cost = a[i-1] == b[j-1] ? 0 : 1
         current[j] = min(prev[j] + 1, current[j-1] + 1, prev[j-1] + cost)
     - Swap prev and current
  4. Return prev[n]

- Example: levenshtein('kitten','sitting') -> 3

Detailed digest (excerpt and retrieval):
- Source: https://en.wikipedia.org/wiki/Levenshtein_distance
- Retrieval date: 2026-03-25
- Data obtained: 233989 bytes
- Digest: Wikipedia documents the DP recurrence, provides pseudocode and describes variants (Damerau–Levenshtein with transpositions). The standard Levenshtein algorithm uses the recurrence above and can be optimized for memory by retaining only two rows.

Attribution:
Content adapted from Wikipedia: Levenshtein distance. Data size recorded during crawl: 233989 bytes.