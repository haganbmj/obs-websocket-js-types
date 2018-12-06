import fs = require('fs');
import path = require('path');
import prettier = require('prettier');
import got = require('got');

interface RawType {
  type: string;
  name: string;
  description: string;
}

interface RawComments {
  typedefs: {
    typedefs: RawType[];
    properties: RawType[];
  }[];
  events: {
    [k: string]: {
      description: string;
      name: string;
      returns?: RawType[];
    }[];
  };
  requests: {
    [k: string]: {
      description: string;
      name: string;
      params?: RawType[];
      returns?: RawType[];
    }[];
  };
}

interface Tree {
  [k: string]: AnyType;
}

type AnyType = PrimitiveType | ObjectType | ArrayType | SceneType | SourceType;

interface PrimitiveType {
  type: 'string' | 'number' | 'boolean';
  optional: boolean;
}

interface ObjectType {
  type: 'object';
  properties: Tree;
  optional: boolean;
}

interface ArrayType {
  type: 'array';
  items: PrimitiveType | ObjectType | SceneType | SourceType;
  optional: boolean;
}

interface SceneType {
  type: 'ObsWebSocket.Scene';
  optional: boolean;
}

interface SourceType {
  type: 'ObsWebSocket.Source';
  optional: boolean;
}

const DOTS_REGEX = /\./g;
const outFile = path.join(__dirname, '../index.d.ts');
async function getLatestComments() {
  const commentsResponse = await got('https://raw.githubusercontent.com/Lange/obs-websocket/typedefs/docs/generated/comments.json', {json: true});
  return commentsResponse.body;
}

getLatestComments().then(rawComments => {
  return parseApi(rawComments);
}).catch(error => {
  console.error(error);
});

function parseApi(raw: RawComments) {
  const interfaces: string[] = [];
  const requestOverloads: string[] = [];
  const eventOverloads: string[] = [];

  Object.values(raw.typedefs).forEach(typedef => {
    let typedefString = `interface ${typedef.typedefs[0].name} {`;

    const foo = unflattenAndResolveTypes(typedef.properties);
    typedefString += stringifyTypes(foo, {terminator: ';', finalTerminator: true});
    typedefString += '}';
    interfaces.push(typedefString);
  });

  Object.values(raw.requests).forEach(requestGroup => {
    requestGroup.forEach(request => {
      let requestTypeString = `send(requestType: '${request.name}'`;

      if (request.params) {
        const foo = unflattenAndResolveTypes(request.params);
        const allKeysAreOptional = Object.values(foo).every(type => type.optional);

        // If every param is optional, make the `args` object itself optional.
        if (allKeysAreOptional) {
          requestTypeString += ', args?: {';
        } else {
          requestTypeString += ', args: {';
        }

        requestTypeString += stringifyTypes(foo, {terminator: ',', finalTerminator: false});
        requestTypeString += '}';
      }

      let returnTypeString = 'void';
      if (request.returns) {
        const foo = unflattenAndResolveTypes(request.returns);
        returnTypeString = `{messageId: string;status: "ok";${stringifyTypes(foo, {terminator: ',', finalTerminator: false})}}`;
        requestTypeString += `, callback?: (error: ObsWebSocket.ObsError | null, data: ${returnTypeString}) => void`;
      } else {
        requestTypeString += ', callback?: (error: ObsWebSocket.ObsError | null) => void';
      }
      requestTypeString += ')';

      requestTypeString += `: Promise<${returnTypeString}>;`;
      requestOverloads.push(requestTypeString);
    });
  });

  Object.values(raw.events).forEach(eventGroup => {
    eventGroup.forEach(event => {
      let dataTypeString = 'data: {';
      if (event.returns) {
        const foo = unflattenAndResolveTypes(event.returns);
        dataTypeString += stringifyTypes(foo);
      }
      dataTypeString += '}';

      const eventType = `on(event: '${event.name}', listener: (${event.returns ? dataTypeString : ''}) => void): this;`;
      eventOverloads.push(eventType);
    });
  });

  /* tslint:disable:no-trailing-whitespace no-dead-reference */
  const sourceCode = `// This file is generated, do not edit.
// TypeScript Version: 2.2
/// <reference types="node" />
declare module 'obs-websocket-js' {
  import { EventEmitter } from 'events';

  namespace ObsWebSocket {
    interface ObsError {
      messageId: string;
      status: "error";
      error: string;
    }
    
    ${interfaces.join('\n\n  ')}
  }
  
  class ObsWebSocket extends EventEmitter {
    connect(options?: {address?: string; password?: string}, callback?: (error?: Error) => void): Promise<void>;
    
    disconnect(): void;
  
    ${requestOverloads.join('\n\n  ')}
    ${eventOverloads.join('\n\n  ')}
  }
  
  export = ObsWebSocket;
}`;
  /* tslint:enable:no-trailing-whitespace no-dead-reference */

  fs.writeFileSync(outFile, prettier.format(sourceCode, {
    parser: 'typescript'
  }));
}

function unflattenAndResolveTypes(inputItems: RawType[]) {
  const tree: Tree = {};

  const items = inputItems.slice(0);

  // Sort items by depth (number of dots in their key).
  // This ensures that we build our tree starting from the roots and ending at the leaves.
  items.sort((a, b) => {
    const aDots = a.name.match(DOTS_REGEX);
    const bDots = b.name.match(DOTS_REGEX);
    const numADots = aDots ? aDots.length : 0;
    const numBDots = bDots ? bDots.length : 0;
    return numADots - numBDots;
  });

  // Build the tree, one item at a time.
  items.forEach(item => {
    // Split the name of this item into parts, splitting it at each dot character.
    const parts = item.name.split('.');

    // If there are somehow zero parts (should be impossible), just bail out.
    if (parts.length === 0) {
      return;
    }

    // If there is exactly one part, then we know we are dealing with a root node of our tree.
    // Anything else is a branch or leaf of the tree.
    if (parts.length === 1) {
      tree[parts[0]] = resolveType(item.type);
      return;
    }

    // Many intermediate branches of the tree are not explicitly listed as their own
    // values in the comments of obs-websocket. For example, `foo.bar.baz` might be listed,
    // but `foo.bar` might not be. Therefore, we need to sniff out these "implicit" branches and add them to our tree.
    let currentNode: (AnyType | Tree) = tree;
    parts.slice(0, -1).forEach(nodeName => {
      // A nodeName of '*' means that we're describing the items of an array.
      // Don't do anything just yet.
      if (nodeName === '*') {
        return;
      }

      if (currentNode.type === 'array') {
        const arrayNode = currentNode as ArrayType;
        // If the currentNode is an array, then we must be describing the items of that array.
        if (!arrayNode.items) {
          arrayNode.items = {
            type: 'object',
            properties: {},
            optional: false
          };
        }

        const arrayNodeItems = arrayNode.items as ObjectType;
        const newNode = {
          type: 'object',
          properties: {},
          optional: false
        };
        (arrayNodeItems.properties as any)[nodeName] = newNode;
        currentNode = newNode.properties;
      } else { // Else, we must be describing an intermediate object node.
        if (!currentNode.hasOwnProperty(nodeName)) {
          (currentNode as any)[nodeName] = {
            type: 'object',
            properties: {},
            optional: false
          };
        }

        const firstIntermediate = (currentNode as any)[nodeName];
        if (firstIntermediate.type === 'array') {
          firstIntermediate.items = {
            type: 'object',
            properties: {},
            optional: false
          };
          currentNode = firstIntermediate.items.properties;
        } else {
          currentNode = firstIntermediate.properties;
        }
      }
    });

    // Finally, we can define the leaf of this branch!
    const leafName = String(parts.pop());

    // A part of '*' means that we're describing the items of an array.
    if (leafName === '*') {
      currentNode.items = resolveType(item.type);
    } else {
      currentNode[leafName] = resolveType(item.type);
    }
  });

  return tree;
}

function resolveType(inType: string): AnyType {
  const isOptional = inType.toLowerCase().includes('(optional)');
  switch (inType.toLowerCase().replace('(optional)', '').trim()) {
    case 'bool':
    case 'boolean':
      return {
        type: 'boolean',
        optional: isOptional
      };
    case 'string':
      return {
        type: 'string',
        optional: isOptional
      };
    case 'double':
    case 'float':
    case 'int':
    case 'integer':
    case 'number':
      return {
        type: 'number',
        optional: isOptional
      };
    case 'array<string>':
      return {
        type: 'array',
        items: {
          type: 'string',
          optional: true
        },
        optional: isOptional
      };
    case 'array<boolean>':
      return {
        type: 'array',
        items: {
          type: 'boolean',
          optional: true
        },
        optional: isOptional
      };
    case 'array<object>':
      return {
        type: 'array',
        items: {
          type: 'object',
          properties: {},
          optional: true
        },
        optional: isOptional
      };
    case 'array<scene>':
      return {
        type: 'array',
        items: {
          type: 'ObsWebSocket.Scene',
          optional: true
        },
        optional: isOptional
      };
    case 'array<source>':
      return {
        type: 'array',
        items: {
          type: 'ObsWebSocket.Source',
          optional: true
        },
        optional: isOptional
      };
    case 'object':
      return {
        type: 'object',
        properties: {},
        optional: isOptional
      };
    default:
      throw new Error(`Unknown type: ${inType}`);
  }
}

function stringifyTypes(inputTypes: Tree, {terminator = ';', finalTerminator = true, includePrefix = true} = {}) {
  let returnString = '';
  Object.entries(inputTypes).forEach(([key, typeDef]) => {
    if (includePrefix) {
      const cleanedKey = `'${key}'`;
      const separator = typeDef.optional ? '?:' : ':';
      returnString += `${cleanedKey}${separator} `;
    }

    if (typeDef.type === 'object') {
      returnString += `{${stringifyTypes(typeDef.properties)}}`;
    } else if (typeDef.type === 'array') {
      if (typeDef.items) {
        if (typeDef.items.type === 'object') {
          if (Object.keys(typeDef.items.properties).length > 0) {
            returnString += `${stringifyTypes(typeDef.items.properties as any, {includePrefix: false, terminator: ''})}[]`;
          } else {
            returnString += 'Array<{[k: string]: any}>';
          }
        } else {
          returnString += `${typeDef.items.type}[]`;
        }
      } else {
        returnString += 'any[]';
      }
    } else {
      returnString += typeDef.type;
    }

    returnString += terminator;
  });

  if (!finalTerminator) {
    returnString = returnString.slice(0, -terminator.length);
  }

  return returnString;
}
