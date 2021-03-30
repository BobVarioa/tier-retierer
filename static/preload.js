/* eslint-disable import/no-extraneous-dependencies */
const { shell, contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("utils", {
	setDisk: async (data) => {
		ipcRenderer.send("setDisk", data);
	},
	getDisk: (data) => {
		return ipcRenderer.sendSync("getDisk");
	},
	openExternal: (href) => {
		if (typeof href === "undefined" || href === "") return;
		if (href.startsWith("https://") || href.startsWith("http://")) shell.openExternal(href);
	}
});
