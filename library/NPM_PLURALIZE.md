NPM_PLURALIZE

TABLE OF CONTENTS
1. Goal and scope
2. Deterministic rule set (exact order)
3. Regex patterns and decision logic
4. Edge cases and out-of-scope items

NORMALISED EXTRACT
Goal: return the basic English plural form for a singular noun according to the project's required rules. Irregular plurals are out of scope.

Deterministic rule set (apply in this exact order):
1) If word ends with s, x, z, ch, or sh (case-insensitive), return word + 'es'.  // handles bus->buses, box->boxes, church->churches
2) Else if word matches consonant + 'y' at the end (i.e., ends with 'y' and the preceding letter is not a,e,i,o,u), replace trailing 'y' with 'ies'.  // city->cities
3) Else if word ends with 'fe' replace with 'ves' OR ends with single 'f' replace trailing 'f' with 'ves'.  // wife->wives, wolf->wolves
4) Else return word + 's'.

Exact regexes and logic (case-insensitive):
- rule1: /(?:s|x|z|ch|sh)$/i -> return word + 'es'
- rule2: /([^aeiou])y$/i -> return word.replace(/y$/i, 'ies')
- rule3a: /fe$/i -> return word.replace(/fe$/i, 'ves')
- rule3b: /f$/i -> return word.replace(/f$/i, 'ves')
- fallback: return word + 's'

Edge cases and notes:
- Words already plural (e.g., "species") will follow rule1 and become "specieses" under these deterministic rules; callers should avoid passing already-plural words or implement an explicit check for common invariant plurals.
- Irregular forms (mouse/mice, child/children) intentionally out of scope.

REFERENCE SIGNATURE
- pluralize(word: string): string

DIGEST
Source: https://www.npmjs.com/package/pluralize (crawl returned Cloudflare interstitial so npm README not directly available); rules implemented per mission requirements.
Retrieved: 2026-03-21
Data obtained during crawl: Cloudflare interstitial (primary README blocked)

ATTRIBUTION
Rules are the deterministic set required by the mission; where npm content was blocked, rule definitions are implemented explicitly per project spec.
