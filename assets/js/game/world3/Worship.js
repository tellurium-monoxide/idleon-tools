
import { BaseFeature } from "../BaseFeature.js";

export class Worship extends BaseFeature {

    constructor(account) {
        super(account);

        let td_data = account.save_data["TotemInfo"]
        delete account.save_data_pruned["TotemInfo"]

        this.td_lvls = td_data[0].slice(0, 7)



        // console.log(this.data)
    }

    getTotalTDWaves() {
        return this.td_lvls.reduce((acc, v) => (acc + v), 0)
    }


    getDisplay() {
        let display = document.createElement("table")
        for (let [ind, td_name] of DATA_TD.entries()) {
            let lvl = this.td_lvls[ind]

            let row = display.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = `${td_name}`



            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.value = lvl

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", stat, this.td_lvls[ind], "to", Number(input_base.value))
                this.td_lvls[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}

const DATA_TD = [
    "GOBLIN_GORFEST ",
    "WAKAWAKA_WAR ",
    "ACORN_ASSAULT",
    "FROSTY_FIREFIGHT ",
    "CLASH_OF_CANS ",
    "CITRIC_CONFLICT ",
    "BREEZY_BATTLE ",
]