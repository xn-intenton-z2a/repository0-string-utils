// SPDX-License-Identifier: MIT
// Small tweak to ensure the website demo contains expected IDs and lib.js
import { describe, test, expect } from "vitest";
import { readFileSync, existsSync } from "fs";

describe("Website", () => {
  test("src/web/index.html exists", () => {
    expect(existsSync("src/web/index.html")).toBe(true);
  });

  test("index.html contains valid HTML structure", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  test("index.html imports the library via lib.js", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("lib.js");
  });

  test("index.html displays library identity elements", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("lib-name");
    expect(html).toContain("lib-version");
  });

  test('demo contains utilities section', () => {
    const html = readFileSync('src/web/index.html', 'utf8');
    expect(html).toContain('String Utilities Demo');
  });
});
