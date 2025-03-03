import { BaseFeature } from "../BaseFeature.js";

export class SaltLick extends BaseFeature {

    constructor(account) {
        super(account);

        let salt_lick_data = account.save_data["SaltLick"]


        this.data = DATA_SALT_LICK

        for (let [ind, upg] of this.data.entries()) {
            this.data[ind].level = salt_lick_data[ind]
        }


        // console.log(this.data)
    }

    test() {

        console.log("refinery speed bonus in %:", this.getBonusByName("Explosive_Salts"))
    }

    getBonusByName(name) {
        for (let [ind, upg] of this.data.entries()) {
            if (upg.name.includes(name)) {
                return upg.level * upg.baseBonus
            }
        }

        throw new Error(`${name} not found as a salt lick upgrade`);
    }
}



export const DATA_SALT_LICK = [{ "name": "Redox_Salts", "baseCost": 5, "increment": 1.5, "baseBonus": 0.5, "maxLevel": 20 }, { "name": "Froge", "baseCost": 100, "increment": 1.92, "baseBonus": 1, "maxLevel": 8 }, { "name": "Explosive_Salts", "baseCost": 5, "increment": 1.15, "baseBonus": 2, "maxLevel": 100 }, { "name": "Dune_Soul", "baseCost": 250, "increment": 1.079, "baseBonus": 0.2, "maxLevel": 100 }, { "name": "Spontaneity_Salts", "baseCost": 5, "increment": 2.2, "baseBonus": 2, "maxLevel": 10 }, { "name": "Mousey", "baseCost": 100, "increment": 1.122, "baseBonus": 1, "maxLevel": 100 }, { "name": "Dioxide_Synthesis", "baseCost": 5, "increment": 2, "baseBonus": 5, "maxLevel": 10 }, { "name": "Frigid_Soul", "baseCost": 100, "increment": 1.15, "baseBonus": 0.4, "maxLevel": 25 }, { "name": "Purple_Salt", "baseCost": 5, "increment": 2.2, "baseBonus": 3, "maxLevel": 10 }, { "name": "Pingy", "baseCost": 250, "increment": 1.04, "baseBonus": 0.1, "maxLevel": 250 }];