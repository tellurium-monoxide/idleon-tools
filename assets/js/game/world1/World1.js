import { BaseFeature } from "../BaseFeature.js";

import { Stamps } from "./Stamps.js";
import { Bribes } from "./Bribes.js";
import { Statues } from "./Statues.js";
import { Companions } from "./Companions.js";
import { StarSigns } from "./StarSigns.js";
import { Orion } from "./Orion.js";

export class World1 extends BaseFeature {
    stamps;
    bribes;
    statues;
    constructor(account) {
        super(account);
        this.stamps = new Stamps(account);
        this.bribes = new Bribes(account);
        this.statues = new Statues(account);

        this.child_features.push(this.stamps)
        this.child_features.push(this.bribes)
        this.child_features.push(this.statues)
    }
}