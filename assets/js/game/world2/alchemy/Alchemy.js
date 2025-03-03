import { BaseFeature } from "../../BaseFeature.js";
import { Vials } from "./Vials.js";
import { Sigils } from "./Sigils.js";
export class Alchemy extends BaseFeature {
    vials;
    sigils;
    constructor(account) {
        super(account);
        this.vials = new Vials(account)
        this.sigils = new Sigils(account)

        this.child_features.push(this.vials)
        this.child_features.push(this.sigils)
        // this.child_features.push(this.bribes)
    }


}