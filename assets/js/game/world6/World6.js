import { BaseFeature } from "../BaseFeature.js";

import { Summoning } from "./summoning/Summoning.js";
export class World6 extends BaseFeature {

    farming;
    sneaking;
    summoning;

    beanstalk;

    constructor(account) {
        super(account);

        this.summoning = new Summoning(account)

        this.child_features.push(this.summoning)
    }
}