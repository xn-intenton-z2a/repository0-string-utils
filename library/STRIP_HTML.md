STRIP_HTML

Table of contents:
- Purpose
- Function signature
- Recommended implementations (browser and fallback)
- Exact entity decoding rules for common entities
- Regex-based tag removal caveats
- Examples
- Supplementary details
- Detailed digest
- Attribution and data size

Purpose:
Remove HTML tags and decode common HTML entities to return plain text content from an HTML fragment or string.

Function signature:
stripHtml(input: string): string
- returns an empty string for null/undefined input

Recommended implementation (browser environments with DOMParser):
1. If input is nullish return ''.
2. Use DOMParser to parse HTML: let doc = new DOMParser().parseFromString(input, 'text/html')
3. Extract text: let text = doc.documentElement.textContent || ''
4. Return text

Fallback implementation (environments without DOM):
1. Remove tags conservatively: text = input.replace(/<[^>]*>/g, '')  (note: this is not a full HTML parser and will fail on scripts/styles with angle brackets)
2. Decode common named entities by replacement map: { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" }
3. Decode numeric entities: replace /&#(x?)([0-9A-Fa-f]+);/g and convert to codepoint: parseInt(hexOrDec, base) then String.fromCodePoint(code)

Exact entity decoding rules (common entities):
- &amp; -> &
- &lt; -> <
- &gt; -> >
- &quot; -> "
- &apos; -> '
- Numeric decimal: &#39; -> code 39 -> '\''
- Numeric hex: &#x27; -> code 0x27 -> '\''

Regex-based tag removal caveats:
- Regular expressions cannot correctly parse arbitrary nested or malformed HTML; prefer DOMParser when available.
- For safety, remove <script> and <style> content before tag-stripping to avoid leaving JS or CSS fragments that look like text.

Examples (expected behavior):
- Input: "<p>Hello &amp; welcome</p>" -> Output: "Hello & welcome"

Supplementary details:
- For Node.js, a lightweight solution to decode entities is to use a small mapping for common entities and numeric decoding; heavy-duty decoding should use a dedicated library if available.
- The DOM-based approach also decodes entities as part of parsing, which is why DOMParser is preferred in browser contexts.

Detailed digest:
Core technique and exact entity mappings extracted from MDN DOMParser and entity documentation; retrieval date: 2026-03-21.

Attribution and data size:
Source: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
Bytes retrieved during crawl: 151126
