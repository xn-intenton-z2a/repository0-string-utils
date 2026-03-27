// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { levenshteinDistance } from '../../src/lib/main.js';

describe('levenshteinDistance', () => {
  test('kitten vs sitting is 3', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
  });

  test('handles empty and null', () => {
    expect(levenshteinDistance('', '')).toBe(0);
    expect(levenshteinDistance(null, 'abc')).toBe(3);
    expect(levenshteinDistance('abc', null)).toBe(3);
  });
});
