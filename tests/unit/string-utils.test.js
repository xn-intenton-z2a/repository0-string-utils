import { describe, it, expect } from 'vitest';
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

describe('string utilities', () => {
  it('slugify basic', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('slugify unicode and diacritics', () => {
    expect(slugify('Café Münchner Freiheit')).toBe('cafe-munchner-freiheit');
  });

  it('truncate does not break words and appends suffix', () => {
    expect(truncate('Hello World', 8)).toBe('Hello…');
  });

  it('truncate short text unchanged', () => {
    expect(truncate('Short', 10)).toBe('Short');
  });

  it('camelCase works', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  it('kebabCase works', () => {
    expect(kebabCase('Foo Bar Baz')).toBe('foo-bar-baz');
  });

  it('titleCase works', () => {
    expect(titleCase('hello world FROM test')).toBe('Hello World From Test');
  });

  it('wordWrap respects width and does not break words', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const wrapped = wordWrap(text, 10);
    // each line <=10
    for (const line of wrapped.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(10);
    }
  });

  it('wordWrap long word on its own line', () => {
    const text = 'supercalifragilisticexpialidocious short';
    const wrapped = wordWrap(text, 10);
    const lines = wrapped.split('\n');
    expect(lines[0]).toBe('supercalifragilisticexpialidocious');
  });

  it('stripHtml removes tags and decodes entities', () => {
    expect(stripHtml('<p>Hello &amp; <strong>world</strong></p>')).toBe('Hello & world');
  });

  it('escapeRegex escapes special chars', () => {
    const raw = 'hello.*+?^${}()|[]\\';
    const escaped = escapeRegex(raw);
    expect(escaped).toContain('\\');
    expect(new RegExp(escaped)).toBeInstanceOf(RegExp);
  });

  it('pluralize rules', () => {
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('baby')).toBe('babies');
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('cat')).toBe('cats');
  });

  it('levenshtein distance example', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });

  it('handles empty, null, undefined gracefully', () => {
    expect(slugify('')).toBe('');
    expect(slugify(null)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
    expect(camelCase(null)).toBe('');
    expect(kebabCase(undefined)).toBe('');
    expect(titleCase(null)).toBe('');
    expect(wordWrap(null)).toBe('');
    expect(stripHtml(null)).toBe('');
    expect(escapeRegex(null)).toBe('');
    expect(pluralize(null)).toBe('');
    expect(levenshtein(null, null)).toBe(0);
  });

  it('unicode handling', () => {
    expect(camelCase('mañana está aquí')).toBe('mananaEstaAqui');
  });
});
