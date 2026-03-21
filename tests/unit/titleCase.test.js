import { describe, it, expect } from 'vitest';
import { titleCase } from '../../src/lib/main.js';

describe('titleCase()', () => {
  it('capitalizes first letter of each word', () => {
    expect(titleCase('hello world FROM test')).toBe('Hello World From Test');
  });
  it('handles extra spaces', () => {
    expect(titleCase('  multiple   spaces  here ')).toBe('Multiple Spaces Here');
  });
  it('handles null/undefined/empty gracefully', () => {
    expect(titleCase(null)).toBe('');
    expect(titleCase(undefined)).toBe('');
    expect(titleCase('')).toBe('');
  });
});
