// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { diffSchemas, classifyChange } from "../../src/lib/main.js";

describe("Combinator traversal (allOf/oneOf/anyOf)", () => {
  test("property added inside oneOf subschema is reported as nested-changed and classified compatible", () => {
    const base = { oneOf: [ { type: "object", properties: { a: { type: "string" } } } ] };
    const head = { oneOf: [ { type: "object", properties: { a: { type: "string" }, b: { type: "number" } } } ] };
    const changes = diffSchemas(base, head);
    const node = changes.find((c) => c.path === "/oneOf/0" && c.changeType === "nested-changed");
    expect(node).toBeTruthy();
    expect(Array.isArray(node.changes)).toBe(true);
    expect(node.changes.some((c) => c.changeType === "property-added" && c.path === "/oneOf/0/properties/b")).toBe(true);
    expect(classifyChange(node)).toBe("compatible");
  });

  test("type changed inside anyOf subschema is reported and classified breaking", () => {
    const base = { anyOf: [ { type: "object", properties: { a: { type: "string" } } } ] };
    const head = { anyOf: [ { type: "object", properties: { a: { type: "number" } } } ] };
    const changes = diffSchemas(base, head);
    const node = changes.find((c) => c.path === "/anyOf/0" && c.changeType === "nested-changed");
    expect(node).toBeTruthy();
    expect(node.changes.some((c) => c.changeType === "type-changed" && c.path === "/anyOf/0/properties/a" && c.before === "string" && c.after === "number")).toBe(true);
    expect(classifyChange(node)).toBe("breaking");
  });

  test("nested-changed recurses through combinators and properties", () => {
    const base = { type: "object", properties: { p: { type: "object", allOf: [ { properties: { x: { type: "string" } } } ] } } };
    const head = { type: "object", properties: { p: { type: "object", allOf: [ { properties: { x: { type: "number" } } } ] } } };
    const changes = diffSchemas(base, head);
    const parent = changes.find((c) => c.path === "/properties/p" && c.changeType === "nested-changed");
    expect(parent).toBeTruthy();
    // parent should contain nested changes, which themselves include a nested-changed at /properties/p/allOf/0
    const child = (parent.changes || []).find((c) => c.path === "/properties/p/allOf/0" && c.changeType === "nested-changed");
    expect(child).toBeTruthy();
    expect(child.changes.some((c) => c.changeType === "type-changed" && c.path === "/properties/p/allOf/0/properties/x" && c.before === "string" && c.after === "number")).toBe(true);
    expect(classifyChange(parent)).toBe("breaking");
  });
});
