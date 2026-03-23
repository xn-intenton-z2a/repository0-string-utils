// SPDX-License-Identifier: MIT
// Unit tests for string utility functions
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

describe('String utilities', () => {
  test('slugify basic', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('slugify unicode', () => {
    expect(slugify('Café à la mode')).toBe('cafe-a-la-mode');
  });

  test('truncate without breaking words', () => {
    expect(truncate('Hello World', 8)).toBe('Hello…');
  });

  test('camelCase basic', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('kebabCase basic', () => {
    expect(kebabCase('Foo Bar Baz')).toBe('foo-bar-baz');
  });

  test('titleCase basic', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  test('wordWrap soft wrapping', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const wrapped = wordWrap(text, 12);
    expect(wrapped).toBe('The quick\nbrown fox\njumps over\nthe lazy dog');
  });

  test('stripHtml removes tags and decodes entities', () => {
    expect(stripHtml('<p>Hello &amp; world</p>')).toBe('Hello & world');
  });

  test('escapeRegex escapes special chars', () => {
    const raw = '^hello.*(world)?$';
    expect(escapeRegex(raw)).toBe('\\^hello\\.\\*\\(world\\)\\?\\$');
  });

  test('pluralize rules', () => {
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('baby')).toBe('babies');
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('bus')).toBe('buses');
    expect(pluralize('car')).toBe('cars');
  });

  test('levenshtein distance', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });

  test('edge cases: null/undefined/empty', () => {
    expect(slugify(null)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
    expect(camelCase('')).toBe('');
    expect(kebabCase(null)).toBe('');
    expect(titleCase(undefined)).toBe('');
    expect(wordWrap(null, 10)).toBe('');
    expect(stripHtml(undefined)).toBe('');
    expect(escapeRegex(undefined)).toBe('');
    expect(pluralize(null)).toBe('');
    expect(levenshtein('', '')).toBe(0);
    expect(levenshtein(null, 'a')).toBe(1);
  });
});
