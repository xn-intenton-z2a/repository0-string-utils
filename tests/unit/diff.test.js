// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { diffSchemas, resolveLocalRefs, classifyChange, formatChanges } from '../../src/lib/main.js';

function findNested(changes, predicate) {
  for (const c of changes) {
    if (predicate(c)) return c;
    if (c.changes) {
      const found = findNested(c.changes, predicate);
      if (found) return found;
    }
  }
  return undefined;
}

describe('JSON Schema Diff Engine', () => {
  test('diffing returns array and detects removed required property as breaking', () => {
    const a = {
      type: 'object',
      properties: {
        email: { type: 'string' }
      },
      required: ['email']
    };
    const b = {
      type: 'object',
      properties: {}
    };
    const changes = diffSchemas(a, b);
    expect(Array.isArray(changes)).toBe(true);
    const removed = findNested(changes, (c) => c.changeType === 'property-removed' && c.path.endsWith('/properties/email'));
    expect(removed).toBeTruthy();
    expect(removed.wasRequired).toBe(true);
    expect(classifyChange(removed)).toBe('breaking');
  });

  test('detects type changes', () => {
    const a = { properties: { age: { type: 'string' } } };
    const b = { properties: { age: { type: 'number' } } };
    const changes = diffSchemas(a, b);
    const typeChange = findNested(changes, (c) => c.changeType === 'type-changed' && c.path.endsWith('/properties/age'));
    expect(typeChange).toBeTruthy();
    expect(typeChange.before).toBe('string');
    expect(typeChange.after).toBe('number');
  });

  test('detects required added', () => {
    const a = { type: 'object', properties: { email: { type: 'string' } }, required: [] };
    const b = { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] };
    const changes = diffSchemas(a, b);
    const reqAdded = findNested(changes, (c) => c.changeType === 'required-added' && c.path.endsWith('/required/email'));
    expect(reqAdded).toBeTruthy();
    expect(classifyChange(reqAdded)).toBe('breaking');
  });

  test('detects enum additions and removals', () => {
    const a = { properties: { status: { enum: ['open', 'closed'] } } };
    const b = { properties: { status: { enum: ['open', 'closed', 'pending'] } } };
    const changes = diffSchemas(a, b);
    const added = findNested(changes, (c) => c.changeType === 'enum-value-added' && c.path.includes('/properties/status'));
    expect(added).toBeTruthy();
    expect(added.after).toBe('pending');
  });

  test('detects description changes as informational', () => {
    const a = { properties: { note: { description: 'old' } } };
    const b = { properties: { note: { description: 'new' } } };
    const changes = diffSchemas(a, b);
    const desc = findNested(changes, (c) => c.changeType === 'description-changed' && c.path.includes('/properties/note'));
    expect(desc).toBeTruthy();
    expect(classifyChange(desc)).toBe('informational');
  });

  test('handles nested schemas recursively', () => {
    const a = { properties: { address: { type: 'object', properties: { street: { type: 'string' } } } } };
    const b = { properties: { address: { type: 'object', properties: { street: { type: 'number' } } } } };
    const changes = diffSchemas(a, b);
    const typeChange = findNested(changes, (c) => c.changeType === 'type-changed' && c.path.includes('/properties/address/properties/street'));
    expect(typeChange).toBeTruthy();
  });

  test('resolves local $ref and diffs referenced schemas', () => {
    const a = {
      definitions: { addr: { type: 'object', properties: { street: { type: 'string' } } } },
      properties: { address: { $ref: '#/definitions/addr' } }
    };
    const b = {
      definitions: { addr: { type: 'object', properties: { street: { type: 'number' } } } },
      properties: { address: { $ref: '#/definitions/addr' } }
    };
    const changes = diffSchemas(a, b);
    const typeChange = findNested(changes, (c) => c.changeType === 'type-changed' && c.path.includes('/properties/address/properties/street'));
    expect(typeChange).toBeTruthy();
  });

  test('combining keywords (allOf) are traversed', () => {
    const a = { properties: { person: { allOf: [ { properties: { name: { type: 'string' } } } ] } } };
    const b = { properties: { person: { allOf: [ { properties: { name: { type: 'number' } } } ] } } };
    const changes = diffSchemas(a, b);
    const nameType = findNested(changes, (c) => c.changeType === 'type-changed' && c.path.includes('/allOf/0') && c.path.includes('/properties/name'));
    expect(nameType).toBeTruthy();
  });

  test('formatChanges produces readable text and JSON', () => {
    const a = { properties: { x: { type: 'string' } } };
    const b = { properties: { x: { type: 'number' } } };
    const changes = diffSchemas(a, b);
    const txt = formatChanges(changes, {});
    expect(typeof txt).toBe('string');
    const js = formatChanges(changes, { format: 'json' });
    expect(typeof js).toBe('string');
    const parsed = JSON.parse(js);
    expect(Array.isArray(parsed)).toBe(true);
  });
});
