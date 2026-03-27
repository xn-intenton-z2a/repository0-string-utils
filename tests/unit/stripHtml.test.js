// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { stripHtml } from '../../src/lib/main.js';

describe('stripHtml', () => {
  test('removes tags and decodes entities', () => {
    expect(stripHtml('<p>Hello &amp; <strong>world</strong></p>')).toBe('Hello & world');
  });

  test('decodes numeric entities', () => {
    expect(stripHtml('Price: &#36;5')).toBe('Price: $5');
    expect(stripHtml('Heart: &#x2665;')).toBe('Heart: ♥');
  });

  test('null -> empty', () => {
    expect(stripHtml(null)).toBe('');
  });
});
