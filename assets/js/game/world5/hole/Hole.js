import { BaseFeature } from "../../BaseFeature.js";

import { Villagers } from "./villagers/Villagers.js";
import { Caverns } from "./caverns/Caverns.js";
export class Hole extends BaseFeature {


    constructor(account) {
        super(account);

        this.villagers = new Villagers(account)
        this.caverns = new Caverns(account)

        this.child_features.push(this.villagers)
        this.child_features.push(this.caverns)

        this.extraCalc = account.save_data["Holes"][11]
    }


    getExtraCalc(ind) {
        return this.extraCalc[ind]
    }

    getDisplay() {
        let display = document.createElement("table")
        let head = display.appendChild(document.createElement("tr"))
        let head1 = display.appendChild(document.createElement("th"))
        let head2 = display.appendChild(document.createElement("th"))
        head2.innerText = "Hole global options"
        for (let [ind, val] of this.extraCalc.entries()) {


            let row = display.appendChild(document.createElement("tr"))

            let elem = row.appendChild(document.createElement("td"))
            elem.innerText = `${DATA_EXTRA_INFO[ind][0]}`


            elem = row.appendChild(document.createElement("td"))
            elem.innerText = `${val}`

        }

        return display
    }
}

const DATA_EXTRA_INFO = [
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["Best_Dawg_Den_score",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["Best_Bravery_Monument_Round",],
    ["Best_Justice_Monument_Round",],
    ["Best_Wisdom_Monument_Round",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
    ["",],
]