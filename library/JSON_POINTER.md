NORMALISED EXTRACT

Table of contents:
- Pointer syntax and special cases
- Token unescape rules
- Algorithm to resolve a pointer against a JSON document
- Error conditions

Pointer syntax and special cases
A JSON Pointer is either the empty string (which references the whole document) or a string beginning with '/' followed by zero or more reference tokens separated by '/'. Each reference token is a sequence of zero or more unescaped characters or escape sequences.

Token unescape rules
When interpreting tokens, first replace the two-character sequence ~1 with '/' and then replace ~0 with '~'. These are the only escape sequences defined by RFC 6901; do not perform other escapes.

Algorithm to resolve a pointer against a JSON document (implementation-ready)
- Input: document (object or array), pointer (string).
- If pointer is the empty string, return the document root.
- If pointer does not start with '/', throw Error('Invalid JSON Pointer: must be empty or start with /').
- Strip the leading '/'. Split the remaining string on '/'. For each token in order:
  - Unescape token: replace ~1 => /, ~0 => ~.
  - If current value is an object, use token as the property name and set current = current[token]; if property missing, throw Error('JSON Pointer target not found: ' + token).
  - Else if current value is an array, token must be a decimal representation of a non-negative integer; parse to index and set current = current[index]; if index out of bounds, throw Error('JSON Pointer index out of bounds: ' + token).
  - Else throw Error('Cannot apply JSON Pointer token to non-container at token: ' + token).
- After applying all tokens, return current.

Error conditions
- Unrecognized escape sequences are not valid: only ~0 and ~1 allowed.
- Array index tokens must be non-negative integers with no leading plus/minus signs.
- Tokens that do not correspond to object properties or valid array indices cause an error.

REFERENCE DETAILS

API signature
- resolveJsonPointer(document: any, pointer: string): any
  - document: JSON object/array to traverse
  - pointer: RFC6901 pointer string (empty string permitted)
  - returns: the referenced value or throws an Error describing the failure

Example operational notes (no code block):
- For pointer '#/definitions/User/properties/email', when used as a fragment after a URI, drop the leading '#' and pass '/definitions/User/properties/email' to resolveJsonPointer.
- When integrating with dereferenceLocalRefs, always resolve pointers against the canonical document root used by dereferenceLocalRefs.

DETAILED DIGEST

Source: RFC 6901 - JSON Pointer
Retrieved: 2026-03-22
Size fetched: 71.6 KB

Extracted content used: formal pointer grammar, escape sequence rules (~0, ~1), empty string meaning, and element-by-element application semantics.

ATTRIBUTION
- URL: https://datatracker.ietf.org/doc/html/rfc6901
- Retrieved: 2026-03-22
- Bytes fetched: 71.6 KB
