NODE_WORDWRAP

Normalised extract — table of contents:
- Purpose
- Primary factory signatures
- Parameter semantics and modes
- Behaviour details
- Convenience helpers
- Examples and implementation notes

Purpose:
node-wordwrap provides functions to wrap plain text at word boundaries into lines constrained by start and stop column positions.

Primary factory signatures:
- wrap(stop) -> function(text: String) -> String
- wrap(start, stop, params?) -> function(text: String) -> String

Parameter semantics and modes:
- start: Number (column to pad lines to before wrapping; left-hand column index for wrapped text)
- stop: Number (column at which wrapping occurs)
- params: Object (optional) with properties; common property:
  - mode: String — either "soft" or "hard" (default: "soft")

Behaviour details:
- Returned value is a function that accepts a string and returns a new string where lines are padded to column "start" and wrapped to column "stop".
- Soft mode (default): split chunks by /\S+\s+/ and do not break chunks longer than stop-start (chunks overflow if longer than available width).
- Hard mode: split chunks with /\b/ and break up chunks longer than stop-start so they fit within the width.
- If a word is longer than stop-start and mode is soft, the word is left unbroken and will overflow the line.

Convenience helpers:
- wrap.hard(start, stop) — convenience function to create a wrapper with hard mode enabled.

Examples (illustrative):
- var wrap = require('wordwrap')(15); console.log(wrap('long text...')) — returns string wrapped at 15 columns with default soft behaviour.
- var wrap = require('wordwrap')(20, 60); console.log(wrap(longParagraph)) — pads and centers text between columns 20 and 60.

Reference details (API):
- wrap(stop)
  - Parameters: stop: Number
  - Returns: function(String) -> String
- wrap(start, stop, params={mode: "soft"})
  - Parameters: start: Number, stop: Number, params: Object (optional)
  - Returns: function(String) -> String
- wrap.hard(start, stop)
  - Convenience: equivalent to wrap(start, stop, {mode: "hard"})

Detailed digest:
- Source: https://github.com/substack/node-wordwrap and package info from registry.npmjs.org
- Retrieved: 2026-03-25
- Data fetched (HTML): ~304.2 KB (GitHub page), npm registry readme payload also consulted
- Extracted technical content: exact factory signatures, description of soft vs hard modes, example usages and helper functions.

Attribution:
- Content adapted from node-wordwrap README and npm registry entry (substack/node-wordwrap), retrieved on 2026-03-25. Package is MIT-licensed.