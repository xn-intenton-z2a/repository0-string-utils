// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { camelCase } from '../../src/lib/main.js';

describe('camelCase', () => {
  test('converts kebab to camel', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('handles spaces and underscores', () => {
    expect(camelCase('Foo Bar_baz')).toBe('fooBarBaz');
  });

  test('null/empty returns empty string', () => {
    expect(camelCase(null)).toBe('');
    expect(camelCase('')).toBe('');
  });
});
