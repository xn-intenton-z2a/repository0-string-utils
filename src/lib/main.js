#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch {
    pkg = { name: "repo", version: "0.0.0", description: "" };
  }
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title || "repo", version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description || "";

export function getIdentity() {
  return { name, version, description };
}

// Helper: convert null/undefined to empty string
function toStr(input) {
  return input == null ? "" : String(input);
}

// Slugify: lowercase, remove diacritics, keep letters/numbers, replace spaces with hyphens
export function slugify(input) {
  const s = toStr(input);
  if (s === "") return "";
  // Normalize and remove common combining marks (diacritics)
  const normalized = s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  // Keep ASCII letters/numbers, spaces and hyphens; remove others
  const cleaned = normalized
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_\-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned;
}

// Truncate: do not break mid-word; length is the maximum number of characters of the source to consider
export function truncate(input, length, suffix = "…") {
  const s = toStr(input);
  if (s === "") return "";
  const max = Number(length) || 0;
  if (max <= 0 || s.length <= max) return s;
  const sub = s.slice(0, max);
  const lastSpace = sub.lastIndexOf(" ");
  if (lastSpace === -1) {
    return sub + suffix;
  }
  return sub.slice(0, lastSpace) + suffix;
}

// camelCase: convert to camelCase from separators
export function camelCase(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  const parts = s.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length === 0) return "";
  return (
    parts[0].toLowerCase() +
    parts
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("")
  );
}

// kebabCase: lower-case words joined with hyphens; split camelCase boundaries too
export function kebabCase(input) {
  const s = toStr(input);
  if (!s) return "";
  const normalized = s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  // Insert separators between lower->Upper transitions to split camelCase
  const withSpaces = normalized.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  const parts = withSpaces
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((p) => p.toLowerCase());
  return parts.join("-");
}

// titleCase: Capitalise first letter of each word
export function titleCase(input) {
  const s = toStr(input);
  if (!s) return "";
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// wordWrap: soft wrap at word boundaries; if a single word exceeds width, place it on its own line unbroken
export function wordWrap(input, width = 80) {
  const s = toStr(input);
  if (!s) return "";
  const w = Math.max(1, Number(width) || 80);
  const words = s.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      if (word.length > w) {
        // single long word on its own line
        lines.push(word);
      } else {
        current = word;
      }
    } else {
      if (current.length + 1 + word.length <= w) {
        current += " " + word;
      } else {
        lines.push(current);
        if (word.length > w) {
          lines.push(word);
          current = "";
        } else {
          current = word;
        }
      }
    }
  }
  if (current) lines.push(current);
  return lines.join("\n");
}

// stripHtml: remove tags and decode common entities
export function stripHtml(input) {
  let s = toStr(input);
  if (!s) return "";
  // Remove script/style blocks
  s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
  // Remove tags
  s = s.replace(/<[^>]+>/g, "");
  // Decode common entities
  const entities = {
    nbsp: " ",
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
  };
  s = s.replace(/&([a-zA-Z]+);/g, (m, name) => (entities[name] !== undefined ? entities[name] : m));
  // Decode numeric entities
  s = s.replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n)));
  s = s.replace(/&#x([0-9a-fA-F]+);/g, (m, n) => String.fromCharCode(parseInt(n, 16)));
  return s.trim();
}

// escapeRegex: escape special regex characters
export function escapeRegex(input) {
  const s = toStr(input);
  if (!s) return "";
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// pluralize: basic English pluralisation
export function pluralize(input) {
  const s = toStr(input);
  if (!s) return "";
  if (/(s|x|z|ch|sh)$/i.test(s)) return s + "es";
  if (/[^aeiou]y$/i.test(s)) return s.replace(/y$/i, "ies");
  if (/(?:f|fe)$/i.test(s)) return s.replace(/fe?$/i, "ves");
  return s + "s";
}

// Levenshtein distance
export function levenshtein(a, b) {
  const s = toStr(a);
  const t = toStr(b);
  const n = s.length;
  const m = t.length;
  if (n === 0) return m;
  if (m === 0) return n;

  const v0 = new Array(m + 1).fill(0);
  const v1 = new Array(m + 1).fill(0);

  for (let j = 0; j <= m; j++) v0[j] = j;

  for (let i = 0; i < n; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < m; j++) {
      const cost = s[i] === t[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= m; j++) v0[j] = v1[j];
  }
  return v1[m];
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

// Utility helpers
function toStr(input) {
  if (input === null || input === undefined) return "";
  return String(input);
}

// 1. Slugify
export function slugify(input) {
  const s = toStr(input);
  if (!s) return "";
  // Normalize, remove diacritics
  const normalized = s.normalize("NFKD").replace(/\p{M}/gu, "");
  // Replace non letters/numbers with hyphens, keep Unicode letters
  let slug = normalized
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return slug;
}

// 2. Truncate without breaking words
export function truncate(input, maxLength = 100, suffix = "…") {
  const s = toStr(input);
  if (!s) return "";
  if (typeof maxLength !== "number" || maxLength <= 0) return suffix;
  if (s.length <= maxLength) return s;
  const cut = s.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 0) {
    return cut.slice(0, lastSpace).trimEnd() + suffix;
  }
  // No space found: make room for suffix if possible
  const avail = Math.max(0, maxLength - suffix.length);
  return s.slice(0, avail) + suffix;
}

// 3. camelCase
export function camelCase(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  const parts = s.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0].toLowerCase();
  const rest = parts
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  return first + rest;
}

// 4. kebabCase
export function kebabCase(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  // Insert hyphen between camelCase boundaries
  const withHyphens = s.replace(/([a-z0-9])([A-Z])/g, "$1-$2");
  const normalized = withHyphens.normalize("NFKD").replace(/\p{M}/gu, "");
  const kebab = normalized
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return kebab;
}

// 5. titleCase
export function titleCase(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  return s
    .split(/\s+/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

// 6. wordWrap
export function wordWrap(input, width = 80) {
  const s = toStr(input);
  if (!s) return "";
  width = Math.max(1, Math.floor(width));
  const words = s.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!line) {
      // Start new line
      if (word.length > width) {
        // Single long word: place on its own line unbroken
        lines.push(word);
      } else {
        line = word;
      }
    } else {
      if (line.length + 1 + word.length <= width) {
        line += " " + word;
      } else {
        lines.push(line);
        if (word.length > width) {
          lines.push(word);
          line = "";
        } else {
          line = word;
        }
      }
    }
  }
  if (line) lines.push(line);
  return lines.join("\n");
}

// 7. stripHtml
export function stripHtml(input) {
  const s = toStr(input);
  if (!s) return "";
  // Remove scripts/styles first
  let tmp = s.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  // If running in browser, use DOMParser for robust decoding
  if (typeof window !== "undefined" && typeof window.DOMParser === "function") {
    try {
      const doc = new DOMParser().parseFromString(tmp, "text/html");
      return (doc.body && doc.body.textContent) ? doc.body.textContent : "";
    } catch (e) {
      // fallback to regex-based approach
    }
  }
  // Strip tags
  tmp = tmp.replace(/<[^>]*>/g, "");
  // Decode common entities
  const entities = {
    nbsp: " ",
    lt: "<",
    gt: ">",
    amp: "&",
    quot: '"',
    apos: "'",
  };
  tmp = tmp.replace(/&([a-zA-Z]+);/g, (m, name) => (entities[name] !== undefined ? entities[name] : m));
  // Decode numeric entities
  tmp = tmp.replace(/&#(x?[0-9a-fA-F]+);/g, (m, n) => {
    const code = n.startsWith("x") ? parseInt(n.slice(1), 16) : parseInt(n, 10);
    if (Number.isNaN(code)) return m;
    try {
      return String.fromCodePoint(code);
    } catch (e) {
      return m;
    }
  });
  // Collapse multiple spaces/newlines
  tmp = tmp.replace(/[\t\r\n]+/g, " ").replace(/ {2,}/g, " ").trim();
  return tmp;
}

// 8. escapeRegex
export function escapeRegex(input) {
  const s = toStr(input);
  if (!s) return "";
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 9. pluralize
export function pluralize(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  // ends with ch or sh
  if (/(ch|sh)$/.test(lower)) return s + "es";
  // ends with s/x/z
  if (/[sxz]$/.test(lower)) return s + "es";
  // consonant + y => ies
  if (/[b-df-hj-np-tv-z]y$/.test(lower)) return s.slice(0, -1) + "ies";
  // f or fe => ves
  if (/fe$/.test(lower)) return s.slice(0, -2) + "ves";
  if (/f$/.test(lower)) return s.slice(0, -1) + "ves";
  // default
  return s + "s";
}

// 10. Levenshtein distance
export function levenshtein(a, b) {
  const s = toStr(a);
  const t = toStr(b);
  const n = s.length;
  const m = t.length;
  if (n === 0) return m;
  if (m === 0) return n;
  const v0 = new Array(m + 1);
  const v1 = new Array(m + 1);
  for (let j = 0; j <= m; j++) v0[j] = j;
  for (let i = 0; i < n; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < m; j++) {
      const cost = s[i] === t[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= m; j++) v0[j] = v1[j];
  }
  return v1[m];
}

// Node CLI entry execution
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
