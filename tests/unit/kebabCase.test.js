// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { kebabCase } from '../../src/lib/main.js';

describe('kebabCase', () => {
  test('converts camelCase to kebab-case', () => {
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz');
  });

  test('converts spaces and underscores', () => {
    expect(kebabCase('Foo Bar_baz')).toBe('foo-bar-baz');
  });

  test('handles null/empty', () => {
    expect(kebabCase(null)).toBe('');
  });
});
