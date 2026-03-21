// SPDX-License-Identifier: MIT
// Unit tests for string utility functions
import { describe, test, expect } from "vitest";
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from "../../src/lib/main.js";

describe("String utilities", () => {
  test("slugify basic", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  test("slugify unicode", () => {
    expect(slugify("Café au lait")).toBe("cafe-au-lait");
  });

  test("truncate doesn’t break mid-word and appends suffix", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
  });

  test("camelCase conversion", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    expect(camelCase("Foo Bar Baz")).toBe("fooBarBaz");
  });

  test("kebabCase conversion", () => {
    expect(kebabCase("Foo Bar Baz")).toBe("foo-bar-baz");
    expect(kebabCase("fooBarBaz")).toBe("foobarbaz");
  });

  test("titleCase conversion", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase("mIxEd CaSe")).toBe("Mixed Case");
  });

  test("wordWrap respects width and doesn't break words", () => {
    expect(wordWrap("Hello world", 5)).toBe("Hello\nworld");
    expect(wordWrap("short", 10)).toBe("short");
  });

  test("stripHtml removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; <strong>world</strong></p>")).toBe("Hello & world");
    expect(stripHtml(null)).toBe("");
  });

  test("escapeRegex escapes special characters", () => {
    expect(escapeRegex("a+b(c)?")).toBe("a\\+b\\(c\\)\\?");
  });

  test("pluralize common rules", () => {
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("baby")).toBe("babies");
    expect(pluralize("leaf")).toBe("leaves");
    expect(pluralize("cat")).toBe("cats");
  });

  test("levenshtein distance", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein(null, "")).toBe(0);
    expect(levenshtein("a", null)).toBe(1);
  });
});
