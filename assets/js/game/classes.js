
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
    10: "Blood_Berserker",
    22: "Siege_Breaker",
    34: "Elemental_Sorcerer",
    12: "Divine_Knight",
    25: "Beast_Master",
    36: "Bubonic_Conjuror",
    4: "Voidwalker",

}

const SUBCLASSES = {
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


const CLASS_ICONS = {
    "Blood_Berserker": "https://idleon.wiki/wiki/images/d/d2/Blood_Berserker_Class_Icon.png",
    "Divine_Knight": "https://idleon.wiki/wiki/images/1/16/Divine_Knight_Class_Icon.png",

    "Squire": "https://idleon.wiki/wiki/images/5/55/Squire_Class_Icon.png",
    "Barbarian": "https://idleon.wiki/wiki/images/a/a8/Barbarian_Class_Icon.png",
    "Warrior": "https://idleon.wiki/wiki/images/e/ea/Warrior_Class_Icon.png",
    "Rage_Basics": "https://idleon.wiki/wiki/images/0/0f/Beginner_Class_Icon.png",

    "Siege_Breaker": "https://idleon.wiki/wiki/images/a/ab/Siege_Breaker_Class_Icon.png",
    "Beast_Master": "https://idleon.wiki/wiki/images/6/64/Beast_Master_Class_Icon.png",

    "Bowman": "https://idleon.wiki/wiki/images/8/87/Bowman_Class_Icon.png",
    "Hunter": "https://idleon.wiki/wiki/images/a/ab/Hunter_Class_Icon.png",
    "Archer": "https://idleon.wiki/wiki/images/b/b6/Archer_Class_Icon.png",
    "Calm_Basics": "https://idleon.wiki/wiki/images/0/0f/Beginner_Class_Icon.png",

    "Elemental_Sorcerer": "https://idleon.wiki/wiki/images/7/75/Elemental_Sorcerer_Class_Icon.png",
    "Bubonic_Conjuror": "https://idleon.wiki/wiki/images/b/b3/Bubonic_Conjuror_Class_Icon.png",

    "Shaman": "https://idleon.wiki/wiki/images/b/b4/Shaman_Class_Icon.png",
    "Wizard": "https://idleon.wiki/wiki/images/f/f9/Wizard_Class_Icon.png",
    "Mage": "https://idleon.wiki/wiki/images/5/5e/Mage_Class_Icon.png",
    "Savvy_Basics": "https://idleon.wiki/wiki/images/0/0f/Beginner_Class_Icon.png",

    "Voidwalker": "https://idleon.wiki/wiki/images/2/21/Voidwalker_Class_Icon.png",
    "Maestro": "https://idleon.wiki/wiki/images/6/63/Maestro_Class_Icon.png",
    "Journeyman": "https://idleon.wiki/wiki/images/7/7e/Journeyman_Class_Icon.png",
    "Beginner": "https://idleon.wiki/wiki/images/0/0f/Beginner_Class_Icon.png",

}
