NORMALISED EXTRACT

Table of contents:
- Primary specification links and their purpose
- Core RFCs and cross-references
- Recommended canonical pages for implementers

Primary specification links and their purpose
- http://json-schema.org/draft-07/json-schema-validation.html  -- Core validation specification for Draft-07. Defines keyword semantics: properties, required, items, enum, allOf/oneOf/anyOf, not, and $ref evaluation.
- http://json-schema.org/draft-07/schema  -- Draft-07 JSON Meta-Schema (core schema describing schema structure and keywords).
- https://datatracker.ietf.org/doc/html/rfc6901  -- JSON Pointer (fragment identifier syntax used to resolve $ref fragments).
- https://json-schema.org/understanding-json-schema/  -- Canonical "Understanding JSON Schema" guides: structuring, objects, arrays, combining, types.
- https://json-schema.org/specification-links.html  -- Aggregated list of specification documents and historical drafts.

Core RFCs and cross-references
- RFC 6901 (JSON Pointer) -- fragment resolution for $ref; pointers start with a leading slash and use ~0/~1 escapes for ~ and / respectively.
- RFC 3986 (URI syntax) -- $ref values are URI references; resolution semantics use RFC3986 base resolution rules when resolving remote refs (remote refs are out of scope for this mission).

Recommended canonical pages for implementers
- Use the Draft-07 validation document as the authoritative source for keyword semantics when implementing diffing behaviour.
- Use the Draft-07 meta-schema (http://json-schema.org/draft-07/schema) to validate schema shape and to derive exact allowed fields for change detection.

SUPPLEMENTARY DETAILS

- When resolving local $ref, interpret the fragment component as a JSON Pointer (RFC6901). Implementation must support the exact escape sequences: ~0 -> ~ and ~1 -> /.
- The meta-schema enumerates allowed keywords and their types (e.g., "properties" is an object mapping to subschemas; "required" is an array of strings). Rely on meta-schema definitions to guide the diff algorithm when determining whether a change is structural or metadata-only.

REFERENCE DETAILS

Important links (as listed on specification-links)
- Draft-07 validation: https://json-schema.org/draft-07/json-schema-validation.html
- Draft-07 meta-schema: https://json-schema.org/draft-07/schema
- Official guide: https://json-schema.org/understanding-json-schema/
- JSON Pointer (RFC 6901): https://datatracker.ietf.org/doc/html/rfc6901
- Specification index: https://json-schema.org/specification-links.html

DETAILED DIGEST

Source: JSON Schema — Specification Links
Retrieved: 2026-03-22
Bytes fetched: 154006

The specification-links page aggregates official specification documents, meta-schemas, and auxiliary standards (such as RFC 6901 for JSON Pointer). It is used as a reference index rather than containing normative keyword semantics; use the linked validation and meta-schema documents for authoritative rules.

ATTRIBUTION
- URL: https://json-schema.org/specification-links.html
- Retrieved: 2026-03-22
- Bytes fetched: 154006
