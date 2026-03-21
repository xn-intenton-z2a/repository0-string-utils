Title: UNICODE_CASEFOLDING

Table of Contents:
- Purpose and scope
- File format and status flags
- Representative entries and examples
- How to apply simple vs full case folding
- Retrieval digest and attribution

Purpose and scope:
- CaseFolding.txt provides the mappings used to perform case-insensitive matching by folding characters to a canonical form.
- Full folding (F) may map to multiple code points; simple folding (S) maps to a single code point.

File format (exact machine-readable format):
- <code>; <status>; <mapping>; # <name>
- Status values:
  - C: common mapping (applies to both simple and full mappings)
  - F: full mapping (may expand to multiple code points)
  - S: simple mapping (single-code-point mapping, differs from F)
  - T: special mapping for uppercase I and dotted uppercase I (Turkic)

Representative entries (verbatim examples from source):
- 0041; C; 0061; # LATIN CAPITAL LETTER A
- 0049; C; 0069; # LATIN CAPITAL LETTER I
- 0049; T; 0131; # LATIN CAPITAL LETTER I  (Turkic special)
- 00DF; F; 0073 0073; # LATIN SMALL LETTER SHARP S (folds to 'ss' in full mapping)
- 0130; F; 0069 0307; # LATIN CAPITAL LETTER I WITH DOT ABOVE

How to apply simple vs full case folding:
- Simple folding: use mappings with status C and S (produces single-code-point outputs).
- Full folding: use mappings with status C and F (may expand strings but yields better equivalence for matching, e.g., allow 'Fuß' == 'FUSS').
- T-status mappings are optional and used for Turkic locales when desired; they change behavior for I/I-dot mappings as in SpecialCasing.

Implementation notes:
- Case folding does not preserve Unicode normalization; if normalization-sensitive comparisons are required, normalize strings after folding or use canonicalization steps before folding.
- For robust case-insensitive matching across languages, prefer full folding when consumers accept variable-length results.

Retrieval digest and attribution:
- Source URL: https://unicode.org/Public/UNIDATA/CaseFolding.txt
- Retrieved: 2026-03-21
- Bytes fetched: 87539
- Attribution: Unicode Consortium (CaseFolding.txt)
