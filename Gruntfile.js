
/**
 *
 * @param {import("grunt")} grunt
 */
module.exports = (grunt) => {
	require("@masterofbob777/grunt-config")(grunt, {
		indir: "src",
		outdir: "app",
		typescript: true,
		entry: "main",
		external: ["canvas"],
		target: "node12.9",
	})
};
