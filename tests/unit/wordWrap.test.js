// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { wordWrap } from '../../src/lib/main.js';

describe('wordWrap', () => {
  test('wraps at word boundaries', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const out = wordWrap(text, 10);
    expect(out.split('\n').every(line => line.length <= 10)).toBe(true);
  });

  test('single long word goes on its own line', () => {
    const long = 'supercalifragilisticexpialidocious';
    expect(wordWrap(long, 10)).toBe(long);
  });

  test('handles null/empty', () => {
    expect(wordWrap(null, 10)).toBe('');
  });
});
