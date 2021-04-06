/**
 *
 * @param {string} hex
 * @returns {boolean}
 */
 function isValidHex(hex) {
	return /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
}

/**
 * @param {string} st
 * @param {number} chunkSize
 */
function getChunksFromString(st, chunkSize) {
	return st.match(new RegExp(`.{${chunkSize}}`, "g"));
}

/**
 * @param {string} hexStr
 */
function convertHexUnitTo256(hexStr) {
	return parseInt(hexStr.repeat(2 / hexStr.length), 16);
}

/**
 * @param {number} a
 * @param {number} alpha
 */
function getAlphafloat(a, alpha) {
	if (typeof a !== "undefined") return a / 255;

	if (typeof alpha !== "number" || alpha < 0 || alpha > 1) return 1;

	return alpha;
}
/**
 * From : https://stackoverflow.com/a/53936623
 * @param {string} hex
 * @param {number=} alpha
 * @returns {[r: number, g: number, b: number, a: number]}
 */
export function hexToRGBA(hex, alpha) {
	if (!isValidHex(hex)) throw new Error(`Invalid HEX : ${hex}`);

	const chunkSize = Math.floor((hex.length - 1) / 3);
	const hexArr = getChunksFromString(hex.slice(1), chunkSize);
	const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
	return [r, g, b, getAlphafloat(a, alpha)];
}

export const isLittleEndian = (() => {
	const array = new Uint8Array(4);
	const view = new Uint32Array(array.buffer);
	// eslint-disable-next-line no-return-assign
	return !!((view[0] = 1) & array[0]);
})();

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
export function RGBAtoHexA(r, g, b, a) {
	const rgba = Uint8Array.of(
		...(isLittleEndian ? [Math.min(Math.ceil(a * 255), 255), b, g, r]: [r, g, b, Math.min(Math.ceil(a * 255), 255)])
	);
	return `#${new Uint32Array(rgba.buffer, rgba.byteOffset, 1)[0].toString(16)}`;
}


export function normalizeHex(hex) {
	return RGBAtoHexA(...hexToRGBA(hex));
}