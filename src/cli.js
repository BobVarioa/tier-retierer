#! /usr/bin/env node

throw new Error("Not Implemented")
/*
import yargs from "yargs";
import { print } from "./app";

const usage = "\nUsage: retier <input.json>";
const options = yargs
	.usage(usage)
	.option("o", {
		alias: "outdir",
		describe: "The output directory.",
		type: "string",
		demandOption: false,
	})
	.option("j", {
		alias: "json",
		describe: "Generate json?",
		type: "boolean",
		demandOption: false,
	})
	.option("t", {
		alias: "templates",
		describe: "The template directory to read from.",
		type: "string",
		demandOption: false,
	})
	.option("options", {
		describe: "Read options from the json file specified.",
		type: "string",
		demandOption: false,
	})
	.help(true).argv;

	
(async () => {
	const {
		_: [input],
		o: outdir,
		j: genjson,
		t: templateDir,
		options: optionsFile,
	} = await options;
	print({
		files: [],
		levels: {},
		templates: {}
	});
})()
*/