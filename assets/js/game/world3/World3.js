import { BaseFeature } from "../BaseFeature.js";

import { Construction } from "./Construction/Construction.js";
import { Equinox } from "./Equinox.js";
import { SaltLick } from "./SaltLick.js";
import { Refinery } from "./refinery.js";
import { Library } from "./Library.js";
import { Atoms } from "./Atoms.js";
import { Worship } from "./Worship.js";
export class World3 extends BaseFeature {

    construction;
    salt_lick;
    refinery;
    library;
    atoms;

    equinox;
    printer;
    death_note;
    constructor(account) {
        super(account);
        this.construction = new Construction(account);
        this.salt_lick = new SaltLick(account);
        this.refinery = new Refinery(account);
        this.library = new Library(account);
        this.atoms = new Atoms(account);
        this.worship = new Worship(account);

        this.child_features.push(this.construction)
        this.child_features.push(this.salt_lick)
        this.child_features.push(this.refinery)
        this.child_features.push(this.atoms)
        this.child_features.push(this.worship)
    }


}