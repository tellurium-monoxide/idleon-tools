import { BaseFeature } from "../BaseFeature.js";



export class SkillLevels extends BaseFeature {



    constructor(account, char_index, char_props) {
        super(account);
        this.char_index = char_index

        this.skill_levels = char_props["Lv0"].slice(1, 19)
        delete char_props["Lv0"]
    }


    getLevel(name) {
        let ind = DATA_SKILLS.findIndex(name.toUpperCase())
        if (ind > 0) {
            return this.skill_levels[ind]
        }
        else {
            throw new Error(`${name} is not a valid skill name`)
        }
    }
    getTotalSkillLevels() {
        return this.skill_levels.reduce((a, b) => (a + b), 0)
    }
    getDisplay() {
        let display = document.createElement("table")

        for (let [ind, skill] of DATA_SKILLS.entries()) {
            let level = this.skill_levels[ind]

            let row = display.appendChild(document.createElement("tr"))

            let td = row.appendChild(document.createElement("td"))
            td.innerText = skill

            td = row.appendChild(document.createElement("td"))
            let input = td.appendChild(document.createElement("input"))

            input.type = "number"
            input.min = 0
            input.value = level
            new InputSpinner(input)
            input.addEventListener("input", (event) => {
                console.log("change char", this.char_index, "skill level", skill, this.skill_levels[ind], "to", Number(input.value))
                this.skill_levels[ind] = Number(input.value)
                this.account.setModifiedFromSaveData()
            });
        }
        return display
    }
}

export const DATA_SKILLS = [
    "MINING",
    "SMITHING",
    "CHOPPING",
    "FISHING",
    "ALCHEMY",
    "CATCHING",
    "TRAPPING",
    "CONSTRUCTION",
    "WORSHIP",
    "COOKING",
    "BREEDING",
    "LABORATORY",
    "SAILING",
    "DIVINITY",
    "GAMING",
    "FARMING",
    "SNEAKING",
    "SUMMONING",
]