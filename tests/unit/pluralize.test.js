import { describe, it, expect } from 'vitest';
import { pluralize } from '../../src/lib/main.js';

describe('pluralize()', () => {
  it('adds es for s/x/z/ch/sh endings', () => {
    expect(pluralize('box')).toBe('boxes');
  });
  it('changes consonant+y to ies', () => {
    expect(pluralize('baby')).toBe('babies');
  });
  it('changes f/fe to ves', () => {
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('knife')).toBe('knives');
  });
  it('defaults to adding s', () => {
    expect(pluralize('cat')).toBe('cats');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(pluralize(null)).toBe('');
    expect(pluralize(undefined)).toBe('');
    expect(pluralize('')).toBe('');
  });
});
