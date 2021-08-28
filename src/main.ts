import fs from "fs";
import { print } from "./app";

import "./tiers";
import Tier from "./class/Tier";
import { Action } from "./types";

const levels: Record<string, Action[]> = {};
for (const { name, actions } of Tier.tiers) {
	levels[name] = actions;
}

console.time("Program");
print({
	options: {
		size: [24, 24],
		order: "template-(\\d*?)\\.png$",
	},
	files: {
		templates: "./templates/",
		out: "./out/",
	},
	templates: {
		plain: [0, 0],
		basic: [1, 0],
		sparkles: [2, 0],
		drip: [3, 0],
		outline: [4, 0],
		sprkoutline: [5, 0],
		trophy: [6, 0],
		dripoutline: [3, 0],
	},
	levels,
}).then((config) => {
	fs.writeFileSync("./out/tierlist.json", JSON.stringify(config));
	console.timeEnd("Program");
});
