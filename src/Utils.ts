export class CsMap<T, V> extends Map {
  constructor() {
    super();
  }

  GetOrAdd(key: T, value: V): V {
    if (this.has(key)) {
      // skip adding
    } else {
      this.set(key, value);
    }

    return this.get(key);
  }
}

export type AnyObject = Record<string, unknown>;

let isNode = false;
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      isNode = true;
    }
  }
}
export { isNode };
