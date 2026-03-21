WIKIPEDIA_LEVENSHTEIN

TABLE OF CONTENTS
- Definition
- Full dynamic programming algorithm (pseudocode)
- Space-optimized variant (rolling arrays)
- Time and space complexity
- Example worked case
- Reference signature
- DETAILED DIGEST
- ATTRIBUTION

DEFINITION
- Levenshtein distance is the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into another.

DYNAMIC PROGRAMMING ALGORITHM (pseudocode)
- Let a = source string of length m, b = target string of length n
- Create matrix d with dimensions (m+1) x (n+1)
- Initialize: for i from 0 to m: d[i][0] = i ; for j from 0 to n: d[0][j] = j
- For i from 1 to m:
    For j from 1 to n:
        cost = (a[i-1] === b[j-1]) ? 0 : 1
        deletion = d[i-1][j] + 1
        insertion = d[i][j-1] + 1
        substitution = d[i-1][j-1] + cost
        d[i][j] = min(deletion, insertion, substitution)
- Result = d[m][n]

SPACE-OPTIMIZED (rolling arrays)
- Only two rows are needed at a time: previousRow and currentRow
- Initialize previousRow as 0..n
- For each i from 1..m compute currentRow[0] = i then fill currentRow[j] using previousRow and currentRow[j-1]
- After finishing a row set previousRow = currentRow

COMPLEXITY
- Time: O(m * n)
- Space: O(n) with rolling arrays (where n is length of shorter string when optimized)

EXAMPLE
- "kitten" vs "sitting" -> distance = 3 (substitute k->s, substitute e->i, insert g)

REFERENCE SIGNATURE
- levenshtein(a: string, b: string): number

DETAILED DIGEST
- Source URL: https://en.wikipedia.org/wiki/Levenshtein_distance
- Retrieved at: 2026-03-21T16:53:58Z
- Bytes retrieved: 220940
- Extract: algorithm, initialization, and optimization strategies; the pseudocode above follows the standard presentation.

ATTRIBUTION
- Wikipedia: Levenshtein distance (retrieved 2026-03-21T16:53:58Z, 220940 bytes).
