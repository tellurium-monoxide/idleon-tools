
function getClassList(main_class) {
    let class_list = [main_class]
    let next_class = SUBCLASSES[main_class]
    while (next_class) {
        class_list.push(next_class)
        next_class = SUBCLASSES[next_class]
    }

    return class_list.reverse()
}

const CLASSES = {
    14: "Death_Bringer",
    10: "Blood_Berserker",
    22: "Siege_Breaker",
    34: "Elemental_Sorcerer",
    12: "Divine_Knight",
    25: "Beast_Master",
    36: "Bubonic_Conjuror",
    4: "Voidwalker",
}

const SUBCLASSES = {
    "Death_Bringer": "Blood_Berserker",
    "Blood_Berserker": "Barbarian",
    "Divine_Knight": "Squire",

    "Squire": "Warrior",
    "Barbarian": "Warrior",
    "Warrior": "Rage_Basics",

    "Siege_Breaker": "Bowman",
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


