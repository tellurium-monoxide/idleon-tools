import { BaseFeature } from "../../../BaseFeature.js";

import { C1 } from "./C1.js";
export class Caverns extends BaseFeature {


    constructor(account) {
        super(account);

        this.c1 = new C1(account)
        this.child_features.push(this.c1)

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