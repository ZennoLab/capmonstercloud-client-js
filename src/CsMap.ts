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
