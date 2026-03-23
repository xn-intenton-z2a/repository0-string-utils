#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited

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

function toStr(v) {
  return v == null ? "" : String(v);
}

function strLen(s) {
  return Array.from(s).length;
}

// slugify: produce a URL-friendly slug. Unicode letters are preserved where possible after
// normalizing and removing diacritical marks.
export function slugify(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  const normalized = s.normalize ? s.normalize("NFKD") : s;
  // remove combining marks
  const noMarks = normalized.replace(/\p{M}/gu, "");
  // replace any sequence of non-letter/number characters with a dash
  const replaced = noMarks.replace(/[^\p{L}\p{N}]+/gu, "-");
  return replaced.replace(/^-+|-+$/g, "").toLowerCase();
}

// truncate: cut a string to maxLength characters (measured in Unicode code points)
// and append an ellipsis (default '...') when truncated. To keep results readable we
// ensure at least one character is kept when truncation is needed (the result may
// therefore exceed maxLength in corner cases where ellipsis length >= maxLength).
export function truncate(input, maxLength = 30, ellipsis = "...") {
  const s = toStr(input);
  const chars = Array.from(s);
  if (maxLength <= 0) return "";
  if (chars.length <= maxLength) return s;
  const keep = Math.max(1, maxLength - ellipsis.length);
  return chars.slice(0, keep).join("") + ellipsis;
}

// camelCase: typical camel-case conversion for identifiers and labels
export function camelCase(input) {
  const s = toStr(input);
  if (!s) return "";
  const withSpaces = s
    // split camelCase boundaries
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // replace separators with spaces
    .replace(/[_\-\s]+/g, " ")
    .trim();
  const parts = withSpaces.split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  const [first, ...rest] = parts;
  return (
    first.toLowerCase() +
    rest.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("")
  );
}

// kebabCase: lower-case, dash-separated
export function kebabCase(input) {
  const s = toStr(input);
  if (!s) return "";
  const normalized = s.normalize ? s.normalize("NFKD") : s;
  const noMarks = normalized.replace(/\p{M}/gu, "");
  const spaced = noMarks
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
  const parts = spaced.split(/\s+/).filter(Boolean);
  return parts.map((p) => p.toLowerCase()).join("-");
}

// titleCase: Capitalise the first letter of each word
export function titleCase(input) {
  const s = toStr(input).trim();
  if (!s) return "";
  return s
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// wordWrap: wrap text at the specified width (in Unicode code points)
export function wordWrap(input, width = 80) {
  const s = toStr(input);
  if (s === "") return "";
  if (width <= 0) return s;
  const words = s.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if (!line) {
      if (strLen(w) > width) {
        // break long word
        const chars = Array.from(w);
        for (let i = 0; i < chars.length; i += width) {
          lines.push(chars.slice(i, i + width).join(""));
        }
      } else {
        line = w;
      }
    } else {
      if (strLen(line) + 1 + strLen(w) <= width) {
        line = line + " " + w;
      } else {
        lines.push(line);
        if (strLen(w) > width) {
          const chars = Array.from(w);
          for (let i = 0; i < chars.length; i += width) {
            lines.push(chars.slice(i, i + width).join(""));
          }
          line = "";
        } else {
          line = w;
        }
      }
    }
  }
  if (line) lines.push(line);
  return lines.join("\n");
}

// stripHtml: remove HTML tags and decode basic entities
export function stripHtml(input) {
  let s = toStr(input);
  if (!s) return "";
  // remove tags
  s = s.replace(/<[^>]*>/g, "");
  // decode common named entities and numeric entities
  const entities = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', '#39': "'" };
  s = s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, token) => {
    if (token[0] === "#") {
      if (token[1] === "x" || token[1] === "X") return String.fromCharCode(parseInt(token.slice(2), 16));
      return String.fromCharCode(parseInt(token.slice(1), 10));
    }
    return entities[token] ?? match;
  });
  return s;
}

// escapeRegex: escape user input to be used in a RegExp
export function escapeRegex(input) {
  const s = toStr(input);
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// pluralize: simple English pluralizer with a few irregulars
export function pluralize(word, count = null) {
  if (word == null) return "";
  const s = String(word);
  if (typeof count === "number") return count === 1 ? s : pluralize(s);
  const lower = s.toLowerCase();
  const irregular = {
    person: "people",
    man: "men",
    woman: "women",
    child: "children",
    tooth: "teeth",
    foot: "feet",
    mouse: "mice",
    goose: "geese",
    ox: "oxen",
    louse: "lice",
  };
  if (irregular[lower]) return irregular[lower];
  if (/[sxz]$/i.test(s) || /(?:ch|sh)$/i.test(s)) return s + "es";
  if (/[^aeiou]y$/i.test(s)) return s.slice(0, -1) + "ies";
  if (/(?:f|fe)$/i.test(s)) return s.replace(/(f|fe)$/i, "ves");
  return s + "s";
}

// levenshtein distance using dynamic programming on Unicode code points
export function levenshtein(a, b) {
  const s = toStr(a);
  const t = toStr(b);
  const sChars = Array.from(s);
  const tChars = Array.from(t);
  const n = sChars.length;
  const m = tChars.length;
  if (n === 0) return m;
  if (m === 0) return n;
  const v0 = new Array(m + 1);
  const v1 = new Array(m + 1);
  for (let j = 0; j <= m; j++) v0[j] = j;
  for (let i = 0; i < n; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < m; j++) {
      const cost = sChars[i] === tChars[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= m; j++) v0[j] = v1[j];
  }
  return v1[m];
}

// CLI entrypoint behaviour (preserve existing behaviour)
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

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}

// -----------------------------
// JSON Schema diff engine (single canonical implementation)
// -----------------------------

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function unescapePointer(segment) {
  return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}

function getByPointer(root, pointer) {
  if (!pointer) return root;
  // pointer may start with '/', but may be empty for '#'
  const parts = pointer.split("/").slice(1).map(unescapePointer);
  let node = root;
  for (const p of parts) {
    if (node && typeof node === "object" && p in node) {
      node = node[p];
    } else {
      throw new Error(`Invalid JSON Pointer: #/${parts.join("/")}`);
    }
  }
  return node;
}

export function resolveLocalRefs(schema) {
  if (!schema || typeof schema !== "object") return schema;
  const root = cloneDeep(schema);

  function resolve(node, stack = new Set()) {
    if (Array.isArray(node)) return node.map((n) => resolve(n, stack));
    if (node && typeof node === "object") {
      if (node.$ref && typeof node.$ref === "string") {
        const ref = node.$ref;
        if (!ref.startsWith("#")) {
          throw new Error(`Remote $ref not supported: ${ref}`);
        }
        const pointer = ref.slice(1); // remove leading '#'
        // detect circular refs
        if (stack.has(pointer)) {
          // return the $ref as-is to avoid infinite recursion (best-effort)
          return { $ref: ref };
        }
        stack.add(pointer);
        const target = getByPointer(root, pointer);
        const resolved = cloneDeep(target);
        const out = resolve(resolved, stack);
        stack.delete(pointer);
        return out;
      }
      const out = {};
      for (const [k, v] of Object.entries(node)) {
        out[k] = resolve(v, stack);
      }
      return out;
    }
    return node;
  }

  return resolve(root);
}

function ensureArray(x) {
  if (x == null) return [];
  return Array.isArray(x) ? x : [x];
}

function arrayDiff(a = [], b = []) {
  const added = b.filter((v) => !a.includes(v));
  const removed = a.filter((v) => !b.includes(v));
  return { added, removed };
}

function makePath(parentPath, segment) {
  let p;
  if (!parentPath) p = segment || "";
  else if (!segment) p = parentPath;
  else p = parentPath.replace(/\/$/, "") + (segment.startsWith("/") ? segment : "/" + segment).replace(/\/\//g, "/");
  if (!p) return "/";
  return p.startsWith("/") ? p : "/" + p;
}

function diffSubschemas(a, b, path = "") {
  const changes = [];
  // both may be undefined
  if (!a && b) {
    changes.push({ path, changeType: "schema-added", before: null, after: cloneDeep(b) });
    return changes;
  }
  if (a && !b) {
    changes.push({ path, changeType: "schema-removed", before: cloneDeep(a), after: null });
    return changes;
  }
  // compare simple keywords: type and description at the current node
  if (a && b) {
    if (a.type !== b.type) {
      // record the type change at the current schema path
      changes.push({ path: path || "/", changeType: "type-changed", before: a.type ?? null, after: b.type ?? null });
    }
    if ((a.description || "") !== (b.description || "")) {
      changes.push({ path: path || "/", changeType: "description-changed", before: a.description ?? null, after: b.description ?? null });
    }
    // enum
    if (Array.isArray(a.enum) || Array.isArray(b.enum)) {
      const aEnum = ensureArray(a.enum);
      const bEnum = ensureArray(b.enum);
      for (const v of bEnum.filter((x) => !aEnum.includes(x))) {
        changes.push({ path: makePath(path, "enum"), changeType: "enum-value-added", before: null, after: v });
      }
      for (const v of aEnum.filter((x) => !bEnum.includes(x))) {
        changes.push({ path: makePath(path, "enum"), changeType: "enum-value-removed", before: v, after: null });
      }
    }

    // properties
    const aProps = (a.properties && typeof a.properties === "object") ? a.properties : {};
    const bProps = (b.properties && typeof b.properties === "object") ? b.properties : {};
    const aReq = ensureArray(a.required);
    const bReq = ensureArray(b.required);

    const allPropKeys = Array.from(new Set([...Object.keys(aProps), ...Object.keys(bProps)]));
    for (const key of allPropKeys) {
      const aP = aProps[key];
      const bP = bProps[key];
      const propPath = makePath(path, `properties/${key}`);
      if (aP && !bP) {
        changes.push({ path: propPath, changeType: "property-removed", before: cloneDeep(aP), after: null, wasRequired: aReq.includes(key) });
      } else if (!aP && bP) {
        changes.push({ path: propPath, changeType: "property-added", before: null, after: cloneDeep(bP), isRequired: bReq.includes(key) });
      } else if (aP && bP) {
        // nested diff
        const nested = diffSubschemas(aP, bP, propPath);
        if (nested.length > 0) {
          changes.push({ path: propPath, changeType: "nested-changed", changes: nested });
        }
      }
    }

    // required changes (per-property) - report under /required/<prop>
    for (const added of bReq.filter((r) => !aReq.includes(r))) {
      changes.push({ path: makePath(path, `required/${added}`), changeType: "required-added", before: false, after: true });
    }
    for (const removed of aReq.filter((r) => !bReq.includes(r))) {
      changes.push({ path: makePath(path, `required/${removed}`), changeType: "required-removed", before: true, after: false });
    }

    // items
    if (a.items || b.items) {
      const aItems = a.items || null;
      const bItems = b.items || null;
      const itemsPath = makePath(path, "items");
      if (!aItems && bItems) {
        changes.push({ path: itemsPath, changeType: "items-added", before: null, after: cloneDeep(bItems) });
      } else if (aItems && !bItems) {
        changes.push({ path: itemsPath, changeType: "items-removed", before: cloneDeep(aItems), after: null });
      } else if (aItems && bItems) {
        const nested = diffSubschemas(aItems, bItems, itemsPath);
        if (nested.length > 0) {
          changes.push({ path: itemsPath, changeType: "nested-changed", changes: nested });
        }
      }
    }

    // combinators: allOf/oneOf/anyOf
    for (const comb of ["allOf", "oneOf", "anyOf"]) {
      const aComb = Array.isArray(a[comb]) ? a[comb] : [];
      const bComb = Array.isArray(b[comb]) ? b[comb] : [];
      const max = Math.max(aComb.length, bComb.length);
      for (let i = 0; i < max; i++) {
        const aC = aComb[i];
        const bC = bComb[i];
        const combPath = makePath(path, `${comb}/${i}`);
        if (aC && !bC) {
          changes.push({ path: combPath, changeType: `${comb}-removed`, before: cloneDeep(aC), after: null });
        } else if (!aC && bC) {
          changes.push({ path: combPath, changeType: `${comb}-added`, before: null, after: cloneDeep(bC) });
        } else if (aC && bC) {
          const nested = diffSubschemas(aC, bC, combPath);
          if (nested.length > 0) {
            changes.push({ path: combPath, changeType: "nested-changed", changes: nested });
          }
        }
      }
    }
  }

  return changes;
}

export function diffSchemas(schemaA, schemaB) {
  if (!schemaA || !schemaB) throw new Error("Both schemas must be provided");
  const a = resolveLocalRefs(schemaA);
  const b = resolveLocalRefs(schemaB);
  const changes = diffSubschemas(a, b, "");
  return changes;
}

export function classifyChange(change) {
  if (!change || typeof change !== "object") return "informational";
  const t = change.changeType;
  if (t === "property-added") return "compatible";
  if (t === "property-removed") return change.wasRequired ? "breaking" : "compatible";
  if (t === "type-changed") return "breaking";
  if (t === "required-added") return "breaking";
  if (t === "required-removed") return "compatible";
  if (t === "enum-value-added") return "compatible";
  if (t === "enum-value-removed") return "breaking";
  if (t === "description-changed") return "informational";
  if (t === "nested-changed") {
    // evaluate nested changes: breaking > compatible > informational
    const nested = Array.isArray(change.changes) ? change.changes : [];
    let worst = "informational";
    for (const c of nested) {
      const cls = classifyChange(c);
      if (cls === "breaking") return "breaking";
      if (cls === "compatible") worst = "compatible";
    }
    return worst;
  }
  if (t === "schema-removed" || t === "schema-added" || t.endsWith("-removed")) return "breaking";
  return "informational";
}

function formatChangeText(change, indent = "") {
  const classify = classifyChange(change);
  const tag = `[${classify.toUpperCase()}]`;
  const p = change.path || "/";
  switch (change.changeType) {
    case "property-added":
      return `${indent}${tag} ${p}: property-added (type: ${JSON.stringify(change.after?.type ?? null)})`;
    case "property-removed":
      return `${indent}${tag} ${p}: property-removed${change.wasRequired ? " (was required)" : ""}`;
    case "type-changed":
      return `${indent}${tag} ${p}: type-changed ${JSON.stringify(change.before)} -> ${JSON.stringify(change.after)}`;
    case "required-added":
      return `${indent}${tag} ${p}: required-added`;
    case "required-removed":
      return `${indent}${tag} ${p}: required-removed`;
    case "enum-value-added":
      return `${indent}${tag} ${p}: enum-value-added ${JSON.stringify(change.after)}`;
    case "enum-value-removed":
      return `${indent}${tag} ${p}: enum-value-removed ${JSON.stringify(change.before)}`;
    case "description-changed":
      return `${indent}${tag} ${p}: description-changed ${JSON.stringify(change.before)} -> ${JSON.stringify(change.after)}`;
    case "nested-changed": {
      const lines = [`${indent}${tag} ${p}: nested-changed (${change.changes.length} changes)`];
      for (const ch of change.changes) {
        lines.push(formatChangeText(ch, indent + "  "));
      }
      return lines.join("\n");
    }
    case "schema-added":
      return `${indent}${tag} ${p}: schema-added`;
    case "schema-removed":
      return `${indent}${tag} ${p}: schema-removed`;
    default:
      return `${indent}${tag} ${p}: ${change.changeType}`;
  }
}

export function formatChanges(changes, options = {}) {
  if (!Array.isArray(changes)) return "";
  const asJson = options?.format === 'json' || options?.style === 'json' || options?.json === true;
  if (asJson) return JSON.stringify(changes, null, 2);
  // text
  const lines = [];
  for (const c of changes) {
    lines.push(formatChangeText(c));
  }
  return lines.join("\n");
}
