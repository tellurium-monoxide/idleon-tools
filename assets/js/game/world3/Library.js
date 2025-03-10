import { BaseFeature } from "../BaseFeature.js";

export class Library extends BaseFeature {

    constructor(account) {
        super(account);
    }


    test() {

        console.log("min", this.getMinBookLevel())
        console.log("max", this.getMaxBookLevel())
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
        max += Math.round(this.account.world6.summoning.battles.getBonusByStat("LIBRARY_MAX"))




        return max
    }


    getTimeToNextCheckout(current_books = 0) {

        let base_time = 4 * 3600
        let mult1 = 1 // (1 + 0.04 * this.meal_lvl_fortune_cookies * this.meal_efficiency * this.ribbon_mult_fortune_cookies)
        let mult2 = (1 + this.account.world3.atoms.getBonusByName("Oxygen"))
        let mult3 = 1
            + 0.05 * (this.account.world3.construction.getBuildingLevel("Library") - 1)
            + this.account.world2.alchemy.vials.getBonusByName("CHONKER_CHUG")
            + this.account.general.achievements.getAchievByName("Checkout_Takeout") ? 0.3 : 0
        //         + this.bubble_ignore_overdues_bonus
        //         + this.stamp_biblio_bonus
        //         + this.superbit_library_checkouts * this.gaming_lvl * 0.01

        // stamp
        // bubbles 
        // meal fortune cookie (and meal eff) and ribbons
        // gaming: superbit, gaming lvl
        let time = base_time * mult1 * mult2 * mult3
        return Math.round(time * (1 + 0.1 * Math.pow(current_books, 1.4)));

    }
    getTimeToCheckout(goal, current_books = 0) {
        let time = 0
        for (let books = current_books; books < goal; books++) {
            time += this.getTimeToNextCheckout(books)
        }
        return time
    }
}