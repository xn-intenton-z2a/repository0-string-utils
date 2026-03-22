// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { diffSchemas, classifyChange, formatChanges } from "../../src/lib/main.js";

describe("Demo page schemas produce expected diffs", () => {
  test("demo schemas include property-added and type-changed with correct classification", () => {
    const before = {
      definitions: { Email: { type: 'string', format: 'email' } },
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { $ref: '#/definitions/Email' },
        tags: { type: 'array', items: { type: 'string' } }
      },
      required: ['id', 'email']
    };
    const after = {
      definitions: { Email: { type: 'string', format: 'email' } },
      type: 'object',
      properties: {
        id: { type: 'string' }, // type changed
        email: { $ref: '#/definitions/Email' },
        tags: { type: 'array', items: { type: 'number' } }, // nested change
        active: { type: 'boolean' } // property added
      },
      required: ['id'] // required changed
    };

    const changes = diffSchemas(before, after);
    // annotate with classification
    const classified = changes.map((c) => {
      const out = { ...c, classification: classifyChange(c) };
      if (Array.isArray(c.changes)) {
        out.changes = c.changes.map((cc) => ({ ...cc, classification: classifyChange(cc) }));
      }
      return out;
    });

    const added = classified.find((c) => c.changeType === 'property-added' && c.path === '/properties/active');
    expect(added).toBeTruthy();
    expect(added.classification).toBe('compatible');

    const idChange = classified.find((c) => c.path === '/properties/id' && c.changeType === 'type-changed');
    expect(idChange).toBeTruthy();
    expect(idChange.classification).toBe('breaking');
  });

  test('formatChanges produces readable text', () => {
    const a = { type: 'object', properties: { val: { type: 'string' } } };
    const b = { type: 'object', properties: { val: { type: 'number' } } };
    const changes = diffSchemas(a, b);
    const text = formatChanges(changes, { format: 'text' });
    expect(typeof text).toBe('string');
    expect(text).toContain('type changed');
  });
});
