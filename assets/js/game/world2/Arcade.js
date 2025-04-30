import { BaseFeature } from "../BaseFeature.js";


export class Arcade extends BaseFeature {

    constructor(account) {
        super(account);

        this.arcade_levels = (account.save_data["ArcadeUpg"])
        delete account.save_data_pruned["ArcadeUpg"]
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

        let mult = ((level == 101) ? 2 : 1)
        mult *= (this.account.world1.companions.has("REINDEER") ? 2 : 1)
        return value * mult
    }

    getBonusByStat(stat) {
        let value = 0
        for (let [index, bonus] of DATA_ARCADE.entries()) {
            if (bonus[0].includes(stat.toUpperCase())) {
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
        for (let [ind, upg] of Object.entries(DATA_ARCADE)) {
            let lvl = this.arcade_levels[ind]
            let stat = upg[0]
            let row = display.appendChild(document.createElement("tr"))

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = `${stat}`


            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.max = 101
            input_base.value = lvl

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", stat, this.arcade_levels[ind], "to", Number(input_base.value))
                this.arcade_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });


            let bonus_cell = row.appendChild(document.createElement("td"))
            if (stat.startsWith("%")) {
                bonus_cell.innerText = `${formatPercent(this.getBonusByIndex(ind))}`
            } else {
                bonus_cell.innerText = `${(this.getBonusByIndex(ind))}`
            }
        }

        return display
    }


}

export const DATA_ARCADE = [
    ["BASE_DAMAGE", { "type": "add", "x1": 1 }],
    ["BASE_DEFENCE", { "type": "add", "x1": 0.2 }],
    ["%_TOTAL_ACCURACY", { "type": "decay", "x1": 0.6, "x2": 100 }],
    ["%_MINING_EXP_GAIN", { "type": "decay", "x1": 0.6, "x2": 100 }],
    ["%_FISHING_EXP_GAIN", { "type": "decay", "x1": 0.6, "x2": 100 }],
    ["%_SAMPLE_SIZE", { "type": "decay", "x1": 0.04, "x2": 100 }],
    ["%_AFK_GAINS_RATE", { "type": "decay", "x1": 0.04, "x2": 100 }],
    ["CAP_FOR_ALL_LIQUIDS", { "type": "decay", "x1": 25, "x2": 100 }],
    ["%_MULTIKILL_PER_TIER", { "type": "decay", "x1": 0.1, "x2": 100 }],
    ["%_CATCHING_EXP_GAIN", { "type": "decay", "x1": 0.5, "x2": 100 }],
    ["%_CASH_FROM_MOBS", { "type": "decay", "x1": 0.2, "x2": 100 }],
    ["%_CASH_FROM_MOBS", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_CLASS_EXP_GAIN", { "type": "decay", "x1": 0.2, "x2": 100 }],
    ["%_SHINY_CHANCE", { "type": "decay", "x1": 1, "x2": 100 }],
    ["%_TRAPPING_EXP", { "type": "decay", "x1": 0.5, "x2": 100 }],
    ["STARTING_TD_PTS", { "type": "add", "x1": 1 }],
    ["TAB_1_TALENT_PT", { "type": "intervalAdd", "x1": 1, "x2": 10 }],
    ["WEAPON_POWER", { "type": "add", "x1": 0.07 }],
    ["%_SKILL_EXP_GAIN", { "type": "decay", "x1": 0.2, "x2": 100 }],
    ["BASE_STR", { "type": "add", "x1": 1 }],
    ["BASE_AGI", { "type": "add", "x1": 1 }],
    ["BASE_WIS", { "type": "add", "x1": 1 }],
    ["BASE_LUK", { "type": "add", "x1": 1 }],
    ["%_TRAPPING_CRITTERS", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_WORSHIP_SOULS", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_REFINERY_SPEED", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_FORGE_CAPACITY", { "type": "decay", "x1": 1, "x2": 100 }],
    ["%_DROP_RATE", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_COOKING_SPEED", { "type": "decay", "x1": 0.4, "x2": 100 }],
    ["%_LAB_EXP_GAIN", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_BREED_PET_DMG", { "type": "decay", "x1": 0.4, "x2": 100 }],
    ["%_NUGGET_REGEN", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_ARTI_FIND", { "type": "decay", "x1": 0.5, "x2": 100 }],
    ["%_SAILING_LOOT", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_W_ESS_GAIN", { "type": "decay", "x1": 0.4, "x2": 100 }],
    ["%_JADE_GAIN", { "type": "decay", "x1": 0.5, "x2": 100 }],
    ["%_FARMING_EXP", { "type": "decay", "x1": 0.3, "x2": 100 }],
    ["%_DIVINITY_EXP", { "type": "decay", "x1": 0.4, "x2": 100 }],
    ["%_VILLAGER_XP_MULTI", { "type": "decay", "x1": 0.4, "x2": 100 }],
    ["%_GOLD_BALL_GAIN", { "type": "add", "x1": 0.01 }],
    ["%_DEATHBRINGER_BONES", { "type": "add", "x1": 0.01 }],
    ["%_EQUINOX_FILL_RATE", { "type": "add", "x1": 0.0075 }],
    ["%_MONUMENT_AFK", { "type": "add", "x1": 0.005 }],
    ["%_SIGIL_SPEED", { "type": "add", "x1": 0.01 }],
    ["%_CONSTRUCTION_BUILD", { "type": "add", "x1": 0.02 }],
    ["%_BURGER", { "type": "add", "x1": 0.01 }],
    ["%_TOTAL_DAMAGE", { "type": "add", "x1": 0.02 }],
    ["%_WINDWALKER_DUST", { "type": "add", "x1": 0.01 }],
    ["%_MEDALLION_CHANCE", { "type": "add", "x1": 0.005 }],
    ["%_BREEDABILITY_RATE", { "type": "add", "x1": 0.01 }],
];