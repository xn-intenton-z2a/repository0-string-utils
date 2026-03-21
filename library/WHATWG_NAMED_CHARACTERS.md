WHATWG_NAMED_CHARACTERS

Table of contents
- Purpose and scope
- Syntax of named and numeric character references
- Parsing rules and semicolon requirements
- Common named entities and mappings
- Implementation patterns for decoding
- Reference details (exact patterns, signatures)
- Detailed digest (crawl excerpt and retrieval)
- Attribution and data size

Purpose and scope
This document extracts the technical specification of HTML named character references from the WHATWG HTML Standard relevant to reliably decoding HTML entities in string utilities.

Syntax of named and numeric character references
- Named character reference: begins with '&', followed by a name, and terminated with a semicolon in the normal parser. Example: &lt; &amp; &nbsp; &copy;.
- Numeric character reference: two forms
  - Decimal: &#DDDD; where DDDD is decimal code point (e.g., &#60; = '<')
  - Hexadecimal: &#xHHHH; or &#XHHHH; where HHHH is hex digits (e.g., &#x1F600; = 😀)
- Semicolon: the semicolon is used to terminate the reference and avoid ambiguity. Many named references in the standard require the semicolon; parser behavior for missing semicolons is defined in legacy parsing rules but should not be relied on for robust decoding.

Parsing rules and semicolon requirements
- The standard provides exact parsing algorithms for consuming a character reference in different contexts (data state, attribute value state, RCDATA). Implementations should follow these steps:
  1. On encountering '&', attempt to match the longest named reference followed by a semicolon. If a match is found, replace with corresponding character(s).
  2. If no named match, attempt to parse a numeric reference beginning with '#'. If numeric parse succeeds and code point is valid (not disallowed), replace with the Unicode character.
  3. If no valid reference is found, treat '&' as a literal '&' per the parsing state rules.
- Certain named references historically allowed missing semicolons in legacy HTML parsing; modern decoders should require semicolons to avoid ambiguity unless intentionally replicating legacy browser quirks.

Common named entities and mappings (critical subset)
- &lt; -> U+003C (LESS-THAN SIGN)
- &gt; -> U+003E (GREATER-THAN SIGN)
- &amp; -> U+0026 (AMPERSAND)
- &quot; -> U+0022 (QUOTATION MARK)
- &apos; -> U+0027 (APOSTROPHE) (note: historical XML origin; supported by modern HTML parsing table)
- &nbsp; -> U+00A0 (NO-BREAK SPACE)
- &copy; -> U+00A9 (COPYRIGHT SIGN)
- &reg; -> U+00AE (REGISTERED SIGN)

Implementation patterns for decoding
- Use a vetted library: prefer the 'he' library's decode function which implements WHATWG semantics and handles numeric references, named references, and edge cases.
  - Typical API: decode(input: string, options?: object) => string. Key option: isAttributeValue (true/false) to select attribute-value parsing rules.
- Native approach: implement parsing algorithm from the standard
  - Match pattern for numeric references: /^#(?:x[0-9A-Fa-f]+|[0-9]+);/ and convert to code point with parseInt and String.fromCodePoint.
  - Match named references: use a trie or longest-match map of named references to replace with their code point(s). The full table is large; include at least the critical subset above.
- Security: never decode untrusted input into executable contexts (e.g., HTML in script attributes). Always decode in the correct parsing state and re-escape when serialising back into HTML.

Reference details (exact patterns, signatures)
- Numeric reference patterns (exact):
  - Decimal: '&#' DIGITS ';' where DIGITS = [0-9]+
  - Hex: '&#x' HEX_DIGITS ';' or '&#X' HEX_DIGITS ';' where HEX_DIGITS = [0-9A-Fa-f]+
- Named reference replacement: match longest name followed by a semicolon; replacement is the exact Unicode code points listed in the standard's named character reference table.
- Library API example signature (he): decode(input: string, options?: {isAttributeValue?: boolean}) => string

Detailed digest (crawl excerpt and retrieval)
- Source: WHATWG HTML Standard — named character references. Retrieved: 2026-03-21
- Crawl data size (downloaded): approximately 212.7 KB
- Extracted: exact syntactic forms for named and numeric references, requirement to prefer semicolon-terminated matches, recommendation to use a full mapping table for correctness and to use existing libraries that follow WHATWG parsing semantics.

Attribution and data size
- Source URL: https://html.spec.whatwg.org/multipage/named-characters.html
- Retrieved: 2026-03-21
- Download size: ~212.7 KB
- License/attribution: WHATWG. This document summarises and extracts implementation-critical portions of the named character references section for use in implementation.
