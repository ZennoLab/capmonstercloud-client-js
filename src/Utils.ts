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

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This can live anywhere in your codebase:
 */
export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
    });
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */
