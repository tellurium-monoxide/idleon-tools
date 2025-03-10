import { BaseFeature } from "../../../BaseFeature.js";
import { DATA_CAULDRONS } from "./Cauldrons.js";

export class CauldronTemplate extends BaseFeature {

    constructor(account, cauldron_name, cauldron_save_data) {
        super(account);

        this.cauldron_name = cauldron_name

        this.bubble_levels = []
        this.map_name_to_index = {}
        for (let [ind, bubble] of DATA_CAULDRONS[this.cauldron_name].entries()) {

            this.bubble_levels.push(cauldron_save_data[ind])
            this.map_name_to_index[bubble[0]] = ind
        }
    }

    getDisplay() {
        let table = document.createElement("table")
        table.classList.add("outlined")
        let row = table.appendChild(document.createElement("tr"))
        row.appendChild(document.createElement("th")).innerText = "Bubble"
        row.appendChild(document.createElement("th")).innerText = "Lvl"
        for (let [ind, bubble] of DATA_CAULDRONS[this.cauldron_name].entries()) {
            let [name, grow, itemReq] = bubble

            let lvl = this.bubble_levels[ind]


            row = table.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = name

            let td = row.appendChild(document.createElement("td"))
            let input_level = td.appendChild(document.createElement("input"))
            input_level.type = "number"
            input_level.min = 0
            input_level.value = lvl
            new InputSpinner(input_level)
            input_level.addEventListener("input", (event) => {
                console.log("change bubble", name, "level", this.bubble_levels[ind], "to", Number(input_level.value))
                this.bubble_levels[ind] = Number(input_level.value)
                this.account.setModifiedFromSaveData()
            });

        }

        return table
    }

    getFeatureName() {
        return this.cauldron_name
    }

}