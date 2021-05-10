import { createCanvas, Image, ImageData, loadImage } from "canvas";
import * as path from "path";
import cloneDeep from "lodash.clonedeep";
import { hexToRGBA, normalizeHex, RGBAtoHexA } from "./hex";

/**
 * Get a sub-image from a larger one
 * @param {import("canvas").Image | string} image
 * @param {{X: number, Y: number}} range1
 * @param {{X: number, Y: number}} range2
 * @returns {Promise<import("canvas").Image>} The sliced image
 */
export async function sliceImage(image, { X: X1, Y: Y1 }, { X: X2, Y: Y2 }) {
	const canvas = createCanvas(X2 - X1, Y2 - Y1);
	const ctx = canvas.getContext("2d");
	if (typeof image === "string") image = await loadImage(path.join(__dirname, image));

	ctx.drawImage(image, X1, Y1, X2 - X1, Y2 - Y1, 0, 0, X2 - X1, Y2 - Y1);

	const toReturn = new Image();
	toReturn.src = canvas.toDataURL();

	return toReturn;
}

export function* range(min, max) {
	for (let i = min; i <= max; i++) yield i;
}

/**
 *
 * @param {import("canvas").Image | string} image The sprite sheet
 * @param {number} scale The size of each indivual icon in your sprite sheet
 * @param {[number, number]} icon The X, Y position of your icon in your sprite sheet
 * @returns {Promise<import("canvas").Image>} The sliced image
 */
export async function getIcon(image, scale, [X, Y]) {
	return sliceImage(
		image,
		{ X: X * scale, Y: Y * scale },
		{ X: X * scale + scale, Y: Y * scale + scale }
	);
}

export function normalizePalette(palette) {
	/** @type {Record<string, string | { type: "image", path: string } | { type: "gradient", [K: string]: any}>} */
	const normalizedPalette = {};
	for (const color in palette) {
		if (Object.hasOwnProperty.call(palette, color)) {
			const replaceWith = palette[color];
			if (typeof replaceWith === "undefined") continue;
			normalizedPalette[normalizeHex(color)] = replaceWith;
		}
	}
	return normalizedPalette;
}

export class Matrix {
	static Weak = new WeakMap();

	/**
	 * Creates a instance of a Matrix
	 * @param {import("canvas").Image | string} src
	 * @param {any?} opts
	 * @returns {Promise<Matrix>}
	 */
	static async create(src, opts = {}) {
		const { width, height, diagonal = "down", ramp } = opts;
		if (Matrix.Weak.has({ src, opts })) return cloneDeep(Matrix.Weak.get({ src, opts }));
		const obj = new Matrix();
		if (typeof src === "string" && src !== "gradient")
			src = await loadImage(path.join(__dirname, src));
		// @ts-ignore
		const canvas = createCanvas(src?.width ?? width, src?.height ?? height);
		const ctx = canvas.getContext("2d");
		if (src === "gradient") {
			obj.width = width;
			obj.height = height;
			obj.data = ctx.getImageData(0, 0, width, height).data;

			let levels = [];
			const isDiagonal = diagonal === "top-left" || diagonal === "top-right";
			const maxTimes = isDiagonal ? Math.sqrt(width ** 2 + height ** 2) * 2 : height;
			while (levels.length < maxTimes) {
				for (const { color, width: times = 1 } of ramp) {
					if (levels.length >= maxTimes) break;
					for (const _ of range(1, times)) {
						if (levels.length >= maxTimes) break;
						levels.push(color);
					}
				}
			}
			levels = levels.slice(0, Math.floor(maxTimes));

			for (const px of obj) {
				if (diagonal === "top-left") {
					const [r, g, b, a] = hexToRGBA(levels[px.x + px.y]);
					obj.setPixel(px.x, px.y, [r, g, b, Math.min(Math.ceil(a * 255), 255)]);
				} else if (diagonal === "top-right") {
					//
					console.warn("Unimplemented");
				} else {
					const [r, g, b, a] = hexToRGBA(levels[px.y]);
					obj.setPixel(px.x, px.y, [r, g, b, Math.min(Math.ceil(a * 255), 255)]);
				}
			}
		} else {
			ctx.drawImage(src, 0, 0);
			obj.width = src.width;
			obj.height = src.height;
			obj.data = ctx.getImageData(0, 0, src.width, src.height).data;
		}
		Matrix.Weak.set({ src, opts }, cloneDeep(obj));
		return obj;
	}

	/**
	 * @type {number}
	 */
	width;

	/**
	 * @type {number}
	 */
	height;

	/**
	 * @type {Uint8ClampedArray}
	 */
	data;

	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @returns {[R: number, G: number, B: number, A: number]}
	 */
	getPixel(x, y) {
		if (typeof this.width !== "undefined") {
			const index = x * 4 + this.width * 4 * y;
			return [
				this.data[index],
				this.data[index + 1],
				this.data[index + 2],
				this.data[index + 3],
			];
		}
	}

	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {[R: number, G: number, B: number, A: number]} val
	 */
	setPixel(x, y, val) {
		if (typeof this.width !== "undefined") {
			const index = x * 4 + this.width * 4 * y;
			this.data[index] = val[0];
			this.data[index + 1] = val[1];
			this.data[index + 2] = val[2];
			this.data[index + 3] = val[3];
		}
	}

	*[Symbol.iterator]() {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				yield {
					data: this.getPixel(x, y),
					x,
					y,
				};
			}
		}
	}

	getImage() {
		return new ImageData(this.data, this.width, this.height);
	}

	/**
	 * @param {Matrix} newmatrix
	 * @param {[oftX?: number, oftY?: number]?} opts
	 */
	merge(newmatrix, [oftX = 0, oftY = 0] = []) {
		for (const px of this) {
			if (typeof this.getPixel(px.x + oftX, px.y + oftY) === "undefined") continue;
			const newPx = newmatrix.getPixel(px.x, px.y);
			if (newPx[3] === 0) continue;
			this.setPixel(px.x + oftX, px.y + oftY, newPx);
		}
	}

	/**
	 * @param {Record<string, string | { type: "image", path: string } | { type: "gradient", [K: string]: any} >} colors
	 */
	async replaceColor(colors) {
		/** @type {Record<string, number[][]>} */
		const colorMap = {};

		colors = normalizePalette(colors);

		for (const px of this) {
			const key = RGBAtoHexA(...px.data);
			if (typeof colorMap[key] === "undefined") colorMap[key] = [];
			colorMap[key].push([px.x, px.y]);
		}

		for (const key in colorMap) {
			/* eslint-disable no-await-in-loop */
			if (Object.hasOwnProperty.call(colorMap, key)) {
				if (!(key in colors)) continue;
				const toReplace = colors[key];
				if (typeof toReplace === "string") {
					const [r, g, b, a] = hexToRGBA(toReplace);
					for (const [x, y] of colorMap[key])
						this.setPixel(x, y, [r, g, b, Math.min(Math.ceil(a * 255), 255)]);
				} else if (toReplace?.type === "image") {
					const matrix = await Matrix.create(toReplace.path);
					for (const [x, y] of colorMap[key]) this.setPixel(x, y, matrix.getPixel(x, y));
				} else if (toReplace?.type === "gradient") {
					const matrix = await Matrix.create("gradient", toReplace);
					for (const [x, y] of colorMap[key]) this.setPixel(x, y, matrix.getPixel(x, y));
				}
			}
		}
	}
}
