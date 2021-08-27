export function time(name?: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const last = descriptor.value;
		const marker = (name ?? propertyKey);
		const markerStart = marker + "Init";
		const markerEnd = marker + "End";
		descriptor.value = (...args) => {
			performance.mark(markerStart);
			last(...args);
			performance.mark(markerEnd);
			performance.measure(marker, markerStart, markerEnd)
		}
	};
}