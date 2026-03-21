WIKIPEDIA_LEVENSHTEIN

TABLE OF CONTENTS
1. Definition and metric properties
2. Dynamic programming algorithm (full spec)
3. Space-optimized implementation notes
4. Complexity and trade-offs

NORMALISED EXTRACT
Definition:
- The Levenshtein distance between two strings a and b is the minimal number of single-character edits (insertions, deletions or substitutions) required to change a into b.

Dynamic programming algorithm (exact procedure for implementation):
Given strings a of length m and b of length n.
1) Create an array previous of length n+1 and an array current of length n+1 (or a 2D matrix d of size (m+1) x (n+1)).
2) Initialize previous[j] = j for j = 0..n (distance from empty a[0..0] to prefix of b).
3) For i from 1 to m:
   a) Set current[0] = i
   b) For j from 1 to n:
        cost = (a[i-1] === b[j-1]) ? 0 : 1
        current[j] = min(
          previous[j] + 1,      // deletion (delete a[i-1])
          current[j-1] + 1,     // insertion (insert b[j-1])
          previous[j-1] + cost  // substitution or no-op if cost==0
        )
   c) Copy current into previous (or swap references) and continue.
4) The distance is previous[n] after the final iteration.

Space-optimized variant:
- Only two rows (previous and current) required: memory O(n). For very long strings consider using the shorter string as the inner loop to reduce memory to O(min(m,n)).

Complexity:
- Time: O(m * n)
- Space: O(min(m, n)) for row-optimized implementation; O(m * n) for full matrix if backtrace of edits is required.

REFERENCE SIGNATURE
- levenshtein(a: string, b: string): number  // returns edit distance as integer

DIGEST
Source: https://en.wikipedia.org/wiki/Levenshtein_distance
Retrieved: 2026-03-21
Data obtained during crawl: ~42 KB (truncated)

ATTRIBUTION
Content extracted and normalised from Wikipedia (Levenshtein distance). Check Wikipedia page for full history and references.
