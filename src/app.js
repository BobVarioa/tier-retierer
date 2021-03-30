// Renderer Process
import Main from "./main/main";

// #if _ENV.normalName === "development"
import "preact/debug";
// #endif

try {
	Main.Init();
	if ($_ENV.name === "development") Main.EnterDev();
} catch (e) {
	console.log(e);
}
