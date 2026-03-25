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

describe("String utilities - basic behaviour", () => {
  test("slugify: Hello World! -> hello-world", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  test("slugify handles null/undefined gracefully", () => {
    expect(slugify(null)).toBe("");
    expect(slugify(undefined)).toBe("");
  });

  test("truncate: Hello World -> length 8 -> Hello…", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
  });

  test("camelCase: foo-bar-baz -> fooBarBaz", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
  });

  test("kebabCase: Foo BarBaz -> foo-bar-baz", () => {
    expect(kebabCase("Foo BarBaz")).toBe("foo-bar-baz");
  });

  test("titleCase: hello world -> Hello World", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });

  test("wordWrap: no word broken and long word on its own line", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const wrapped = wordWrap(text, 12);
    const lines = wrapped.split('\n');
    for (const line of lines) {
      // each line must be <= 12 chars
      expect(line.length).toBeLessThanOrEqual(12);
    }

    // long word behaviour
    const long = "supercalifragilisticexpialidocious";
    const wrappedLong = wordWrap(long, 5);
    expect(wrappedLong).toBe(long); // placed on its own line unbroken
  });

  test("stripHtml: removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; <strong>World</strong></p>")).toBe("Hello & World");
  });

  test("escapeRegex: produces a safe pattern", () => {
    const s = "(a+b)*.test?^$";
    const escaped = escapeRegex(s);
    const re = new RegExp(escaped);
    expect(re.test(s)).toBe(true);
  });

  test("pluralize: applies basic rules", () => {
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("bus")).toBe("buses");
    expect(pluralize("city")).toBe("cities");
    expect(pluralize("boy")).toBe("boys");
    expect(pluralize("leaf")).toBe("leaves");
    expect(pluralize("cat")).toBe("cats");
  });

  test("levenshtein: kitten -> sitting = 3", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  test("handles empty and null inputs for levenshtein", () => {
    expect(levenshtein("", "")).toBe(0);
    expect(levenshtein(null, null)).toBe(0);
    expect(levenshtein("a", null)).toBe(1);
  });
});
