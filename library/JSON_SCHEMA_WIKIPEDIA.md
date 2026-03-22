NORMALISED EXTRACT

Table of contents:
- Overview and purpose of JSON Schema
- Draft versions and compatibility notes
- Common use cases relevant to API schema evolution

Overview and purpose of JSON Schema
JSON Schema is a vocabulary that allows annotation and validation of JSON documents. It expresses constraints for shape, required fields, types, enums, and structural patterns. For API schema evolution, JSON Schema is used to assert allowed request/response shapes and to detect breaking interface changes.

Draft versions and compatibility notes
There are multiple drafts of JSON Schema. Draft-07 is widely used and supports the keywords described in the other library documents. When building tools that compare schemas, be explicit about which draft is in use because semantics for $id, $ref base resolution, and dynamic anchor features differ across drafts.

Common use cases relevant to API schema evolution
- Change detection between versions of a response schema to determine compatibility impact.
- Automated validation of request/response payloads in CI before releasing API changes.
- Generation of human-readable change reports for API consumers indicating breaking vs compatible changes.

SUPPLEMENTARY DETAILS

Practical guidance
- Record and normalize the draft version in schema metadata before diffing.
- Prefer schema dereferencing and canonicalization to ensure comparisons proceed on equivalent shapes.

DETAILED DIGEST

Source: Wikipedia - JSON Schema
Retrieved: 2026-03-22
Size fetched: 310.1 KB

Extracted content used: high-level definitions, versioning notes, and common application scenarios for schema diffing tools.

ATTRIBUTION
- URL: https://en.wikipedia.org/wiki/JSON_Schema
- Retrieved: 2026-03-22
- Bytes fetched: 310.1 KB
