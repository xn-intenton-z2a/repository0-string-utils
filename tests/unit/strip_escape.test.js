// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { stripHtml, escapeRegex } from '../../src/lib/main.js';

describe('stripHtml()', () => {
  test('removes tags and decodes entities', () => {
    const html = '<p>Hello &amp; <strong>world</strong> &#33;</p>';
    expect(stripHtml(html)).toBe('Hello & world !');
  });

  test('handles empty and null', () => {
    expect(stripHtml('')).toBe('');
    expect(stripHtml(null)).toBe('');
  });
});

describe('escapeRegex()', () => {
  test('escapes regex special characters', () => {
    const raw = 'a+b(c)*.\\^$|[]';
    expect(escapeRegex(raw)).toBe('a\\+b\\(c\\)\\*\\.\\\\\\^\\$\\|\\[\\]');
  });
});
