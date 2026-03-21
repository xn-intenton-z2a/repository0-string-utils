Title: MDN_TOLOWERCASE

Table of Contents:
- Purpose and capabilities
- API and method signatures
- Behaviour details (toLowerCase vs toLocaleLowerCase)
- Edge cases and notes
- Retrieval digest and attribution

Purpose and capabilities:
- Provide programmatic lowercasing of strings in JavaScript.
- Two related methods: String.prototype.toLowerCase() and String.prototype.toLocaleLowerCase(locales).

API and method signatures:
- String.prototype.toLowerCase() -> string
- String.prototype.toLocaleLowerCase(locales?: string | string[]) -> string

Behaviour details:
- toLowerCase() returns a new string with characters converted to lower case using the runtime's Unicode case mapping algorithm; it is not locale-aware.
- toLocaleLowerCase(locales) performs locale-sensitive case mapping when a locale tag is supplied; pass a BCP-47 language tag or array of tags.
- Neither method mutates the original string; both return new strings.
- Both methods operate on Unicode code points; where upper->lower mapping produces multiple code points, the result grows accordingly (e.g. LATIN CAPITAL LETTER I WITH DOT ABOVE).
- Locale-sensitive differences: Turkish (tr) and Azeri (az) treat dotted and dotless I specially: uppercase I maps to dotless i (U+0131) in Turkic mappings, and lowercase i maps to dotted I (U+0130) when appropriate. Use toLocaleLowerCase('tr') / toLocaleUpperCase('tr') to obtain these locale-tailored mappings.

Edge cases and notes:
- Calling the methods on null or undefined (i.e., String.prototype.toLowerCase.call(null)) throws a TypeError because the string methods require a valid this value; when implementing helpers, coerce null/undefined to '' if desired.
- Normalization: casing operations do not guarantee preservation of Unicode normalization form; to preserve canonical equivalence, normalize (NFC/NFD) before or after casing as required.
- Performance: toLowerCase() implementations are highly optimized in engines; avoid repeated conversions inside hot loops where possible.

Retrieval digest and attribution:
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
- Retrieved: 2026-03-21
- Bytes fetched: 158168
- Attribution: MDN Web Docs (Mozilla)
