// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { test, expect } from "@playwright/test";
import { getIdentity } from "../../src/lib/main.js";

// Smoke test: page loads and renders demo output
test("homepage returns 200 and renders", async ({ page }) => {
  const response = await page.goto("./", { waitUntil: "networkidle" });
  expect(response.status()).toBe(200);

  await expect(page.locator("#lib-name")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#lib-version")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#demo-output")).toBeVisible({ timeout: 10000 });

  await page.screenshot({ path: "SCREENSHOT_INDEX.png", fullPage: true });
});

// Ensure the page displays the library version exported by the module
test("page displays the library version from src/lib/main.js", async ({ page }) => {
  const { version } = getIdentity();
  await page.goto("./", { waitUntil: "networkidle" });
  const pageVersion = await page.locator("#lib-version").textContent();
  expect(pageVersion).toContain(version);
});

// New acceptance tests: verify demo JSON contains expected function outputs
test("demo output contains expected example values", async ({ page }) => {
  await page.goto("./", { waitUntil: "networkidle" });
  await expect(page.locator('#demo-output')).toBeVisible({ timeout: 10000 });
  const raw = await page.locator('#demo-output').textContent();
  let demo;
  try {
    demo = JSON.parse(raw || '{}');
  } catch (e) {
    throw new Error('Demo output is not valid JSON: ' + e.message + '\n' + raw);
  }

  const examples = demo.examples || {};
  // Acceptance criteria checks
  expect(examples.slugify).toBe('hello-world');
  expect(examples.truncate).toBe('Hello…');
  expect(examples.camelCase).toBe('fooBarBaz');
  expect(examples.pluralize).toBe('boxes');
  expect(examples.levenshtein).toBe(3);
});
