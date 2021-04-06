import Tier from "./class/Tier";

const HIGHLIGHT = "#ffffff";
const MAIN_____ = "#66425b";
const SHADOW___ = "#45283c";
const OUTLINE__ = "#392539";
const OUTERLINE = "#b1739e";

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
			[OUTERLINE]: "#60ff50"
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
			[OUTERLINE]: "#f01700"
		},
	}
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
			[OUTERLINE]: "#7e7ab9"
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
			[OUTERLINE]: "#e9d673"
		},
	},
]);

// TODO :
// - Recolor Outline from other image
new Tier("Iridyum", [
	{
		type: "sprkoutline",
		palette: {
			[HIGHLIGHT]: "#414e7d",
			[MAIN_____]: "#432d2a",
			[SHADOW___]: "#340c02",
			[OUTLINE__]: "#0a0508",
			[OUTERLINE]: { path: "../tier/iridyum_base.png" }
		},
	},
]);

// TODO :
// - Draw sprite with +1, +1 offset with custom palette
// - Draw sprite with -1, -1 offset with custom palette
// - Overlay those properly
new Tier("Synergy I", [
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ff7e00",
			[MAIN_____]: "#f01700",
			[SHADOW___]: "#8c0000",
			[OUTLINE__]: "#450110",
		},
		offset: [1, 1],
	}, // Below
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#a8bf91",
			[MAIN_____]: "#7e7ab9",
			[SHADOW___]: "#414e7d",
			[OUTLINE__]: "#112d3f",
		},
		offset: [-1, -1],
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
		offset: [1, 1],
	}, // Below
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ff7e00",
			[MAIN_____]: "#f01700",
			[SHADOW___]: "#8c0000",
			[OUTLINE__]: "#450110",
		},
		offset: [-1, -1],
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
	}, // Below
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#8c0000",
			[MAIN_____]: "#8c0000",
			[SHADOW___]: "#8c0000",
			[OUTLINE__]: "#8c0000",
		},
		offset: [-1, 1],
	}, // Above
	{
		type: "basic",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#a8bf91",
			[SHADOW___]: "#526f4d",
			[OUTLINE__]: "#173e20",
		},
	}, // Above
]);

new Tier("Krumblor Aura", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#e9d673",
			[MAIN_____]: "#c39338",
			[SHADOW___]: "#834014",
			[OUTLINE__]: "#340c02",
			[OUTERLINE]: "#008595"
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

new Tier("Goal 1", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#ffffff",
			[MAIN_____]: "#c1a88c",
			[SHADOW___]: "#6e5755",
			[OUTLINE__]: "#341517",
			[OUTERLINE]: { path: "../tier/goal_outline.png" }
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
			[OUTERLINE]: { path: "../tier/goal2_outline.png" }
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
			[OUTERLINE]: "#f01700"
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
			[OUTERLINE]: "#dc4162"
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
			[OUTERLINE]: "#a000d5"
		},
	},
]);

new Tier("Kittenish", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: "#827de2",
			[MAIN_____]: "#716ccd",
			[SHADOW___]: "#4a4782",
			[OUTLINE__]: "#4a4782",
			[OUTERLINE]: { path: "../tier/kittenish_outline.png" }
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
			[OUTERLINE]: "#00deff"
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
			[OUTERLINE]: "#00deff"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
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
			[OUTERLINE]: "#ff0000"
		},
	},
]);

/*

*/
new Tier("Raingrid", [
	{
		type: "outline",
		palette: {
			[HIGHLIGHT]: { path : "../tier/raingrid/raingrid_middle.png" },
			[MAIN_____]: { path : "../tier/raingrid/raingrid_middle.png" },
			[SHADOW___]: { path : "../tier/raingrid/raingrid_middle.png" },
			[OUTLINE__]: { path : "../tier/raingrid/raingrid_outline.png" },
			[OUTERLINE]: { path : "../tier/iridyum_base.png" }
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
			[OUTERLINE]: "#00000000"
		},
	},
	// Execeptions :
	// Completely different sprite for Prism
]);