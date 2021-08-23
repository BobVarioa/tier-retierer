declare const $_ENV: { name: string };

//type Matrix<T> = Array<Array<T>>;

interface IGradient {
	type: "gradient";
	width: number;
	height: number;
	diagonal?: "top-left" | "top-right" | "down" | "left";
	ramp: { color: string; width?: number }[];
}

interface IImage {
	type: "image";
	path: string;
}

type PaletteOptions = string | IGradient | IImage;

interface IAction {
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

interface ImageAction extends IAction {
	type: "image";
	path: string;
}

interface RecolorAction {
	type: "recolor";
	palette: Record<string, PaletteOptions>;
}

type Action = IAction | ImageAction | RecolorAction;

interface IConfig {
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

interface Matrixy {
	getPixel(x: number, y: number): [R: number, G: number, B: number, A: number];

	setPixel(x: number, y: number, val: [R: number, G: number, B: number, A: number]): void;
}