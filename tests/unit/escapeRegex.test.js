// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { escapeRegex } from '../../src/lib/main.js';

describe('escapeRegex', () => {
  test('escapes special characters', () => {
    expect(escapeRegex('a.b+c?d*^$')).toBe('a\\.b\\+c\\?d\\*\\^\\$');
  });

  test('null -> empty', () => {
    expect(escapeRegex(null)).toBe('');
  });
});
