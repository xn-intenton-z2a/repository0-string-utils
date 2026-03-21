REGEXP

Table of contents:
1. Purpose
2. Special characters to escape
3. escapeRegex implementation pattern
4. Flags, Unicode considerations
5. Reference details
6. Detailed digest
7. Attribution

1. Purpose
Provide precise technical guidance for escaping user input to safely embed into a regular expression and for understanding common RegExp meta-characters.

2. Special characters to escape (exact list)
Characters that have special meaning in JavaScript regular expressions and must be escaped when used literally in a pattern: the following 14 characters
.  *  +  ?  ^  $  {  }  (  )  |  [  ]  \  /
Also hyphen (-) can be special inside character classes; escape or place it at class start/end.

3. escapeRegex implementation pattern (explicit)
- Match any of the special characters above with a global RegExp and prefix each with a backslash to neutralise its meta-meaning.
- Practical pattern (plain text): create a RegExp that matches characters in the class [-/\\^$*+?.()|[\]{}] and replace matches by a backslash plus the matched character.
- Outcome: the returned string is safe to interpolate into a RegExp literal or constructor.

4. Flags and Unicode considerations
- If the target RegExp will use Unicode property escapes or the 'u' flag, ensure the escaped input does not accidentally close character classes or introduce surrogate pairs; escaping ensures literals are treated literally.
- When constructing dynamic RegExp via the constructor RegExp(escapedString, flags), be aware that backslashes in the escaped string may need to be preserved as literals.

5. Reference details
- MDN RegExp guide and character lists are the authoritative reference for which characters have special meaning.
- Practical implementation: use a single replace call with a character-class-based pattern and replacement that prefixes a backslash.

6. Detailed digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched: 215652
- Key technical points used: enumeration of RegExp meta-characters and guidance to escape them before building dynamic expressions.

7. Attribution
- MDN Web Docs — Regular Expressions guide, retrieved 2026-03-21, 215652 bytes.
