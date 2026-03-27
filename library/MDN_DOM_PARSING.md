MDN_DOM_PARSING

Table of contents:
- APIs: DOMParser and Node.textContent
- Parsing HTML and decoding entities
- Differences: textContent vs innerText
- Implementation patterns for stripHtml and entity decoding
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

APIs and signatures:
- new DOMParser().parseFromString(input: string, mimeType: string) -> Document
- Node.textContent -> string (property; returns text content of node and descendants; setting replaces node contents)

Parsing and decoding behavior (actionable):
- To remove HTML and decode entities reliably in a browser environment: use DOMParser to parse the HTML string then read document.body.textContent. Example pattern: doc = new DOMParser().parseFromString(html, 'text/html'); text = doc.body ? doc.body.textContent : doc.textContent
- parseFromString with 'text/html' handles HTML parsing permissively and decodes HTML entities such as &amp;, &lt;, &gt;, &nbsp; into their character equivalents.
- Do not use 'text/xml' or 'application/xml' for HTML content; these are stricter and will error on malformed HTML.

textContent vs innerText (differences):
- textContent returns the textual content of a node and its descendants without regard to CSS or layout; it includes text from hidden elements.
- innerText is layout- and style-aware and may trigger reflow and exclude hidden elements; innerText is not available in all JS environments.
- For deterministic stripHtml behavior that must run in non-browser contexts (e.g., Node), consider using a lightweight HTML parser library or DOM emulation (jsdom) then use textContent.

IMPLEMENTATION NOTES (direct):
- When decoding entities without a DOM (e.g., Node without DOMParser), create a mapping for common entities (amp, lt, gt, nbsp, quot, apos) and replace them or use a parser library.
- Always guard against null/undefined input: return empty string for missing input.

REFERENCE DETAILS:
- DOMParser.parseFromString(input: string, mimeType: 'text/html'|'text/xml'|...) -> Document
- Node.textContent -> string

DETAILED DIGEST (extracted, retrieved 2026-03-27):
- Extracted DOMParser behavior for HTML parsing and entity decoding and Node.textContent semantics necessary to implement stripHtml reliably and portably.

ATTRIBUTION & CRAWL METADATA
- Sources: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser and https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- Bytes retrieved: 146594 + 152333 = 298927
