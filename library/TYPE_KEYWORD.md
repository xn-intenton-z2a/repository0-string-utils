TYPE_KEYWORD

Table of contents
1. Allowed simple types (Draft-07)
2. Representation and normalization rules
3. Comparison algorithm for type changes
4. Classification heuristics (breaking/compatible/informational)
5. Detailed digest and attribution

1. Allowed simple types (Draft-07)
- Valid literal type names: array, boolean, integer, null, number, object, string.
- The "type" keyword may be either a single string or an array of strings (set semantics).

2. Representation and normalization rules
- Normalise type value to a set of strings for comparison. Example: "string" -> {"string"}; ["string","null"] -> {"string","null"}.
- Implementations should canonicalise order and remove duplicates.

3. Comparison algorithm for type changes
Given beforeTypes and afterTypes (both as sets):
- If beforeTypes equals afterTypes -> no type change.
- If beforeTypes is a strict subset of afterTypes -> change is type-changed; classification: compatible (widening the allowed set).
- If afterTypes is a strict subset of beforeTypes -> change is type-changed; classification: breaking (narrowing allowed set).
- If sets intersect but neither is subset of the other -> change is type-changed; classification: informational (caller decision) or conservative: breaking.
- For scalar single-type-to-single-type changes (e.g., "string" -> "number"), emit type-changed with before: "string" and after: "number" and classify as breaking.

4. Classification heuristics (examples)
- "string" -> ["string","null"]: compatible (adds null acceptance).
- ["string","number"] -> ["number"]: breaking (removes string acceptance).
- "integer" -> "number": expanding integer to number allows decimals; classify as compatible since number is a superset of integer.

5. Detailed digest and attribution
- Type keyword reference: https://json-schema.org/understanding-json-schema/reference/type.html (retrieved 2026-03-23T00:06:02.131Z, 155820 bytes)
- Meta-schema type list: Draft-07 meta-schema simpleTypes enumeration (retrieved 2026-03-23T00:06:02.131Z, 4979 bytes)
