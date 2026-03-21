NORMALISED EXTRACT — ECMAScript String semantics (ECMA-262 strings section)

Table of contents
1. Internal representation and primitives
2. Length and indexing semantics
3. Code units vs code points
4. Surrogate pairs and iteration
5. Normalization and String.prototype.normalize
6. Key string operations and signatures
7. Edge behaviours (ToString, null/undefined)

1. Internal representation and primitives
- JavaScript String values are immutable primitive values representing a sequence of UTF-16 code units.
- Each String value can be viewed as an ordered sequence of 16-bit code units; the spec defines operations over these sequences.
- The internal abstract operation ToString converts values to string primitives as specified in the standard; non-string inputs must be coerced via ToString before string operations.

2. Length and indexing semantics
- The length property returns the number of UTF-16 code units in the String, not the number of Unicode code points or grapheme clusters.
- Accessing a string by numeric index (s[index]) returns a new String containing the single code unit at that index (if in-range) or the empty string; this is the same as s.charAt(index) but indexing uses property access semantics.
- charAt(index): returns a one-code-unit string for the code unit at index or the empty string if index out of range.
- charCodeAt(index): returns the numeric UTF-16 code unit value (0..65535) at index, or NaN if out of range.

3. Code units vs code points
- codePointAt(pos): returns the full Unicode code point value at position pos, correctly combining surrogate pairs when present; returns undefined when pos is out-of-range.
- String.fromCodePoint(...codePoints): constructs a String from one or more Unicode code points; accepts values above 0xFFFF and will emit corresponding surrogate pairs.
- Many operations work on 16-bit code units; to correctly handle full Unicode code points, use codePointAt/fromCodePoint or iterate via for...of (which yields code points).

4. Surrogate pairs and iteration
- Characters outside the Basic Multilingual Plane (BMP) are encoded as a pair of UTF-16 code units (high surrogate then low surrogate).
- Methods that operate on code units (length, charAt, charCodeAt, slice, substring, substr) can split surrogate pairs; use codePoint-aware APIs or normalization/traversal strategies when full characters are required.
- for...of iteration over a String iterates over Unicode code points (it uses StringIterator that yields full code points, not raw code units).

5. Normalization and String.prototype.normalize
- String.prototype.normalize([form]) returns a new String normalized to the chosen Unicode Normalization Form.
- Accepted form strings: "NFC", "NFD", "NFKC", "NFKD"; if form is not provided, treat as "NFC".
- Normalization composes or decomposes multi-codepoint sequences to canonical equivalence per Unicode; use before comparisons if input may contain combining sequences.

6. Key string operations and signatures (as specified)
- String.prototype.charAt(pos) -> String
  - pos: integer index; returns the one-code-unit string at pos or "" if out-of-range.
- String.prototype.charCodeAt(pos) -> Number
  - returns 0..65535 or NaN.
- String.prototype.codePointAt(pos) -> Number | undefined
  - returns the Unicode code point value for the code point starting at pos, combining surrogate pair if present.
- String.fromCodePoint(...codePoints) -> String
  - codePoints: integer sequence of valid Unicode code points; throws RangeError on invalid values.
- String.prototype.normalize([form]) -> String
  - form optional: "NFC" | "NFD" | "NFKC" | "NFKD"; returns normalized string.
- s[index] property access -> String
  - behaves like s.charAt(index) but uses property access semantics; non-integer or out-of-range returns undefined for property access, but spec normalizes it to the empty string when reading.

7. Edge behaviours and important notes
- Passing null or undefined to methods that expect a String requires ToString coercion; if code explicitly calls a prototype method on null/undefined the engine will throw; always coerce safely in library functions (e.g., treat null/undefined as empty string).
- Many web-facing algorithms rely on normalization (NFC) and code-point-aware iteration; for robust unicode-aware string utilities use normalize('NFC') and iterate by code points when manipulating grapheme clusters.

Supplementary details
- Practical guidance for implementing library functions:
  - To avoid splitting Unicode characters, prefer iteration with for...of or convert to an array of code points using Array.from(str) which is code-point aware.
  - When truncating a string while preserving characters, operate on code points/grapheme clusters rather than UTF-16 code units.
  - For slugification, normalize to NFKD or NFD then remove combining marks (U+0300..U+036F) before removing non-alphanumerics; this reduces accented letters to base letters.
  - Use String.prototype.normalize('NFC') when comparing strings that may contain composed/decomposed variants.

Reference details (precise spec excerpts and signatures)
- ToString (abstract operation): defined in ECMA-262 as converting arbitrary values to String per step-by-step rules (null -> "null", undefined -> "undefined", symbols throw in some contexts when coerced via ordinary operations).
- String.prototype.normalize([form]) signature and allowed form values: returns a String; form must be one of the four normative values or undefined.
- codePointAt(pos) algorithm: if the code unit at pos is a high surrogate and the following code unit is a low surrogate, return the combined code point ((high - 0xD800) << 10) + (low - 0xDC00) + 0x10000; otherwise return the single code unit value.
- fromCodePoint: for code points > 0xFFFF produce a surrogate pair computed by subtracting 0x10000 and splitting into high/low surrogates.

Detailed digest
- Source: ECMA-262 — ECMAScript Language Specification, "Strings" section (tc39.es/ecma262/#sec-strings)
- Retrieval date: 2026-03-21
- Crawl note: full HTML retrieved from tc39.es ECMA-262 pages; raw HTML saved during crawl (~502 KB downloaded).

Attribution and data size
- Source: ECMA International / TC39 (https://tc39.es/ecma262/)
- Retrieved: 2026-03-21
- Data size fetched during crawl: approximately 502 KB (HTML)

Usage implications for this mission
- Implement string utilities to operate safely on Unicode by default: coerce null/undefined -> empty string; normalize inputs when comparing or generating slugs; use code-point-aware iteration (for...of or Array.from) when truncating, wrapping, or calculating lengths for user-facing output; use codePointAt/fromCodePoint when low-level numeric code point work is needed.

