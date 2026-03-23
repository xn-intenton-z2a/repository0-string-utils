// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { diffSchemas, resolveLocalRefs, classifyChange, formatChanges } from '../../src/lib/main.js';

function findChange(arr, predicate) {
  for (const c of arr) {
    if (predicate(c)) return c;
    if (c.changes && Array.isArray(c.changes)) {
      const found = findChange(c.changes, predicate);
      if (found) return found;
    }
  }
  return undefined;
}

describe('Dedicated diffing test suite', () => {
  test('property-added and property-removed with required classification', () => {
    const A = { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] };
    const B = { type: 'object', properties: { name: { type: 'string' }, age: { type: 'number' } }, required: ['name'] };
    const changesAB = diffSchemas(A, B);
    const added = findChange(changesAB, (c) => c.changeType === 'property-added' && c.path === '/properties/age');
    expect(added).toBeDefined();
    expect(classifyChange(added)).toBe('compatible');

    const B2 = { type: 'object', properties: {} };
    const changesA_B2 = diffSchemas(A, B2);
    const removed = findChange(changesA_B2, (c) => c.changeType === 'property-removed' && c.path === '/properties/name');
    expect(removed).toBeDefined();
    expect(removed.wasRequired).toBe(true);
    expect(classifyChange(removed)).toBe('breaking');
  });

  test('type-changed detection', () => {
    const A = { properties: { flag: { type: 'string' } } };
    const B = { properties: { flag: { type: 'boolean' } } };
    const changes = diffSchemas(A, B);
    const t = findChange(changes, (c) => c.changeType === 'type-changed' && c.path === '/properties/flag');
    expect(t).toBeDefined();
    expect(t.before).toBe('string');
    expect(t.after).toBe('boolean');
    expect(classifyChange(t)).toBe('breaking');
  });

  test('required-added and required-removed', () => {
    const A = { type: 'object', properties: { x: { type: 'string' } }, required: [] };
    const B = { type: 'object', properties: { x: { type: 'string' } }, required: ['x'] };
    const changes = diffSchemas(A, B);
    const reqAdded = findChange(changes, (c) => c.changeType === 'required-added' && c.path === '/required/x');
    expect(reqAdded).toBeDefined();
    expect(classifyChange(reqAdded)).toBe('breaking');

    const C = { type: 'object', properties: { x: { type: 'string' } }, required: ['x'] };
    const D = { type: 'object', properties: { x: { type: 'string' } }, required: [] };
    const changes2 = diffSchemas(C, D);
    const reqRemoved = findChange(changes2, (c) => c.changeType === 'required-removed' && c.path === '/required/x');
    expect(reqRemoved).toBeDefined();
    expect(classifyChange(reqRemoved)).toBe('compatible');
  });

  test('enum value added and removed', () => {
    const A = { properties: { status: { enum: ['open'] } } };
    const B = { properties: { status: { enum: ['open', 'closed'] } } };
    const changes = diffSchemas(A, B);
    const enumAdd = findChange(changes, (c) => c.changeType === 'enum-value-added' && c.path === '/properties/status/enum');
    expect(enumAdd).toBeDefined();
    expect(enumAdd.after).toBe('closed');
    expect(classifyChange(enumAdd)).toBe('compatible');

    const C = { properties: { status: { enum: ['open','closed'] } } };
    const D = { properties: { status: { enum: ['open'] } } };
    const changes2 = diffSchemas(C, D);
    const enumRemoved = findChange(changes2, (c) => c.changeType === 'enum-value-removed' && c.path === '/properties/status/enum');
    expect(enumRemoved).toBeDefined();
    expect(enumRemoved.before).toBe('closed');
    expect(classifyChange(enumRemoved)).toBe('breaking');
  });

  test('description-changed is informational', () => {
    const A = { properties: { note: { description: 'old' } } };
    const B = { properties: { note: { description: 'new' } } };
    const changes = diffSchemas(A, B);
    const desc = findChange(changes, (c) => c.changeType === 'description-changed' && c.path === '/properties/note/description');
    expect(desc).toBeDefined();
    expect(classifyChange(desc)).toBe('informational');
  });

  test('nested-changed recurses and classifies worst-case', () => {
    const A = { properties: { address: { type: 'object', properties: { street: { type: 'string' } } } } };
    const B = { properties: { address: { type: 'object', properties: { street: { type: 'number' } } } } };
    const changes = diffSchemas(A, B);
    const nested = findChange(changes, (c) => c.changeType === 'nested-changed' && c.path === '/properties/address');
    expect(nested).toBeDefined();
    const innerType = findChange(nested.changes, (c) => c.changeType === 'type-changed');
    expect(innerType).toBeDefined();
    expect(classifyChange(nested)).toBe('breaking');
  });

  test('resolves local $ref and reports nested diffs at usage site', () => {
    const A = {
      definitions: { addr: { type: 'object', properties: { street: { type: 'string' } } } },
      properties: { addr: { $ref: '#/definitions/addr' } }
    };
    const B = {
      definitions: { addr: { type: 'object', properties: { street: { type: 'number' } } } },
      properties: { addr: { $ref: '#/definitions/addr' } }
    };
    const changes = diffSchemas(A, B);
    const nested = findChange(changes, (c) => c.changeType === 'nested-changed' && c.path === '/properties/addr');
    expect(nested).toBeDefined();
    const inner = findChange(nested.changes, (c) => c.changeType === 'type-changed' && c.path === '/properties/addr/properties/street');
    expect(inner).toBeDefined();
  });

  test('combining keywords like allOf are traversed', () => {
    const A = { properties: { p: { allOf: [ { properties: { n: { type: 'string' } } } ] } } };
    const B = { properties: { p: { allOf: [ { properties: { n: { type: 'number' } } } ] } } };
    const changes = diffSchemas(A, B);
    const allOfChange = findChange(changes, (c) => c.changeType === 'nested-changed' && c.path.startsWith('/properties/p/allOf'));
    expect(allOfChange).toBeDefined();
  });

  test('formatChanges returns JSON when requested and readable text otherwise', () => {
    const A = { properties: { x: { type: 'string' } } };
    const B = { properties: { x: { type: 'number' } } };
    const changes = diffSchemas(A, B);
    const json = formatChanges(changes, { format: 'json' });
    const parsed = JSON.parse(json);
    expect(Array.isArray(parsed)).toBe(true);
    const txt = formatChanges(changes, {});
    expect(typeof txt).toBe('string');
    expect(txt.length).toBeGreaterThan(0);
  });

  test('resolveLocalRefs throws on remote refs', () => {
    const s = { $ref: 'http://example.com/schema.json' };
    expect(() => resolveLocalRefs(s)).toThrow();
  });
});
