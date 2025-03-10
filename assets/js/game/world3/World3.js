import { BaseFeature } from "../BaseFeature.js";

import { Construction } from "./Construction.js";
import { Equinox } from "./Equinox.js";
import { SaltLick } from "./SaltLick.js";
import { Refinery } from "./refinery.js";
export class World3 extends BaseFeature {

    construction;
    equinox;
    printer;
    salt_lick;
    death_note;
    atoms;
    refinery;
    constructor(account) {
        super(account);
        this.construction = new Construction(account);
        this.equinox = new Equinox(account);
        this.salt_lick = new SaltLick(account);
        this.refinery = new Refinery(account);

        this.child_features.push(this.construction)
        this.child_features.push(this.equinox)
        this.child_features.push(this.salt_lick)
        this.child_features.push(this.refinery)
    }


}