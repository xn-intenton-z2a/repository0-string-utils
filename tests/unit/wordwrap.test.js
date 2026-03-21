// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { wordWrap } from '../../src/lib/main.js';

describe('wordWrap()', () => {
  test('wraps text at width without breaking words', () => {
    const input = 'This is a test of the word wrap function';
    const out = wordWrap(input, 10);
    // ensure no line is longer than width
    for (const line of out.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(10);
    }
  });

  test('single long word stays unbroken on its own line', () => {
    const long = 'supercalifragilisticexpialidocious';
    const out = wordWrap(long, 10);
    expect(out).toBe(long);
  });

  test('handles null/empty input', () => {
    expect(wordWrap('', 10)).toBe('');
    expect(wordWrap(null, 10)).toBe('');
  });
});
