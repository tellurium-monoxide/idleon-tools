import { BaseFeature } from "../BaseFeature.js";


export class Arcade extends BaseFeature {

    constructor(account) {
        super(account);

        this.arcade_levels = (account.save_data["ArcadeUpg"])

    }

    test() {

        console.log(this.getBonusByIndex(18))
        console.log(this.getBonusByStat("Cash_from_Mobs"))
        console.log(this.getBonusByStat("Refinery_Speed"))

    }

    getBonusByIndex(index) {
        let bonus = DATA_ARCADE[index]
        let level = this.arcade_levels[index]
        let value = calcGrowingValue(bonus[1], Math.min(level, 100))

        return value * ((level == 101) ? 2 : 1)
    }

    getBonusByStat(stat) {
        let value = 0
        for (let [index, bonus] of DATA_ARCADE.entries()) {
            if (bonus[0].includes(stat)) {
                value += this.getBonusByIndex(index)
            }

        }
        return value

    }

    getTotalGoldBallsLevels() {
        let total = 0
        for (let [ind, lvl] of this.arcade_levels.entries()) {
            total += lvl
        }
        return total
    }

    getDisplay() {
        let display = document.createElement("table")
        for (let [ind, lvl] of Object.entries(this.arcade_levels)) {
            let stat = DATA_ARCADE[ind][0]
            let row = document.createElement("tr")
            display.appendChild(row)
            let name_cell = document.createElement("td")
            name_cell.innerText = `${stat}`
            row.appendChild(name_cell)

            let input_cell = document.createElement("td")
            row.appendChild(input_cell)
            let input_base = document.createElement("input")
            input_base.type = "number"
            input_base.min = 0
            input_base.max = 101
            input_base.value = this.arcade_levels[ind]
            input_cell.appendChild(input_base)
            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", stat, this.arcade_levels[ind], "to", Number(input_base.value))
                this.arcade_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }


}

export const DATA_ARCADE = [["Base_Damage", { "type": "add", "x1": 1 }], ["Base_Defence", { "type": "add", "x1": 0.2 }], ["%_Total_Accuracy", { "type": "decay", "x1": 60, "x2": 100 }], ["%_Mining_EXP_gain", { "type": "decay", "x1": 60, "x2": 100 }], ["%_Fishing_EXP_gain", { "type": "decay", "x1": 60, "x2": 100 }], ["%_Sample_Size", { "type": "decay", "x1": 4, "x2": 100 }], ["%_AFK_Gains_Rate", { "type": "decay", "x1": 4, "x2": 100 }], ["Cap_for_all_Liquids", { "type": "decay", "x1": 25, "x2": 100 }], ["%_Multikill_per_Tier", { "type": "decay", "x1": 10, "x2": 100 }], ["%_Catching_EXP_gain", { "type": "decay", "x1": 50, "x2": 100 }], ["%_Cash_from_Mobs", { "type": "decay", "x1": 20, "x2": 100 }], ["%_Cash_from_Mobs", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Class_EXP_gain", { "type": "decay", "x1": 20, "x2": 100 }], ["%_Shiny_Chance", { "type": "decay", "x1": 100, "x2": 100 }], ["%_Trapping_EXP", { "type": "decay", "x1": 50, "x2": 100 }], ["Starting_TD_Pts", { "type": "add", "x1": 1 }], ["Tab_1_Talent_Pt", { "type": "intervalAdd", "x1": 1, "x2": 10 }], ["Weapon_Power", { "type": "add", "x1": 0.07 }], ["%_Skill_EXP_gain", { "type": "decay", "x1": 20, "x2": 100 }], ["Base_STR", { "type": "add", "x1": 1 }], ["Base_AGI", { "type": "add", "x1": 1 }], ["Base_WIS", { "type": "add", "x1": 1 }], ["Base_LUK", { "type": "add", "x1": 1 }], ["%_Trapping_Critters", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Worship_Souls", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Refinery_Speed", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Forge_Capacity", { "type": "decay", "x1": 100, "x2": 100 }], ["%_Drop_Rate", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Cooking_Speed", { "type": "decay", "x1": 40, "x2": 100 }], ["%_Lab_EXP_gain", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Breed_Pet_DMG", { "type": "decay", "x1": 40, "x2": 100 }], ["%_Nugget_Regen", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Arti_Find", { "type": "decay", "x1": 50, "x2": 100 }], ["%_Sailing_Loot", { "type": "decay", "x1": 30, "x2": 100 }], ["%_W_Ess_gain", { "type": "decay", "x1": 40, "x2": 100 }], ["%_Jade_gain", { "type": "decay", "x1": 50, "x2": 100 }], ["%_Farming_EXP", { "type": "decay", "x1": 30, "x2": 100 }], ["%_Divinity_EXP", { "type": "decay", "x1": 40, "x2": 100 }], ["%_Villager_XP_multi", { "type": "decay", "x1": 40, "x2": 100 }], ["%_Gold_Ball_Gain", { "type": "add", "x1": 1 }]];