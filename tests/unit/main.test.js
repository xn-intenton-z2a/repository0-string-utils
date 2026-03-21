// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import {
  name,
  version,
  description,
  getIdentity,
  slugify,
  truncate,
  camelCase,
  kebabCase,
  titleCase,
  wordWrap,
  stripHtml,
  escapeRegex,
  pluralize,
  levenshtein,
} from "../../src/lib/main.js";

describe("Library Identity", () => {
  test("exports name, version, and description", () => {
    expect(typeof name).toBe("string");
    expect(typeof version).toBe("string");
    expect(typeof description).toBe("string");
    expect(name.length).toBeGreaterThan(0);
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("getIdentity returns correct structure", () => {
    const identity = getIdentity();
    expect(identity).toEqual({ name, version, description });
  });
});

describe("String Utilities", () => {
  test("slugify basic and unicode", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("Café Déjà vu")).toBe("cafe-deja-vu");
    expect(slugify(null)).toBe("");
  });

  test("truncate without breaking mid-word", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
    expect(truncate("Hello", 10)).toBe("Hello");
    expect(truncate(null, 5)).toBe("");
  });

  test("camelCase and kebabCase", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    expect(camelCase("Foo Bar")).toBe("fooBar");
    expect(kebabCase("Foo Bar Baz")).toBe("foo-bar-baz");
  });

  test("titleCase", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase(null)).toBe("");
  });

  test("wordWrap respects width and word boundaries", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const wrapped = wordWrap(text, 10);
    const lines = wrapped.split("\n");
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(10);
    }
    // Ensure words are not broken
    expect(wrapped).toContain("brown");
  });

  test("stripHtml removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; <strong>World</strong></p>")).toBe("Hello & World");
    expect(stripHtml(null)).toBe("");
  });

  test("escapeRegex escapes special characters", () => {
    expect(escapeRegex("^test$")).toBe("\\^test\\$");
    expect(escapeRegex(null)).toBe("");
  });

  test("pluralize basic rules", () => {
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("baby")).toBe("babies");
    expect(pluralize("leaf")).toBe("leaves");
    expect(pluralize("cat")).toBe("cats");
    expect(pluralize(null)).toBe("");
  });

  test("levenshtein distance", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein(null, "abc")).toBe(3);
  });
});
