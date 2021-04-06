import { createCanvas, Image, ImageData, loadImage } from "canvas";
import * as path from "path";
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

/**
 * @type {Map<import("canvas").Image | String, Matrix<[R: number, G: number, B: number, A: number ]>>}
 */
const getImageMatrixMap = new Map();

/**
 * Get the Image Matrix from an Image
 * @param {import("canvas").Image | string} image
 * @returns {Promise<Matrix<[R: number, G: number, B: number, A: number ]>>}
 */
export async function getImageMatrix(image) {
	// if (getImageMatrixMap.has(image)) return getImageMatrixMap.get(image);
	if (typeof image === "string") image = await loadImage(path.join(__dirname, image));
	const canvas = createCanvas(image.width, image.height);
	const ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	const data = ctx.getImageData(0, 0, image.width, image.height);
	// console.log(image.width === data.width, image.height === data.height, data.data.length);
	/*
	3px x 4px: [
	  //r, g, b, a
		1, 1, 1, 1, // [0, 0] = 0
		1, 1, 1, 1, // [1, 0] = 4
		1, 1, 1, 1, // [2, 0] = 8

		2, 2, 2, 2, // [0, 1] = 12
		2, 2, 2, 2, // [1, 1] = 16
		2, 2, 2, 2, // [2, 1] = 20

		3, 3, 3, 3, // [0, 2] = 24
		3, 3, 3, 3, // [1, 2] = 28
		3, 3, 3, 3, // [2, 2] = 32

		4, 4, 4, 4, // [0, 3] = 36
		4, 4, 4, 4, // [1, 3] = 40
		4, 4, 4, 4, // [2, 3] = 44
	]
	f(x, y, w, h) = (x * 4) + ((w * h) * y)
	*/
	/** @type {Matrix<[R: number, G: number, B: number, A: number ]>} */
	const matrix = [];

	for (let y = 0; y < data.height; y++) {
		for (let x = 0; x < data.width; x++) {
			if (!matrix[x]) matrix[x] = [];
			const index = x * 4 + data.width * 4 * y;
			matrix[x][y] = [
				// R
				data.data[index] ?? 255,
				// G
				data.data[index + 1] ?? 0,
				// B
				data.data[index + 2] ?? 0,
				// A
				data.data[index + 3] ?? 255,
			];
		}
	}

	getImageMatrixMap.set(image, matrix);
	return matrix;
}

/**
 * @type {Map<Matrix<[R: number, G: number, B: number, A: number ]>, import("canvas").ImageData>}
 */
const getImageDataFromMatrixMap = new Map();

/**
 * Get the Image Data from an Image Matrix
 * @param {Matrix<[R: number, G: number, B: number, A: number ]>} matrix
 * @returns {Promise<import("canvas").ImageData>}
 */
export async function getImageDataFromMatrix(matrix) {
	const toReturn = [];
	for (let y = 0; y < matrix[0].length; y++)
		for (let x = 0; x < matrix.length; x++) toReturn.push(...matrix[x][y]);
	return new ImageData(new Uint8ClampedArray(toReturn), matrix.length, matrix[0].length);
}

/**
 * @param {Matrix<[R: number, G: number, B: number, A: number ]>} oldmatrix
 * @param {Matrix<[R: number, G: number, B: number, A: number ]>} newmatrix
 * @param {[optX?: number, optY?: number]?} opts
 * @returns {Promise<Matrix<[R: number, G: number, B: number, A: number ]>>}
 */
export async function mergeMatrix(oldmatrix, newmatrix, [optX = 0, optY = 0] = [], swap = false) {
	if (swap) [oldmatrix, newmatrix] = [newmatrix, oldmatrix];
	// console.log("mergeMatrix", oldmatrix, "\n", newmatrix, optX, optY);
	for (let x = 0; x < oldmatrix.length; x++) {
		if (typeof oldmatrix[x] === "undefined") oldmatrix[x] = [];

		for (let y = 0; y < oldmatrix[x].length; y++) {
			if (typeof oldmatrix[x][y] === "undefined") oldmatrix[x][y] = [0, 0, 0, 0];
			if (newmatrix[x][y][3] === 0) continue;

			oldmatrix[x + optX][y + optY] = newmatrix[x][y];
		}
	}
	return oldmatrix;
}

export function normalizePalette (palette) {
	/** @type {Record<string, string | { path: string; }>} */
	const normalizedPalette = {};
	for (const color in palette) {
		if (Object.hasOwnProperty.call(palette, color)) {
			const replaceWith = palette[color];
			if (typeof replaceWith === "undefined") continue;
			normalizedPalette[normalizeHex(color)] = replaceWith;
		}
	}
	return normalizedPalette;
};

/**
 *
 * @param {Matrix<[R: number, G: number, B: number, A: number ]>} oldmatrix
 * @param {Record<string, string | { path: string } >} colors
 */
export async function replaceColor(oldmatrix, colors) {
	/** @type {Record<string, number[][]>} */
	const colorMap = {};

	colors = normalizePalette(colors);

	const workingMatrix = oldmatrix;

	workingMatrix.forEach((val, x) => {
		val.forEach((arr, y) => {
			const key = RGBAtoHexA(...arr);
			if (typeof colorMap[key] === "undefined") colorMap[key] = [];
			colorMap[key].push([x, y]);
		});
	});
	// console.log(colorMap, colors);

	for (const key in colorMap) {
		/* eslint-disable no-await-in-loop */
		if (Object.hasOwnProperty.call(colorMap, key)) {
			if (!(key in colors)) continue;
			const element = colorMap[key];

			for (const ele of element) {
				const toReplace = colors[key];
				if (typeof toReplace === "string") {
					// console.log(key, ":", toReplace, ": Normal");
					const [r, g, b, a] = hexToRGBA(toReplace);

					workingMatrix[ele[0]][ele[1]] = [r, g, b, Math.min(Math.ceil(a * 255), 255)];
				} else {
					const matrix = await getImageMatrix(toReplace.path);
					workingMatrix[ele[0]][ele[1]] = matrix[ele[0]][ele[1]];
					// console.log(key, ":", RGBAtoHexA(...matrix[ele[0]][ele[1]]), ": From Image :", toReplace.path);
				}
			}
		}
	}
	return workingMatrix;
}
