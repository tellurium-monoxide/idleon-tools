import { BaseFeature } from "../BaseFeature.js";
export class Statues extends BaseFeature {

    constructor(account) {
        super(account);

        let statue_data = account.save_data["StatueLevels_0"]
        let statue_states = account.save_data["StuG"]
        delete account.save_data_pruned["StuG"]

        console.log(statue_data)

        this.statues = []
        this.map_name_to_index = {}
        for (let [ind, st] of DATA_STATUES.entries()) {
            this.statues.push({
                lvl: statue_data[ind][0],
                progress: statue_data[ind][1],
                gold: (statue_states[ind] >= 1),
                onyx: (statue_states[ind] >= 2),
            })

            this.map_name_to_index[st[0]] = ind
        }

    }

    getTotalLevels() {
        return this.statues.reduce((acc, st) => (acc + st.lvl), 0)
    }
    getTotalOnyx() {
        return this.statues.reduce((acc, st) => (acc + st.onyx), 0)
    }

    getDisplay() {
        let display = document.createElement("table")
        let row = display.appendChild(document.createElement("tr"))
        row.appendChild(document.createElement("th")).innerText = "Statue"
        row.appendChild(document.createElement("th")).innerText = "Lvl"
        row.appendChild(document.createElement("th")).innerText = "Gold"
        row.appendChild(document.createElement("th")).innerText = "Onyx"

        for (let [ind, st] of Object.entries(DATA_STATUES)) {
            let lvl = this.statues[ind].lvl
            let name = st[0]
            row = display.appendChild(document.createElement("tr"))

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = name


            let td = row.appendChild(document.createElement("td"))

            let input_base = td.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.value = lvl

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change statue lvl", name, this.statues[ind].lvl, "to", Number(input_base.value))
                this.statues[ind].lvl = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
            td = row.appendChild(document.createElement("td"))
            let check_gold = td.appendChild(document.createElement("input"))
            check_gold.type = "checkbox"
            check_gold.checked = this.statues[ind].gold

            check_gold.addEventListener("input", (event) => {
                console.log("change statue gold", name, this.statues[ind].gold, "to", (check_gold.checked))
                this.statues[ind].gold = (check_gold.checked)
                this.account.setModifiedFromSaveData()
            });
            td = row.appendChild(document.createElement("td"))
            let check_onyx = td.appendChild(document.createElement("input"))
            check_onyx.type = "checkbox"
            check_onyx.checked = this.statues[ind].onyx

            check_onyx.addEventListener("input", (event) => {
                console.log("change statue onyx", name, this.statues[ind].onyx, "to", (check_onyx.checked))
                this.statues[ind].onyx = (check_onyx.checked)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}
// name, effect, bonusPerLvl, ?? (maybe cost to gold?)
export const DATA_STATUES = [
    ["POWER", "@BASE_DAMAGE", 3, 30],
    ["SPEED", "%@MOVE_SPEED", 0.1, 65],
    ["MINING", "@MINING_POWER", 0.3, 280],
    ["FEASTY", "%@FOOD_EFFECT", 1, 320],
    ["HEALTH", "@BASE_HEALTH", 3, 0],
    ["KACHOW", "%@CRIT_DAMAGE", 0.4, -15],
    ["LUMBERBOB", "@CHOPPIN_POWER", 0.3, 90],
    ["THICC_SKIN", "@BASE_DEFENCE", 1, 210],
    ["OCEANMAN", "@FISHING_POWER", 0.3, 115],
    ["OL_RELIABLE", "@CATCHIN_POWER", 0.3, 45],
    ["EXP", "%@CLASS_EXP", 0.1, 0],
    ["ANVIL", "%@PRODUCT_SPD", 0.5, 165],
    ["CAULDRON", "%@ALCHEMY_EXP", 0.5, 280],
    ["BEHOLDER", "%@CRIT_CHANCE", 0.2, 300],
    ["BULLSEYE", "%@ACCURACY", 0.8, 110],
    ["BOX", "@TRAPPIN_POWER", 0.3, 180],
    ["TWOSOUL", "@WORSHIP_POWER", 0.3, 260],
    ["EHEXPEE", "%@SKILL_EXP", 0.1, 69],
    ["SEESAW", "%@CONS_EXP", 0.5, 13],
    ["PECUNIA", "%@COINS", 1, 50],
    ["MUTTON", "%@COOKING_EXP", 0.3, 0],
    ["EGG", "%@BREEDING_EXP", 0.4, 25],
    ["BATTLEAXE", "%@DAMAGE", 0.2, 300],
    ["SPIRAL", "%@DIVINITY_EXP", 1, 70],
    ["BOAT", "%@SAILING_SPD", 0.5, 210],
    ["COMPOST", "%@FARMING_EXP", 0.4, 75],
    ["STEALTH", "%@STEALTH", 0.3, 185],
    ["ESSENCE", "%@WHITE_ESS", 0.6, 160],
    ["VILLAGER", "%@VILLAGER_EXP", 0.3, 120],
    ["DRAGON", "%@STATUES_BONUS", 0.2, 270],
]
