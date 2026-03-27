// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { titleCase } from '../../src/lib/main.js';

describe('titleCase', () => {
  test('capitalizes each word', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  test('handles mixed separators', () => {
    expect(titleCase('foo-bar_baz')).toBe('Foo Bar Baz');
  });

  test('null -> empty', () => {
    expect(titleCase(null)).toBe('');
  });
});
