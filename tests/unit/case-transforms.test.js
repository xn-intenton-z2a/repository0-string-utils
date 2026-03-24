// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { camelCase, kebabCase, titleCase } from "../../src/lib/main.js";

describe("case transforms", () => {
  test("camelCase converts hyphenated to camel", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
  });

  test("kebabCase converts spaces to hyphens and lowercases", () => {
    expect(kebabCase("Foo Bar")).toBe("foo-bar");
  });

  test("titleCase capitalises words", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });

  test("null/undefined handled", () => {
    expect(camelCase(null)).toBe("");
    expect(kebabCase(undefined)).toBe("");
    expect(titleCase(null)).toBe("");
  });
});
