import { describe, it, expect } from 'vitest';
import { escapeRegex } from '../../src/lib/main.js';

describe('escapeRegex()', () => {
  it('escapes regex special characters', () => {
    const raw = 'hello.*+?^${}()|[]\\';
    const escaped = escapeRegex(raw);
    expect(escaped).not.toBe(raw);
    expect(new RegExp(escaped)).toBeInstanceOf(RegExp);
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(escapeRegex(null)).toBe('');
    expect(escapeRegex(undefined)).toBe('');
    expect(escapeRegex('')).toBe('');
  });
});
