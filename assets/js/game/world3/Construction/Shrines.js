import { BaseFeature } from "../../BaseFeature.js";

export class Shrines extends BaseFeature {

    constructor(account) {
        super(account);

        let shrine_data = account.save_data["Shrine"]
        delete account.save_data_pruned["Shrine"]

        this.shrine_levels = []
        this.map_name_to_index = {}
        for (const [ind, shrine] of DATA_SHRINES.entries()) {
            this.map_name_to_index[shrine[0]] = ind
            this.shrine_levels.push(shrine_data[ind][3])
        }

    }

    test() {
        console.log(this.getBonusByName("PANTHEON_SHRINE"))
    }

    getBonusByName(name) {
        for (let [ind, shrine] of DATA_SHRINES.entries()) {
            if (shrine[0].includes(name.toUpperCase())) {
                return (shrine[1][0] + (this.shrine_levels[ind] - 1) * shrine[1][1]) * 1.3 // TODO chaotic chizoar card bonus
            }

        }
        throw new Error(`${name} is not a valid atom name`)
    }


    getTotalLevels() {
        return this.shrine_levels.reduce((a, b) => (a + b), 0)
    }
    getDisplay() {
        let display = document.createElement("table")
        for (const [ind, shrine] of DATA_SHRINES.entries()) {

            let level = this.shrine_levels[ind]

            let name = shrine[0]
            let row = display.appendChild(document.createElement("tr"))

            let td = row.appendChild(document.createElement("td"))
            td.innerText = name


            td = row.appendChild(document.createElement("td"))

            let input_base = td.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.value = level

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change shrine level", name, this.shrine_levels[ind], "to", Number(input_base.value))
                this.shrine_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}

export const DATA_SHRINES = [
    ["WOODULAR_SHRINE", [0.12, 0.03]],
    ["ISACCIAN_SHRINE", [0.12, 0.03]],
    ["CRYSTAL_SHRINE", [0.2, 0.04]],
    ["PANTHEON_SHRINE", [0.1, 0.02]],
    ["CLOVER_SHRINE", [0.15, 0.03]],
    ["SUMMEREADING_SHRINE", [0.06, 0.01]],
    ["CRESCENT_SHRINE", [0.5, 0.075]],
    ["UNDEAD_SHRINE", [0.05, 0.01]],
    ["PRIMORDIAL_SHRINE", [0.01, 0.001]],
];
