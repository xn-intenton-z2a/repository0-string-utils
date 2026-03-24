// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { pluralize } from "../../src/lib/main.js";

describe("pluralize", () => {
  test("adds es for bus/box", () => {
    expect(pluralize("bus")).toBe("buses");
    expect(pluralize("box")).toBe("boxes");
  });

  test("consonant+y to ies", () => {
    expect(pluralize("baby")).toBe("babies");
  });

  test("f/fe to ves", () => {
    expect(pluralize("leaf")).toBe("leaves");
  });

  test("regular words add s", () => {
    expect(pluralize("cat")).toBe("cats");
  });

  test("null/undefined handled", () => {
    expect(pluralize(null)).toBe("");
  });
});
