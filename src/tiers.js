import Tier from "./class/Tier";

const HIGHLIGHT = "#ffffff";
const MAIN_____ = "#66425b";
const SHADOW___ = "#45283c";
const OUTLINE__ = "#392539";
const OUTERLINE = "#b1739e";

/**
 * @type {IGradient}
 */
const ExGradient1 = {
	type: "gradient",
	width: 24,
	height: 24,
	diagonal: "top-left",
	ramp: [
		{ color: "#ffffff", width: 4 },
		{ color: "#ff0000", width: 5 },
		{ color: "#00ff00", width: 6 },
		{ color: "#0000ff", width: 7 },
	],
};
/**
 * @type {IGradient}
 */
const ExGradient2 = {
	type: "gradient",
	width: 24,
	height: 24,
	ramp: [{ color: "#ffffff" }, { color: "#ff0000" }, { color: "#00ff00" }, { color: "#0000ff" }],
};

new Tier("Plain", [
	{
		type: "plain",
	},
]);

new Tier("Berrylium", [
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#ff89e7",
			[SHADOW___]: "#ed106f",
			[OUTLINE__]: "#96001c",
		},
	},
]);

new Tier("Blueberrylium", [
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#00deff",
			[SHADOW___]: "#008595",
			[OUTLINE__]: "#00599e",
		},
	},
]);

new Tier("Chalcedhoney", [
	{
		type: "sparkles",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#ffcc2f",
			[SHADOW___]: "#ff7e00",
			[OUTLINE__]: "#d4410d",
		},
	},
]);

new Tier("Buttergold", [
	{
		type: "sparkles",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#e9d673",
			[SHADOW___]: "#a97621",
			[OUTLINE__]: "#6a220f",
		},
	},
]);

new Tier("Sugarmuck", [
	{
		type: "drip",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#a8bf91",
			[SHADOW___]: "#955e39",
			[OUTLINE__]: "#4d2a23",
		},
	},
]);

new Tier("Jetmint", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ccb3ac",
			[MAIN_____]: "#6e5755",
			[SHADOW___]: "#432d2a",
			[OUTLINE__]: "#0a0508",
			[OUTERLINE]: "#60ff50",
		},
	},
]);

new Tier("Cherrysilver", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#d4c1bc",
			[SHADOW___]: "#908077",
			[OUTLINE__]: "#432d2a",
			[OUTERLINE]: "#f01700",
		},
	},
]);

new Tier("Hazelrald", [
	{
		type: "sparkles",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#9ab834",
			[SHADOW___]: "#526f4d",
			[OUTLINE__]: "#173e20",
		},
	},
]);

new Tier("Mooncandy", [
	{
		type: "sparkles",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#00deff",
			[SHADOW___]: "#7e7ab9",
			[OUTLINE__]: "#a000d5",
		},
	},
]);

new Tier("Astrofudge", [
	{
		type: "sprkoutline",
		palette: {
			[HIGHLIGHT]: "#ddb499",
			[MAIN_____]: "#bb5f36",
			[SHADOW___]: "#9a3316",
			[OUTLINE__]: "#6a220f",
			[OUTERLINE]: "#7e7ab9",
		},
	},
]);

new Tier("Alabascream", [
	{
		type: "sprkoutline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#e0e0e0",
			[SHADOW___]: "#c1a88c",
			[OUTLINE__]: "#bb5f36",
			[OUTERLINE]: "#e9d673",
		},
	},
]);

/**
 * @type {IGradient}
 */
const IridyumOutline = {
	type: "gradient",
	width: 24,
	height: 24,
	diagonal: "top-left",
	ramp: [
		{ color: "#f01700", width: 4 },
		{ color: "#ff7e00", width: 4 },
		{ color: "#ffcc2f", width: 4 },
		{ color: "#60ff50", width: 4 },
		{ color: "#00deff", width: 4 },
		{ color: "#7e7ab9", width: 4 },
		{ color: "#a000d5", width: 4 },
	],
};

new Tier("Iridyum", [
	{
		type: "sprkoutline",
		palette: {
			[HIGHLIGHT]: "#414e7d",
			[MAIN_____]: "#432d2a",
			[SHADOW___]: "#340c02",
			[OUTLINE__]: "#0a0508",
			[OUTERLINE]: IridyumOutline,
		},
	},
]);

new Tier("Synergy I", [
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ff7e00",
			[MAIN_____]: "#f01700",
			[SHADOW___]: "#8c0000",
			[OUTLINE__]: "#450110",
		},
		offset: [2, 2],
	}, // Below
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#a8bf91",
			[MAIN_____]: "#7e7ab9",
			[SHADOW___]: "#414e7d",
			[OUTLINE__]: "#112d3f",
		},
		offset: [-2, -2],
	}, // Above
]);

new Tier("Synergy II", [
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#a8bf91",
			[MAIN_____]: "#7e7ab9",
			[SHADOW___]: "#414e7d",
			[OUTLINE__]: "#112d3f",
		},
		offset: [2, 2],
	}, // Below
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ff7e00",
			[MAIN_____]: "#f01700",
			[SHADOW___]: "#8c0000",
			[OUTLINE__]: "#450110",
		},
		offset: [-2, -2],
	}, // Above
]);

// TODO : NAME
new Tier("uhhh thing", [
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#008595",
			[MAIN_____]: "#008595",
			[SHADOW___]: "#008595",
			[OUTLINE__]: "#008595",
		},
		offset: [1, -1],
	},
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#8c0000",
			[MAIN_____]: "#8c0000",
			[SHADOW___]: "#8c0000",
			[OUTLINE__]: "#8c0000",
		},
		offset: [-1, 1],
	},
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#a8bf91",
			[SHADOW___]: "#526f4d",
			[OUTLINE__]: "#173e20",
		},
	},
]);

new Tier("Krumblor Aura", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#e9d673",
			[MAIN_____]: "#c39338",
			[SHADOW___]: "#834014",
			[OUTLINE__]: "#340c02",
			[OUTERLINE]: "#008595",
		},
	},
]);

new Tier("Trophy 1", [
	{
		type: "trophy",
		palette: {
			[HIGHLIGHT]: "#d4c1bc",
			[OUTERLINE]: "#ccb3ac",
			[MAIN_____]: "#908077",
			[SHADOW___]: "#6e5755",
			[OUTLINE__]: "#432d2a",
		},
	},
]);

new Tier("Trophy 2", [
	{
		type: "trophy",
		palette: {
			[HIGHLIGHT]: "#d4c1bc",
			[OUTERLINE]: "#7e7ab9",
			[MAIN_____]: "#414e7d",
			[SHADOW___]: "#112d3f",
			[OUTLINE__]: "#0a0508",
		},
	},
]);

new Tier("Trophy 3", [
	{
		type: "trophy",
		palette: {
			[HIGHLIGHT]: "#ff89e7",
			[OUTERLINE]: "#dc4162",
			[MAIN_____]: "#ca130a",
			[SHADOW___]: "#96001c",
			[OUTLINE__]: "#450110",
		},
	},
]);

/**
 * @type {(c1: string, c2: string) => IGradient}
 */
const GoalOutline = (c1, c2) => {
	return {
		type: "gradient",
		height: 24,
		width: 24,
		ramp: [
			{ color: c1, width: 12 },
			{ color: c2, width: 12 },
		],
	};
};

new Tier("Goal 1", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#c1a88c",
			[SHADOW___]: "#6e5755",
			[OUTLINE__]: "#341517",
			[OUTERLINE]: GoalOutline("#008595", "#00deff"),
		},
	},
	{ type: "image", blend: "overlay", path: "../tier/goal_overlay.png" },
]);

new Tier("Goal 2", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#c1a88c",
			[SHADOW___]: "#6e5755",
			[OUTLINE__]: "#341517",
			[OUTERLINE]: GoalOutline("#ed106f", "#ff89e7"),
		},
	},
	{ type: "image", blend: "overlay", path: "../tier/goal2_overlay.png" },
]);

new Tier("Fortune", [
	{
		type: "sprkoutline",
		palette: {
			[HIGHLIGHT]: "#e9d673",
			[MAIN_____]: "#9ab834",
			[SHADOW___]: "#3a812b",
			[OUTLINE__]: "#112d3f",
			[OUTERLINE]: "#f01700",
		},
	},
	{ type: "image", blend: "overlay", path: "../tier/fortune_overlay.png" },
]);

// Kiz3r's Tier just really fits into vanilla
new Tier("Misfortune", [
	{
		type: "sprkoutline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#7e5a40",
			[SHADOW___]: "#4d2a23",
			[OUTLINE__]: "#340c02",
			[OUTERLINE]: "#dc4162",
		},
	},
	{ type: "image", blend: "overlay", path: "../tier/misfortune_overlay.png" },
]);

new Tier("Addon", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#ccb3ac",
			[SHADOW___]: "#908077",
			[OUTLINE__]: "#432d2a",
			[OUTERLINE]: "#a000d5",
		},
	},
]);

/**
 * @type {IGradient}
 */
const KittenishOutline = {
	type: "gradient",
	diagonal: "top-left",
	width: 24,
	height: 24,
	ramp: [
		{ color: "#dafd09", width: 11 },
		{ color: "#b3fc00", width: 12 },
		{ color: "#60f802", width: 13 },
		{ color: "#37c81a", width: 11 },
	],
};

new Tier("Kittenish", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#827de2",
			[MAIN_____]: "#716ccd",
			[SHADOW___]: "#4a4782",
			[OUTLINE__]: "#4a4782",
			[OUTERLINE]: KittenishOutline,
		},
	},
]);

// Exended vanilla tiers
new Tier("Aura", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffcc2f",
			[MAIN_____]: "#ffcc2f",
			[SHADOW___]: "#ff7e00",
			[OUTLINE__]: "#ed106f",
			[OUTERLINE]: "#00deff",
		},
	},
]);

new Tier("Luminous", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#ffffff",
			[SHADOW___]: "#faedb9",
			[OUTLINE__]: "#ddb466",
			[OUTERLINE]: "#00deff",
		},
	},
]);

new Tier("Skully Tier 1", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Skully Tier 2", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Orange", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Red/Black", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Orange/Yellow", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Purple/Light Pink/Dark Pink", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Neapolitan", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Red with orange outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Gray with orange outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Raingrid", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: { type: "image", path: "../tier/raingrid/raingrid_middle.png" },
			[MAIN_____]: { type: "image", path: "../tier/raingrid/raingrid_middle.png" },
			[SHADOW___]: { type: "image", path: "../tier/raingrid/raingrid_middle.png" },
			[OUTLINE__]: { type: "image", path: "../tier/raingrid/raingrid_outline.png" },
			[OUTERLINE]: IridyumOutline,
		},
	},
	{
		type: "sprkoutline",
		blend: "underlay",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#faedb9",
			[SHADOW___]: "#ddb466",
			[OUTLINE__]: "#00000000",
			[OUTERLINE]: "#00000000",
		},
	},
	// Execeptions :
	// Completely different sprite for Prism
]);

new Tier("discount", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("sans", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("White and Black stripes with sparkles", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("White and Brown stripes with sparkles", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("syrup", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("gold with outline rainbow", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("light red", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("ikea", [
	// I know that's not what it is but that's what it reminds me of
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Templatierium", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Halo", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("egg.", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Building Cookie", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Honey", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Gray with downwards orange gradient", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Green with downwards orange gradient", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("green", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("light brown", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Red with blue sparkles", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Goal 3", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Synergy III", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Synergy IIII", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Deep Sea", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Special Red", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Nebula", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("bubblegum pink", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("rich and bright orange", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Red with Brown outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("White with super sparkles", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Yellow with super sparkles", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("FIRE", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("DARK FIRE", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Gray with background spiral", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Green checker with background spiral", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Rainbow with background spiral", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Diagonal Purple / Black", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Diagonal Rainbow", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("muk", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Brown with green outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Minecraft dirt", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Minecraft iron", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Minecraft gold", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Minecraft diamond", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("Minecraft netherite", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("red with a diagonal red to orange gradient outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("heavenly", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("dark yellow with yellow outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("dark purple with purple to pink gradient outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("mossy iridyum", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("blue with sparkly purple", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("cookie with bg", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("cheated cookies taste awful", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("skully rainbow", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("heavenly chip tier", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("dripy purple", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("brown with downwards white to orange outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("green synergy-ish", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("red with vines and sparkle", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("transparent with crazy brown outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("yellow skully", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("green skully", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("orange skully", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("green/orange skully", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("flat purple with gold outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("blue with purple outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("blue with iridyum outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: IridyumOutline,
		},
	},
]);

new Tier("prism skully", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("green plant tier", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("skully blue/white", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("blue/orange", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("skully rainbow", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("ivory white tier", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("white with yellow outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("synergy left", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("synergy up", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("cosmic thingy", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("dripy white blue thingy", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("minecraft dirt hd", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("bubblegum", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("ornament tier", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

/**
 * @type {IGradient}
 */
const FlatIridyum = {
	type: "gradient",
	height: 24,
	width: 24,
	ramp: [
		{ color: "#414E7D", width: 6 },
		{ color: "#432D2A", width: 6 },
		{ color: "#340C02", width: 6 },
		{ color: "#0A0508", width: 6 },
	],
};

new Tier("flat iriydum", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: FlatIridyum,
			[MAIN_____]: FlatIridyum,
			[SHADOW___]: FlatIridyum,
			[OUTLINE__]: IridyumOutline,
			[OUTERLINE]: FlatIridyum,
		},
	},
]);

new Tier("sparkly blue", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("sparkly white", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("red with gold outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("yellow with purple outline", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);

new Tier("sparkly blue", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ff0000",
			[MAIN_____]: "#ff0000",
			[SHADOW___]: "#ff0000",
			[OUTLINE__]: "#ff0000",
			[OUTERLINE]: "#ff0000",
		},
	},
]);
