import { render } from "preact";
import App from "./components/App";

export default class Hello {
	static Init () {
		console.log("Hello, world!");
		// Make sure to wait for the dom to load
		window.addEventListener("load", () => {
			render(<App />, document.getElementById("main"));
		});
	}

	static EnterDev () {
		console.log("Hello, development!");
	}
}