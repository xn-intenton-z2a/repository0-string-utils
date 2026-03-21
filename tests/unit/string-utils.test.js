// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import {
  slugify,
  truncate,
  camelCase,
  kebabCase,
  titleCase,
  wordWrap,
  stripHtml,
  escapeRegex,
  pluralize,
  levenshtein
} from '../../src/lib/main.js';

describe('string-utils', () => {
  test('slugify basic', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('slugify unicode and diacritics', () => {
    expect(slugify('Jalape\u00f1o & Cr\u00e8me')).toBe('jalapeno-creme');
  });

  test('truncate does not break mid-word where possible', () => {
    expect(truncate('Hello World', 8)).toBe('Hello\u2026');
  });

  test('truncate small max', () => {
    expect(truncate('abcdef', 2)).toBe('\u2026'.slice(0,2));
  });

  test('camelCase', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
    expect(camelCase('FOO_bar baz')).toBe('fooBarBaz');
  });

  test('kebabCase', () => {
    expect(kebabCase('Foo Bar Baz')).toBe('foo-bar-baz');
  });

  test('titleCase', () => {
    expect(titleCase('hello world from js')).toBe('Hello World From Js');
  });

  test('wordWrap simple', () => {
    const text = 'This is a long sentence that should wrap';
    const wrapped = wordWrap(text, 10);
    expect(wrapped.split('\n').every(line => line.length <= 10)).toBe(true);
  });

  test('wordWrap long single word placed alone', () => {
    const text = 'supercalifragilisticexpialidocious';
    const wrapped = wordWrap(text, 10);
    expect(wrapped).toBe(text);
  });

  test('stripHtml and decode entities', () => {
    expect(stripHtml('<p>Hello &amp; <strong>world</strong></p>')).toBe('Hello & world');
    expect(stripHtml('Price: &#36;5')).toBe('Price: $5');
  });

  test('escapeRegex', () => {
    expect(escapeRegex('.+*?^$()[]\\')).toBe('\\.\\+\\*\\?\\^\\$\\(\\)\\[\\]\\\\');
  });

  test('pluralize rules', () => {
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('baby')).toBe('babies');
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('cat')).toBe('cats');
  });

  test('levenshtein distance', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
    expect(levenshtein('', '')).toBe(0);
    expect(levenshtein(null, 'a')).toBe(1);
  });

  test('edge cases null/undefined', () => {
    expect(slugify(null)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
    expect(camelCase('')).toBe('');
    expect(kebabCase(null)).toBe('');
  });
});