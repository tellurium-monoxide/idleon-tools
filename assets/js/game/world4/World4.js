import { BaseFeature } from "../BaseFeature.js";

import { Cooking } from "./cooking/Cooking.js";
import { Breeding } from "./breeding/Breeding.js";
import { Tome } from "./Tome.js";
import { Rift } from "./Rift.js";
export class World4 extends BaseFeature {

    cooking;
    breeding;
    laboratory;
    rift;
    tome;
    constructor(account) {
        super(account);
        this.cooking = new Cooking(account)
        this.breeding = new Breeding(account)
        this.tome = new Tome(account)
        this.rift = new Rift(account)

        this.child_features.push(this.cooking)
        this.child_features.push(this.breeding)
        this.child_features.push(this.tome)
        this.child_features.push(this.rift)
    }
}