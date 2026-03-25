MDN_STRING_REPLACE

Table of contents:
- Normalised extract: behaviour and patterns
- Replacement function signature and parameters
- Replacement substitution tokens and semantics
- RegExp flags and stateful behavior
- Supplementary details and edge cases
- Reference details (method signature, types)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
String.prototype.replace(searchValue, replaceValue) returns a new string with matched text replaced. searchValue accepts a string or a RegExp. When searchValue is a RegExp with the global flag (g), replace is applied to all matches; otherwise only the first match is replaced. replaceValue can be a string or a function. If a string, the replacement recognizes substitution tokens: $& for the matched substring, $` for the substring before the match, $' for the substring after the match, $n for the nth capture group, $<name> for a named capture group, and $$ for a literal dollar sign. If replaceValue is a function, it is invoked for each match with arguments described below.

Replacement function signature and parameters:
replacer(match, p1, p2, ..., offset, originalString, groups?)
- match: full matched substring
- p1..pn: text of each capture group in order (if present)
- offset: numeric index where the match starts in originalString
- originalString: the entire string being processed
- groups (optional): object of named capture groups when the RegExp uses named captures
The return value from the replacer function is used as the replacement text.

RegExp flags and stateful behavior:
- The g flag causes multiple replacements; when using a shared RegExp object with g, RegExp.lastIndex can advance between calls. Use fresh RegExp instances or avoid shared state to prevent unexpected offsets.
- The u (Unicode) flag changes interpretation of code points, affecting '.' and character classes; use u when working with astral symbols.
- Named capture groups are available in both replacement strings and replacer function via $<name> and the groups object respectively.

Supplementary details and edge cases:
- When searchValue is a plain string it is treated literally; use escape techniques when converting user input into a RegExp.
- Replacement strings interpret dollar constructs even when replacement content looks like normal text; use $$ to insert literal $.
- Be aware of surrogate pairs: prefer using u flag and normalization for consistent behavior with diacritics and composed characters.

Reference details (exact):
- Method: String.prototype.replace(searchValue, replaceValue) -> string
- Parameters:
  - searchValue: string | RegExp
  - replaceValue: string | function(match, ...groups, offset, originalString, groups?) -> string
- Return: string with replacements applied
- Implementation pattern to implement replacer-based replacements: provide a replacer function implementing the signature above; for simple token replacements prefer string replacement patterns described earlier.

Detailed digest (excerpt and retrieval):
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
- Retrieval date: 2026-03-25
- Data obtained: 183108 bytes
- Digest: MDN documents the full semantics described above, enumerates the substitution tokens ($&, $`, $', $n, $<name>, $$) and documents the replacer function signature including the optional groups parameter for named captures. It emphasises RegExp flags (g, u, y) and the stateful nature of RegExp objects.

Attribution:
Content adapted from MDN Web Docs: String.prototype.replace. Data size recorded during crawl: 183108 bytes.