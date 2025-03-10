import { BaseFeature } from "../../BaseFeature.js";
import { Vials } from "./Vials.js";
import { Sigils } from "./Sigils.js";
import { Cauldrons } from "./bubbles/Cauldrons.js";
export class Alchemy extends BaseFeature {
    vials;
    sigils;
    cauldrons;
    constructor(account) {
        super(account);
        this.cauldrons = new Cauldrons(account)
        this.vials = new Vials(account)
        this.sigils = new Sigils(account)

        this.child_features.push(this.cauldrons)
        this.child_features.push(this.vials)
        this.child_features.push(this.sigils)
        // this.child_features.push(this.bribes)
    }


}