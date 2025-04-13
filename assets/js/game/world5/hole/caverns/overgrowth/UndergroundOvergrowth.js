import { BaseFeature } from "../../../../BaseFeature.js";

import { Jar } from "./Jar.js";
import { Evertree } from "./Evertree.js";
import { Wisdom } from "./Wisdom.js";
import { Gambit } from "./Gambit.js";
import { Temple } from "./Temple.js";
export class UndergroundOvergrowth extends BaseFeature {


    constructor(account) {
        super(account);

        this.jar = new Jar(account)
        this.evertree = new Evertree(account)
        this.wisdom = new Wisdom(account)
        this.gambit = new Gambit(account)
        this.temple = new Temple(account)
        this.child_features.push(this.jar)
        this.child_features.push(this.evertree)
        this.child_features.push(this.wisdom)
        this.child_features.push(this.gambit)
        this.child_features.push(this.temple)

    }

}