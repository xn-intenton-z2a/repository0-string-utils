import { describe, it, expect } from 'vitest';
import { wordWrap } from '../../src/lib/main.js';

describe('wordWrap()', () => {
  it('wraps text at width without breaking words', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const wrapped = wordWrap(text, 10);
    for (const line of wrapped.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(10);
    }
  });
  it('places long words on their own line', () => {
    const text = 'supercalifragilisticexpialidocious short';
    const wrapped = wordWrap(text, 10);
    const lines = wrapped.split('\n');
    expect(lines[0]).toBe('supercalifragilisticexpialidocious');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(wordWrap(null)).toBe('');
    expect(wordWrap(undefined)).toBe('');
    expect(wordWrap('')).toBe('');
  });
});
