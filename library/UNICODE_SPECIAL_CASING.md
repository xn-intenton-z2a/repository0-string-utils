Title: UNICODE_SPECIAL_CASING

Table of Contents:
- Purpose and scope
- File format and field definitions
- Representative entries and examples
- Usage notes and implementation tips
- Retrieval digest and attribution

Purpose and scope:
- SpecialCasing.txt supplements UnicodeData.txt with full case mappings where mappings are context- or language-sensitive.
- Provides full mappings for lowercase, titlecase and uppercase where simple one-to-one mappings are insufficient.

File format and field definitions (exact machine-readable format):
- <code>; <lower>; <title>; <upper>; (<condition_list>;)? # <comment>
- <code>, <lower>, <title>, <upper> are hex code point sequences; multiple characters are space-separated.
- <condition_list> is optional and contains language IDs or casing contexts; conditions may be negated with Not_.
- Language IDs follow BCP 47 ("-" and "_" equivalent).

Representative entries (verbatim examples from source):
- 00DF; 00DF; 0053 0073; 0053 0053; # LATIN SMALL LETTER SHARP S
- 0130; 0069 0307; 0130; 0130; # LATIN CAPITAL LETTER I WITH DOT ABOVE
- FB00; FB00; 0046 0066; 0046 0046; # LATIN SMALL LIGATURE FF

Conditional examples (Turkish/Azeri and Lithuanian extracts):
- 0307; 0307; ; ; lt After_Soft_Dotted; # COMBINING DOT ABOVE
- 0049; 0069 0307; 0049; 0049; lt More_Above; # LATIN CAPITAL LETTER I
- 0130; 0069; 0130; 0130; tr; # LATIN CAPITAL LETTER I WITH DOT ABOVE
- 0049; 0131; 0049; 0049; tr Not_Before_Dot; # LATIN CAPITAL LETTER I

Usage notes and implementation tips:
- Parsers must apply conditions in context: the conditions refer to the original string context, not the mapped result.
- For locale-aware casing (Turkic dotted/dotless I), use SpecialCasing entries or higher-level CLDR tailoring.
- To preserve canonical equivalence for accents and combining marks, normalize (NFC/NFD) at appropriate points when applying mappings that insert or remove combining marks.

Retrieval digest and attribution:
- Source URL: https://unicode.org/Public/UNIDATA/SpecialCasing.txt
- Retrieved: 2026-03-21
- Bytes fetched: 17049
- Attribution: Unicode Consortium (SpecialCasing.txt)
