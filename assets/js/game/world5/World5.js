import { BaseFeature } from "../BaseFeature.js";
import { Artifacts } from "./Artifacts.js";
import { Hole } from "./hole/Hole.js";
export class World5 extends BaseFeature {

    artifacts;
    gaming;
    divinity;
    slab;
    hole;
    constructor(account) {
        super(account);

        this.artifacts = new Artifacts(account)
        this.hole = new Hole(account)

        this.child_features.push(this.hole)
        this.child_features.push(this.artifacts)
    }
}