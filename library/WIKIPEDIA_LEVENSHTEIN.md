WIKIPEDIA_LEVENSHTEIN

Table of contents:
- Problem definition and cost model
- Standard dynamic programming algorithm (pseudocode)
- Time and space complexity and optimizations
- Example calculation
- Implementation notes and edge cases
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

Problem definition:
- Levenshtein distance between two strings a and b is the minimum number of single-character edits (insertions, deletions, substitutions) required to change a into b.
- Cost model: insertion=1, deletion=1, substitution=1 (standard Levenshtein).

Standard dynamic programming algorithm (implementable pseudocode):
- Let n = length(a), m = length(b)
- If n == 0 return m; if m == 0 return n
- Create a matrix d with dimensions (n+1) x (m+1)
- For i from 0 to n: d[i][0] = i
- For j from 0 to m: d[0][j] = j
- For i from 1 to n:
    For j from 1 to m:
      cost = (a[i-1] === b[j-1]) ? 0 : 1
      d[i][j] = min(
        d[i-1][j] + 1,        // deletion
        d[i][j-1] + 1,        // insertion
        d[i-1][j-1] + cost    // substitution
      )
- Return d[n][m]

Space-optimized variant (directly implementable):
- Keep only two rows: previous and current; update current[j] using previous[j], current[j-1], previous[j-1]. This reduces space to O(min(n,m)).

Complexity:
- Time: O(n*m)
- Space: O(n*m) naive, O(min(n,m)) optimized

Example (concrete):
- a = "kitten", b = "sitting"
- Levenshtein distance = 3
  - kitten -> sitten (substitute k->s)
  - sitten -> sittin (substitute e->i)
  - sittin -> sitting (insert g)

Edge cases and notes:
- Treat strings as sequences of code points for Unicode correctness; if operating on code units (UTF-16) treat surrogate pairs carefully or iterate code points using for..of.
- For large strings consider heuristics or vendor-specific optimized libraries (bit-parallel algorithms) for small alphabet cases to improve speed.

REFERENCE DETAILS
- API: levenshtein(a: string, b: string) -> number
  - returns non-negative integer representing minimal edit distance under insertion/deletion/substitution costs of 1 each.

DETAILED DIGEST (extracted content, retrieved 2026-03-27):
- Extracted the canonical DP formulation, pseudocode, and complexity from Wikipedia's Levenshtein article to implement a correct and testable function.
- Retrieval date: 2026-03-27

ATTRIBUTION & CRAWL METADATA
- Source: https://en.wikipedia.org/wiki/Levenshtein_distance
- Bytes retrieved: 220882
