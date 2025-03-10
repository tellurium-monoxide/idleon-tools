import { BaseFeature } from "../BaseFeature.js";

export class Artifacts extends BaseFeature {


    constructor(account) {
        super(account);


        let arti_data = account.save_data["Sailing"][3]
        // console.log(arti_data)

        this.arti_levels = []
        this.map_name_to_ind = {}
        for (let [ind, arti] of DATA_ARTIFACTS.entries()) {
            this.arti_levels.push(arti_data[ind])
            this.map_name_to_ind[arti[0]] = ind
        }

    }

    test() {

        console.log("CHILLED_YARN:", this.getBonusByName("CHILLED_YARN"))

    }

    getBonusByName(name) {
        let ind = this.map_name_to_ind[name]
        if (ind) {
            let level = this.arti_levels[ind]
            let base = (level > 0) ? DATA_ARTIFACTS[ind][1][level - 1] : 0
            return base

        } else {
            throw new Error(`${name} is not a valid sigil name`);
        }
    }

    getTotal() {
        let total = 0
        for (let lvl of this.arti_levels) {
            total += lvl
        }
        return total
    }

    getDisplay() {
        let display = document.createElement("table")
        for (let [name, ind] of Object.entries(this.map_name_to_ind)) {
            let row = document.createElement("tr")
            display.appendChild(row)
            let name_cell = document.createElement("td")
            name_cell.innerText = `${name}`
            row.appendChild(name_cell)

            let input_cell = document.createElement("td")
            row.appendChild(input_cell)
            let input_base = document.createElement("input")
            input_base.type = "number"
            input_base.min = 0
            input_base.max = 4
            input_base.value = this.arti_levels[ind]
            input_cell.appendChild(input_base)
            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", name, this.arti_levels[ind], "to", Number(input_base.value))
                this.arti_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}

export const DATA_ARTIFACTS = [
    ["MOAI_HEAD", [1, 100, 200, 300]], // first is bool, then %
    ["MANEKI_KAT", [2, 4, 6, 8]],
    ["RUBLE_CUBLE", [1, 2, 3, 4]],
    ["FAUXORY_TUSK", [1, 2, 3, 4]],
    ["GOLD_RELIC", [[2, 40], [2.5, 60], [3, 80], [5, 80]]], // % per day and max days
    ["GENIE_LAMP", [2, 4, 6, 8]],
    ["SILVER_ANKH", [1, 25, 50, 75]], // first is bool, then %
    ["EMERALD_RELIC", [1, 1.3, 1.6, 0.9]],
    ["FUN_HIPPOETE", [6, 12, 18, 24]],
    ["ARROWHEAD", [1, 1.25, 1.5, 1.7]],
    ["10_AD_TABLET", [4, 8, 12, 16]],
    ["ASHEN_URN", [200, 400, 600, 800]],
    ["AMBERITE", [1, 2, 3, 4]],
    ["TRIAGULON", [15, 30, 45, 60]],
    ["BILLCYE_TRI", [1, 25, 50, 75]], // first is bool, then %
    ["FROST_RELIC", [30, 60, 90, 120]],
    ["CHILLED_YARN", [1, 2, 3, 4]],
    ["CAUSTICOLUMN", [10, 20, 30, 40]],
    ["JADE_ROCK", [3, 6, 9, 12]],
    ["DREAMCATCHER", [2, 4, 6, 8]],
    ["GUMMY_ORB", [15, 30, 45, 60]],
    ["FURY_RELIC", [25, 50, 75, 100]],
    ["CLOUD_URN", [1, 25, 50, 75]], // first is bool, then %
    ["WEATHERBOOK", [10, 20, 30, 40]],
    ["GIANTS_EYE", [25, 50, 75, 100]],
    ["CRYSTAL_STEAK", [2, 4, 6, 8]],
    ["TRILOBITE_ROCK", [25, 50, 75, 100]],
    ["OPERA_MASK", [1, 2, 3, 4]],
    ["SOCRATES", [10, 20, 30, 40]], // %
    ["THE_TRUE_LANTERN", [15, 30, 45, 60]], // %
    ["THE_ONYX_LANTERN", [2.3, 2.6, 2.9, 3.2]], // multi
    ["THE_SHIM_LANTERN", [2, 3, 4, 5]], // multi
    ["THE_WINZ_LANTERN", [0.25, 0.5, 0.75, 1]]] // multi - 1 because additive with others
