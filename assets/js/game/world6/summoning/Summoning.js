import { BaseFeature } from "../../BaseFeature.js";

import { Battles } from "./Battles.js";

import { DATA_SUMMON_BONUSES } from "./Battles.js";
export class Summoning extends BaseFeature {

    battles;
    constructor(account) {
        super(account);

        this.battles = new Battles(account)

        this.child_features.push(this.battles)

    }

    getDisplay() {

        let display = document.createElement("table")
        display.classList.add("outlined")

        let row = display.appendChild(document.createElement("tr"))

        for (let [ind, bonus] of DATA_SUMMON_BONUSES.entries()) {
            if (ind % 4 == 0) {
                row = display.appendChild(document.createElement("tr"))
            }

            let elem = row.appendChild(document.createElement("td"))


            let bonus_value = this.battles.getBonusByStat(bonus)
            let bonus_text = ""
            if (bonus.startsWith("<X")) {
                bonus_value += 1
                bonus_text = bonus.replace("<X", `x${bonus_value.toFixed(2)}`)
            } else if (bonus.startsWith("+{%")) {
                bonus_text = bonus.replace("+{%", `+${(100 * bonus_value).toFixed(2)} %`)

            } else {
                bonus_text = bonus.replace("+{", `+${bonus_value.toFixed(2)}`)
            }






            elem.innerText = bonus_text
        }
        return display

    }
}