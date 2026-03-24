// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { slugify } from "../../src/lib/main.js";

describe("slugify", () => {
  test("basic slugifies and lowercases", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  test("returns empty for empty/null/undefined", () => {
    expect(slugify("")).toBe("");
    expect(slugify(null)).toBe("");
    expect(slugify(undefined)).toBe("");
  });

  test("removes diacritics", () => {
    expect(slugify("Café au lait")).toBe("cafe-au-lait");
  });
});
