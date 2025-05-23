import { BaseCharFeature } from "./BaseCharFeature.js";


import { getClassList } from "./Character.js";

// this class describes the talents of a single character, each character will have one
export class Talents extends BaseCharFeature {

    constructor(account, character) {
        super(account, character);

        this.class_name = character.class_name
        this.talent_levels = character.props["SL"]
        // this.talent_preset_levels = char_props["SLpre"] // maybe not useful
        this.talent_max_levels = character.props["SM"]

        delete character.props["SL"];
        delete character.props["SLpre"];
        delete character.props["SM"];

        this.talent_pages = getClassList(this.class_name)

        this.talent_pages.push("SPECIAL_TALENT_1")
        this.talent_pages.push("SPECIAL_TALENT_2")
        this.talent_pages.push("SPECIAL_TALENT_3")
        this.talent_pages.push("SPECIAL_TALENT_4")

    }

    test() {
        console.log(this.getTalentBonusByName("HEALTH_BOOSTER"))
        console.log(this.getTalentBonusByName("EXTRA_BAGS"))
        console.log(this.getAdditionalTalentLevels())
    }


    getTalentBonusByName(talent_name) {

        for (let [subclass, talents] of Object.entries(DATA_TALENTS)) {
            for (let talent_data of talents) {

                if (talent_data[0] == talent_name) {
                    let [name, pi, [grow1, grow2]] = talent_data
                    let cur_lvl = this.talent_levels[pi] || 0 // TODO: take additional levels into account

                    if (cur_lvl > 0 && !(DATA_TALENT_NO_ADDITIONNAL_LVLS.includes(talent_name)) && !(subclass.startsWith("SPECIAL_TALENT"))) {
                        cur_lvl += this.getAdditionalTalentLevels()
                    }
                    let val = calcGrowingValue(grow1, cur_lvl)
                    return val
                } else {
                }
            }
        }
        // if talent not found in all subclasses
        throw new Error(`${talent_name} is invalid for class ${this.class_name}`)

    }

    getAdditionalTalentLevels() {
        let lvl = 0
        lvl += 25 * this.account.world1.companions.has("RIFT_SLUG")
        lvl += 1 * this.account.general.taskboard.achievements.has("Maroon_Warship")
        lvl += this.getTalentBonusByName("SYMBOLS_OF_BEYOND_~R")
        lvl += this.getTalentBonusByName("SYMBOLS_OF_BEYOND_~G")
        lvl += this.getTalentBonusByName("SYMBOLS_OF_BEYOND_~P")

        lvl += this.account.world3.equinox.getLevel("EQUINOX_SYMBOLS")

        // TODO
        // ES family
        // arctis
        // sneak mastery

        return lvl

    }
    // for tome
    fillUniqueTalentMaxLvl(data) {

        for (let [ind, subclass] of this.talent_pages.entries()) {
            for (let [ind, talent_data] of DATA_TALENTS[subclass].entries()) {
                let [name, pi, [grow1, grow2]] = talent_data
                let max_lvl = this.talent_max_levels[pi] || 0
                data[name] = Math.max(data[name] || 0, max_lvl)
            }
        }
    }

    getDisplay() {


        let class_list = getClassList(this.class_name)

        let tab = document.createElement("div")
        tab.classList.add("jquery-tab")
        let header = document.createElement("ul")
        tab.appendChild(header)

        for (let [ind, subclass] of this.talent_pages.entries()) {
            let li = document.createElement("li")
            let a = document.createElement("a")
            let ref = `tab_char${this.char_index}_${subclass}`
            a.href = `#${ref}`
            a.innerHTML = `${subclass}`
            li.appendChild(a)
            header.appendChild(li)

            let tab_content = document.createElement("div")
            tab_content.id = ref
            tab.appendChild(tab_content)

            let talent_table = document.createElement("table")
            talent_table.classList.add("outlined")
            tab_content.appendChild(talent_table)
            let row = talent_table.appendChild(document.createElement("tr"))

            for (let [ind, talent] of DATA_TALENTS[subclass].entries()) {
                if (ind % 5 == 0) {
                    row = talent_table.appendChild(document.createElement("tr"))
                }
                let elem = row.appendChild(document.createElement("td"))


                let [name, pi, _] = talent
                let cur_lvl = this.talent_levels[pi] || 0
                let max_lvl = this.talent_max_levels[pi] || 0
                elem.innerHTML = `<div>${name}<br>${cur_lvl}/${max_lvl}</div>`
            }



        }

        // TODO: add star talents

        return tab

    }

}
// TODO : convert from percent
const DATA_TALENTS = {
    "Beginner": [
        ["HEALTH_BOOSTER", 0, [{ "type": "add", "x1": 1 }]],
        ["MANA_BOOSTER", 1, [{ "type": "add", "x1": 1 }]],
        ["STAR_PLAYER", 8, [{ "type": "add", "x1": 1 }]],
        ["BUCKLERED_UP", 9, [{ "type": "decay", "x1": 40, "x2": 60 }]],
        ["SHARPENED_AXE", 5, [{ "type": "add", "x1": 0.25 }]],
        ["FIST_OF_RAGE", 10, [{ "type": "add", "x1": 1 }]],
        ["QUICKNESS_BOOTS", 11, [{ "type": "add", "x1": 1 }]],
        ["BOOK_OF_THE_WISE", 12, [{ "type": "add", "x1": 1 }]],
        ["LUCKY_CLOVER", 13, [{ "type": "add", "x1": 1 }]],
        ["GILDED_SWORD", 6, [{ "type": "add", "x1": 1 }]],
        ["HAPPY_DUDE", 75, [{ "type": "add", "x1": 1 }]],
        ["KNUCKLEBUSTER", 76, [{ "type": "decay", "x1": 30, "x2": 50 }]],
        ["FEATHER_FLIGHT", 77, [{ "type": "decay", "x1": 20, "x2": 50 }]],
        ["EXTRA_BAGS", 78, [{ "type": "decay", "x1": 2, "x2": 100 }]],
        ["SLEEPIN'_ON_THE_JOB", 79, [{ "type": "decay", "x1": 21, "x2": 50 }]]
    ],
    "Journeyman": [
        ["INDIANA_ATTACK", 15, [{ "type": "bigBase", "x1": 50, "x2": 1 }, { "type": "intervalAdd", "x1": 3, "x2": 30 }]],
        ["BREAKIN'_THE_BANK", 16, [{ "type": "decayMulti", "x1": 0.6, "x2": 100 }]],
        ["SUPERNOVA_PLAYER", 17, [{ "type": "add", "x1": 1 }]],
        ["TWO_PUNCH_MAN", 18, [{ "type": "add", "x1": 0.6 }, { "type": "intervalAdd", "x1": 25, "x2": 3 }]],
        ["GIMME_GIMME", 19, [{ "type": "decay", "x1": 80, "x2": 60 }, { "type": "intervalAdd", "x1": 3, "x2": 20 }]],
        ["LUCKY_HIT", 20, [{ "type": "add", "x1": 0.4 }]],
        ["F'LUK'EY_FABRICS", 21, [{ "type": "decay", "x1": 220, "x2": 250 }]],
        ["CHACHING!", 22, [{ "type": "decay", "x1": 50, "x2": 100 }]],
        ["LUCKY_HORSESHOE", 23, [{ "type": "add", "x1": 1 }]],
        ["CURSE_OF_MR_LOOTY_BOOTY", 24, [{ "type": "decay", "x1": 70, "x2": 100 }, { "type": "decay", "x1": 120, "x2": 100 }]],
        ["ITS_YOUR_BIRTHDAY!", 25, [{ "type": "decay", "x1": 35, "x2": 50 }]],
        ["CMON_OUT_CRYSTALS", 26, [{ "type": "decay", "x1": 300, "x2": 100 }]],
        ["REROLL_PLS", 27, [{ "type": "decay", "x1": 36, "x2": 60 }]],
        ["CARDS_GALORE", 28, [{ "type": "decay", "x1": 50, "x2": 100 }]],
        ["RARES_EVERYWHERE!", 29, [{ "type": "decay", "x1": 30, "x2": 80 }]]
    ],
    "Maestro": [
        ["COIN_TOSS", 30, [{ "type": "bigBase", "x1": 100, "x2": 1 }]],
        ["SKILLAGE_DAMAGE", 31, [{ "type": "decay", "x1": 50, "x2": 50 }]],
        ["PRINTER_GO_BRRR", 32, [{ "type": "intervalAdd", "x1": 1, "x2": 40 }, { "type": "decay", "x1": 95, "x2": 60 }]],
        ["TRIPLE_JAB", 33, [{ "type": "intervalAdd", "x1": 20, "x2": 4 }, { "type": "add", "x1": 0.5, "x2": 0 }]],
        ["ONE_STEP_AHEAD", 34, [{ "type": "add", "x1": 1 }]],
        ["LUCKY_CHARMS", 35, [{ "type": "add", "x1": 1 }]],
        ["CLEVER_CLOVER_OBOLS", 36, [{ "type": "decay", "x1": 60, "x2": 50 }]],
        ["SKILLIEST_STATUE", 37, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["BLISS_N_CHIPS", 38, [{ "type": "add", "x1": 2 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["COLLOQUIAL_CONTAINERS", 39, [{ "type": "add", "x1": 1 }]],
        ["MAESTRO_TRANSFUSION", 40, [{ "type": "add", "x1": 2.5 }, { "type": "decay", "x1": 120, "x2": 100 }]],
        ["CRYSTAL_COUNTDOWN", 41, [{ "type": "decay", "x1": 99, "x2": 72 }, { "type": "add", "x1": 10, "x2": 1 }]],
        ["LEFT_HAND_OF_LEARNING", 42, [{ "type": "decay", "x1": 200, "x2": 100 }]],
        ["RIGHT_HAND_OF_ACTION", 43, [{ "type": "decay", "x1": 150, "x2": 100 }]],
        ["JMAN_WAS_BETTER", 44, [{ "type": "add", "x1": 1 }]]
    ],
    "Voidwalker": [
        ["VOID_TRIAL_RERUN", 45, [{ "type": "bigBase", "x1": 150, "x2": 1.5 }, { "type": "bigBase", "x1": 30, "x2": 0 }]],
        ["VOID_RADIUS", 46, [{ "type": "bigBase", "x1": 250, "x2": 2 }, { "type": "bigBase", "x1": 400, "x2": 5 }]],
        ["BOSSING_VAIN", 47, [{ "type": "add", "x1": 100 }, { "type": "decay", "x1": 80, "x2": 200 }]],
        ["QUAD_JAB", 48, [{ "type": "intervalAdd", "x1": 15, "x2": 3 }, { "type": "add", "x1": 0.5, "x2": 0 }]],
        ["ENHANCEMENT_ECLIPSE", 49, [{ "type": "add", "x1": 1 }]],
        ["POWER_ORB", 50, [{ "type": "decay", "x1": 25, "x2": 200 }]],
        ["ETERNAL_STR", 51, [{ "type": "add", "x1": 2 }, { "type": "add", "x1": 2, "x2": 0 }]],
        ["ETERNAL_AGI", 52, [{ "type": "add", "x1": 2 }, { "type": "add", "x1": 2, "x2": 0 }]],
        ["ETERNAL_WIS", 53, [{ "type": "add", "x1": 2 }, { "type": "add", "x1": 2, "x2": 0 }]],
        ["ETERNAL_LUK", 54, [{ "type": "add", "x1": 2 }, { "type": "add", "x1": 2, "x2": 0 }]],
        ["EXP_CULTIVATION", 55, [{ "type": "decay", "x1": 400, "x2": 250 }]],
        ["VOODOO_STATUFICATION", 56, [{ "type": "decay", "x1": 200, "x2": 200 }]],
        ["SPECIES_EPOCH", 57, [{ "type": "decay", "x1": 10, "x2": 200 }]],
        ["MASTER_OF_THE_SYSTEM", 58, [{ "type": "decay", "x1": 20, "x2": 200 }]],
        ["BLOOD_MARROW", 59, [{ "type": "decay", "x1": 2.1, "x2": 220 }]]
    ],
    "Rage_Basics": [
        ["HEALTH_BOOSTER", 0, [{ "type": "add", "x1": 1 }]],
        ["MANA_BOOSTER", 1, [{ "type": "add", "x1": 1 }]],
        ["STAR_PLAYER", 8, [{ "type": "add", "x1": 1 }]],
        ["BUCKLERED_UP", 9, [{ "type": "decay", "x1": 40, "x2": 60 }]],
        ["SHARPENED_AXE", 5, [{ "type": "add", "x1": 0.25 }]],
        ["FIST_OF_RAGE", 10, [{ "type": "add", "x1": 1 }]],
        ["QUICKNESS_BOOTS", 11, [{ "type": "add", "x1": 1 }]],
        ["BOOK_OF_THE_WISE", 12, [{ "type": "add", "x1": 1 }]],
        ["LUCKY_CLOVER", 13, [{ "type": "add", "x1": 1 }]],
        ["GILDED_SWORD", 6, [{ "type": "add", "x1": 1 }]],
        ["BRUTE_EFFICIENCY", 85, [{ "type": "add", "x1": 1 }]],
        ["MEAT_SHANK", 86, [{ "type": "decay", "x1": 100, "x2": 80 }]],
        ["CRITIKILL", 87, [{ "type": "decay", "x1": 52, "x2": 50 }]],
        ["IDLE_BRAWLING", 88, [{ "type": "decay", "x1": 20, "x2": 50 }]],
        ["IDLE_SKILLING", 89, [{ "type": "decay", "x1": 20, "x2": 40 }]]
    ],
    "Warrior": [
        ["POWER_STRIKE", 90, [{ "type": "bigBase", "x1": 130, "x2": 3 }]],
        ["WHIRL", 91, [{ "type": "bigBase", "x1": 60, "x2": 1.5 }, { "type": "intervalAdd", "x1": 3, "x2": 24 }]],
        ["HEALTH_OVERDRIVE", 92, [{ "type": "add", "x1": 0.5 }]],
        ["DOUBLE_STRIKE", 93, [{ "type": "decay", "x1": 110, "x2": 50 }]],
        ["FIRMLY_GRASP_IT", 94, [{ "type": "bigBase", "x1": 15, "x2": 1 }, { "type": "intervalAdd", "x1": 2, "x2": 4 }]],
        ["STRENGTH_IN_NUMBERS", 95, [{ "type": "add", "x1": 0.75 }]],
        ["'STR'ESS_TESTED_GARB", 96, [{ "type": "add", "x1": 1.5 }]],
        ["CARRY_A_BIG_STICK", 97, [{ "type": "add", "x1": 1 }]],
        ["ABSOLUTE_UNIT", 98, [{ "type": "add", "x1": 1 }]],
        ["HAUNGRY_FOR_GOLD", 99, [{ "type": "decay", "x1": 55, "x2": 80 }]],
        ["BIG_PICK", 100, [{ "type": "bigBase", "x1": 150, "x2": 15 }]],
        ["COPPER_COLLECTOR", 101, [{ "type": "decay", "x1": 20, "x2": 70 }]],
        ["MOTHERLODE_MINER", 102, [{ "type": "decay", "x1": 20, "x2": 50 }]],
        ["TOOL_PROFICIENCY", 103, [{ "type": "decay", "x1": 16, "x2": 40 }]],
        ["TEMPESTUOUS_EMOTIONS", 104, [{ "type": "add", "x1": 1 }]]
    ],
    "Barbarian": [
        ["BEAR_SWIPE", 105, [{ "type": "intervalAdd", "x1": 3, "x2": 30 }, { "type": "bigBase", "x1": 108, "x2": 2 }]],
        ["AXE_HURL", 106, [{ "type": "bigBase", "x1": 200, "x2": 3 }, { "type": "intervalAdd", "x1": 2, "x2": 50 }]],
        ["MOCKING_SHOUT", 107, [{ "type": "add", "x1": 1 }, { "type": "bigBase", "x1": 20, "x2": 0.2 }]],
        ["NO_PAIN_NO_GAIN", 108, [{ "type": "decay", "x1": 100, "x2": 30 }, { "type": "decay", "x1": 100, "x2": 50 }]],
        ["MONSTER_DECIMATOR", 109, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["APOCALYPSE_ZOW", 110, [{ "type": "intervalAdd", "x1": 2, "x2": 33 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["FISTFUL_OF_OBOL", 111, [{ "type": "decay", "x1": 60, "x2": 50 }]],
        ["STRONGEST_STATUES", 112, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["STR_SUMMORE", 81, [{ "type": "add", "x1": 1 }]],
        ["BEEFY_BOTTLES", 114, [{ "type": "add", "x1": 1 }]],
        ["WORMING_UNDERCOVER", 115, [{ "type": "bigBase", "x1": 9.3, "x2": 0.7 }]],
        ["BOBBIN'_BOBBERS", 116, [{ "type": "bigBase", "x1": 12, "x2": 3 }, { "type": "intervalAdd", "x1": 5, "x2": 3 }]],
        ["ALL_FISH_DIET", 117, [{ "type": "add", "x1": 1.5 }]],
        ["CATCHING_SOME_ZZZ'S", 118, [{ "type": "decay", "x1": 20, "x2": 60 }]],
        ["BACK_TO_BASICS", 119, [{ "type": "add", "x1": 1 }]]
    ],
    "Squire": [
        ["SHOCKWAVE_SLASH", 120, [{ "type": "bigBase", "x1": 175, "x2": 2 }, { "type": "intervalAdd", "x1": 3, "x2": 30 }]],
        ["DAGGERANG", 121, [{ "type": "bigBase", "x1": 200, "x2": 1.5 }, { "type": "intervalAdd", "x1": 4, "x2": 30 }]],
        ["BRICKY_SKIN", 122, [{ "type": "bigBase", "x1": 20, "x2": 0.4 }, { "type": "intervalAdd", "x1": 1, "x2": 3 }]],
        ["MASTERY_UP", 123, [{ "type": "decay", "x1": 18, "x2": 50 }]],
        ["BALANCED_SPIRIT", 124, [{ "type": "decay", "x1": 25, "x2": 50 }, { "type": "decay", "x1": 39, "x2": 40 }]],
        ["PRECISION_POWER", 125, [{ "type": "decay", "x1": 11, "x2": 80 }]],
        ["FISTFUL_OF_OBOL", 111, [{ "type": "decay", "x1": 60, "x2": 50 }]],
        ["SHIELDIEST_STATUES", 127, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["STR_SUMMORE", 81, [{ "type": "add", "x1": 1 }]],
        ["BLOCKY_BOTTLES", 129, [{ "type": "add", "x1": 1 }]],
        ["REFINERY_THROTTLE", 130, [{ "type": "intervalAdd", "x1": 3, "x2": 8 }]],
        ["REDOX_RATES", 131, [{ "type": "decay", "x1": 40, "x2": 70 }]],
        ["SHARPER_SAWS", 132, [{ "type": "add", "x1": 1 }]],
        ["SUPER_SAMPLES", 133, [{ "type": "decay", "x1": 9, "x2": 75 }]],
        ["BACK_TO_BASICS", 119, [{ "type": "add", "x1": 1 }]]
    ],
    "Blood_Berserker": [
        ["FIRED_UP", 135, [{ "type": "intervalAdd", "x1": 5, "x2": 25 }]],
        ["COMBUSTION", 136, [{ "type": "bigBase", "x1": 300, "x2": 1.5 }, { "type": "intervalAdd", "x1": 13, "x2": 20 }]],
        ["SERRATED_SWIPE", 137, [{ "type": "bigBase", "x1": 40, "x2": 0.4 }, { "type": "intervalAdd", "x1": 2, "x2": 50 }]],
        ["EMBER_BEAR", 138, [{ "type": "decay", "x1": 250, "x2": 100 }]],
        ["FEROCITY_STRIKE", 139, [{ "type": "decay", "x1": 100, "x2": 80 }]],
        ["TOUGH_STEAKS", 140, [{ "type": "decay", "x1": 10, "x2": 100 }]],
        ["CHARRED_SKULLS", 141, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["SKILL_STRENGTHEN", 142, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["OVERBLOWN_TESTOSTERONE", 143, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["THE_FAMILY_GUY", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["TASTE_TEST", 145, [{ "type": "decay", "x1": 100, "x2": 100 }]],
        ["APOCALYPSE_CHOW", 146, [{ "type": "decay", "x1": 20, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["WAITING_TO_COOL", 147, [{ "type": "decay", "x1": 20, "x2": 60 }]],
        ["OVERFLOWING_LADLE", 148, [{ "type": "decay", "x1": 100, "x2": 80 }]],
        ["SYMBOLS_OF_BEYOND_~R", 149, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Divine_Knight": [
        ["KNIGHTLY_DISCIPLE", 165, [{ "type": "bigBase", "x1": 10, "x2": 0.15 }]],
        ["MEGA_MONGORANG", 166, [{ "type": "bigBase", "x1": 100, "x2": 2 }, { "type": "intervalAdd", "x1": 2, "x2": 25 }]],
        ["DIVINE_INTERVENTION", 167, [{ "type": "decay", "x1": 200, "x2": 300 }]],
        ["ORB_OF_REMEMBRANCE", 168, [{ "type": "bigBase", "x1": 30, "x2": 0.4 }]],
        ["IMBUED_SHOCKWAVES", 169, [{ "type": "decay", "x1": 100, "x2": 100 }]],
        ["GAMER_STRENGTH", 170, [{ "type": "decay", "x1": 7, "x2": 100 }]],
        ["CHARRED_SKULLS", 141, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["SKILL_STRENGTHEN", 142, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["OVERBLOWN_TESTOSTERONE", 143, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["THE_FAMILY_GUY", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["UNDYING_PASSION", 175, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["1000_HOURS_PLAYED", 176, [{ "type": "decay", "x1": 60, "x2": 100 }]],
        ["BITTY_LITTY", 177, [{ "type": "decay", "x1": 20, "x2": 100 }]],
        ["KING_OF_THE_REMEMBERED", 178, [{ "type": "decay", "x1": 5, "x2": 150 }]],
        ["SYMBOLS_OF_BEYOND_~R", 149, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Death_Bringer": [
        ["WRAITH_FORM", 195, [{ "type": "bigBase", "x1": 10, "x2": 0.15 }]],
        ["GRIMOIRE", 196, [{ "type": "bigBase", "x1": 100, "x2": 2 }, { "type": "intervalAdd", "x1": 2, "x2": 25 }]],
        ["SENTINEL_AXES", 197, [{ "type": "decay", "x1": 200, "x2": 300 }]],
        ["GRAVEYARD_SHIFT", 198, [{ "type": "bigBase", "x1": 30, "x2": 0.4 }]],
        ["DETONATION", 199, [{ "type": "decay", "x1": 100, "x2": 100 }]],
        ["MARAUDER_STYLE", 200, [{ "type": "decay", "x1": 7, "x2": 100 }]],
        ["BULWARK_STYLE", 201, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["FAMINE_O'FISH", 202, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["BUILT_DIFFERENT", 203, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["RIBBON_WINNING", 204, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["MASS_IRRIGATION", 205, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["AGRICULTURAL_'PRECIATION", 206, [{ "type": "decay", "x1": 60, "x2": 100 }]],
        ["DANK_RANKS", 207, [{ "type": "decay", "x1": 20, "x2": 100 }]],
        ["WRAITH_OVERLORD", 208, [{ "type": "decay", "x1": 5, "x2": 150 }]],
        ["APOCALYPSE_WOW", 209, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Calm_Basics": [
        ["HEALTH_BOOSTER", 0, [{ "type": "add", "x1": 1 }]],
        ["MANA_BOOSTER", 1, [{ "type": "add", "x1": 1 }]],
        ["STAR_PLAYER", 8, [{ "type": "add", "x1": 1 }]],
        ["BUCKLERED_UP", 9, [{ "type": "decay", "x1": 40, "x2": 60 }]],
        ["SHARPENED_AXE", 5, [{ "type": "add", "x1": 0.25 }]],
        ["FIST_OF_RAGE", 10, [{ "type": "add", "x1": 1 }]],
        ["QUICKNESS_BOOTS", 11, [{ "type": "add", "x1": 1 }]],
        ["BOOK_OF_THE_WISE", 12, [{ "type": "add", "x1": 1 }]],
        ["LUCKY_CLOVER", 13, [{ "type": "add", "x1": 1 }]],
        ["GILDED_SWORD", 6, [{ "type": "add", "x1": 1 }]],
        ["ELUSIVE_EFFICIENCY", 263, [{ "type": "add", "x1": 1 }]],
        ["FEATHERWEIGHT", 266, [{ "type": "decay", "x1": 25, "x2": 40 }]],
        ["I_SEE_YOU", 267, [{ "type": "decay", "x1": 27, "x2": 50 }]],
        ["IDLE_SHOOTING", 268, [{ "type": "decay", "x1": 20, "x2": 50 }]],
        ["BROKEN_TIME", 269, [{ "type": "decay", "x1": 100, "x2": 75 }]]
    ],
    "Archer": [
        ["PIERCING_ARROW", 270, [{ "type": "bigBase", "x1": 110, "x2": 2 }, { "type": "intervalAdd", "x1": 2, "x2": 40 }]],
        ["KUNG_FU_KICK", 271, [{ "type": "bigBase", "x1": 25, "x2": 1 }, { "type": "bigBase", "x1": 60, "x2": 2 }]],
        ["HEMA_OVERDRIVE", 272, [{ "type": "add", "x1": 0.4 }]],
        ["STRAFE", 273, [{ "type": "bigBase", "x1": 5, "x2": 0.3 }, { "type": "intervalAdd", "x1": 2, "x2": 15 }]],
        ["HAVE_ANOTHER!", 274, [{ "type": "decay", "x1": 120, "x2": 40 }]],
        ["VEINS_OF_THE_INFERNAL", 284, [{ "type": "decay", "x1": 50, "x2": 60 }]],
        ["GARB_OF_UN'AGI'NG_QUALITY", 276, [{ "type": "add", "x1": 1.5 }]],
        ["HIGH_POLYMER_LIMBS", 277, [{ "type": "add", "x1": 1 }]],
        ["SANIC_SPEED", 278, [{ "type": "add", "x1": 1 }]],
        ["ROBBINGHOOD", 279, [{ "type": "decay", "x1": 40, "x2": 65 }]],
        ["SMELTIN'_ERRYDAY", 280, [{ "type": "decay", "x1": 50, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 60 }]],
        ["ACME_ANVIL", 281, [{ "type": "intervalAdd", "x1": 1, "x2": 15 }]],
        ["YEA_I_ALREADY_KNOW", 282, [{ "type": "decay", "x1": 5, "x2": 90 }, { "type": "intervalAdd", "x1": 5, "x2": 10 }]],
        ["GODLY_CREATION", 283, [{ "type": "decay", "x1": 50, "x2": 75 }]],
        ["FOCUSED_SOUL", 265, [{ "type": "add", "x1": 1 }]]
    ],
    "Bowman": [
        ["HOMING_ARROWS", 285, [{ "type": "intervalAdd", "x1": 2, "x2": 15 }, { "type": "bigBase", "x1": 27, "x2": 3 }]],
        ["MAGIC_SHORTBOW", 286, [{ "type": "intervalAdd", "x1": 2, "x2": 20 }, { "type": "bigBase", "x1": 47, "x2": 3 }]],
        ["FLAX_INSTASTRING", 287, [{ "type": "decay", "x1": 40, "x2": 50 }]],
        ["EXTENDO_RANGEO", 288, [{ "type": "bigBase", "x1": 19.5, "x2": 0.5 }, { "type": "decay", "x1": 40, "x2": 60 }]],
        ["WOAH,_THAT_WAS_FAST!", 289, [{ "type": "decay", "x1": 30, "x2": 40 }]],
        ["SPEEDNA", 290, [{ "type": "decay", "x1": 60, "x2": 77 }]],
        ["SHOEFUL_OF_OBOL", 291, [{ "type": "decay", "x1": 135, "x2": 80 }]],
        ["SHWIFTY_STATUES", 292, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["AGI_AGAIN", 293, [{ "type": "add", "x1": 1 }]],
        ["VELOCITY_VESSELS", 294, [{ "type": "add", "x1": 1 }]],
        ["TELEKI'NET'IC_LOGS", 295, [{ "type": "decay", "x1": 20, "x2": 70 }]],
        ["BRIAR_PATCH_RUNNER", 296, [{ "type": "add", "x1": 0.5 }]],
        ["BUG_ENTHUSIAST", 297, [{ "type": "add", "x1": 1.5 }]],
        ["SUNSET_ON_THE_HIVES", 298, [{ "type": "decay", "x1": 20, "x2": 60 }]],
        ["PREVIOUS_POINTS", 299, [{ "type": "add", "x1": 1 }]]
    ],
    "Hunter": [
        ["360_NOSCOPE", 300, [{ "type": "bigBase", "x1": 225, "x2": 3 }]],
        ["BEAR_TRAP", 301, [{ "type": "intervalAdd", "x1": 2, "x2": 30 }, { "type": "bigBase", "x1": 150, "x2": 2 }]],
        ["UWU_RAWRRR", 302, [{ "type": "decay", "x1": 55, "x2": 60 }]],
        ["STOP_RIGHT_THERE", 303, [{ "type": "bigBase", "x1": 150, "x2": 1.5 }, { "type": "intervalAdd", "x1": 4, "x2": 20 }]],
        ["HAVE_ANOTHER..._AGAIN!", 304, [{ "type": "decay", "x1": 120, "x2": 40 }]],
        ["LOOTY_MC_SHOOTY", 305, [{ "type": "decay", "x1": 36, "x2": 100 }]],
        ["SHOEFUL_OF_OBOL", 291, [{ "type": "decay", "x1": 135, "x2": 80 }]],
        ["STRAIGHTSHOT_STATUES", 307, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["AGI_AGAIN", 293, [{ "type": "add", "x1": 1 }]],
        ["VISIBILITY_VESSELS", 309, [{ "type": "add", "x1": 1 }]],
        ["EAGLE_EYE", 310, [{ "type": "bigBase", "x1": 50, "x2": 0.25 }, { "type": "bigBase", "x1": 40, "x2": 0.2 }]],
        ["INVASIVE_SPECIES", 311, [{ "type": "decay", "x1": 30, "x2": 80 }]],
        ["SHROOM_BAIT", 312, [{ "type": "add", "x1": 1 }]],
        ["REFLECTIVE_EYESIGHT", 313, [{ "type": "decayMulti", "x1": 2, "x2": 100 }]],
        ["PREVIOUS_POINTS", 299, [{ "type": "add", "x1": 1 }]]
    ],
    "Siege_Breaker": [
        ["CANNONBALL", 360, [{ "type": "bigBase", "x1": 600, "x2": 6 }]],
        ["SUPPRESSING_FIRE", 316, [{ "type": "bigBase", "x1": 20, "x2": 1 }, { "type": "intervalAdd", "x1": 4, "x2": 33 }]],
        ["FIREBOMB", 317, [{ "type": "bigBase", "x1": 200, "x2": 2 }, { "type": "intervalAdd", "x1": 5, "x2": 50 }]],
        ["PIRATE_FLAG", 318, [{ "type": "intervalAdd", "x1": 10, "x2": 5 }, { "type": "bigBase", "x1": 800, "x2": 20 }]],
        ["PLUNDER_YE_DECEASED", 319, [{ "type": "intervalAdd", "x1": 20, "x2": 7 }]],
        ["CREW_ROWING_STRENGTH", 320, [{ "type": "decay", "x1": 7, "x2": 100 }]],
        ["STACKED_SKULLS", 366, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["SKILL_AMBIDEXTERITY", 367, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["ADAPTATION_REVELATION", 368, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["THE_FAMILY_GUY", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["UNENDING_LOOT_SEARCH", 325, [{ "type": "decay", "x1": 85, "x2": 150 }]],
        ["EXPERTLY_SAILED", 326, [{ "type": "decay", "x1": 60, "x2": 100 }]],
        ["CAPTAIN_PEPTALK", 327, [{ "type": "decay", "x1": 80, "x2": 100 }]],
        ["ARCHLORD_OF_THE_PIRATES", 328, [{ "type": "decay", "x1": 6, "x2": 150 }]],
        ["SYMBOLS_OF_BEYOND_~G", 374, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Beast_Master": [
        ["BALLISTA", 315, [{ "type": "bigBase", "x1": 75, "x2": 1.25 }, { "type": "intervalAdd", "x1": 4, "x2": 30 }]],
        ["BOAR_RUSH", 361, [{ "type": "intervalAdd", "x1": 6, "x2": 20 }, { "type": "bigBase", "x1": 75, "x2": 1.5 }]],
        ["WHALE_WALLOP", 362, [{ "type": "intervalAdd", "x1": 7, "x2": 17 }, { "type": "bigBase", "x1": 30, "x2": 1 }]],
        ["NACHO_PARTY", 363, [{ "type": "intervalAdd", "x1": 15, "x2": 13 }, { "type": "bigBase", "x1": 50, "x2": 1 }]],
        ["HAVE_YET_ANOTHA_ONE", 364, [{ "type": "decay", "x1": 120, "x2": 40 }]],
        ["ANIMALISTIC_FEROCITY", 365, [{ "type": "decay", "x1": 8, "x2": 100 }]],
        ["STACKED_SKULLS", 366, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["SKILL_AMBIDEXTERITY", 367, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["ADAPTATION_REVELATION", 368, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["THE_FAMILY_GUY", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["ARENA_SPIRIT", 370, [{ "type": "intervalAdd", "x1": 5, "x2": 17 }, { "type": "decay", "x1": 30, "x2": 100 }]],
        ["I_DREAM_OF_PEACE_AND_EGG", 371, [{ "type": "decay", "x1": 100, "x2": 80 }]],
        ["SHINING_BEACON_OF_EGG", 372, [{ "type": "decay", "x1": 100, "x2": 100 }]],
        ["CURVITURE_OF_THE_PAW", 373, [{ "type": "decayMulti", "x1": 1.2, "x2": 100 }]],
        ["SYMBOLS_OF_BEYOND_~G", 374, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Wind_Walker": [
        ["TEMPEST_FORM", 315, [{ "type": "bigBase", "x1": 75, "x2": 1.25 }, { "type": "intervalAdd", "x1": 4, "x2": 30 }]],
        ["COMPASS", 361, [{ "type": "intervalAdd", "x1": 6, "x2": 20 }, { "type": "bigBase", "x1": 75, "x2": 1.5 }]],
        ["SPIRIT_BALLISTA", 362, [{ "type": "intervalAdd", "x1": 7, "x2": 17 }, { "type": "bigBase", "x1": 30, "x2": 1 }]],
        ["ETERNAL_HUNT", 363, [{ "type": "intervalAdd", "x1": 15, "x2": 13 }, { "type": "bigBase", "x1": 50, "x2": 1 }]],
        ["SOME_COMMANDMENTS", 364, [{ "type": "decay", "x1": 120, "x2": 40 }]],
        ["WINDBORNE", 365, [{ "type": "decay", "x1": 8, "x2": 100 }]],
        ["ELEMENTAL_MAYHEM", 366, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["PUMPIN'POWER", 367, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["UNREAL_AGILITY", 368, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["SHINY_MEDALLIONS", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["PRICE_RECESSION", 370, [{ "type": "intervalAdd", "x1": 5, "x2": 17 }, { "type": "decay", "x1": 30, "x2": 100 }]],
        ["SNEAKY_SKILLING", 371, [{ "type": "decay", "x1": 100, "x2": 80 }]],
        ["GENERATIONAL_GEMSTONES", 372, [{ "type": "decay", "x1": 100, "x2": 100 }]],
        ["DUSTWALKER", 373, [{ "type": "decayMulti", "x1": 1.2, "x2": 100 }]],
        ["SLAYER_ABOMINATOR", 374, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Savvy_Basics": [
        ["HEALTH_BOOSTER", 0, [{ "type": "add", "x1": 1 }]],
        ["MANA_BOOSTER", 1, [{ "type": "add", "x1": 1 }]],
        ["STAR_PLAYER", 8, [{ "type": "add", "x1": 1 }]],
        ["BUCKLERED_UP", 9, [{ "type": "decay", "x1": 40, "x2": 60 }]],
        ["SHARPENED_AXE", 5, [{ "type": "add", "x1": 0.25 }]],
        ["FIST_OF_RAGE", 10, [{ "type": "add", "x1": 1 }]],
        ["QUICKNESS_BOOTS", 11, [{ "type": "add", "x1": 1 }]],
        ["BOOK_OF_THE_WISE", 12, [{ "type": "add", "x1": 1 }]],
        ["LUCKY_CLOVER", 13, [{ "type": "add", "x1": 1 }]],
        ["GILDED_SWORD", 6, [{ "type": "add", "x1": 1 }]],
        ["SMART_EFFICIENCY", 445, [{ "type": "add", "x1": 1 }]],
        ["OVERCLOCKED_ENERGY", 446, [{ "type": "decay", "x1": 150, "x2": 80 }]],
        ["FARSIGHT", 447, [{ "type": "decay", "x1": 17, "x2": 45 }, { "type": "decay", "x1": 33, "x2": 45 }]],
        ["IDLE_CASTING", 448, [{ "type": "decay", "x1": 20, "x2": 50 }]],
        ["ACTIVE_AFK'ER", 449, [{ "type": "decay", "x1": 20, "x2": 40 }]]
    ],
    "Mage": [
        ["ENERGY_BOLT", 450, [{ "type": "bigBase", "x1": 160, "x2": 2 }]],
        ["MINI_FIREBALL", 451, [{ "type": "bigBase", "x1": 120, "x2": 1 }]],
        ["MANA_OVERDRIVE", 452, [{ "type": "add", "x1": 0.5 }]],
        ["TELEPORT", 453, [{ "type": "bigBase", "x1": 25, "x2": 1 }]],
        ["YOU'RE_NEXT", 454, [{ "type": "decay", "x1": 110, "x2": 70 }, { "type": "bigBase", "x1": 25, "x2": 0.5 }]],
        ["KNOWLEDGE_IS_POWER", 455, [{ "type": "add", "x1": 1.5 }]],
        ["UNT'WIS'TED_ROBES", 456, [{ "type": "add", "x1": 1.5 }]],
        ["POWER_OVERWHELMING", 457, [{ "type": "add", "x1": 1.2 }]],
        ["FREE_MEAL", 458, [{ "type": "decay", "x1": 53, "x2": 40 }]],
        ["INDIVIDUAL_INSIGHT", 459, [{ "type": "add", "x1": 1 }]],
        ["LOG_ON_LOGS", 460, [{ "type": "intervalAdd", "x1": 2, "x2": 10 }, { "type": "bigBase", "x1": 14, "x2": 1.86 }]],
        ["LEAF_THIEF", 461, [{ "type": "decay", "x1": 25, "x2": 70 }]],
        ["DEFORESTING_ALL_DOUBT", 462, [{ "type": "add", "x1": 0.75 }]],
        ["INNER_PEACE", 464, [{ "type": "add", "x1": 1 }]],
        ["CHOPPIN_IT_UP_EZ", 463, [{ "type": "add", "x1": 1 }, { "type": "decay", "x1": 5.7, "x2": 50 }]]
    ],
    "Wizard": [
        ["ICE_SHARDS", 465, [{ "type": "bigBase", "x1": 70, "x2": 1 }]],
        ["FLOOR_IS_LAVA", 466, [{ "type": "intervalAdd", "x1": 1, "x2": 40 }, { "type": "bigBase", "x1": 120, "x2": 1 }]],
        ["TORNADO", 467, [{ "type": "bigBase", "x1": 20, "x2": 0.3 }, { "type": "intervalAdd", "x1": 4, "x2": 20 }]],
        ["SPEEDY_BOOK", 468, [{ "type": "bigBase", "x1": 10, "x2": 0.2 }, { "type": "intervalAdd", "x1": 3, "x2": 15 }]],
        ["MANA_IS_LIFE", 469, [{ "type": "bigBase", "x1": 25, "x2": 0.35 }, { "type": "decay", "x1": 40, "x2": 100 }]],
        ["PAPERWORK,_GREAT...", 470, [{ "type": "decay", "x1": 70, "x2": 100 }]],
        ["OCCULT_OBOLS", 486, [{ "type": "decay", "x1": 135, "x2": 80 }]],
        ["STARING_STATUES", 472, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["WIS_WUMBO", 488, [{ "type": "add", "x1": 1 }]],
        ["FUSCIA_FLASKS", 474, [{ "type": "add", "x1": 1 }]],
        ["CHARGE_SYPHON", 475, [{ "type": "bigBase", "x1": 35, "x2": 0.3 }, { "type": "bigBase", "x1": 100, "x2": 10 }]],
        ["SOOOULS", 476, [{ "type": "decay", "x1": 25, "x2": 70 }]],
        ["BLESS_UP", 477, [{ "type": "add", "x1": 1 }]],
        ["NEARBY_OUTLET", 478, [{ "type": "decayMulti", "x1": 1, "x2": 100 }]],
        ["EARLIER_EDUCATION", 494, [{ "type": "add", "x1": 1 }]]
    ],
    "Shaman": [
        ["CRAZY_CONCOCTIONS", 480, [{ "type": "bigBase", "x1": 17, "x2": 3 }]],
        ["AUSPICIOUS_AURA", 481, [{ "type": "bigBase", "x1": 10, "x2": 3 }, { "type": "intervalAdd", "x1": 1, "x2": 35 }]],
        ["SIZZLING_SKULL", 482, [{ "type": "bigBase", "x1": 125, "x2": 1 }, { "type": "intervalAdd", "x1": 3, "x2": 20 }]],
        ["TENTEYECLE", 483, [{ "type": "decay", "x1": 100, "x2": 100 }, { "type": "intervalAdd", "x1": 2, "x2": 200 }]],
        ["INSTANT_INVINCIBILITY", 484, [{ "type": "decay", "x1": 5, "x2": 100 }]],
        ["VIRILE_VIALS", 485, [{ "type": "decay", "x1": 12, "x2": 100 }]],
        ["OCCULT_OBOLS", 486, [{ "type": "decay", "x1": 135, "x2": 80 }]],
        ["STUPENDOUS_STATUES", 487, [{ "type": "decay", "x1": 100, "x2": 50 }]],
        ["WIS_WUMBO", 488, [{ "type": "add", "x1": 1 }]],
        ["FANTASIA_FLASKS", 489, [{ "type": "add", "x1": 1 }]],
        ["CRANIUM_COOKING", 490, [{ "type": "decay", "x1": 40, "x2": 100 }, { "type": "intervalAdd", "x1": 10, "x2": 2 }]],
        ["BUSY_BREWIN'", 491, [{ "type": "add", "x1": 1 }]],
        ["BUBBLE_BREAKTHROUGH", 492, [{ "type": "add", "x1": 1 }, { "type": "add", "x1": 1, "x2": 0.02 }]],
        ["SHARING_SOME_SMARTS", 493, [{ "type": "add", "x1": 1 }]],
        ["EARLIER_EDUCATION", 494, [{ "type": "add", "x1": 1 }]]
    ],
    "Elemental_Sorcerer": [
        ["METEOR_SHOWER", 495, [{ "type": "bigBase", "x1": 200, "x2": 2.5 }, { "type": "intervalAdd", "x1": 10, "x2": 7 }]],
        ["LIGHTNING_BARRAGE", 496, [{ "type": "bigBase", "x1": 700, "x2": 8 }, { "type": "intervalAdd", "x1": 2, "x2": 20 }]],
        ["RADIANT_CHAINBOLT", 497, [{ "type": "bigBase", "x1": 50, "x2": 4 }, { "type": "intervalAdd", "x1": 3, "x2": 10 }]],
        ["DIMENSIONAL_WORMHOLE", 498, [{ "type": "decay", "x1": 17, "x2": 70 }, { "type": "bigBase", "x1": 43, "x2": 0.2 }]],
        ["CHAOTIC_FORCE", 499, [{ "type": "decay", "x1": 75, "x2": 110 }]],
        ["BELIEVER_STRENGTH", 500, [{ "type": "decay", "x1": 7, "x2": 100 }]],
        ["MEMORIAL_SKULLS", 531, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["SKILL_WIZ", 532, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["UTMOST_INTELLECT", 533, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["THE_FAMILY_GUY", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["POLYTHEISM", 505, [{ "type": "decay", "x1": 70, "x2": 200 }]],
        ["SHARED_BELIEFS", 506, [{ "type": "decay", "x1": 100, "x2": 100 }]],
        ["GODS_CHOSEN_CHILDREN", 507, [{ "type": "decay", "x1": 10, "x2": 200 }]],
        ["WORMHOLE_EMPEROR", 508, [{ "type": "decay", "x1": 1.5, "x2": 150 }]],
        ["SYMBOLS_OF_BEYOND_~P", 539, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "Bubonic_Conjuror": [
        ["CHEMICAL_WARFARE", 525, [{ "type": "intervalAdd", "x1": 8, "x2": 17 }, { "type": "bigBase", "x1": 5, "x2": 0.05 }]],
        ["FLATULENT_SPIRIT", 526, [{ "type": "intervalAdd", "x1": 8, "x2": 5 }, { "type": "decay", "x1": 200, "x2": 1 }]],
        ["TAMPERED_INJECTION", 527, [{ "type": "bigBase", "x1": 120, "x2": 1.8 }]],
        ["PLAGUE_STRICKEN", 528, [{ "type": "decay", "x1": 280, "x2": 100 }]],
        ["RAISE_DEAD", 529, [{ "type": "bigBase", "x1": 150, "x2": 3 }]],
        ["WIRED_IN_POWER", 530, [{ "type": "decay", "x1": 7, "x2": 100 }]],
        ["MEMORIAL_SKULLS", 531, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["SKILL_WIZ", 532, [{ "type": "decay", "x1": 60, "x2": 80 }, { "type": "intervalAdd", "x1": 1, "x2": 2 }]],
        ["UTMOST_INTELLECT", 533, [{ "type": "decay", "x1": 15, "x2": 100 }, { "type": "add", "x1": 1, "x2": 0 }]],
        ["THE_FAMILY_GUY", 144, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["PURPLE_TUBE", 535, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["GREEN_TUBE", 536, [{ "type": "decay", "x1": 60, "x2": 100 }]],
        ["ESSENCE_TRANSFERRAL", 537, [{ "type": "decay", "x1": 70, "x2": 100 }]],
        ["UPLOAD_SQUARED", 538, [{ "type": "decay", "x1": 80, "x2": 100 }]],
        ["SYMBOLS_OF_BEYOND_~P", 539, [{ "type": "intervalAdd", "x1": 1, "x2": 20 }]]
    ],
    "SPECIAL_TALENT_1": [
        ["CASH_MONEY", 657, [{ "type": "add", "x1": 4, "x2": 0 }]],
        ["QUEST_KAPOW!", 658, [{ "type": "add", "x1": 5, "x2": 0 }]],
        ["STUDIOUS_QUESTER", 617, [{ "type": "add", "x1": 0.4, "x2": 0 }]],
        ["QUEST_CHUNGUS", 618, [{ "type": "add", "x1": 4, "x2": 0 }]],
        ["CRYSTALS_4_DAYYS", 619, [{ "type": "decay", "x1": 174, "x2": 50 }]],
        ["WILL_OF_THE_ELDEST", 620, [{ "type": "add", "x1": 1, "x2": 0 }]],
        ["TICK_TOCK", 621, [{ "type": "decay", "x1": 8, "x2": 50 }]],
        ["STONKS!", 622, [{ "type": "decay", "x1": 130, "x2": 50 }]],
        ["ROLL_DA_DICE", 623, [{ "type": "reduce", "x1": 10000, "x2": 25 }]],
        ["ATTACKS_ON_SIMMER", 624, [{ "type": "decay", "x1": 40, "x2": 100 }]],
        ["BEGINNER_BEST_CLASS", 616, [{ "type": "add", "x1": 1, "x2": 0 }]],
        ["EXP_CONVERTER", 626, [{ "type": "decay", "x1": 150, "x2": 200 }]],
        ["GOBLET_OF_HEMOGLOBIN", 627, [{ "type": "decay", "x1": 6, "x2": 66 }]]
    ],
    "SPECIAL_TALENT_2": [
        ["JUST_EXP", 632, [{ "type": "decay", "x1": 0.1, "x2": 50 }]],
        ["FROTHY_MALK", 631, [{ "type": "decay", "x1": 0.5, "x2": 50 }]],
        ["CONVERT_BETTER,_DARNIT!", 630, [{ "type": "decayMulti", "x1": 1.7, "x2": 100 }]],
        ["PULSATION", 629, [{ "type": "decay", "x1": 0.75, "x2": 60 }]],
        ["CARDIOVASCULAR!", 628, [{ "type": "decay", "x1": 0.6, "x2": 60 }]],
        ["MILKYWAY_CANDIES", 633, [{ "type": "decay", "x1": 2, "x2": 100 }]],
        ["TELEKINETIC_STORAGE", 634, [{ "type": "decay", "x1": 0.3, "x2": 60 }]],
        ["PRINTER_SAMPLING", 635, [{ "type": "bigBase", "x1": 0.1, "x2": 0.075 }]],
        ["SUPERSOURCE", 636, [{ "type": "decay", "x1": 250, "x2": 100 }]],
        ["ACTION_FRENZY", 637, [{ "type": "decay", "x1": 0.6, "x2": 100 }]],
        ["DUNGEONIC_DAMAGE", 638, [{ "type": "decay", "x1": 0.15, "x2": 100 }]],
        ["SHRINE_ARCHITECT", 639, [{ "type": "decay", "x1": 0.5, "x2": 50 }]],
        ["MEGA_CRIT", 640, [{ "type": "decay", "x1": 0.2, "x2": 100 }]]
    ],
    "SPECIAL_TALENT_3": [
        ["TIPTOE_QUICKNESS", 641, [{ "type": "decay", "x1": 25, "x2": 100 }]],
        ["UBERCHARGED_HEALTH", 642, [{ "type": "add", "x1": 2, "x2": 0.2 }]],
        ["COINS_FOR_CHARON", 643, [{ "type": "decay", "x1": 25, "x2": 75 }]],
        ["AMERICAN_TIPPER", 644, [{ "type": "decay", "x1": 80, "x2": 100 }]],
        ["OVERACCURATE_CRIT", 645, [{ "type": "decay", "x1": 8, "x2": 70 }]],
        ["TOILET_PAPER_POSTAGE", 625, [{ "type": "decayMulti", "x1": 0.7, "x2": 100 }]],
        ["FILTHY_DAMAGE", 649, [{ "type": "decay", "x1": 20, "x2": 100 }]],
        ["RANDO_EVENT_LOOTY", 650, [{ "type": "decay", "x1": 0.75, "x2": 100 }]],
        ["SPICE_SPILLAGE", 651, [{ "type": "decay", "x1": 200, "x2": 100 }]],
        ["STAT_OVERLOAD", 652, [{ "type": "add", "x1": 1, "x2": 0 }]],
        ["DUMMY_THICC_STATS", 653, [{ "type": "decay", "x1": 0.35, "x2": 50 }]]
    ],

    "SPECIAL_TALENT_4": [
        ["MONOLITHIALISM", 654, [{ "type": "decay", "x1": 30, "x2": 100 }]],
        ["BOSS_BATTLE_SPILLOVER", 655, [{ "type": "decay", "x1": 25, "x2": 100 }]],
        ["DREAMER_DAMAGE", 656, [{ "type": "decay", "x1": 5, "x2": 100 }]],
        ["BORED_TO_DEATH", 615, [{ "type": "reduce", "x1": 600, "x2": 2 }]],
    ]
}

export const DATA_TALENT_NO_ADDITIONNAL_LVLS = [
    "SYMBOLS_OF_BEYOND_~R",
    "SYMBOLS_OF_BEYOND_~G",
    "SYMBOLS_OF_BEYOND_~P",
]