LEVENSHTEIN

Table of contents:
- Purpose
- Definition
- Exact dynamic-programming algorithm (matrix form)
- Memory-optimized variant (two-row)
- Function signature
- Unicode considerations (iterate codepoints)
- Complexity
- Examples and verification
- Detailed digest
- Attribution and data size

Purpose:
Compute the Levenshtein edit distance (minimum number of insertions, deletions, substitutions) between two strings.

Definition (precise):
Given strings a (length m) and b (length n), the Levenshtein distance d(m,n) is the minimal number of single-character edits (insertion, deletion, substitution) required to change a into b.

Exact dynamic-programming algorithm (matrix form, step-by-step):
1. Allocate a matrix d with dimensions (m+1) x (n+1).
2. Initialize: for i from 0..m: d[i][0] = i. For j from 0..n: d[0][j] = j.
3. For i from 1..m:
     For j from 1..n:
       cost = (a[i-1] === b[j-1]) ? 0 : 1
       d[i][j] = min(
         d[i-1][j] + 1,      // deletion
         d[i][j-1] + 1,      // insertion
         d[i-1][j-1] + cost  // substitution
       )
4. Result is d[m][n].

Memory-optimized variant (two-row rolling array):
- Keep only previousRow and currentRow arrays of length n+1.
- Initialize previousRow[j] = j for j=0..n.
- For i from 1..m:
    currentRow[0] = i
    for j from 1..n:
      cost = (a[i-1] === b[j-1]) ? 0 : 1
      currentRow[j] = min(previousRow[j] + 1, currentRow[j-1] + 1, previousRow[j-1] + cost)
    swap previousRow and currentRow
- Return previousRow[n]

Function signature (exact):
levenshtein(a: string, b: string): number

Unicode considerations (exact guidance):
- Iterate by Unicode codepoints rather than UTF-16 code units to handle astral symbols and composed grapheme clusters.
- Use [...a] and [...b] to get arrays of codepoints before indexing (this uses Array.from with spread and is safe for surrogate pairs).
- If the goal is grapheme-aware distance (treating emoji sequences or combined characters as single units), use a grapheme splitter and apply the algorithm to grapheme clusters.

Complexity:
- Time: O(m * n)
- Space: O(m * n) for full matrix, O(n) for optimized variant.

Examples and verification (canonical):
- Example: levenshtein('kitten', 'sitting') = 3 (kitten -> sitten (sub k->s), sitten -> sittin (sub e->i), sittin -> sitting (insert g)).

Detailed digest:
Algorithm and exact DP recurrence taken from the Levenshtein distance specification and Wikipedia pseudocode; retrieval date: 2026-03-21.

Attribution and data size:
Source: https://en.wikipedia.org/wiki/Levenshtein_distance
Bytes retrieved during crawl: 233640
