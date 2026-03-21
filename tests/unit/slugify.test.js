import { describe, it, expect } from 'vitest';
import { slugify } from '../../src/lib/main.js';

describe('slugify()', () => {
  it('converts Hello World!', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });
  it('handles diacritics and unicode', () => {
    expect(slugify('Café Münchner Freiheit')).toBe('cafe-munchner-freiheit');
  });
  it('returns empty for null/undefined/empty', () => {
    expect(slugify(null)).toBe('');
    expect(slugify(undefined)).toBe('');
    expect(slugify('')).toBe('');
  });
});
