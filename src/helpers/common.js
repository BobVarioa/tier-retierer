export function* range(min, max) {
	for (let i = min; i <= max; i++) yield i;
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
export async function parallelizeOverSettled(arr, func) {
	return (await Promise.allSettled(mapIterator(arr, func))).map(parallelize_filter);
}

/**
 *
 * @type {<K, V>(arr: Iterable<K>, func: (value: K, index: number) => Promise<V>) => Promise<V[]>}
 */
export async function parallelizeOver(arr, func) {
	return await Promise.all(mapIterator(arr, func));
}

/** @type {<V>(obj: V) => Iterable<keyof V>} */
export function* safeKeys(obj) {
	for (const k in obj) {
		if ({}.hasOwnProperty.call(obj, k)) {
			yield k;
		}
	}
}
