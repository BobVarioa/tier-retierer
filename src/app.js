import { createCanvas, loadImage } from "canvas";
import "./tiers";
import * as fs from "fs";
import { getIcon, Matrix } from "./helpers/main";
import Tier from "./class/Tier";

try {
	console.time("Program");
	// Number of templates
	const images = fs.readdirSync("./templates").length;
	const canvas = createCanvas(images * 24, Tier.tiers.length * 24);
	const ctx = canvas.getContext("2d");

	/**
	 *
	 * @param {number} num
	 * @param {import("canvas").CanvasRenderingContext2D} gctx
	 */
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

		/**
		 * @type {(templateImage: any) => ((oldmatrix: Matrix, rest: any) => Promise<Matrix>)}
		 */
		const templateImageFunc = (templateImage) => {
			return async (oldmatrix, { palette, offset, blend, first = false }) => {
				const matrix = await Matrix.create(templateImage);
				await matrix.replaceColor(palette);
				if (first) return matrix;
				if (blend === "underlay") {
					matrix.merge(oldmatrix, offset);
					return matrix;
				}
				oldmatrix.merge(matrix, offset);
				return oldmatrix;
			};
		};

		/**
		 * @type {Record<string, (oldmatrix: Matrix, rest: any) => Promise<Matrix>>}
		 */
		const actionMap = {
			plain: templateImageFunc(templateImages.PLAIN),
			basic: templateImageFunc(templateImages.BASIC),
			sparkles: templateImageFunc(templateImages.SPARKLES),
			drip: templateImageFunc(templateImages.DRIP),
			outline: templateImageFunc(templateImages.OUTLINE),
			sprkoutline: templateImageFunc(templateImages.SPRKOUTLINE),
			trophy: templateImageFunc(templateImages.TROPHY),
			async image(oldmatrix, { palette, path, offset, blend, first = false }) {
				const matrix = await Matrix.create(path);
				await matrix.replaceColor(palette);
				if (first) return matrix;
				if (blend === "underlay") {
					matrix.merge(oldmatrix, offset);
					return matrix;
				}
				oldmatrix.merge(matrix, offset);
				return oldmatrix;
			},
			async recolor(matrix, { palette, first = false }) {
				if (first) throw new Error("Recolor can't be the first action in a series");
				await matrix.replaceColor(palette);
				return matrix;
			},
		};

		let i = 0;
		for (const tier of Tier.tiers) {
			/* eslint-disable no-await-in-loop */

			/** @type {Matrix} */
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
				if (first) first = false;
			}
			gctx.putImageData(matrix.getImage(), num * 24, i * 24);
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
			console.timeEnd("Program");
		});
} catch (error) {
	console.warn(error);
}
