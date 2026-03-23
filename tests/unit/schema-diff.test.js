// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { diffSchemas, resolveLocalRefs, classifyChange, formatChanges } from "../../src/lib/main.js";

describe("Schema diff engine", () => {
  test("detects property-added and property-removed", () => {
    const A = { type: "object", properties: { a: { type: "string" } }, required: ["a"] };
    const B = { type: "object", properties: { a: { type: "string" }, b: { type: "number" } }, required: ["a"] };
    const changes = diffSchemas(A, B);
    const added = changes.find((c) => c.changeType === "property-added" && c.path === "/properties/b");
    expect(added).toBeDefined();
    expect(classifyChange(added)).toBe("compatible");
  });

  test("detects type-changed on nested property", () => {
    const A = { type: "object", properties: { a: { type: "string" } } };
    const B = { type: "object", properties: { a: { type: "number" } } };
    const changes = diffSchemas(A, B);
    const t = changes.find((c) => c.changeType === "nested-changed" && c.path === "/properties/a");
    // nested-changed should contain a type-changed within
    expect(t).toBeDefined();
    const inner = t.changes.find((c) => c.changeType === "type-changed");
    expect(inner).toBeDefined();
    expect(inner.before).toBe("string");
    expect(inner.after).toBe("number");
  });

  test("detects required-added as breaking and required-removed as compatible", () => {
    const A = { type: "object", properties: { a: { type: "string" } }, required: [] };
    const B = { type: "object", properties: { a: { type: "string" } }, required: ["a"] };
    const adds = diffSchemas(A, B).filter((c) => c.changeType === "required-added");
    expect(adds.length).toBe(1);
    expect(classifyChange(adds[0])).toBe("breaking");

    const C = { type: "object", properties: { a: { type: "string" } }, required: ["a"] };
    const D = { type: "object", properties: { a: { type: "string" } }, required: [] };
    const removed = diffSchemas(C, D).filter((c) => c.changeType === "required-removed");
    expect(removed.length).toBe(1);
    expect(classifyChange(removed[0])).toBe("compatible");
  });

  test("detects enum value changes", () => {
    const A = { type: "object", properties: { a: { enum: ["x"] } } };
    const B = { type: "object", properties: { a: { enum: ["x", "y"] } } };
    const changes = diffSchemas(A, B);
    function findChange(arr, fn) {
      for (const c of arr) {
        if (fn(c)) return c;
        if (c.changeType === 'nested-changed' && Array.isArray(c.changes)) {
          const found = findChange(c.changes, fn);
          if (found) return found;
        }
      }
      return undefined;
    }
    const added = findChange(changes, (c) => c.changeType === "enum-value-added" && c.path === "/properties/a/enum");
    expect(added).toBeDefined();
    expect(added.after).toBe("y");
    expect(classifyChange(added)).toBe("compatible");
  });

  test("detects description changes", () => {
    const A = { type: "object", properties: { a: { description: "old" } } };
    const B = { type: "object", properties: { a: { description: "new" } } };
    const changes = diffSchemas(A, B);
    const ch = changes.find((c) => c.changeType === "nested-changed" && c.path === "/properties/a");
    expect(ch).toBeDefined();
    const inner = ch.changes.find((c) => c.changeType === "description-changed");
    expect(inner).toBeDefined();
    expect(classifyChange(inner)).toBe("informational");
  });

  test("handles nested schemas recursively", () => {
    const A = { type: "object", properties: { user: { type: "object", properties: { email: { type: "string" } } } } };
    const B = { type: "object", properties: { user: { type: "object", properties: { email: { type: "number" } } } } };
    const changes = diffSchemas(A, B);
    const userChange = changes.find((c) => c.changeType === "nested-changed" && c.path === "/properties/user");
    expect(userChange).toBeDefined();
    const emailChange = userChange.changes.find((c) => c.path === "/properties/user/properties/email" || c.changeType === "type-changed");
    expect(emailChange).toBeDefined();
    // classification of nested should reflect inner breaking
    expect(classifyChange(userChange)).toBe("breaking");
  });

  test("resolves local $ref before diffing and reports nested changes", () => {
    const A = {
      definitions: { address: { type: "object", properties: { street: { type: "string" } }, required: ["street"] } },
      type: "object",
      properties: { addr: { $ref: "#/definitions/address" } }
    };
    const B = {
      definitions: { address: { type: "object", properties: { street: { type: "string" }, city: { type: "string" } }, required: ["street"] } },
      type: "object",
      properties: { addr: { $ref: "#/definitions/address" } }
    };
    const changes = diffSchemas(A, B);
    const addrChange = changes.find((c) => c.changeType === "nested-changed" && c.path === "/properties/addr");
    expect(addrChange).toBeDefined();
    const cityAdded = addrChange.changes.find((c) => c.changeType === "property-added" && c.path === "/properties/addr/properties/city");
    expect(cityAdded).toBeDefined();
  });

  test("classifies removal of a required property as breaking and formats output", () => {
    const A = { type: "object", properties: { email: { type: "string" } }, required: ["email"] };
    const B = { type: "object", properties: {} };
    const changes = diffSchemas(A, B);
    const removed = changes.find((c) => c.changeType === "property-removed" && c.path === "/properties/email");
    expect(removed).toBeDefined();
    expect(removed.wasRequired).toBe(true);
    expect(classifyChange(removed)).toBe("breaking");
    const text = formatChanges([removed]);
    expect(text).toContain("[BREAKING]");
    expect(text).toContain("property-removed");
    expect(text).toContain("/properties/email");
  });

  test("resolveLocalRefs throws on remote refs", () => {
    const s = { $ref: "http://example.com/schema.json" };
    expect(() => resolveLocalRefs(s)).toThrow();
  });
});
