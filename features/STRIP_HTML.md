# STRIP_HTML

# Overview

stripHtml removes HTML tags from a string and decodes common HTML entities into their character equivalents. The goal is plain-text extraction, not full sanitization; the function should decode at least: &amp;, &lt;, &gt;, &quot;, &apos;, and &nbsp;.

# Acceptance Criteria

- stripHtml of "<p>Hello &amp; World</p>" returns "Hello & World".
- stripHtml(null) returns an empty string.
- stripHtml of plain text without tags returns the same text unchanged.

# Tests

- Unit tests cover entity decoding, nested tags, attributes inside tags, and inputs with no tags.

# Implementation Notes

- Use a simple tag-stripping approach to remove angle-bracket tags and then replace common HTML entities with their decoded characters using a small lookup map. Do not attempt to fully parse HTML or execute scripts; the function is intended for conservative plain-text extraction.