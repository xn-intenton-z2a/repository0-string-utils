NORMALISED EXTRACT

Table of contents:
- allOf: conjunctive composition
- anyOf: disjunctive composition
- oneOf: exclusive disjunction
- not: negation behaviour
- Interaction with properties and required keys

allOf: conjunctive composition
A schema with allOf containing N subschemas validates an instance only if the instance validates against every subschema. For objects, this effectively requires the instance to satisfy all property constraints and other object-level constraints from each subschema. When diffing, allOf nodes should be traversed and each child subschema compared independently; object-level property additions in any child can be additive or conflicting depending on required/additionalProperties rules.

anyOf: disjunctive composition
An instance that validates against any one of the subschemas satisfies anyOf. For diffing, anyOf changes must consider whether a change removes the capability of an instance that matched the before schema to match any subschema in the after schema; such removals can be breaking.

oneOf: exclusive disjunction
Instance must validate against exactly one subschema. Adding a new subschema that overlaps with an existing one may change validation outcomes (could be breaking or informational). For diffing, detect when the number of matching branches for representative instances would change.

not: negation behaviour
not contains a subschema; instance must not validate against that subschema. When present, changes to the not subschema that broaden or narrow the set of instances it excludes must be examined for breaking effects.

Interaction with properties and required keys
Composition keywords do not merge ranked properties automatically. For example, two subschemas under allOf may each declare required arrays; the effective required set is the union of those required constraints for validation. When diffing, evaluate required-added/required-removed by computing effective required sets after composition.

SUPPLEMENTARY DETAILS

Traversal rules for diffing
- When encountering a composition node (allOf/anyOf/oneOf), assign a synthetic path segment for each child index: e.g. /allOf/0/properties/foo for child 0. Diff child schemas recursively and include both child-level changes and an optional aggregated nested-changed at the composition path.
- Effective constraints: for required compute union across allOf; for anyOf/oneOf effective required depends on branch coverage and cannot be reduced to simple union; mark such diffs nested-changed with a note advising manual review.

REFERENCE DETAILS

APIs and signatures
- diffCompositionNode(path: string, keyword: 'allOf'|'anyOf'|'oneOf', beforeList: Array, afterList: Array): Array<ChangeRecord>
  Behavior: recursively diff child lists pairwise by index; for list length differences, report child-added/child-removed as nested-changed; for same-length items, diff each child and surface their child change records.

Best-practices
- Prefer conservative classification: when in doubt about breaking status for complex composition changes, classify as informational and add explanatory human-readable notes.
- Provide detailed nested-changed children so automated consumers can make policy decisions.

DETAILED DIGEST

Source: JSON Schema - mixing and combination documentation (json-schema.org/understanding-json-schema/reference/combining.html)
Retrieved: 2026-03-22
Size fetched: 217.8 KB

Extracted content used: allOf/anyOf/oneOf semantics, examples showing instance validation criteria, and guidance to treat composition nodes as containers requiring recursive diffs.

ATTRIBUTION
- URL: https://json-schema.org/understanding-json-schema/reference/combining.html
- Retrieved: 2026-03-22
- Bytes fetched: 217.8 KB
