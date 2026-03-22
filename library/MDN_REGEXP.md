MDN_REGEXP

NORMALISED EXTRACT

Table of contents
- RegExp syntax and special characters
- Flags and behavior
- Methods and string interactions
- Escaping user input for RegExp

1. RegExp syntax and special characters
- Special characters with syntactic meaning: . ^ $ * + ? ( ) [ ] { } \ | /
- Character classes: [abc], negated classes [^a-z], shorthand classes: \d, \w, \s and their uppercase negations.
- Use character class escapes and ranges for compact sets; take care with hyphen placement inside classes.

2. Flags and behavior
- Common flags: g (global), i (ignore case), m (multiline), u (unicode), y (sticky), s (dotAll).
- The u (unicode) flag enables full Unicode mode and changes behavior of escapes and quantifiers; prefer u when processing Unicode text.

3. Methods and string interactions
- RegExp.prototype.test(string) -> boolean
- RegExp.prototype.exec(string) -> match array or null
- String.prototype.match, matchAll, replace, split accept RegExp; when providing a string pattern dynamically use new RegExp(pattern, flags) with pattern escaped.

4. Escaping user input for RegExp
- To safely escape literal text for insertion into a RegExp use an escaping function that prefixes special characters with backslash. A reliable pattern is: replace every occurrence of characters . * + ? ^ $ { } ( ) | [ ] \ with a backslash-prefixed version. Practical implementation pattern:
  - Use a replace with the class of special characters and replace each match with a backslash + match.
  - Example escape regex pattern to match special chars: [.*+?^${}()|[\]\\]
  - Replacement semantics: prefix matched char with backslash.

SUPPLEMENTARY DETAILS
- When building RegExp from user-supplied strings use an explicit escape step, then construct with the desired flags. If Unicode handling is required include the 'u' flag and ensure input is normalized if you expect to operate on decomposed sequences.
- Avoid building complex patterns by concatenation of raw user input; escape first.

REFERENCE DETAILS
- RegExp literal syntax: /pattern/flags
- RegExp constructor: new RegExp(patternString, flagsString)
- Recommended escaping recipe (pseudocode):
  - For input string s, perform s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") to return an escaped string safe for RegExp constructor.

DETAILED DIGEST
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- Retrieved: 2026-03-22T23:43:31.711Z
- Bytes fetched: 221808

ATTRIBUTION
- Content extracted from MDN Web Docs (Regular Expressions guide).