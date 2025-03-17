import { BaseFeature } from "../../BaseFeature.js";

import { Villagers } from "./villagers/Villagers.js";
import { Caverns } from "./caverns/Caverns.js";
export class Hole extends BaseFeature {


    constructor(account) {
        super(account);

        this.villagers = new Villagers(account)
        this.caverns = new Caverns(account)

        this.child_features.push(this.villagers)
        this.child_features.push(this.caverns)
    }

}