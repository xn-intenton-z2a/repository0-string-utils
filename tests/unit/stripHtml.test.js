import { describe, it, expect } from 'vitest';
import { stripHtml } from '../../src/lib/main.js';

describe('stripHtml()', () => {
  it('removes tags and decodes entities', () => {
    expect(stripHtml('<p>Hello &amp; <strong>world</strong></p>')).toBe('Hello & world');
  });
  it('decodes numeric entities', () => {
    expect(stripHtml('&#65;&#x41;')).toBe('AA');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(stripHtml(null)).toBe('');
    expect(stripHtml(undefined)).toBe('');
    expect(stripHtml('')).toBe('');
  });
});
