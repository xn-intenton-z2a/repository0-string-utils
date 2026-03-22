import { diffSchemas } from '../../src/lib/main.js';

function show(title, base, head) {
  console.log('---', title, '---');
  const changes = diffSchemas(base, head);
  console.log(JSON.stringify(changes, null, 2));
}

show('test1', { type: 'object', properties: { a: { type: 'string' } } }, { type: 'object', properties: { a: { type: 'string' }, b: { type: 'number' } } });
show('test2', { type: 'object', properties: { removed: { type: 'string' } } }, { type: 'object', properties: { added: { type: 'string' } } });
show('test3', { type: 'object', properties: { val: { type: 'string' } } }, { type: 'object', properties: { val: { type: 'number' } } });
show('enum', { type: 'object', properties: { color: { enum: ['red','blue'] } } }, { type: 'object', properties: { color: { enum: ['red','green'] } } });
show('desc', { type: 'object', properties: { thing: { description: 'old' } } }, { type: 'object', properties: { thing: { description: 'new' } } });
show('nested', { type: 'object', properties: { parent: { type: 'object', properties: { child: { type: 'string' } } } } }, { type: 'object', properties: { parent: { type: 'object', properties: { child: { type: 'number' } } } } });
show('refs', { definitions: { A: { type: 'string' } }, type: 'object', properties: { x: { $ref: '#/definitions/A' } } }, { definitions: { A: { type: 'number' } }, type: 'object', properties: { x: { $ref: '#/definitions/A' } } });
