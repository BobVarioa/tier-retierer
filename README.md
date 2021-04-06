# Tier Retierer
## Quick start

Make sure you have [Node.js](https://nodejs.org) installed, then type the following commands...
```
git clone https://github.com/MasterOfBob777/tier-retierer.git
cd simple-electron-template
npm i
npm start
```
...and the project should now run! The output files will now be in the `out` directory.

You may or may not need to also run the following command if you don't have the grunt cli already installed.
```
npm i grunt-cli -g
```

## Structure of the project

The application consists of two main folders...

`src` - files within this folder get transpiled or compiled (because Electron can't use them directly).

`static` - contains all static assets which don't need any pre-processing: images, CSSes, HTMLs, etc. 

The build process compiles the content of the `src` and `static` folder and puts it into the `app` folder, so after the build has finished, your `app` folder contains the full, runnable application.

Treat `src` and `static` folders like two halves of one bigger thing.

## Development

### Starting the app

```
npm start
```

### The build pipeline

Build process uses [esbuild](https://esbuild.github.io/) and [jscc](https://github.com/aMarCruz/jscc). The entry-points are `src/background.js` and `src/app.js`. Esbuild will follow all `import` statements starting from those files and compile code of the whole dependency tree into one `.js` file for each entry point.

Though the project does uses esbuild and jscc, the project uses [Grunt](https://gruntjs.com/) as a task runner, so all you have to do to build the project is just a simple `grunt build`. If you are building for a specific platform or just are building for production be sure to make use of the `--env="enviroment"` and the `--platform="platform"` flags.

### Environments

Environmental variables are done in a bit different way (not via `process.env`). Env files are plain JSONs in `config` directory, and build process dynamically links one of them to the the `$_ENV` varible. You can use it wherever you need access to the environment. There is also a `$_PLATFORM` varible that reflects the current platform. These varibles are resolved during compile time so they are much more powerful compared to a simple `process.env`.

```js
if ($_ENV.name === "development")
	console.log("I'm in development!")

// We're in $_ENV.name!
// --> We're in development!

//#if false
	console.log("This will never show up!")
//#elif _ENV.normalName === "development"
	console.log("This will only show up during development!")
//#else 
	console.log("and this is a catch all!")
//#endif
```

Jscc, the program used to achieve this functionality, is also language agnostic, so this pattern can be used almost everywhere that has comments. Though this is very useful there is a few caveats to keep in mind.

```html
<div>
	<!--Notice the slashes below they are quite important as this tells jscc to stop looking for additional info-->
	<!--#if true //-->
	<!--Wowie! This works here too! -->
	<!--#endif //-->
</div>
```

```css
div {
	/*#if true //*/
	--console-log: "Here as well!"
	/*#endif //*/
}
```

```js
// Keep in mind that jscc does not recoginize you are in a template string here so be wary when it comes to language specific patterns.
const code = `
//#if false
// This will still be removed
"This will never show up!"
//#endif
`
```

## Making a release

To package your app into an installer use command:
```
npm run release
```

Once the packaging process finished, the `dist` directory will contain your distributable file.

We use [electron-builder](https://github.com/electron-userland/electron-builder) to handle the packaging process. It has a lot of [customization options](https://www.electron.build/configuration/configuration), which you can declare under `"build"` key in `package.json`.