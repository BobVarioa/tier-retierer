declare const $_ENV: { name: string };

//type Matrix<T> = Array<Array<T>>;

interface IGradient {
	type: "gradient";
	width: number;
	height: number;
	diagonal?: "top-left" | "top-right" | "down" | "left"
	ramp: { color: string; width?: number }[];
}

interface IImage {
	type: "image";
	path: string;
}

type PaletteOptions = string | IGradient | IImage;

interface IAction {
	type: "plain" | "basic" | "sparkles" | "drip" | "outline" | "sprkoutline" | "trophy";
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
	type: "image"
	path: string;
}

interface RecolorAction {
	type: "recolor"
	palette: Record<string, PaletteOptions>
}

type Action = IAction | ImageAction