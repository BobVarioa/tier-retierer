import { createCanvas, loadImage } from "canvas";
import "./tiers";
import * as fs from "fs";
import {
	getIcon,
	getImageDataFromMatrix,
	getImageMatrix,
	mergeMatrix,
	replaceColor,
} from "./helpers/main";
import Tier from "./class/Tier";

try {
	// Number of templates
	const images = 56;
	const canvas = createCanvas(images * 24, Tier.tiers.length * 24);
	const ctx = canvas.getContext("2d");

	const imageexpr = async (num, gctx) => {
		const image = await loadImage(`./templates/template-${num}.png`);
		const preTemp = await Promise.all([
			getIcon(image, 24, [0, 0]),
			getIcon(image, 24, [1, 0]),
			getIcon(image, 24, [2, 0]),
			getIcon(image, 24, [3, 0]),
			getIcon(image, 24, [4, 0]),
			getIcon(image, 24, [5, 0]),
			getIcon(image, 24, [6, 0]),
		]);

		const templateImages = {
			PLAIN: preTemp[0], // literally plain tier
			BASIC: preTemp[1], // Blueberrilum and similar
			SPARKLES: preTemp[2], //
			DRIP: preTemp[3], // Sugarmuck
			OUTLINE: preTemp[4], //
			SPRKOUTLINE: preTemp[5],
			TROPHY: preTemp[6],
		};

		const templateImageFunc = (templateImage) => {
			return async (matrix, { palette, offset, blend, first = false }) => {
				if (first) return replaceColor(await getImageMatrix(templateImage), palette);

				return replaceColor(
					await mergeMatrix(
						matrix,
						await getImageMatrix(templateImage),
						offset,
						blend === "underlay"
					),
					palette
				);
			};
		};

		const actionMap = {
			plain: templateImageFunc(templateImages.PLAIN),
			basic: templateImageFunc(templateImages.BASIC),
			sparkles: templateImageFunc(templateImages.SPARKLES),
			drip: templateImageFunc(templateImages.DRIP),
			outline: templateImageFunc(templateImages.OUTLINE),
			sprkoutline: templateImageFunc(templateImages.SPRKOUTLINE),
			trophy: templateImageFunc(templateImages.TROPHY),
			image: async (matrix, { palette, path, offset, blend, first = false }) => {
				if (first) return replaceColor(await getImageMatrix(path), palette);
				return replaceColor(
					await mergeMatrix(
						matrix,
						await getImageMatrix(path),
						offset,
						blend === "underlay"
					),
					palette
				);
			},
			recolor: async (matrix, { palette, first = false }) => {
				if (first) throw new Error("Palette can't be the first action in a series");
				return replaceColor(matrix, palette);
			},
		};

		let i = 0;
		for (const tier of Tier.tiers) {
			/* eslint-disable no-await-in-loop */

			/** @type {Matrix<[R: number, G: number, B: number, A: number]>} */
			let matrix;

			let first = true;

			for (const element of tier.actions) {
				if (!actionMap[element.type]) {
					console.warn(element.type, " is not in actionMap");
					continue;
				}
				matrix = await actionMap[element.type](first ? undefined : matrix, {
					first,
					...element,
				});
				// console.log("in the loop : \n", matrix);
				if (first) first = false;
			}
			// console.log("out of the loop : \n",matrix);
			gctx.putImageData(await getImageDataFromMatrix(matrix), num * 24, i * 24);
			i += 1;
		}
		return true;
	};

	// eslint-disable-next-line arrow-body-style
	const range = (num) => Array(num).fill(0);

	// @ts-ignore esbuild ftw
	Promise.allSettled(
		range(images).map((_, i) => {
			return imageexpr(i, ctx).catch(console.warn);
		})
	)
		.catch(console.warn)
		.then(() => {
			fs.promises.writeFile("./out/tierlist.png", canvas.toBuffer(), "binary");
		});
} catch (error) {
	console.warn(error);
}
