// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { slugify } from '../../src/lib/main.js';

describe('slugify()', () => {
  test('converts Hello World! to hello-world', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('null/undefined returns empty string', () => {
    expect(slugify(null)).toBe('');
    expect(slugify(undefined)).toBe('');
  });

  test('handles unicode accents', () => {
    expect(slugify('Café à la mode')).toBe('cafe-a-la-mode');
  });
});
