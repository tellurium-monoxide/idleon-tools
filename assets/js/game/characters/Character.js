import { BaseFeature } from "../BaseFeature.js";

import { Talents } from "./Talents.js";
import { SkillLevels } from "./SkillLevels.js";

import { CarryCap } from "./CarryCap.js";
export class Character extends BaseFeature {
    char_name;
    index;
    class_name;
    class_level;
    talents;
    skill_levels;
    constructor(account, index) {
        super(account);

        let char_names = account.save_data[`playerNames`]
        this.index = index
        this.char_name = char_names[index]
        this.props = {}

        for (let [prop_name, prop] of Object.entries(account.save_data)) {

            if (prop_name.endsWith(`_${this.index}`)) {
                let base_name = prop_name.replace(`_${this.index}`, "")
                this.props[base_name] = prop
                delete account.save_data_pruned[prop_name]
            }
        }
        // delete useless props
        delete this.props["StatueLevels"] // because global feature, won't bother to take all chars into account
        delete this.props["AtkCD"]
        delete this.props["AttackLoadout"]
        delete this.props["AttackLoadoutpre"]
        delete this.props["LockedSlots"]
        delete this.props["PVMinigamePlays"]
        delete this.props["PVInstaRevives"]
        delete this.props["PVGender"]
        delete this.props["QuestHm"]

        // init class values
        this.class_name = DATA_CLASSES[this.props["CharacterClass"]]
        delete this.props["CharacterClass"]

        this.class_level = this.props["Lv0"][0]

        // init these last because they may delete props
        this.talents = new Talents(account, this)
        this.child_features.push(this.talents)

        this.skill_levels = new SkillLevels(account, this)
        this.child_features.push(this.skill_levels)

        this.carry_cap = new CarryCap(account, this)
        this.child_features.push(this.carry_cap)
    }

    test(collapsed = true) {
        console.log("Char index:", this.index)
        console.log(this.props)
        super.test(collapsed)
    }
    getFeatureName() {
        return this.char_name
    }
    getDisplay() {
        let display = document.createElement("div")
        let tbl = document.createElement("table")
        display.appendChild(tbl)
        let row = document.createElement("tr")
        tbl.appendChild(row)
        let cell_class_title = document.createElement("td")
        cell_class_title.innerText = `Class`
        row.appendChild(cell_class_title)

        let cell_class = document.createElement("td")
        cell_class.innerText = `${this.class_name}`
        row.appendChild(cell_class)

        row = document.createElement("tr")
        tbl.appendChild(row)
        let cell_class_lv = document.createElement("td")
        cell_class_lv.innerText = `Class level`
        row.appendChild(cell_class_lv)

        let cell_class_lv_cal = document.createElement("td")
        cell_class_lv_cal.innerText = `${this.class_level}`
        row.appendChild(cell_class_lv_cal)

        return display
    }
}


export function getClassList(main_class) {
    let class_list = [main_class]
    let next_class = DATA_SUBCLASSES[main_class]
    while (next_class) {
        class_list.push(next_class)
        next_class = DATA_SUBCLASSES[next_class]
    }

    return class_list.reverse()
}

// TODO missing classes
const DATA_CLASSES = {
    1: "Beginner",
    2: "Journeyman",
    3: "Maestro",
    4: "Voidwalker",
    5: "Infinilyte",

    6: "Rage_Basics",
    7: "Warrior",
    8: "Barbarian",
    9: "Squire",
    10: "Blood_Berserker",
    12: "Divine_Knight",
    14: "Death_Bringer",

    18: "Calm_Basics",
    19: "Archer",
    20: "Bowman",
    21: "Hunter",
    22: "Siege_Breaker",
    25: "Beast_Master",
    29: "Wind_Walker",

    30: "Savvy_Basics",
    31: "Mage",
    32: "Wizard",
    33: "Shaman",
    34: "Elemental_Sorcerer",
    36: "Bubonic_Conjuror",
}

const DATA_SUBCLASSES = {
    "Death_Bringer": "Blood_Berserker",
    "Blood_Berserker": "Barbarian",
    "Divine_Knight": "Squire",

    "Squire": "Warrior",
    "Barbarian": "Warrior",
    "Warrior": "Rage_Basics",

    "Siege_Breaker": "Bowman",
    "Wind_Walker": "Beast_Master",
    "Beast_Master": "Hunter",

    "Bowman": "Archer",
    "Hunter": "Archer",
    "Archer": "Calm_Basics",

    "Elemental_Sorcerer": "Wizard",
    "Bubonic_Conjuror": "Shaman",

    "Shaman": "Mage",
    "Wizard": "Mage",
    "Mage": "Savvy_Basics",

    "Voidwalker": "Maestro",
    "Maestro": "Journeyman",
    "Journeyman": "Beginner",

}


