import { BaseFeature } from "../../../BaseFeature.js";

import { Well } from "./Well.js";
import { Motherlode } from "./Motherlode.js";
import { DawgDen } from "./DawgDen.js";
import { Bravery } from "./Bravery.js";
import { Bell } from "./Bell.js";

import { Harp } from "./Harp.js";
import { Lamp } from "./Lamp.js";
import { Hive } from "./Hive.js";
import { Grotto } from "./Grotto.js";
import { Justice } from "./Justice.js";

import { Jar } from "./Jar.js";
import { Evertree } from "./Evertree.js";
import { Wisdom } from "./Wisdom.js";
import { Gambit } from "./Gambit.js";
import { Temple } from "./Temple.js";

export class Caverns extends BaseFeature {


    constructor(account) {
        super(account);

        this.well = new Well(account)
        this.motherlode = new Motherlode(account)
        this.dawgden = new DawgDen(account)
        this.bravery = new Bravery(account)
        this.bell = new Bell(account)
        this.harp = new Harp(account)
        this.lamp = new Lamp(account)
        this.hive = new Hive(account)
        this.grotto = new Grotto(account)
        this.justice = new Justice(account)
        this.jar = new Jar(account)
        this.evertree = new Evertree(account)
        this.wisdom = new Wisdom(account)
        this.gambit = new Gambit(account)
        this.temple = new Temple(account)
        this.child_features.push(this.well)
        this.child_features.push(this.motherlode)
        this.child_features.push(this.dawgden)
        this.child_features.push(this.bravery)
        this.child_features.push(this.bell)
        this.child_features.push(this.harp)
        this.child_features.push(this.lamp)
        this.child_features.push(this.hive)
        this.child_features.push(this.grotto)
        this.child_features.push(this.justice)
        this.child_features.push(this.jar)
        this.child_features.push(this.evertree)
        this.child_features.push(this.wisdom)
        this.child_features.push(this.gambit)
        this.child_features.push(this.temple)

        let opals_per_caverns = account.save_data["Holes"][7]
        this.opals = opals_per_caverns.reduce((acc, v) => (acc + v), 0)
    }


    getTotalOpals() {
        // TODO grimoire
        let samurai_opals = 25 * this.account.world1.companions.has("SAMURAI_GUARDIAN")
        let gem_shop_opals = this.account.general.p2w.gemshop.getLevelPurchased("OPAL")
        let grimoire_opals = this.account.general.grimoire.getLevelByName("PURE_OPALS")
        return (this.opals + samurai_opals + gem_shop_opals + grimoire_opals)
    }
}