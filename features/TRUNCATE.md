# TRUNCATE

Summary

Provide a truncate function exported from src/lib/main.js that shortens text to a maximum length and appends a suffix when truncation occurs. The default suffix is the ellipsis character ….

Specification

- Signature: truncate(text, maxLength, suffix) where suffix defaults to the ellipsis character.
- If text is null or undefined return an empty string.
- If text length is less than or equal to maxLength return the original text unchanged.
- When truncation is required, prefer to cut at the last word boundary (space) such that the returned string plus the suffix does not exceed maxLength.
- If no safe word boundary exists before the truncation point (for example the first word itself is longer than maxLength - suffix length), truncate the word at maxLength minus suffix length and append the suffix.

Acceptance criteria

- truncate Hello World to length 8 returns Hello…
- Default suffix is the ellipsis and is used when suffix is not provided
- truncate does not break mid-word when a word boundary fits within maxLength
- If a single word must be shortened, it is truncated and suffix appended
- Null or undefined input returns an empty string

Notes

- Unit tests must cover behaviour with multibyte Unicode characters and ensure character counts are in user-visible characters, not bytes.
