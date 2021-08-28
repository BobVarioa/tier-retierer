import { Action } from "../types";

export default class Tier {
	static tiers: Tier[] = [];

	constructor(public name: string, public actions: Action[]) {
		Tier.tiers.push(this);
	}
}
