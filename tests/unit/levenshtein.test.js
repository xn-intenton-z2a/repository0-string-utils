// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { levenshtein } from '../../src/lib/main.js';

describe('levenshtein()', () => {
  test('kitten vs sitting -> 3', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });

  test('handles empty and null', () => {
    expect(levenshtein('', '')).toBe(0);
    expect(levenshtein(null, 'abc')).toBe(3);
    expect(levenshtein('abc', null)).toBe(3);
  });

  test('unicode strings', () => {
    expect(levenshtein('cafe', 'café')).toBe(1);
  });
});
