const jscc = require("jscc");
const path = require("path");

/**
 *
 * @param {import("grunt")} grunt
 */
module.exports = (grunt) => {
	/* eslint-disable import/no-dynamic-require*/
	require("load-grunt-tasks")(grunt);

	const env = require(`./config/env_${grunt.option("env") || "development"}.json`);

	const jsccMix = {
		values: {
			_ENV: env,
		},
		sourceMap: false,
	};

	/**
	 * @type {import("esbuild").BuildOptions}
	 */
	const esbuildMix = {
		bundle: true,
		outdir: "app",
		outbase: "jscc_temp/src",
		sourcemap: true,
		minify: env.normalName !== "development",
		external: ["canvas"],
		target: "node12.9",
	};
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			dev: {
				files: ["src/**/*.js", "static/**/*"],
				tasks: ["softbuild", "clean:jscc_temp"],
				options: {
					debounceDelay: 700,
				},
			},
		},
		eslint: {
			options: {
				fix: true,
			},
			target: ["src/**/*.js"],
		},
		jscc: {
			dev: {
				inpaths: [env === "test" ? "src/**/*.spec.js" : "src/**/*!(.spec).js"],
				out: "jscc_temp",
				...jsccMix,
			},
		},
		esbuild: {
			main: {
				platform: "node",
				entryPoints: ["jscc_temp/src/main.js"],
				...esbuildMix,
			},
		},
		copy: {
			static: {
				expand: true,
				cwd: "static",
				src: "**",
				dest: "app/",
			},
		},
		clean: {
			jscc_temp: ["jscc_temp/**/*"],
		},
	});

	grunt.registerMultiTask("esbuild", function arrow() {
		const done = this.async();
		require("esbuild")
			.build(this.data)
			.then(() => {
				done();
			})
			.catch(() => {
				done(false);
			});
	});

	grunt.registerMultiTask("jscc", "JSCC as a grunt plugin", function arrow() {
		const { out, inpaths, eatDir } = this.data;
		let success = true;
		grunt.file
			.expand(inpaths)
			.filter((v) => {
				return grunt.file.isFile(v);
			})
			.forEach((file) => {
				try {
					const result = jscc(grunt.file.read(file), file, this.data);
					const writePath = `./${out}/${
						typeof eatDir === "undefined" ? file : file.replace(`${eatDir}/`, "")
					}`;
					grunt.file.write(path.resolve(__dirname, writePath), result.code);
				} catch (e) {
					grunt.log.writeln(`Failed on file: ${file}, with ${e}`);
					success = false;
				}
			});
		return success;
	});

	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("build", ["jscc:dev", "esbuild:main", "clean:jscc_temp"]);
	grunt.registerTask("test", [
		/* "unit", "e2e"*/
	]);
};
