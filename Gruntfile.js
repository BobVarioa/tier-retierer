const jscc = require("jscc");
const path = require("path");

/**
 *
 * @param {import("grunt")} grunt
 */
module.exports = (grunt) => {
	/* eslint-disable import/no-dynamic-require*/
	require("load-grunt-tasks")(grunt);

	const platform = require(`./config/plat_${grunt.option("platform") || "electron"}.json`);
	const env = require(`./config/env_${grunt.option("env") || "development"}.json`);

	const jsccMix = {
		values: {
			_ENV: env,
			_PLATFORM: platform,
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
		jsxFactory: "h",
		jsxFragment: "Fragment",
		inject: ["./build/preact-shim.js"],
		loader: {
			".js": "jsx",
		},
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
		shell: {
			preunit: {
				command: "webpack --config=build/webpack.unit.config.js --env=test --display=none",
			},
			unit: {
				command: "electron-mocha temp/specs.js --renderer --require source-map-support/register",
			},
			pree2e: {
				command:
					"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",
			},
			e2e: {
				command: "mocha temp/e2e.js --require source-map-support/register",
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
			static: {
				inpaths: ["app/*.*"],
				out: "app",
				eatDir: "app",
				...jsccMix,
			},
		},
		esbuild: {
			main: {
				platform: "node",
				entryPoints: ["jscc_temp/src/background.js"],
				external: ["electron", "electron-unhandled", "fs-jetpack"],
				...esbuildMix,
			},
			renderer: {
				platform: "browser",
				entryPoints: ["jscc_temp/src/app.js"],
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

	grunt.registerTask("electron", "super simple", () => {
		// @ts-ignore
		require("child_process").spawn(require("electron"), ["."], { stdio: "inherit" });
	});

	grunt.registerTask("softstatic", ["copy:static", "jscc:static"]);
	grunt.registerTask("softbuild", ["jscc:dev", "softstatic", "esbuild:main", "esbuild:renderer"]);
	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("rbuild", ["softbuild", "clean:jscc_temp"]);
	grunt.registerTask("build", ["rbuild", "electron", "watch:dev"]);
	grunt.registerTask("unit", ["shell:preunit", "shell:unit"]);
	grunt.registerTask("e2e", ["shell:pree2e", "shell:e2e"]);
	grunt.registerTask("test", [
		/* "unit", "e2e"*/
	]);
};
