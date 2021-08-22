import { createCanvas, Image, loadImage } from "canvas";
import * as path from "path";
import { parallelizeOver } from "./common";

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
	if (typeof image === "string") image = await loadImage(path.join(process.cwd(), image));

	ctx.drawImage(image, X1, Y1, X2 - X1, Y2 - Y1, 0, 0, X2 - X1, Y2 - Y1);

	const toReturn = new Image();
	toReturn.src = canvas.toDataURL();

	return toReturn;
}

/**
 *
 * @param {import("canvas").Image | string} image The sprite sheet
 * @param {[number, number]} scale The size of each indivual icon in your sprite sheet
 * @param {[number, number]} icon The X, Y position of your icon in your sprite sheet
 * @returns {Promise<import("canvas").Image>} The sliced image
 */
export async function getIcon(image, [scaleX, scaleY], [X, Y]) {
	return sliceImage(
		image,
		{ X: X * scaleX, Y: Y * scaleY },
		{ X: X * scaleX + scaleX, Y: Y * scaleY + scaleY }
	);
}

/**
 *
 * @param {import("canvas").Image | string} image The sprite sheet
 * @param {[number, number]} scale The size of each indivual icon in your sprite sheet
 * @param {[number, number][]} icons The X, Y positions of your icons in your sprite sheet
 * @returns {Promise<import("canvas").Image[]>} The sliced images
 */
export async function getMultipleIcons(image, [scaleX, scaleY], icons) {
	return await parallelizeOver(icons, async (loc) => {
		return getIcon(image, [scaleX, scaleY], loc);
	});
}

