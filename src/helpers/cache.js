import { deepEqual } from "fast-equals";
import { qclone as deepClone } from "qclone";

/**
 * @implements {Map}
 * @template K,V
 */
export class ValueKeyedMap {
	/** @type {K[]} */
	#keys = [];

	/** @type {V[]} */
	#data = [];

	/** @type {(K) => number} */
	#getKeyIndex(key) {
		for (let i = 0; i < this.#keys.length; i++) {
			if (deepEqual(this.#keys[i], key)) return i;
		}
		return -1;
	}

	/** @type {(K) => boolean} */
	has(key) {
		return this.#getKeyIndex(key) > -1;
	}

	/** @type {(K) => V} */
	get(key) {
		const keyIndex = this.#getKeyIndex(key);

		if (keyIndex > -1) {
			return this.#data[keyIndex];
		} else {
			return undefined;
		}
	}

	/** @type {(K, V) => this} */
	set(key, value) {
		const keyIndex = this.#getKeyIndex(key);

		if (keyIndex > -1) {
			this.#data[keyIndex] = value;
		} else {
			this.#keys.push(key);
			this.#data.push(value);
		}

		return this;
	}

	/** @type {() => void} */
	clear() {
		this.#keys = [];
		this.#data = [];
	}

	/** @type {() => IterableIterator<K>} */
	*keys() {
		yield* this.#keys;
	}

	/** @type {() => IterableIterator<V>} */
	*values() {
		yield* this.#data;
	}

	/** @type {(callback: (value: V, key, K) => void) => void} */
	forEach(callback) {
		for (const [key, value] of this) {
			callback(value, key);
		}
	}

	/** @type {(key: K) => boolean} */
	delete(key) {
		const keyIndex = this.#getKeyIndex(key);

		if (keyIndex > -1) {
			delete this.#keys[keyIndex];
			delete this.#data[keyIndex];
			return true;
		}
	}

	/** @type {number} */
	get size() {
		return this.#keys.length;
	}

	/** @type {() => IterableIterator<[K,V]>} */
	*entries() {
		yield* this;
	}

	/** @type {() => IterableIterator<[K,V]>} */
	*[Symbol.iterator]() {
		for (let i = 0; i < this.#keys.length; i++) {
			yield [this.#keys[i], this.#data[i]];
		}
	}

	[Symbol.toStringTag] = "CacheMap";
}

/**
 *
 * @type {<K, V>(cache: Map<K, V>, key: K, func: (key: K) => V) => V}
 */
export function cachify(cache, key, func) {
	if (cache.has(key)) return deepClone(cache.get(key));

	const obj = func(key);
	cache.set(key, obj);
	return deepClone(obj);
}

/**
 * @type {<K, V>(cache: Map<K, V>, key: K, func: (key: K) => Promise<V>) => Promise<V>}
 */
export async function cachifyAsync(cache, key, func) {
	if (cache.has(key)) return deepClone(cache.get(key));

	const obj = await func(key);
	cache.set(key, obj);
	return deepClone(obj);
}
