/**
 *
 * @param {import("grunt")} grunt
 */
module.exports = (grunt) => {
	require("@masterofbob777/grunt-config")(grunt, {
		options: {
			typescript: true,
			external: ["canvas"],
		},
		general: {
			indir: "src",
			outdir: "app",
			entry: "main",
		},
	});
};
