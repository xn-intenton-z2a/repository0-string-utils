// SPDX-License-Identifier: MIT
// Unit tests for JSON Schema diff utilities
import { describe, test, expect } from "vitest";
import { diffSchemas, formatChanges, classifyChange, resolveLocalRefs } from "../../src/lib/main.js";

describe("JSON Schema diff", () => {
  test("diffing two schemas returns an array of change objects", () => {
    const base = { type: "object", properties: { a: { type: "string" } } };
    const head = { type: "object", properties: { a: { type: "string" }, b: { type: "number" } } };
    const changes = diffSchemas(base, head);
    expect(Array.isArray(changes)).toBe(true);
    expect(changes.find((c) => c.changeType === "property-added" && c.path === "/properties/b")).toBeTruthy();
  });

  test("detects added and removed properties", () => {
    const base = { type: "object", properties: { removed: { type: "string" } } };
    const head = { type: "object", properties: { added: { type: "string" } } };
    const changes = diffSchemas(base, head);
    expect(changes.some((c) => c.changeType === "property-removed" && c.path === "/properties/removed")).toBe(true);
    expect(changes.some((c) => c.changeType === "property-added" && c.path === "/properties/added")).toBe(true);
  });

  test("detects type changes", () => {
    const base = { type: "object", properties: { val: { type: "string" } } };
    const head = { type: "object", properties: { val: { type: "number" } } };
    const changes = diffSchemas(base, head);
    expect(changes.some((c) => c.changeType === "type-changed" && c.path === "/properties/val" && c.before === "string" && c.after === "number")).toBe(true);
  });

  test("detects required array changes", () => {
    const base = { type: "object", properties: { x: { type: "string" } }, required: [] };
    const head = { type: "object", properties: { x: { type: "string" } }, required: ["x"] };
    const changes = diffSchemas(base, head);
    expect(changes.some((c) => c.changeType === "required-added" && c.property === "x")).toBe(true);
    // removing required
    const changes2 = diffSchemas(head, base);
    expect(changes2.some((c) => c.changeType === "required-removed" && c.property === "x")).toBe(true);
  });

  test("detects enum value added and removed", () => {
    const base = { type: "object", properties: { color: { enum: ["red", "blue"] } } };
    const head = { type: "object", properties: { color: { enum: ["red", "green"] } } };
    const changes = diffSchemas(base, head);
    // flatten nested change arrays
    function flatten(arr) { const out = []; for (const c of arr) { out.push(c); if (Array.isArray(c.changes)) out.push(...flatten(c.changes)); } return out; }
    const flat = flatten(changes);
    expect(flat.some((c) => c.changeType === "enum-value-added" && c.value === "green")).toBe(true);
    expect(flat.some((c) => c.changeType === "enum-value-removed" && c.value === "blue")).toBe(true);
  });

  test("detects description changed", () => {
    const base = { type: "object", properties: { thing: { description: "old" } } };
    const head = { type: "object", properties: { thing: { description: "new" } } };
    const changes = diffSchemas(base, head);
    function flatten(arr) { const out = []; for (const c of arr) { out.push(c); if (Array.isArray(c.changes)) out.push(...flatten(c.changes)); } return out; }
    const flat = flatten(changes);
    expect(flat.some((c) => c.changeType === "description-changed" && c.path === "/properties/thing")).toBe(true);
  });

  test("handles nested schemas recursively and reports nested-changed", () => {
    const base = { type: "object", properties: { parent: { type: "object", properties: { child: { type: "string" } } } } };
    const head = { type: "object", properties: { parent: { type: "object", properties: { child: { type: "number" } } } } };
    const changes = diffSchemas(base, head);
    const nested = changes.find((c) => c.changeType === "nested-changed" && c.path === "/properties/parent");
    expect(nested).toBeTruthy();
    expect(Array.isArray(nested.changes)).toBe(true);
    expect(nested.changes.some((c) => c.changeType === "type-changed" && c.path === "/properties/parent/properties/child")).toBe(true);
  });

  test("resolves local $ref before diffing and throws on remote $ref", () => {
    const base = {
      definitions: { A: { type: "string" } },
      type: "object",
      properties: { x: { $ref: "#/definitions/A" } }
    };
    const head = {
      definitions: { A: { type: "number" } },
      type: "object",
      properties: { x: { $ref: "#/definitions/A" } }
    };
    const changes = diffSchemas(base, head);
    expect(changes.some((c) => c.changeType === "type-changed" && c.path === "/properties/x" && c.before === "string" && c.after === "number")).toBe(true);

    const remote = { properties: { y: { $ref: "http://example.com/schemas/other" } } };
    expect(() => resolveLocalRefs(remote)).toThrow(/Remote \$ref not supported/);
  });

  test("classifying a removed required property returns breaking", () => {
    const change = { changeType: "required-removed", property: "a" };
    expect(classifyChange(change)).toBe("breaking");
    const change2 = { changeType: "required-added", property: "a" };
    expect(classifyChange(change2)).toBe("breaking");
  });

  test("formatChanges produces readable text output", () => {
    const base = { type: "object", properties: { val: { type: "string" } } };
    const head = { type: "object", properties: { val: { type: "number" } } };
    const changes = diffSchemas(base, head);
    const text = formatChanges(changes, { format: "text" });
    expect(typeof text).toBe("string");
    expect(text).toContain("type changed");
  });
});
