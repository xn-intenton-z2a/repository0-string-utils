import { describe, it, expect } from 'vitest';
import { camelCase } from '../../src/lib/main.js';

describe('camelCase()', () => {
  it('converts dashed to camelCase', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });
  it('handles spaces and mixed case', () => {
    expect(camelCase('Hello WORLD')).toBe('helloWorld');
  });
  it('handles unicode and diacritics', () => {
    expect(camelCase('mañana está aquí')).toBe('mananaEstaAqui');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(camelCase(null)).toBe('');
    expect(camelCase(undefined)).toBe('');
    expect(camelCase('')).toBe('');
  });
});
