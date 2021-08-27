/**
 * @param {number} min
 * @param {number} max
 */
export function* range(min, max) {
	for (let i = min; i <= max; i++) yield i;
}

/**
 *
 * @type {<T extends Iterable<any>[]>(...iters: T) => T extends Iterable<infer K>[] ? Generator<K[]> : Generator<any>}
 */
export function* concurrentIterators(...iters) {
	const iterators = iters.map((v) => v[Symbol.iterator]());

	let done = false;
	do {
		const toYield = [];

		for (const iter of iterators) {
			const val = iter.next();
			toYield.push(val.value);
			done &&= val.done;
		}

		yield toYield;
	} while (done);
}

/**
 *
 * @type {<K, V>(iter: Iterable<K>, func: (value: K, index: number) => V) => Iterable<V>}
 */
export function* mapIterator(iter, func) {
	let i = 0;
	for (const ele of iter) {
		yield func(ele, i);
		i++;
	}
}

/**
 *
 * @param {PromiseSettledResult<any>} v
 * @returns
 */
function parallelize_filter(v) {
	if (v.status == "fulfilled") return v.value;
	else {
		console.warn(`Promise Rejected during parallelize: ${v.reason}`);
	}
}

/**
 *
 * @type {<K, V>(arr: Iterable<K>, func: (value: K, index: number) => Promise<V>) => Promise<V[]>}
 */
export async function parallelizeOver(arr, func, settled = false) {
	if (settled) {
		return (await Promise.allSettled(mapIterator(arr, func))).map(parallelize_filter);
	}
	return await Promise.all(mapIterator(arr, func));
}

/** @type {<V>(obj: V, hasOwn?: boolean) => Iterable<keyof V>} */
export function* keys(obj, hasOwn = false) {
	for (const k in obj) {
		if (!hasOwn || {}.hasOwnProperty.call(obj, k)) {
			yield k;
		}
	}
}
