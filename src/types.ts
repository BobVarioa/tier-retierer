import { IGradient } from "@masterofbob777/helpers/src/image";

declare const $_ENV: { name: string };

export interface IImage {
	type: "image";
	path: string;
}

export type PaletteOptions = string | IGradient | IImage;

export interface IAction {
	type: string;
	palette?: {
		"#ffffff"?: PaletteOptions;
		"#66425b"?: PaletteOptions;
		"#45283c"?: PaletteOptions;
		"#392539"?: PaletteOptions;
		"#b1739e"?: PaletteOptions;
	};
	offset?: number[];
	blend?: "underlay" | "overlay";
}

export interface ImageAction extends IAction {
	type: "image";
	path: string;
}

export interface RecolorAction {
	type: "recolor";
	palette: Record<string, PaletteOptions>;
}

export type Action = IAction | ImageAction | RecolorAction;

export interface IConfig {
	/**
	 * The general Printing Press options
	 */
	options: {
		/**
		 * The size of each icon in pixels
		 */
		size: [X: number, Y: number];
		/**
		 *
		 */
		order?: ((a: string, b: string) => number) | string;
	};
	/**
	 * The files that Printing Press parses
	 */
	files: {
		/**
		 *
		 */
		templates: string;
		/**
		 *
		 */
		out: string;
	};
	/**
	 *
	 */
	templates: Record<string, [number, number]>;
	/**
	 *
	 */
	levels: Record<string, Action[]>;
}
