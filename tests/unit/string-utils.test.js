// SPDX-License-Identifier: MIT
// Unit tests for string utility functions
import { describe, test, expect } from "vitest";
import {
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

describe("String utilities", () => {
  test("slugify: basic and diacritics", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("Café Münster")).toBe("cafe-munster");
    expect(slugify(null)).toBe("");
  });

  test("truncate: doesn't break mid-word and uses suffix", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
    expect(truncate("Short", 10)).toBe("Short");
    expect(truncate(null, 5)).toBe("");
  });

  test("camelCase and kebabCase", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    expect(kebabCase("fooBarBaz")).toBe("foo-bar-baz");
    expect(kebabCase("Hello World")).toBe("hello-world");
  });

  test("titleCase", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase("")).toBe("");
    expect(titleCase(null)).toBe("");
  });

  test("wordWrap respects width and doesn't break words", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const wrapped = wordWrap(text, 10);
    expect(wrapped.split('\n').every(l => l.length <= 10)).toBe(true);
    expect(wrapped).toContain("The quick");
  });

  test("stripHtml removes tags and decodes entities", () => {
    const html = "<p>Hello &amp; <strong>World</strong></p>";
    expect(stripHtml(html)).toBe("Hello & World");
    expect(stripHtml(null)).toBe("");
  });

  test("escapeRegex escapes special characters", () => {
    const src = ".*+?^${}()|[]\\";
    expect(escapeRegex(src)).toBe("\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\");
  });

  test("pluralize basic rules", () => {
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("baby")).toBe("babies");
    expect(pluralize("toy")).toBe("toys");
    expect(pluralize("leaf")).toBe("leaves");
    expect(pluralize(null)).toBe("");
  });

  test("levenshtein distance calculations", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "")).toBe(0);
    expect(levenshtein(null, "abc")).toBe(3);
  });
});
