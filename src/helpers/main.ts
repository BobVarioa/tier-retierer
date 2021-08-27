import { createCanvas, Image, loadImage } from "canvas";
import * as path from "path";
import { ImageResolvable, parallelizeOver } from "./common";

/**
 * Get a sub-image from a larger one
 * @param image
 * @param range1
 * @param range2
 * @returns The sliced image
 */
export async function sliceImage(
	image: ImageResolvable,
	{ X: X1, Y: Y1 }: { X: number; Y: number },
	{ X: X2, Y: Y2 }: { X: number; Y: number }
): Promise<import("canvas").Image> {
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
 * @param image The sprite sheet
 * @param scale The size of each indivual icon in your sprite sheet
 * @param icon The X, Y position of your icon in your sprite sheet
 * @returns The sliced image
 */
export async function getIcon(
	image: ImageResolvable,
	[scaleX, scaleY]: [number, number],
	[X, Y]: [number, number]
): Promise<import("canvas").Image> {
	return sliceImage(
		image,
		{ X: X * scaleX, Y: Y * scaleY },
		{ X: X * scaleX + scaleX, Y: Y * scaleY + scaleY }
	);
}

/**
 *
 * @param image The sprite sheet
 * @param scale The size of each indivual icon in your sprite sheet
 * @param icons The X, Y positions of your icons in your sprite sheet
 * @returns The sliced images
 */
export async function getMultipleIcons(
	image: ImageResolvable,
	[scaleX, scaleY]: [number, number],
	icons: [number, number][]
): Promise<import("canvas").Image[]> {
	return await parallelizeOver(icons, async (loc) => {
		return getIcon(image, [scaleX, scaleY], loc);
	});
}
