import { BaseFeature } from "../BaseFeature.js";

export class Library extends BaseFeature {

    constructor(account) {
        super(account);
    }


    test() {

        console.log(this.getMinBookLevel())
        console.log(this.getMaxBookLevel())
    }

    getMinBookLevel() {
        let min = 100
        min += this.account.world3.atoms.getLevelByName("Oxygen") > 0 ? 30 : 0
        // what else ? merit I think
        return min
    }
    getMaxBookLevel() {
        let max = 125
        max += this.account.general.achievements.getAchievByName("Checkout_Takeout") ? 5 : 0
        max += this.account.general.merits.getMeritLevel(3, 3) * 2
        max += this.account.world3.salt_lick.getBonusByName("Spontaneity_Salts")
        max += this.account.world5.artifacts.getBonusByName("FURY_RELIC")
        max += this.account.world3.atoms.getLevelByName("Oxygen") > 0 ? 10 : 0

        // sommon guardian battle cyan 14, summon effect winzlantern, merit w6


        // + Math.round(10.5 * this.summon_battle_cyan14 * this.summon_bonus_mult)
        return max
    }


    getLibrarySpeed() {
        let speed = 4 * 3600
            / (1 + this.account.world3.atoms.getyByName("Oxygen"))
        //stamp
        // bubbles ignore...
        // vial chonker
        // buiding lvl
        // atom oxy
        // meal fortune cookie (and meal eff) and ribbons
        // lab ?
        // gaming: superbit, gaming lvl
        // pristine comb
        // achievs

        // this.lib_checkout_speed = 4 * 3600
        //     / (1 + 0.04 * this.meal_lvl_fortune_cookies * this.meal_efficiency * this.ribbon_mult_fortune_cookies)
        //     / (1 + this.atom_oxygen * 0.02)
        //     / (1
        //         + 0.05 * (this.building_library_lvl - 1)
        //         + this.bubble_ignore_overdues_bonus
        //         + this.vial_chonker_chug_bonus
        //         + this.stamp_biblio_bonus
        //         + this.superbit_library_checkouts * this.gaming_lvl * 0.01
        //         + 0.3 * this.achiev_checkout_takeout
        //     )
    }
}