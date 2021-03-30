/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import url from "url";
import { app, Menu, ipcMain } from "electron";
import unhandled from "electron-unhandled";
import jetpack from "fs-jetpack";
import createWindow from "./helpers/window";

unhandled();

/*
// This is commented out as it throws an error if there are no published versions.
if ($_ENV.name === "production")) {
	const FOUR_HOURS = 1000 * 60 * 60 * 4;
	setInterval(() => {
		autoUpdater.checkForUpdates();
	}, FOUR_HOURS);
	autoUpdater.checkForUpdates();
}
*/

if ($_ENV.name !== "production") app.setPath("userData", `${app.getPath("userData")} (${$_ENV.name})`);

/**
 * @type {Electron.BrowserWindow}
 */
let mainWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) app.quit();
else {
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		// Someone tried to run a second instance, we should focus our window.
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	// Create mainWindow, load the rest of the app, etc...
	app.on("ready", () => {
		Menu.setApplicationMenu(null);

		mainWindow = createWindow("main", {
			width: 1000,
			height: 600,
			webPreferences: {
				preload: path.join(__dirname, "./preload.js"),
				nativeWindowOpen: true,
			},
		});

		mainWindow.loadURL(
			url.format({
				pathname: path.join(__dirname, "./app.html"),
				protocol: "file:",
				slashes: true,
			})
		);

		mainWindow.webContents.on("before-input-event", (event, input) => {
			if (input.control && input.shift && input.key.toLowerCase() === "i") mainWindow.webContents.openDevTools();
			if (input.control && input.key.toLowerCase() === "r") mainWindow.webContents.reload();
		});

		if ($_ENV.name === "development") mainWindow.webContents.openDevTools();
	});

	app.on("window-all-closed", () => {
		app.quit();
	});

	ipcMain.on("setDisk", (_, data) => {
		// Make sure your filenames/filepaths are never user controlled, and be very wary when it comes to user controlled data sent into the file
		jetpack.cwd(app.getPath("userData")).write("./saves/save.txt", data);
	});

	ipcMain.on("getDisk", (e) => {
		e.returnValue = "This could be some important disk info";
	});
}
