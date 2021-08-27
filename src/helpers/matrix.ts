import { createCanvas, loadImage, ImageData } from "canvas";
import { keys } from "./common";
import { RGBAToUInt32, colorToUInt32, colorToRGBA, RGBAPixel } from "./hex";
import path from "path";
import { ValueKeyedMap, cachify, cachifyAsync } from "./cache";

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

	width: number;

	height: number;

	data: Uint8ClampedArray;

	getPixel(x: number, y: number): RGBAPixel {
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

	setPixel(x: number, y: number, val: RGBAPixel) {
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

	merge(newmatrix: Matrix, [oftX = 0, oftY = 0]: [oftX?: number, oftY?: number] | null = []) {
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
		const colorMap: Record<string, number[][]> = {};

		for (const px of this) {
			const key = RGBAToUInt32(...this.getPixel(px.x, px.y));
			colorMap[key] ??= [];
			colorMap[key].push([px.x, px.y]);
		}

		return colorMap;
	}

	static async normalizePalette(
		palette: Record<
			string,
			string | { type: "image"; path: string } | { type: "gradient"; [K: string]: any }
		>
	) {
		/** @type {Map<number, Matrixy>} */
		const normalizedPalette: Map<number, Matrixy> = new Map();
		for (const color of keys(palette)) {
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

	async replaceColor(
		colors: Record<
			string,
			string | { type: "image"; path: string } | { type: "gradient"; [K: string]: any }
		>
	) {
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

type ImageResolvable = string | import("canvas").Image;

export class ImageMatrix extends Matrix {
	@cachifyAsync(new ValueKeyedMap<ImageResolvable, ImageMatrix>())
	static async create(src: ImageResolvable): Promise<ImageMatrix> {
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
	@cachify(new ValueKeyedMap<Partial<IGradient>, Matrix>())
	static create({
		width = 1,
		height = 1,
		diagonal = "down",
		ramp = [],
	}: Partial<IGradient>): Matrix {
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

export class ColorMatrix implements Matrixy {
	constructor(public color: RGBAPixel) {}

	getPixel(x, y) {
		return this.color;
	}

	setPixel(x, y, val) {
		throw new Error("Cannot set to a ColorMatrix.");
	}
}
