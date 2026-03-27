// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { pluralize } from '../../src/lib/main.js';

describe('pluralize', () => {
  test('adds es for s/x/z/ch/sh endings', () => {
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('bush')).toBe('bushes');
  });

  test('consonant+y -> ies', () => {
    expect(pluralize('lady')).toBe('ladies');
  });

  test('f/fe -> ves', () => {
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('life')).toBe('lives');
  });

  test('default adds s', () => {
    expect(pluralize('dog')).toBe('dogs');
  });

  test('null -> empty', () => {
    expect(pluralize(null)).toBe('');
  });
});
