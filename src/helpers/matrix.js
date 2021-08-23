import { createCanvas, loadImage, ImageData } from "canvas";
import { safeKeys } from "./common";
import { RGBAToUInt32, colorToUInt32, colorToRGBA } from "./hex";
import path from "path";
import { cachify, cachifyAsync, ValueKeyedMap } from "./cache";

/** @implements {Matrixy} */
export class Matrix {
	static getIndex(diagonal, height, px) {
		if (diagonal === "top-left") return px.x + px.y;
		if (diagonal === "top-right") return px.y + (height - 1 - px.x);
		if (diagonal === "left") return px.x;
		if (diagonal === "down") return px.y;
	}

	constructor(width, height) {
		this.width = width;
		this.height = height;
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

	getPixelRaw(x, y) {
		if (typeof this.width !== "undefined") {
			const index = x * 4 + this.width * 4 * y;
			return RGBAToUInt32(
				this.data[index],
				this.data[index + 1],
				this.data[index + 2],
				this.data[index + 3]
			);
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
	 *
	 * @deprecated
	 */
	getPalette() {
		/** @type {Record<string, number[][]>} */
		const colorMap = {};

		for (const px of this) {
			const key = RGBAToUInt32(...this.getPixel(px.x, px.y));
			colorMap[key] ??= [];
			colorMap[key].push([px.x, px.y]);
		}

		return colorMap;
	}

	/**
	 *
	 * @param {Record<string, string | { type: "image", path: string } | { type: "gradient", [K: string]: any}>} palette
	 */
	static async normalizePalette(palette) {
		/** @type {Map<number, Matrixy>} */
		const normalizedPalette = new Map();
		for (const color of safeKeys(palette)) {
			const replaceWith = palette[color];
			if (typeof replaceWith === "undefined") continue;

			const key = colorToUInt32(color);
			if (typeof replaceWith === "string") {
				normalizedPalette.set(key, new ColorMatrix(colorToRGBA(replaceWith)));
			} else if (replaceWith.type === "image") {
				normalizedPalette.set(key, await ImageMatrix.create(replaceWith.path));
			} else if (replaceWith.type === "gradient") {
				normalizedPalette.set(key, GradientMatrix.create(replaceWith));
			}
		}
		return normalizedPalette;
	}

	/**
	 * @param {Record<string, string | { type: "image", path: string } | { type: "gradient", [K: string]: any} >} colors
	 */
	async replaceColor(colors) {
		if (typeof colors == "undefined") return;
		const colorMap = await Matrix.normalizePalette(colors);

		for (const { x, y } of this) {
			const key = this.getPixelRaw(x, y);
			const matrix = colorMap.get(key);
			if (typeof matrix !== "undefined") {
				//console.log(`${key}, ${colorMap}`);
				this.setPixel(x, y, matrix.getPixel(x, y));
			}
		}
	}
}

export class ImageMatrix extends Matrix {
	/**@type {ValueKeyedMap<string | import("canvas").Image, ImageMatrix>} */
	static cache = new ValueKeyedMap();

	/**
	 * Creates a instance of a ImageMatrix
	 * @param {string | import("canvas").Image} src
	 * @returns {Promise<ImageMatrix>}
	 */
	static async create(src) {
		return await cachifyAsync(ImageMatrix.cache, src, ImageMatrix.#createBase);
	}

	/**
	 * @param {string | import("canvas").Image} src
	 * @returns {Promise<Matrix>}
	 */
	static async #createBase(src) {
		let img = src;
		if (typeof img == "string") img = await loadImage(path.join(process.cwd(), img));

		const obj = new ImageMatrix(img.width, img.height);
		const ctx = createCanvas(obj.width, obj.height).getContext("2d");
		ctx.drawImage(img, 0, 0);
		obj.data = ctx.getImageData(0, 0, obj.width, obj.height).data;
		return obj;
	}
}

export class GradientMatrix extends Matrix {
	static cache = new ValueKeyedMap();

	/**
	 * Creates a instance of a GradientMatrix
	 * @param {any?} opts
	 * @returns {Matrix}
	 */
	static create(opts = {}) {
		return cachify(GradientMatrix.cache, { opts }, GradientMatrix.#createBase);
	}

	/**
	 * @param {{opts: any?}} key
	 * @returns {Matrix}
	 */
	static #createBase({ opts: { width = 1, height = 1, diagonal = "down", ramp = [] } = {} }) {
		const obj = new GradientMatrix(width, height);
		obj.data = new Uint8ClampedArray(width * height * 4);

		let levels = [];
		const isDiagonal = diagonal === "top-left" || diagonal === "top-right";
		const maxTimes = isDiagonal ? Math.sqrt(width ** 2 + height ** 2) * 2 : height;
		while (levels.length < maxTimes) {
			for (const { color, width: times = 1 } of ramp) {
				if (levels.length >= maxTimes) break;
				for (let i = 1; i < times; i++) {
					if (levels.length >= maxTimes) break;
					levels.push(color);
				}
			}
		}
		levels = levels.slice(0, Math.floor(maxTimes));

		for (const px of obj)
			obj.setPixel(px.x, px.y, colorToRGBA(levels[Matrix.getIndex(diagonal, height, px)]));

		return obj;
	}
}

/** @implements {Matrixy} */
export class ColorMatrix {
	color;

	/**
	 *
	 * @param {[R: number, G: number, B: number, A: number]} color
	 */
	constructor(color) {
		this.color = color;
	}

	getPixel(x, y) {
		return this.color;
	}

	setPixel(x, y, val) {
		throw new Error("Cannot set to a ColorMatrix.");
	}
}
