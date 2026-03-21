// SPDX-License-Identifier: MIT
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

describe("String Utilities", () => {
  test("slugify basic", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify(null)).toBe("");
    expect(slugify("Café au lait")).toBe("cafe-au-lait");
  });

  test("truncate doesn't break words", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
    expect(truncate("Short", 10)).toBe("Short");
    expect(truncate(null, 5)).toBe("");
  });

  test("camelCase and kebabCase and titleCase", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
    expect(kebabCase("Foo Bar Baz")).toBe("foo-bar-baz");
    expect(titleCase("the quick BROWN fox")).toBe("The Quick Brown Fox");
  });

  test("wordWrap respects width and long words", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const wrapped = wordWrap(text, 10);
    // each line should be <=10
    for (const line of wrapped.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(10);
    }
    const longWord = "supercalifragilisticexpialidocious";
    const out = wordWrap(longWord, 10);
    expect(out).toBe(longWord);
  });

  test("stripHtml and escapeRegex", () => {
    expect(stripHtml("<p>Hello &amp; world</p>")).toBe("Hello & world");
    expect(escapeRegex(".*?^$+[](){}\\|"))
      .toBe("\\.\\*\\?\\^\\$\\+\\[\\]\\(\\)\\{\\}\\\\\\|");
  });

  test("pluralize rules", () => {
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("baby")).toBe("babies");
    expect(pluralize("leaf")).toBe("leaves");
    expect(pluralize("cat")).toBe("cats");
  });

  test("levenshtein distance", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein(null, null)).toBe(0);
  });
});
