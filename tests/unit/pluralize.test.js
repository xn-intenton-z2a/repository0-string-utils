// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { pluralize } from '../../src/lib/main.js';

describe('pluralize()', () => {
  test('adds es for boxes', () => {
    expect(pluralize('box')).toBe('boxes');
  });

  test('y -> ies for baby', () => {
    expect(pluralize('baby')).toBe('babies');
  });

  test('f/fe -> ves for leaf and life', () => {
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('life')).toBe('lives');
  });

  test('default adds s', () => {
    expect(pluralize('cat')).toBe('cats');
  });
});
