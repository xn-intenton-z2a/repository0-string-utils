import { describe, it, expect } from 'vitest';
import { truncate } from '../../src/lib/main.js';

describe('truncate()', () => {
  it('truncates without breaking words and appends suffix', () => {
    expect(truncate('Hello World', 8)).toBe('Hello…');
  });
  it('returns original when shorter than max', () => {
    expect(truncate('Short', 10)).toBe('Short');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(truncate(null, 5)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
    expect(truncate('', 5)).toBe('');
  });
  it('uses provided suffix (respects available space)', () => {
    // available = max - suffix.length -> 7 - 3 = 4 -> head 'Hell' + '...'
    expect(truncate('Hello world', 7, '...')).toBe('Hell...');
  });
});
