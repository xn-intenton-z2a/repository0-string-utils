WIKIPEDIA_LEVENSHTEIN_DISTANCE

Table of Contents
- Definition
- Algorithm (dynamic programming) with exact recurrence
- Implementation signature and complexity
- Edge cases and Unicode considerations
- Reference details: pseudocode and return type
- Digest and attribution

Definition
Levenshtein distance is the minimum number of single-character edits (insertions, deletions, substitutions) required to change one string into another.

Algorithm (dynamic programming)
- Let s length = m, t length = n. Build (m+1)x(n+1) matrix d.
- Initialization: d[i][0] = i for i=0..m; d[0][j] = j for j=0..n.
- Recurrence for i>0 and j>0: cost = (s[i-1] === t[j-1]) ? 0 : 1; d[i][j] = min( d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + cost ).
- Final distance: d[m][n].

Implementation signature and complexity
- function levenshtein(a, b) -> integer
- Time complexity: O(m*n)
- Space: O(min(m,n)) possible by using two rows for large inputs. A standard implementation uses O(n) space by iterating rows and keeping previous row only.

Edge cases and Unicode
- Operate on code points (Array.from or spread) to ensure surrogate pairs count as single characters: const A = [...String(a||'')]; const B = [...String(b||'')];
- Null/undefined inputs treated as empty strings.

Reference details (pseudocode)
- Compact implementation using two arrays prev and cur:
  prev = [0..n]; for i from 1..m: cur[0]=i; for j from 1..n: cost = (A[i-1]===B[j-1])?0:1; cur[j]=min(prev[j]+1, cur[j-1]+1, prev[j-1]+cost); swap(prev,cur);
- Return prev[n].

Digest
Source: Wikipedia - Levenshtein distance. Retrieval date: 2026-03-21.

Attribution and data size
Source URL: https://en.wikipedia.org/wiki/Levenshtein_distance
Data retrieved: ~228.2 KB
Attribution: Wikipedia