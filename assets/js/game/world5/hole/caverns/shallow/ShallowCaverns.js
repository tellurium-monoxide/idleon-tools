import { BaseFeature } from "../../../../BaseFeature.js";

import { Well } from "./Well.js";
import { Motherlode } from "./Motherlode.js";
import { DawgDen } from "./DawgDen.js";
import { Bravery } from "./Bravery.js";
import { Bell } from "./Bell.js";

export class ShallowCaverns extends BaseFeature {


    constructor(account) {
        super(account);

        this.well = new Well(account)
        this.motherlode = new Motherlode(account)
        this.dawgden = new DawgDen(account)
        this.bravery = new Bravery(account)
        this.bell = new Bell(account)

        this.child_features.push(this.well)
        this.child_features.push(this.motherlode)
        this.child_features.push(this.dawgden)
        this.child_features.push(this.bravery)
        this.child_features.push(this.bell)
    }

}