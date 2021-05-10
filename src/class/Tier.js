export default class Tier {
	/** @type {Tier[]} */
	static tiers = [];

	/**
	 * @param {string} name
	 * @param {Action[]} actions
	 */
	constructor(name, actions) {
		this.name = name;
		this.actions = actions;

		Tier.tiers.push(this);
	}
}