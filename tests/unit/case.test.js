// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { camelCase, kebabCase, titleCase } from '../../src/lib/main.js';

describe('case conversions', () => {
  test('camelCase converts foo-bar-baz', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('kebabCase converts spaced words', () => {
    expect(kebabCase('Foo Bar Baz')).toBe('foo-bar-baz');
  });

  test('titleCase capitalises words', () => {
    expect(titleCase('hello world from library')).toBe('Hello World From Library');
  });

  test('handles empty and null', () => {
    expect(camelCase('')).toBe('');
    expect(kebabCase(null)).toBe('');
    expect(titleCase(undefined)).toBe('');
  });
});
