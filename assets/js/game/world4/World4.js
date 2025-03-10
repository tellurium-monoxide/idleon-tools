import { BaseFeature } from "../BaseFeature.js";

import { Breeding } from "./breeding/Breeding.js";
import { Tome } from "./Tome.js";
export class World4 extends BaseFeature {

    cooking;
    breeding;
    laboratory;
    rift;
    tome;
    constructor(account) {
        super(account);
        this.breeding = new Breeding(account)
        this.tome = new Tome(account)

        this.child_features.push(this.breeding)
        this.child_features.push(this.tome)
    }
}