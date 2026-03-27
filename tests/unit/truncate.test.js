// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { truncate } from '../../src/lib/main.js';

describe('truncate', () => {
  test('does not break mid-word when possible', () => {
    expect(truncate('Hello World', 8)).toBe('Hello…');
  });

  test('returns original when shorter than limit', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  test('handles null/undefined', () => {
    expect(truncate(null, 5)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
  });
});
