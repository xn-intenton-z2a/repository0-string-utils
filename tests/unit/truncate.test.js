// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { truncate } from '../../src/lib/main.js';

describe('truncate()', () => {
  test('truncate Hello World to length 8 -> Hello…', () => {
    expect(truncate('Hello World', 8)).toBe('Hello…');
  });

  test('no truncation when shorter than max', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  test('handles null/undefined', () => {
    expect(truncate(null, 5)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
  });
});
