JSON_SCHEMA_TYPE

Table of contents
1. "type" keyword syntax and valid values
2. Semantics and subtype relations (integer vs number)
3. Union types and comparison rules for diffs
4. Implementation patterns and API signatures
5. Supplementary details and best practices
6. Reference details (exact rules)
7. Detailed digest (source + retrieval)
8. Attribution

1. "type" keyword syntax and valid values
- Valid primitive type names: null, boolean, object, array, number, integer, string
- The "type" keyword accepts either a single string or an array of strings (union of allowed types). Examples:
  - "type": "string"
  - "type": ["string","null"] (allows string or null)

2. Semantics and subtype relations
- "integer" is a numeric type that is a subset of "number". Any instance valid as integer is valid as number, but not vice versa.
- When comparing types, treat arrays as logical OR: an instance satisfies the type if it matches any listed member.

3. Union types and comparison rules for diffs
- To detect a breaking type change between "before" and "after": compute the set intersection S = types(before) ∩ types(after).
  - If S is empty, the change is breaking (no instance that satisfied the old type satisfies the new type).
  - If S is non-empty, the change may be compatible; further checks may be required for subschema-level constraints (minLength, format, etc.).
- Normalisation rules for comparison:
  - If type is string -> treat as single-element set {type}.
  - Treat "integer" as distinct from "number" when comparing sets, but apply subset logic when reasoning about compatibility.
- Examples:
  - before: "string" -> after: ["string","null"] => compatible (new type is superset)
  - before: "integer" -> after: "number" => compatible (integer subset of number)
  - before: ["string"] -> after: ["number"] => breaking

4. Implementation patterns and API signatures
- normalizeType(typeField: string | string[]) -> string[]
  - Returns an array of canonical type names with "integer" and "number" preserved; callers may apply numeric-subset rules separately.
- isTypeChangeBreaking(beforeType, afterType) -> boolean
  - Compute canonical sets, apply numeric-subset rule, and check intersection emptiness.
- When diffing schemas, perform type comparison before deeper recursive comparisons: if types are disjoint, you can short-circuit and mark type-changed as breaking.

5. Supplementary details and best practices
- When types include complex compositions (type + anyOf/oneOf), resolve compositions before strict type comparison or treat changes as nested-changed and recurse.
- Consider format, pattern, minLength, and similar constraints: type equality alone is insufficient to determine compatibility if constraints change meaningfully.
- For classification heuristics: treat changes that widen the allowed types as compatible; changes that narrow them (remove types or replace with disjoint types) as breaking.

6. Reference details (exact rules)
- Type canonicalisation:
  - if typeof field === 'string' => [field]
  - if Array.isArray(field) => field as-is, but deduplicate
- Numeric subset rule:
  - if before contains "integer" and after contains "number" => treat as compatible union (but if after removes "integer" and leaves only non-numeric types => evaluate intersection normally).

7. Detailed digest
- Source: https://json-schema.org/understanding-json-schema/reference/type.html
- Retrieval date: 2026-03-22
- Bytes fetched during crawl: 160640 bytes
- Extracted sections: grammar of the "type" keyword, valid type identifiers, union semantics, and guidance for compatibility decisions.

8. Attribution
- Source page: JSON Schema official site — Understanding JSON Schema: Type-specific Keywords (https://json-schema.org/understanding-json-schema/reference/type.html)

