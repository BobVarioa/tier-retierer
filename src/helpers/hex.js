import parse from "color-parse";
import hsl from "color-space/hsl";
import { cachify } from "./cache";

const cached_parse = (() => {
	/** @type {Map<string, any>} */
	const cache = new Map();
	return function (color) {
		return cachify(cache, color, parse);
	};
})();

/**
 * @param {string} str
 * @returns {[r: number, g: number, b: number, a: number]}
 */
export function colorToRGBA(str) {
	const color = cached_parse(str);

	if (!color.space) throw new Error("Not a color");

	const rgb = color.values;
	const a = Math.min(
		Math.max(Math.floor((typeof color.alpha === "undefined" ? 1 : color.alpha) * 255), 0),
		255
	);

	const [r, g, b] = color.space.startsWith("h") ? hsl.rgb(rgb) : rgb;
	return [r, g, b, a];
}

/**
 * @param {string} hex
 * @returns {number}
 */
export function colorToUInt32(hex) {
	return RGBAToUInt32(...colorToRGBA(hex));
}

const view4 = new DataView(new ArrayBuffer(4));

export function UInt32ToRGBA(num) {
	view4.setUint32(0, num);
	return [view4.getUint8(0), view4.getUint8(1), view4.getUint8(2), view4.getUint8(3)];
}

export function RGBAToUInt32(r, g, b, a) {
	view4.setUint8(0, r);
	view4.setUint8(1, g);
	view4.setUint8(2, b);
	view4.setUint8(3, a);
	return view4.getUint32(0);
}
