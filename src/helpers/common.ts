export function* range(min: number, max: number) {
	for (let i = min; i <= max; i++) yield i;
}

export function* concurrentIterators<T extends Iterable<any>[]>(
	...iters: T
): T extends Iterable<infer K>[] ? Generator<K[]> : Generator<any> {
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

export function* mapIterator<K, V>(
	iter: Iterable<K>,
	func: (value: K, index: number) => V
): Iterable<V> {
	let i = 0;
	for (const ele of iter) {
		yield func(ele, i);
		i++;
	}
}

function parallelize_filter(v: PromiseSettledResult<any>) {
	if (v.status == "fulfilled") return v.value;
	else {
		console.warn(`Promise Rejected during parallelize: ${v.reason}`);
	}
}

export async function parallelizeOver<K, V>(
	arr: Iterable<K>,
	func: (value: K, index: number) => Promise<V>,
	settled = false
): Promise<V[]> {
	if (settled) {
		return (await Promise.allSettled(mapIterator(arr, func))).map(parallelize_filter);
	}
	return await Promise.all(mapIterator(arr, func));
}

/** @type {<V>(obj: V, hasOwn?: boolean) => Iterable<keyof V>} */
export function* keys<V>(obj: V, hasOwn?: boolean): Iterable<keyof V> {
	for (const k in obj) {
		if (!hasOwn || {}.hasOwnProperty.call(obj, k)) {
			yield k;
		}
	}
}

export type ImageResolvable = string | import("canvas").Image;