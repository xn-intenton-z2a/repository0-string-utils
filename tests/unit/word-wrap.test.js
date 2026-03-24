// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { wordWrap } from "../../src/lib/main.js";

describe("wordWrap", () => {
  test("wraps without breaking words", () => {
    const input = "The quick brown fox";
    expect(wordWrap(input, 10)).toBe("The quick\nbrown fox");
  });

  test("places long single word on its own line", () => {
    const input = "longwordthatexceedswidth";
    expect(wordWrap(input, 5)).toBe("longwordthatexceedswidth");
  });

  test("handles null/undefined", () => {
    expect(wordWrap(null, 10)).toBe("");
    expect(wordWrap(undefined, 10)).toBe("");
  });
});
