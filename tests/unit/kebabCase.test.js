import { describe, it, expect } from 'vitest';
import { kebabCase } from '../../src/lib/main.js';

describe('kebabCase()', () => {
  it('converts spaces to kebab-case', () => {
    expect(kebabCase('Foo Bar Baz')).toBe('foo-bar-baz');
  });
  it('handles mixed separators', () => {
    expect(kebabCase('foo_bar baz')).toBe('foo-bar-baz');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(kebabCase(null)).toBe('');
    expect(kebabCase(undefined)).toBe('');
    expect(kebabCase('')).toBe('');
  });
});
