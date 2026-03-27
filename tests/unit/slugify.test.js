// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { slugify } from '../../src/lib/main.js';

describe('slugify', () => {
  test('basic slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('returns empty for null/undefined', () => {
    expect(slugify(null)).toBe('');
    expect(slugify(undefined)).toBe('');
  });

  test('removes diacritics and normalizes', () => {
    expect(slugify('Café Déjà vu')).toBe('cafe-deja-vu');
  });
});
