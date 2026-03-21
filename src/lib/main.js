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

// Helper: safely convert to string; null/undefined -> ''
function toStringSafe(input) {
  if (input === null || input === undefined) return "";
  return String(input);
}

// Normalize and remove diacritics; returns basic ascii-friendly form for splitting
function normalizeForWords(s) {
  return toStringSafe(s).normalize('NFKD').replace(/\p{M}/gu, '');
}

// 1) Slugify: lowercase, hyphens, strip non-alphanumeric
export function slugify(input) {
  const s = normalizeForWords(input);
  if (!s) return '';
  const out = s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // non letters/numbers -> -
    .replace(/^-+|-+$/g, '') // trim -
    .replace(/-+/g, '-'); // collapse
  return out;
}

// 2) Truncate: don't break mid-word if possible, add suffix (default ellipsis)
export function truncate(input, maxLength = 80, suffix = '…') {
  const s = toStringSafe(input);
  if (!s) return '';
  const max = Number(maxLength) || 0;
  const suf = String(suffix || '…');
  if (max <= 0) return suf.slice(0, Math.max(0, max));
  if (s.length <= max) return s;
  // Reserve space for suffix
  const avail = Math.max(0, max - suf.length);
  if (avail === 0) return suf.slice(0, max);
  let head = s.slice(0, avail);
  const lastSpace = head.lastIndexOf(' ');
  if (lastSpace > 0) head = head.slice(0, lastSpace);
  return head + suf;
}

// 3) camelCase
export function camelCase(input) {
  const s = normalizeForWords(input);
  if (!s) return '';
  const parts = s.split(/[^\p{L}\p{N}]+/u).filter(Boolean).map(p => p.toLowerCase());
  if (!parts.length) return '';
  return parts[0] + parts.slice(1).map(w => w[0]?.toUpperCase() + w.slice(1)).join('');
}

// 4) kebabCase
export function kebabCase(input) {
  const s = normalizeForWords(input);
  if (!s) return '';
  return s
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .join('-');
}

// 5) titleCase (capitalize first letter of each word)
export function titleCase(input) {
  const s = normalizeForWords(input);
  if (!s) return '';
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// 6) wordWrap: soft wrap at word boundaries, never break a word; long words go on their own line
export function wordWrap(input, width = 80) {
  const s = toStringSafe(input);
  if (!s) return '';
  const w = Math.max(1, Number(width) || 1);
  const words = s.split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  const lines = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      if ([...word].length > w) {
        // place long word alone
        lines.push(word);
      } else {
        current = word;
      }
    } else {
      if (([...current].length + 1 + [...word].length) <= w) {
        current = current + ' ' + word;
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

// 7) stripHtml: remove tags and decode basic entities
export function stripHtml(input) {
  let s = toStringSafe(input);
  if (!s) return '';
  // remove tags
  s = s.replace(/<[^>]*>/g, '');
  // basic named entities
  const map = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    'apos': "'",
    'nbsp': ' '
  };
  s = s.replace(/&([a-zA-Z]+);/g, (m, name) => map[name] ?? m);
  // numeric entities
  s = s.replace(/&#(x?[0-9a-fA-F]+);/g, (m, num) => {
    try {
      const code = num.toLowerCase().startsWith('x') ? parseInt(num.slice(1), 16) : parseInt(num, 10);
      if (Number.isNaN(code)) return m;
      return String.fromCodePoint(code);
    } catch (e) {
      return m;
    }
  });
  return s;
}

// 8) escapeRegex: escape special regex chars
export function escapeRegex(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 9) pluralize: basic English pluralisation rules
export function pluralize(input) {
  const s = toStringSafe(input);
  if (!s) return '';
  const lower = s.toLowerCase();
  if (/(s|x|z|ch|sh)$/i.test(lower)) return s + 'es';
  if (/[b-df-hj-np-tv-z]y$/i.test(lower)) return s.slice(0, -1) + 'ies';
  if (/fe$/i.test(lower)) return s.slice(0, -2) + 'ves';
  if (/f$/i.test(lower)) return s.slice(0, -1) + 'ves';
  return s + 's';
}

// 10) levenshtein distance (two-row DP)
export function levenshtein(a, b) {
  const s = toStringSafe(a);
  const t = toStringSafe(b);
  const n = s.length;
  const m = t.length;
  if (n === 0) return m;
  if (m === 0) return n;
  // work with code points to handle Unicode properly
  const sa = Array.from(s);
  const ta = Array.from(t);
  let prev = new Array(ta.length + 1);
  for (let j = 0; j <= ta.length; j++) prev[j] = j;
  for (let i = 1; i <= sa.length; i++) {
    const cur = [i];
    for (let j = 1; j <= ta.length; j++) {
      const cost = sa[i - 1] === ta[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[ta.length];
}

// CLI entry
export function main(args) {
  if (args?.includes('--version')) {
    console.log(version);
    return;
  }
  if (args?.includes('--identity')) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import('url');
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main(process.argv.slice(2));
  }
}
