import { describe, it, expect } from 'vitest';
import { levenshtein } from '../../src/lib/main.js';

describe('levenshtein()', () => {
  it('computes example distance', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });
  it('handles empty and null gracefully', () => {
    expect(levenshtein('', '')).toBe(0);
    expect(levenshtein(null, null)).toBe(0);
    expect(levenshtein('a', '')).toBe(1);
    expect(levenshtein('', 'a')).toBe(1);
  });
  it('handles unicode strings', () => {
    expect(levenshtein('mañana', 'manana')).toBe(1);
  });
});
