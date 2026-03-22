// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js — JSON Schema diff utilities + identity

const isNode = typeof process !== "undefined" && !!(process.versions && process.versions.node);

let pkg = { name: "repo", version: "0.0.0", description: "" };
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch (e) {
    // ignore; keep default pkg
  }
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    // browser fallback
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
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

// -----------------------------
// JSON Pointer helpers
// -----------------------------
function jsonPointerEscape(str) {
  return String(str).replace(/~/g, "~0").replace(/\//g, "~1");
}
function jsonPointerUnescape(str) {
  return String(str).replace(/~1/g, "/").replace(/~0/g, "~");
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getByPointer(root, pointer) {
  if (!pointer || pointer === "#") return root;
  let p = pointer;
  if (p.startsWith("#")) p = p.slice(1);
  if (p === "") return root;
  const parts = p.split(/\//).filter(Boolean).map(jsonPointerUnescape);
  let node = root;
  for (const part of parts) {
    if (node == null || typeof node !== "object") return undefined;
    node = node[part];
  }
  return node;
}

// -----------------------------
// $ref resolver (local refs only)
// -----------------------------
export function resolveLocalRefs(schema) {
  if (!schema || typeof schema !== "object") return schema;
  const root = deepClone(schema);
  const resolving = new Set();

  function _resolve(node) {
    if (Array.isArray(node)) {
      return node.map(_resolve);
    }
    if (node && typeof node === "object") {
      if (typeof node.$ref === "string") {
        const ref = node.$ref;
        if (!ref.startsWith("#")) {
          throw new Error(`Remote $ref not supported: ${ref}`);
        }
        if (resolving.has(ref)) {
          throw new Error(`Circular $ref detected: ${ref}`);
        }
        resolving.add(ref);
        const target = getByPointer(root, ref);
        if (target === undefined) {
          throw new Error(`Unresolved $ref: ${ref}`);
        }
        // resolve target and merge with siblings (siblings override)
        const resolvedTarget = _resolve(deepClone(target));
        const merged = Object.assign({}, resolvedTarget);
        for (const [k, v] of Object.entries(node)) {
          if (k === "$ref") continue;
          merged[k] = _resolve(v);
        }
        resolving.delete(ref);
        return merged;
      }
      const out = {};
      for (const [k, v] of Object.entries(node)) {
        out[k] = _resolve(v);
      }
      return out;
    }
    return node;
  }

  return _resolve(root);
}

// -----------------------------
// Diffing
// -----------------------------

function arrayDiff(a = [], b = []) {
  const removed = a.filter((x) => !b.includes(x));
  const added = b.filter((x) => !a.includes(x));
  return { added, removed };
}

function ensureArray(v) {
  return Array.isArray(v) ? v : v === undefined ? [] : [v];
}

function pathJoin(basePath, segment) {
  // normalize so paths always start with a leading slash when a segment exists
  if (!basePath) return segment ? (segment.startsWith("/") ? segment : "/" + segment) : "";
  if (!segment) return basePath.startsWith("/") ? basePath : "/" + basePath;
  const p = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return p + (segment.startsWith("/") ? segment : "/" + segment);
}

export function diffSchemas(baseSchema, headSchema) {
  const base = resolveLocalRefs(baseSchema || {});
  const head = resolveLocalRefs(headSchema || {});
  const results = [];

  function diffObject(baseNode, headNode, path) {
    const changes = [];

    // Compare immediate scalar keywords
    const bType = baseNode && baseNode.type;
    const hType = headNode && headNode.type;
    if (bType !== undefined || hType !== undefined) {
      if (bType !== hType) {
        changes.push({ path, changeType: "type-changed", before: bType, after: hType });
      }
    }

    const bDesc = baseNode && baseNode.description;
    const hDesc = headNode && headNode.description;
    if (bDesc !== undefined || hDesc !== undefined) {
      if (bDesc !== hDesc) {
        changes.push({ path, changeType: "description-changed", before: bDesc, after: hDesc });
      }
    }

    // enum diffs
    const bEnum = ensureArray(baseNode?.enum);
    const hEnum = ensureArray(headNode?.enum);
    if (bEnum.length || hEnum.length) {
      const { added: enumAdded, removed: enumRemoved } = arrayDiff(bEnum, hEnum);
      for (const v of enumAdded) changes.push({ path, changeType: "enum-value-added", value: v });
      for (const v of enumRemoved) changes.push({ path, changeType: "enum-value-removed", value: v });
    }

    // required diffs
    const bReq = ensureArray(baseNode?.required);
    const hReq = ensureArray(headNode?.required);
    if (bReq.length || hReq.length) {
      const { added: reqAdded, removed: reqRemoved } = arrayDiff(bReq, hReq);
      for (const pName of reqAdded) changes.push({ path: path ? path + "/required" : "/required", changeType: "required-added", property: pName, before: bReq, after: hReq });
      for (const pName of reqRemoved) changes.push({ path: path ? path + "/required" : "/required", changeType: "required-removed", property: pName, before: bReq, after: hReq });
    }

    // properties
    const bProps = baseNode?.properties || {};
    const hProps = headNode?.properties || {};
    const allKeys = Array.from(new Set([...Object.keys(bProps), ...Object.keys(hProps)]));

    for (const key of allKeys) {
      const inB = Object.prototype.hasOwnProperty.call(bProps, key);
      const inH = Object.prototype.hasOwnProperty.call(hProps, key);
      const childPath = pathJoin(path, "properties/" + jsonPointerEscape(key));
      if (inB && !inH) {
        changes.push({ path: childPath, changeType: "property-removed", before: deepClone(bProps[key]), after: undefined });
      } else if (!inB && inH) {
        changes.push({ path: childPath, changeType: "property-added", before: undefined, after: deepClone(hProps[key]) });
      } else if (inB && inH) {
        const childChanges = diffObject(bProps[key] || {}, hProps[key] || {}, childPath);
        if (childChanges.length === 1 && childChanges[0].path === childPath && childChanges[0].changeType === "type-changed") {
          // propagate simple type change
          changes.push(childChanges[0]);
        } else if (childChanges.length > 0) {
          changes.push({ path: childPath, changeType: "nested-changed", changes: childChanges });
        }
      }
    }

    // items
    if (baseNode?.items || headNode?.items) {
      const bItems = baseNode?.items;
      const hItems = headNode?.items;
      const itemsPath = pathJoin(path, "items");

      // Tuple-style: items is an array of schemas
      if (Array.isArray(bItems) || Array.isArray(hItems)) {
        const bArr = Array.isArray(bItems) ? bItems : [];
        const hArr = Array.isArray(hItems) ? hItems : [];
        const max = Math.max(bArr.length, hArr.length);
        for (let i = 0; i < max; i++) {
          const bi = bArr[i];
          const hi = hArr[i];
          const idxPath = pathJoin(itemsPath, String(i));
          if (bi && !hi) {
            changes.push({ path: idxPath, changeType: "property-removed", before: deepClone(bi), after: undefined });
          } else if (!bi && hi) {
            changes.push({ path: idxPath, changeType: "property-added", before: undefined, after: deepClone(hi) });
          } else if (bi && hi) {
            const cChanges = diffObject(bi, hi, idxPath);
            if (cChanges.length === 1 && cChanges[0].path === idxPath && cChanges[0].changeType === "type-changed") {
              changes.push(cChanges[0]);
            } else if (cChanges.length > 0) {
              changes.push({ path: idxPath, changeType: "nested-changed", changes: cChanges });
            }
          }
        }
      } else {
        // Single-schema items
        if (bItems && !hItems) {
          changes.push({ path: itemsPath, changeType: "property-removed", before: deepClone(bItems), after: undefined });
        } else if (!bItems && hItems) {
          changes.push({ path: itemsPath, changeType: "property-added", before: undefined, after: deepClone(hItems) });
        } else if (bItems && hItems) {
          const itemChanges = diffObject(bItems, hItems, itemsPath);
          if (itemChanges.length === 1 && itemChanges[0].path === itemsPath && itemChanges[0].changeType === "type-changed") {
            changes.push(itemChanges[0]);
          } else if (itemChanges.length > 0) {
            changes.push({ path: itemsPath, changeType: "nested-changed", changes: itemChanges });
          }
        }
      }
    }

    // combinators
    for (const comb of ["allOf", "oneOf", "anyOf"]) {
      const bList = Array.isArray(baseNode?.[comb]) ? baseNode[comb] : [];
      const hList = Array.isArray(headNode?.[comb]) ? headNode[comb] : [];
      const max = Math.max(bList.length, hList.length);
      for (let i = 0; i < max; i++) {
        const bi = bList[i];
        const hi = hList[i];
        const combPath = pathJoin(path, `${comb}/${i}`);
        if (bi && !hi) {
          changes.push({ path: combPath, changeType: "property-removed", before: deepClone(bi), after: undefined });
        } else if (!bi && hi) {
          changes.push({ path: combPath, changeType: "property-added", before: undefined, after: deepClone(hi) });
        } else if (bi && hi) {
          const cChanges = diffObject(bi, hi, combPath);
          if (cChanges.length === 1 && cChanges[0].path === combPath && cChanges[0].changeType === "type-changed") {
            changes.push(cChanges[0]);
          } else if (cChanges.length > 0) {
            changes.push({ path: combPath, changeType: "nested-changed", changes: cChanges });
          }
        }
      }
    }

    return changes;
  }

  results.push(...diffObject(base, head, ""));
  return results;
}

// -----------------------------
// Classification
// -----------------------------
export function classifyChange(change) {
  if (!change || typeof change !== "object") return "informational";
  switch (change.changeType) {
    case "property-removed":
    case "enum-value-removed":
    case "type-changed":
      return "breaking";
    case "required-added":
      return "breaking";
    case "property-added":
    case "enum-value-added":
      return "compatible";
    case "required-removed":
      return "breaking";
    case "description-changed":
      return "informational";
    case "nested-changed": {
      const inner = Array.isArray(change.changes) ? change.changes : [];
      let worst = "informational";
      for (const c of inner) {
        const cls = classifyChange(c);
        if (cls === "breaking") return "breaking";
        if (cls === "compatible") worst = "compatible";
      }
      return worst;
    }
    default:
      return "informational";
  }
}

// -----------------------------
// Formatting
// -----------------------------
export function formatChanges(changes, opts = { format: "text" }) {
  if (!Array.isArray(changes)) return "";
  if (opts.format === "json") return JSON.stringify(changes, null, 2);

  const lines = [];
  function fmt(change, indent = 0) {
    const pad = "  ".repeat(indent);
    switch (change.changeType) {
      case "property-added":
        lines.push(`${pad}+ property added: ${change.path}`);
        if (change.after) lines.push(`${pad}    schema: ${JSON.stringify(change.after)}`);
        break;
      case "property-removed":
        lines.push(`${pad}- property removed: ${change.path}`);
        if (change.before) lines.push(`${pad}    schema: ${JSON.stringify(change.before)}`);
        break;
      case "type-changed":
        lines.push(`${pad}~ type changed: ${change.path}  ${String(change.before)} -> ${String(change.after)}`);
        break;
      case "required-added":
        lines.push(`${pad}+ required: ${change.property} (at ${change.path})`);
        break;
      case "required-removed":
        lines.push(`${pad}- required: ${change.property} (at ${change.path})`);
        break;
      case "enum-value-added":
        lines.push(`${pad}+ enum value added at ${change.path}: ${JSON.stringify(change.value)}`);
        break;
      case "enum-value-removed":
        lines.push(`${pad}- enum value removed at ${change.path}: ${JSON.stringify(change.value)}`);
        break;
      case "description-changed":
        lines.push(`${pad}i description changed at ${change.path}: ${JSON.stringify(change.before)} -> ${JSON.stringify(change.after)}`);
        break;
      case "nested-changed":
        lines.push(`${pad}* nested changes at ${change.path}:`);
        for (const c of change.changes || []) fmt(c, indent + 1);
        break;
      default:
        lines.push(`${pad}? ${change.changeType} at ${change.path}`);
    }
  }

  for (const c of changes) fmt(c, 0);
  return lines.join("\n");
}

// default export not used; keep named exports only
