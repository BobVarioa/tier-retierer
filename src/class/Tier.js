export default class Tier {
	/** @type {Tier[]} */
	static tiers = [];

	/**
	 * @param {string} name
	 * @param {{ type: string; }[] | ({ type: string; palette: { "#ffffff": string; "#66425b": string; "#45283c": string; "#392539": string; }; offset: number[]; } | { type: string; palette: { "#ffffff": string; "#66425b": string; "#45283c": string; "#392539": string; }; offset?: undefined; })[] | ({ type: string; palette: { "#ffffff": string; "#66425b": string; "#45283c": string; "#392539": string; "#b1739e": { path: string; }; }; blend?: undefined; path?: undefined; } | { type: string; blend: string; path: string; palette?: undefined; })[] | ({ type: string; palette: { "#ffffff": string; "#66425b": string; "#45283c": string; "#392539": string; "#b1739e": string; }; blend?: undefined; path?: undefined; } | { type: string; blend: string; path: string; palette?: undefined; })[] | ({ type: string; palette: { "#ffffff": { path: string; }; "#66425b": { path: string; }; "#45283c": { path: string; }; "#392539": { path: string; }; "#b1739e": { path: string; }; }; blend?: undefined; } | { type: string; blend: string; palette: { "#ffffff": string; "#66425b": string; "#45283c": string; "#392539": string; "#b1739e": string; }; })[]} actions
	 */
	constructor(name, actions) {
		this.name = name;
		this.actions = actions;

		Tier.tiers.push(this);
	}
}