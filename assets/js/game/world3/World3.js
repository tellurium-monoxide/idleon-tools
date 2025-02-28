import { BaseFeature } from "../BaseFeature.js";

import { Construction } from "./Construction.js";
import { Equinox } from "./Equinox.js";

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
    }
}