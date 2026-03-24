// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { truncate } from "../../src/lib/main.js";

describe("truncate", () => {
  test("does not break mid-word when possible", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
  });

  test("returns original when shorter than maxLength", () => {
    expect(truncate("Short", 10)).toBe("Short");
  });

  test("supports custom suffix", () => {
    expect(truncate("Hello World", 8, "...")).toBe("Hello...");
  });

  test("handles null/undefined", () => {
    expect(truncate(null, 5)).toBe("");
    expect(truncate(undefined, 5)).toBe("");
  });
});
