// SPDX-License-Identifier: MIT
// Comprehensive unit tests for string utilities
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
  test("slugify basic and edge cases", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify(123)).toBe("123");
    expect(slugify("")).toBe("");
    expect(slugify(null)).toBe("");
    // unicode normalization
    expect(slugify("Ä Ö Ü")).toBe("a-o-u");
  });

  test("truncate respects length and unicode", () => {
    expect(truncate("hello", 10)).toBe("hello");
    // behaviour: result length will be <= maxLength. With default ellipsis '...' a maxLength of 5
    // keeps 2 characters (5 - 3) and appends the ellipsis -> 'he...'
    expect(truncate("hello world", 5)).toBe("he...");
    expect(truncate("😊😊😊😊", 3)).toBe("😊...");
  });

  test("camelCase common inputs", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("snake_case_example")).toBe("snakeCaseExample");
    expect(camelCase("")).toBe("");
    expect(camelCase(null)).toBe("");
  });

  test("kebabCase common inputs", () => {
    expect(kebabCase("Hello World")).toBe("hello-world");
    expect(kebabCase("camelCaseTest")).toBe("camel-case-test");
    expect(kebabCase("snake_case")).toBe("snake-case");
  });

  test("titleCase capitalises words", () => {
    expect(titleCase("hello WORLD")).toBe("Hello World");
    expect(titleCase("")).toBe("");
  });

  test("wordWrap wraps lines and breaks long words", () => {
    const text = "one two three four five";
    const wrapped = wordWrap(text, 6);
    // each line should be at most 6 chars
    for (const line of wrapped.split(/\n/)) expect(line.length).toBeLessThanOrEqual(6);
    // long word
    const broken = wordWrap("abcdefghij", 4);
    expect(broken.split(/\n/)).toEqual(["abcd", "efgh", "ij"]);
  });

  test("stripHtml removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; <strong>World</strong></p>")).toBe("Hello & World");
    expect(stripHtml("")).toBe("");
    expect(stripHtml(null)).toBe("");
  });

  test("escapeRegex escapes special characters", () => {
    const sample = "a.b*c+?^${}()|[\\]\\";
    const out = escapeRegex(sample);
    expect(out.includes('\\.')).toBe(true);
    expect(out.includes('\\*')).toBe(true);
    expect(out.includes('\\[')).toBe(true);
    expect(out.includes('\\]')).toBe(true);
  });

  test("pluralize rules and irregulars", () => {
    expect(pluralize("cat")).toBe("cats");
    expect(pluralize("bus")).toBe("buses");
    expect(pluralize("baby")).toBe("babies");
    expect(pluralize("knife")).toBe("knives");
    expect(pluralize("person")).toBe("people");
    expect(pluralize("cat", 1)).toBe("cat");
    expect(pluralize("cat", 2)).toBe("cats");
  });

  test("levenshtein distance calculations", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "")).toBe(0);
    expect(levenshtein(null, "a")).toBe(1);
    expect(levenshtein("abc", "abc")).toBe(0);
    expect(levenshtein("😊", "😊")).toBe(0);
  });
});
