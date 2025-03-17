import { BaseFeature } from "../../../BaseFeature.js";

import { holesInfo } from "../../../website-data.js";
export class Measurements extends BaseFeature {


    constructor(account) {
        super(account);
        let measurements = account.save_data["Holes"][22]

        this.measure_levels = []
        this.map_name_to_index = {}

        for (let [ind, measure] of DATA_MEASURES.entries()) {
            this.measure_levels.push(measurements[ind])
            this.map_name_to_index[measure[0]] = [ind]

        }


    }

    test() {

    }

    getBonusByName(name) {
        if (name in this.map_name_to_index) {
            let ind = this.map_name_to_index[name]
            return this.measure_levels[ind]
        }
        throw new Error(`${name} is not a valid measure`)
    }
    getBonusByIndex(index) {
        let lvl = this.measure_levels[index]
        let [name, grow, getter] = DATA_MEASURES[index]
        let base = calcGrowingValue(grow, lvl)

        let mult1 = 1 + 0.25 * this.account.world5.hole.villagers.conjuror.getLevelByName("LENGTHMEISTER")

        let mult2 = this.getMulti(index)

        return base * mult1 * mult2
    }

    getMulti(index) {
        let [name, grow, getter] = DATA_MEASURES[index]
        let score = getter(this.account)
        let mult = 1 + 0.18 * score + 0.08 * Math.max(0, score - 5)
        return mult
    }


    getDisplay() {
        let display = document.createElement("table")
        for (let [ind, measure] of DATA_MEASURES.entries()) {


            let row = display.appendChild(document.createElement("tr"))

            let elem = row.appendChild(document.createElement("td"))
            elem.innerText = `${measure[0]}`


            elem = row.appendChild(document.createElement("td"))
            let input_base = elem.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.value = this.measure_levels[ind]
            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change measure level", measure[0], this.measure_levels[ind], "to", Number(input_base.value))
                this.measure_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });


            elem = row.appendChild(document.createElement("td"))
            elem.innerText = formatPercent(this.getBonusByIndex(ind))
            elem = row.appendChild(document.createElement("td"))
            elem.innerText = (this.getMulti(ind))
        }

        return display

    }

}

const getter_skill_levels = (account) => {
    let lvl = account.characters.reduceOnChars((acc, char) => (acc + char.skill_levels.getTotalSkillLevels()), 0)
    return lvl / 5e3 + Math.max(0, lvl - 18e3) / 1500
}

const DATA_MEASURES = [
    ["INCHES", { type: "decay", x1: 0.45, x2: 100 }, (account) => { return account.world4.tome.getTotalScore() / 2500 }],
    ["METERS", { type: "add", x1: 0.02 }, getter_skill_levels],
    ["MILES", { type: "add", x1: 0.1 }, (account) => { return 0 }], // death note points / 125
    ["LITERS", { type: "add", x1: 0.06 }, (account) => { return 0 }], // slab items / 150
    ["YARDS", { type: "decay", x1: 0.8, x2: 100 }, (account) => { return 199 / 14 }], // crops /14
    ["PIXELS", { type: "add", x1: 0.11 }, (account) => { return 0 }], // lavalog(dmg) /2 (from task board)
    ["LEAGUES", { type: "add", x1: 0.13 }, (account) => { return account.characters.getTotalClassLevels() / 500 }],
    ["NANOMETERS", { type: "decay", x1: 0.6, x2: 100 }, (account) => { return 0 }],// slab items / 150
    ["SADNESS", { type: "add", x1: 0.3 }, (account) => { return account.world4.tome.getTotalScore() / 2500 }],
    ["FEET", { type: "decay", x1: 0.4, x2: 100 }, (account) => { return 0 }], // max(0,lavalog(golemkills)-2)
    ["BABABOOEY", { type: "add", x1: 0.1 }, (account) => { return 0 }], // studies /6
    ["KILLERMETERS", { type: "add", x1: 0.01 }, getter_skill_levels],
    ["JOULES", { type: "decay", x1: 0.3, x2: 100 }, (account) => { return account.characters.getTotalClassLevels() / 500 }],
    ["METERS2", { type: "decay", x1: 0.1, x2: 100 }, (account) => { return 0 }], // death note points / 125
    ["PIXELS2", { type: "add", x1: 0.18 }, (account) => { return 0 }], // lavalog(dmg) /2 (from task board)
    ["?", { type: "decay", x1: 0.5, x2: 100 }, (account) => { return 0 }],
]
