// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { stripHtml } from "../../src/lib/main.js";

describe("stripHtml", () => {
  test("removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; welcome</p>")).toBe("Hello & welcome");
  });

  test("handles nested tags", () => {
    expect(stripHtml("<div><span>Hi</span> there</div>")).toBe("Hi there");
  });

  test("null/undefined handled", () => {
    expect(stripHtml(null)).toBe("");
  });
});
