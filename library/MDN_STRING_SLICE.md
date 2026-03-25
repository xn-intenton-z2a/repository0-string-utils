MDN_STRING_SLICE

Normalised extract — table of contents:
- Overview
- Signature
- Parameter semantics (beginIndex, endIndex)
- Negative indices behaviour
- Unicode (UTF-16) considerations
- Examples and implementation notes

Overview:
String.prototype.slice returns a substring from the given begin index up to but not including the end index. It operates on UTF-16 code unit indices.

Signature:
- str.slice(beginIndex?: Number, endIndex?: Number) -> String

Parameter semantics:
- beginIndex (optional, default 0): Integer index at which extraction starts. If negative, it is treated as str.length + beginIndex.
- endIndex (optional, default str.length): Integer index at which extraction stops (not inclusive). If negative, treated as str.length + endIndex. If endIndex is omitted or greater than length, slice runs to the end of the string.

Negative indices behaviour:
- Negative values count back from the end of the string: slice(-2) returns last two code units, slice(-4, -1) returns the substring from length-4 up to length-1.

Unicode (UTF-16) considerations:
- slice operates on UTF-16 code units. Characters represented by surrogate pairs (astral code points) occupy two code units and may be split when using slice with arbitrary indices. For code-point-aware slicing, convert to an array of code points (e.g., using String.prototype.normalize and spread or other code-point iterators) before slicing.

Examples (illustrative):
- 'Hello'.slice(0, 2) -> 'He'
- 'Hello'.slice(2) -> 'llo'
- '𝌆foo'.slice(0, 1) -> may return the first code unit of the astral symbol; to avoid splitting astral symbols use code-point-aware logic.

Reference details (API):
- Method: String.prototype.slice(beginIndex?: Number, endIndex?: Number) -> String
- Returns: the extracted substring. If beginIndex === endIndex, returns an empty string.

Detailed digest:
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
- Retrieved: 2026-03-25
- Data fetched (HTML): ~163.1 KB
- Extracted technical content: exact signature, behaviour for negative indices, and UTF-16 code unit caveats.

Attribution:
- Content adapted from MDN Web Docs (developer.mozilla.org), retrieved on 2026-03-25.