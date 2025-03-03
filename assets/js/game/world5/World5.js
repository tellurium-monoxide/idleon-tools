import { BaseFeature } from "../BaseFeature.js";
import { Artifacts } from "./Artifacts.js";
export class World5 extends BaseFeature {

    artifacts;
    gaming;
    divinity;
    slab;
    caverns;
    constructor(account) {
        super(account);

        this.artifacts = new Artifacts(account)

        this.child_features.push(this.artifacts)
    }
}