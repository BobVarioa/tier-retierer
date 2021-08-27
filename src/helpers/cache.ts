import { deepEqual } from "fast-equals";
import { qclone as deepClone } from "qclone";

export class ValueKeyedMap<K, V> implements Map<K, V> {
	#keys: K[] = [];

	#data: V[] = [];

	#getKeyIndex(key: K): number {
		for (let i = 0; i < this.#keys.length; i++) {
			if (deepEqual(this.#keys[i], key)) return i;
		}
		return -1;
	}

	has(key: K): boolean {
		return this.#getKeyIndex(key) > -1;
	}

	get(key: K): V {
		const keyIndex = this.#getKeyIndex(key);

		if (keyIndex > -1) {
			return this.#data[keyIndex];
		} else {
			return undefined;
		}
	}

	set(key: K, value: V): this {
		const keyIndex = this.#getKeyIndex(key);

		if (keyIndex > -1) {
			this.#data[keyIndex] = value;
		} else {
			this.#keys.push(key);
			this.#data.push(value);
		}

		return this;
	}

	clear(): void {
		this.#keys = [];
		this.#data = [];
	}

	*keys(): IterableIterator<K> {
		yield* this.#keys;
	}

	*values(): IterableIterator<V> {
		yield* this.#data;
	}

	forEach(callback: (value: V, key: K, map: this) => void): void {
		for (const [key, value] of this) {
			callback(value, key, this);
		}
	}

	delete(key: K): boolean {
		const keyIndex = this.#getKeyIndex(key);

		if (keyIndex > -1) {
			delete this.#keys[keyIndex];
			delete this.#data[keyIndex];
			return true;
		}
	}

	get size() {
		return this.#keys.length;
	}

	*entries(): IterableIterator<[K, V]> {
		yield* this;
	}

	*[Symbol.iterator](): IterableIterator<[K, V]> {
		for (let i = 0; i < this.#keys.length; i++) {
			yield [this.#keys[i], this.#data[i]];
		}
	}

	[Symbol.toStringTag] = "CacheMap";
}

export function cachifyRaw<K, V>(cache: Map<K, V>, key: K, func: (key: K) => V): V {
	if (cache.has(key)) return deepClone(cache.get(key));

	const obj = func(key);
	cache.set(key, obj);
	return deepClone(obj);
}

export function cachify<K, V>(cache: Map<K, V>) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const last = descriptor.value;
		descriptor.value = (arg: K) => {
			return cachifyRaw(cache, arg, last)
		}
	};
}

export async function cachifyAsyncRaw<K, V>(
	cache: Map<K, V>,
	key: K,
	func: (key: K) => Promise<V>
): Promise<V> {
	if (cache.has(key)) return deepClone(cache.get(key));

	const obj = await func(key);
	cache.set(key, obj);
	return deepClone(obj);
}

export function cachifyAsync<K, V>(cache: Map<K, V>) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const last = descriptor.value;
		descriptor.value = async (arg: K) => {
			return await cachifyAsyncRaw(cache, arg, last)
		}
	};
}