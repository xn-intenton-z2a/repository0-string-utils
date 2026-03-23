LEVENSHTEIN

Table of contents:
1. Definition and use-case
2. Exact algorithm (dynamic programming)
3. Space-optimized variant
4. Complexity
5. Implementation-ready pseudocode and edge cases
6. Digest and attribution

1 Definition
Levenshtein distance is the minimum number of single-character insertions, deletions, and substitutions required to change one string into another.

2 Exact algorithm (DP matrix)
Let A be length m and B length n. Construct a (m+1) by (n+1) matrix D where D[i][j] is the edit distance between A[0..i-1] and B[0..j-1]. Initialization:
- D[0][j] = j for j=0..n
- D[i][0] = i for i=0..m
Transition for i>0 and j>0:
- cost = 0 if A[i-1] === B[j-1] else 1
- D[i][j] = min(D[i-1][j] + 1,    // deletion
                D[i][j-1] + 1,    // insertion
                D[i-1][j-1] + cost) // substitution
The answer is D[m][n].

3 Space-optimized variant
Only two rows are needed (previous and current). Iterate i from 1..m and compute current row from previous row using the same recurrence; then swap rows. This reduces memory from O(mn) to O(min(m,n)).

4 Complexity
Time: O(m * n)
Space: O(min(m, n)) for optimized implementation; O(m * n) for full matrix.

5 Implementation-ready pseudocode
- If either string is null/undefined, treat as empty string.
- If one string is empty, return length of the other.
- Use the two-row optimization: allocate array prev of length n+1 initialized to 0..n; for i from 1..m compute curr[0]=i then for j from 1..n compute insertion, deletion, substitution as above; after row computed assign prev=curr.
- Ensure comparison uses exact code point equality; if desired treat grapheme clusters by normalizing and splitting into arrays of graphemes before computing distance (costlier but grapheme-aware).

6 Digest and attribution
Source: https://en.wikipedia.org/wiki/Levenshtein_distance
Date retrieved: 2026-03-23
Bytes retrieved during crawl: 220924 bytes
