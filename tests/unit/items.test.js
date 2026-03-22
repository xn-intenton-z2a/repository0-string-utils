// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { diffSchemas, classifyChange } from "../../src/lib/main.js";

describe("Array items traversal", () => {
  test("single-schema items type changed", () => {
    const base = { type: "object", properties: { arr: { type: "array", items: { type: "string" } } } };
    const head = { type: "object", properties: { arr: { type: "array", items: { type: "number" } } } };
    const changes = diffSchemas(base, head);
    // top-level result should report nested change at /properties/arr
    const parent = changes.find((c) => c.path === "/properties/arr" && c.changeType === "nested-changed");
    expect(parent).toBeTruthy();
    expect(Array.isArray(parent.changes)).toBe(true);
    expect(parent.changes.some((c) => c.changeType === "type-changed" && c.path === "/properties/arr/items" && c.before === "string" && c.after === "number")).toBe(true);
    // classification
    expect(classifyChange(parent)).toBe("breaking");
  });

  test("tuple-style items index-based diffs", () => {
    const base = { type: "object", properties: { arr: { type: "array", items: [ { type: "string" }, { type: "number" } ] } } };
    const head = { type: "object", properties: { arr: { type: "array", items: [ { type: "string" }, { type: "integer" } ] } } };
    const changes = diffSchemas(base, head);
    const parent = changes.find((c) => c.path === "/properties/arr" && c.changeType === "nested-changed");
    expect(parent).toBeTruthy();
    // inner changes should include the index change at /properties/arr/items/1
    const flat = parent.changes || [];
    expect(flat.some((c) => c.path === "/properties/arr/items/1" && (c.changeType === "type-changed" || c.changeType === "nested-changed"))).toBe(true);
    // overall classification should be breaking because type changed
    expect(classifyChange(parent)).toBe("breaking");
  });

  test("resolves $ref in items", () => {
    const base = {
      definitions: { A: { type: "string" } },
      type: "object",
      properties: { arr: { type: "array", items: { $ref: "#/definitions/A" } } }
    };
    const head = {
      definitions: { A: { type: "number" } },
      type: "object",
      properties: { arr: { type: "array", items: { $ref: "#/definitions/A" } } }
    };
    const changes = diffSchemas(base, head);
    const parent = changes.find((c) => c.path === "/properties/arr" && c.changeType === "nested-changed");
    expect(parent).toBeTruthy();
    expect(parent.changes.some((c) => c.changeType === "type-changed" && c.path === "/properties/arr/items" && c.before === "string" && c.after === "number")).toBe(true);
    expect(classifyChange(parent)).toBe("breaking");
  });
});
