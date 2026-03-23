JSON_POINTER

Table of contents
1. Syntax
2. Unescaping rules
3. Evaluation algorithm (step-by-step)
4. URI fragment form handling
5. Examples
6. Detailed digest and attribution

1. Syntax
- A JSON Pointer is a sequence of zero or more reference tokens, each prefixed by a '/'. The empty string (zero characters) is a valid pointer and references the whole document.
- Example pointers: "" (root), "/foo", "/foo/0", "/a~1b".

2. Unescaping rules (exact mapping per RFC 6901)
- Replace each occurrence of the two-character sequence "~1" with "/".
- Replace each occurrence of the two-character sequence "~0" with "~".
- Note: Unescaping uses these literal replacements; no other escape sequences are defined by RFC 6901.

3. Evaluation algorithm (step-by-step)
Given a pointer P and a JSON value root:
- If P is the empty string "": evaluation result is root.
- Otherwise: if P begins with the character '/', split P on '/', discarding the initial empty segment; the remaining segments are the reference tokens in order.
- For each token in order:
  a. Unescape the token by replacing "~1" -> "/" and "~0" -> "~".
  b. If the current value is an object: use the unescaped token as a property name; set current = current[ token ] if it exists; otherwise the pointer evaluation fails (unresolvable reference).
  c. If the current value is an array: the token MUST be a base-10 representation of a zero-based index (no leading "+" or other prefixes). Convert to integer i; if i is within bounds set current = current[i]; otherwise evaluation fails.
  d. If the current value is neither object nor array: the pointer evaluation fails.
- After consuming all tokens successfully, the current value is the evaluation result.

4. URI fragment form handling
- When a JSON Pointer appears in a URI fragment (e.g. document.json#/%2Ffoo), the fragment MUST be percent-decoded before applying the JSON Pointer algorithm (per RFC 6901, Section 6).
- Steps: take the fragment after '#', percent-decode it, then apply the rules above. Example: '#/a%2Fb' -> percent-decode -> '/a/b' -> tokens ['a','b'].

5. Examples
- Pointer "" -> returns the whole document.
- Pointer "/foo" -> returns value at property 'foo'.
- Pointer "/foo/0" -> returns first element of array at property 'foo'.
- Pointer "/a~1b" -> token unescaped to 'a/b', so it selects property named 'a/b'.

6. Detailed digest and attribution
- Source: RFC 6901 (JSON Pointer) retrieved 2026-03-23T00:06:02.131Z, 69801 bytes (https://datatracker.ietf.org/doc/html/rfc6901)
- Attribution: RFC 6901, IETF
