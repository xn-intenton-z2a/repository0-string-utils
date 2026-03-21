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
  levenshtein
} from "../../src/lib/main.js";

describe("String Utilities", () => {
  test("slugify basic and unicode", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("こんにちは 世界")).toBe("こんにちは-世界");
    expect(slugify(null)).toBe("");
  });

  test("truncate doesn't break mid-word and uses suffix", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
    expect(truncate("Short", 10)).toBe("Short");
    expect(truncate(null, 5)).toBe("");
  });

  test("camelCase and kebabCase conversions", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    expect(camelCase("Foo BAR_baz")).toBe("fooBarBaz");
    expect(kebabCase("fooBarBaz")).toBe("foo-bar-baz");
    expect(kebabCase("Hello World!")).toBe("hello-world");
  });

  test("titleCase capitalises words", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase("mIxEd CaSe")).toBe("Mixed Case");
  });

  test("wordWrap soft wraps without breaking words", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const wrapped = wordWrap(text, 10);
    expect(wrapped).toBe("The quick\nbrown fox\njumps over\nthe lazy\ndog");
    expect(wordWrap(null, 5)).toBe("");
  });

  test("stripHtml removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; <strong>World</strong></p>")).toBe("Hello & World");
    expect(stripHtml("5 &lt; 10 &amp; 2 &gt; 1")).toBe("5 < 10 & 2 > 1");
    expect(stripHtml(null)).toBe("");
  });

  test("escapeRegex escapes special regex characters", () => {
    expect(escapeRegex("a+b(c)")).toBe("a\\+b\\(c\\)");
    expect(escapeRegex(null)).toBe("");
  });

  test("pluralize follows basic English rules", () => {
    expect(pluralize("bus")).toBe("buses");
    expect(pluralize("baby")).toBe("babies");
    expect(pluralize("leaf")).toBe("leaves");
    expect(pluralize("cat")).toBe("cats");
    expect(pluralize(null)).toBe("");
  });

  test("levenshtein distance computes edits", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein(null, "a")).toBe(1);
  });
});
