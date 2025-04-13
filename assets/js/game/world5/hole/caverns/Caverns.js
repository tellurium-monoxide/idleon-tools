import { BaseFeature } from "../../../BaseFeature.js";

import { ShallowCaverns } from "./shallow/ShallowCaverns.js";
import { UndergroundOvergrowth } from "./overgrowth/UndergroundOvergrowth.js";
import { GlowshroomTunnels } from "./glowshroom/GlowshroomTunnels.js";


export class Caverns extends BaseFeature {


    constructor(account) {
        super(account);


        this.child_features.push(new ShallowCaverns(account))
        this.child_features.push(new UndergroundOvergrowth(account))
        this.child_features.push(new GlowshroomTunnels(account))


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