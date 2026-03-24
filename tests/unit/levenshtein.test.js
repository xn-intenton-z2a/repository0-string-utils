// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { levenshtein } from "../../src/lib/main.js";

describe("levenshtein", () => {
  test("kitten vs sitting == 3", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  test("empty and abc -> 3", () => {
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein(null, "abc")).toBe(3);
  });

  test("identical strings -> 0", () => {
    expect(levenshtein("abc", "abc")).toBe(0);
  });
});
