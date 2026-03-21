#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

function safeString(input) {
  if (input === null || input === undefined) return "";
  return String(input);
}

export function slugify(input) {
  const s = safeString(input).normalize('NFKD');
  // remove diacritics
  const noDiacritics = s.replace(/\p{M}/gu, '');
  // keep letters and numbers and spaces, replace others with space
  const cleaned = noDiacritics.replace(/[^\p{L}\p{N}]+/gu, '-');
  const collapsed = cleaned.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return collapsed.toLowerCase();
}

export function truncate(input, maxLength = 80, suffix = '…') {
  const s = safeString(input);
  if (maxLength <= 0) return suffix;
  if (s.length <= maxLength) return s;
  const head = s.slice(0, maxLength);
  const lastSpace = head.lastIndexOf(' ');
  if (lastSpace > 0) {
    return head.slice(0, lastSpace).trim() + suffix;
  }
  return head.trim() + suffix;
}

function splitWords(s) {
  // normalize and strip diacritics, then split on non letter/number sequences
  const norm = safeString(s).normalize('NFKD').replace(/\p{M}/gu, '');
  return norm.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

export function camelCase(input) {
  const s = safeString(input);
  const words = splitWords(s);
  if (!words.length) return '';
  const first = words[0].toLowerCase();
  const rest = words.slice(1).map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase());
  return [first, ...rest].join('');
}

export function kebabCase(input) {
  const s = safeString(input).normalize('NFKD').replace(/\p{M}/gu, '');
  const words = splitWords(s);
  return words.map(w => w.toLowerCase()).join('-');
}

export function titleCase(input) {
  const s = safeString(input);
  return splitWords(s).map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

export function wordWrap(input, width = 80) {
  const s = safeString(input);
  if (width <= 0) return s;
  const words = s.split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  const lines = [];
  let current = '';
  for (const w of words) {
    if (current.length === 0) {
      // start new line
      if (w.length > width) {
        // place long word on its own line
        lines.push(w);
      } else {
        current = w;
      }
    } else {
      if (current.length + 1 + w.length <= width) {
        current += ' ' + w;
      } else {
        lines.push(current);
        if (w.length > width) {
          lines.push(w);
          current = '';
        } else {
          current = w;
        }
      }
    }
  }
  if (current) lines.push(current);
  return lines.join('\n');
}

export function stripHtml(input) {
  let s = safeString(input);
  // remove tags
  s = s.replace(/<[^>]*>/g, '');
  // decode simple entities
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' '
  };
  s = s.replace(/&[#a-zA-Z0-9]+;/g, (m) => {
    if (entities[m]) return entities[m];
    // numeric
    const num = m.match(/&#(\d+);/);
    if (num) return String.fromCodePoint(Number(num[1]));
    const hex = m.match(/&#x([0-9a-fA-F]+);/);
    if (hex) return String.fromCodePoint(parseInt(hex[1], 16));
    return m;
  });
  return s;
}

export function escapeRegex(input) {
  const s = safeString(input);
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function pluralize(input) {
  const s = safeString(input);
  if (!s) return '';
  const lower = s.toLowerCase();
  if (/(s|x|z|ch|sh)$/i.test(lower)) return s + 'es';
  if (/[^aeiou]y$/i.test(lower)) return s.slice(0, -1) + 'ies';
  if (/(?:f|fe)$/i.test(lower)) {
    if (lower.endsWith('fe')) return s.slice(0, -2) + 'ves';
    return s.slice(0, -1) + 'ves';
  }
  return s + 's';
}

export function levenshtein(a, b) {
  const A = safeString(a);
  const B = safeString(b);
  const la = A.length;
  const lb = B.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  // use two-row DP
  let prev = new Array(lb + 1).fill(0).map((_, i) => i);
  let cur = new Array(lb + 1).fill(0);
  for (let i = 1; i <= la; i++) {
    cur[0] = i;
    for (let j = 1; j <= lb; j++) {
      const cost = A[i - 1] === B[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[lb];
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

// String utility helpers
function toStringSafe(input) {
  if (input === null || input === undefined) return "";
  return String(input);
}

export function slugify(input) {
  const s = toStringSafe(input);
  if (!s) return "";
  // Normalize and remove diacritics
  let out = s.normalize('NFKD').replace(/\p{Diacritic}/gu, '');
  // Replace any non letter/number with hyphen, collapse multiple hyphens, lowercase
  out = out
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  return out;
}

export function truncate(input, maxLength = 100, suffix = '\u2026') {
  const s = toStringSafe(input);
  if (!s) return '';
  const max = Math.max(0, Number(maxLength) || 0);
  const suf = String(suffix || '\u2026');
  if (s.length <= max) return s;
  // If max is too small to include any original content (<= suffix length + 1), just return the suffix trimmed to fit
  if (max <= suf.length + 1) return suf.slice(0, max);
  const cut = s.slice(0, Math.max(0, max - suf.length));
  // Don't break mid-word if possible
  const idx = cut.lastIndexOf(' ');
  if (idx > 0) {
    return cut.slice(0, idx) + suf;
  }
  return cut + suf;
}

export function camelCase(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  const parts = s
    .trim()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map(p => p.toLowerCase());
  if (parts.length === 0) return '';
  return parts[0] + parts.slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join('');
}

export function kebabCase(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  const out = s
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  return out;
}

export function titleCase(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  return s
    .split(/(\s+)/)
    .map(token => {
      if (/^\s+$/.test(token)) return token;
      return token[0]?.toUpperCase() + token.slice(1).toLowerCase();
    })
    .join('');
}

export function wordWrap(input, width = 80) {
  const s = toStringSafe(input);
  if (!s) return '';
  const w = Math.max(1, Number(width) || 80);
  const words = s.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      // start line
      if ([...word].length > w) {
        // single word longer than width -> place alone
        lines.push(word);
      } else {
        current = word;
      }
    } else {
      const candidate = current + ' ' + word;
      if ([...candidate].length <= w) {
        current = candidate;
      } else {
        lines.push(current);
        if ([...word].length > w) {
          lines.push(word);
          current = '';
        } else {
          current = word;
        }
      }
    }
  }
  if (current) lines.push(current);
  return lines.join('\n');
}

export function stripHtml(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  // Remove tags
  let out = s.replace(/<[^>]*>/g, '');
  // Decode basic entities
  const entities = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' '
  };
  out = out.replace(/&([a-zA-Z]+);/g, (m, name) => entities[name] ?? m);
  // numeric entities
  out = out.replace(/&#(x?[0-9a-fA-F]+);/g, (m, num) => {
    const code = num.startsWith('x') ? parseInt(num.slice(1), 16) : parseInt(num, 10);
    if (Number.isNaN(code)) return m;
    try {
      return String.fromCodePoint(code);
    } catch (e) {
      return m;
    }
  });
  return out;
}

export function escapeRegex(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function pluralize(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  const lower = s.toLowerCase();
  // es endings
  if (/(s|x|z|ch|sh)$/i.test(lower)) return s + 'es';
  // consonant + y -> ies
  if (/[b-df-hj-np-tv-z]y$/i.test(lower)) return s.slice(0, -1) + 'ies';
  // f/fe -> ves
  if (/fe$/i.test(lower)) return s.slice(0, -2) + 'ves';
  if (/f$/i.test(lower)) return s.slice(0, -1) + 'ves';
  // default
  return s + 's';
}

export function levenshtein(a, b) {
  const s = toStringSafe(a);
  const t = toStringSafe(b);
  const n = s.length;
  const m = t.length;
  if (n === 0) return m;
  if (m === 0) return n;
  // Use two-row DP
  let prev = new Array(m + 1);
  for (let j = 0; j <= m; j++) prev[j] = j;
  for (let i = 1; i <= n; i++) {
    let cur = [i];
    for (let j = 1; j <= m; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[m];
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
