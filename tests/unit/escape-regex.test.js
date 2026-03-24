// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { escapeRegex } from "../../src/lib/main.js";

describe("escapeRegex", () => {
  test("escapes dot", () => {
    expect(escapeRegex("a.b")).toBe("a\\.b");
  });

  test("works inside RegExp", () => {
    const esc = escapeRegex("a.b");
    const re = new RegExp(`^${esc}$`);
    expect(re.test("a.b")).toBe(true);
  });

  test("null/undefined handled", () => {
    expect(escapeRegex(null)).toBe("");
  });
});
