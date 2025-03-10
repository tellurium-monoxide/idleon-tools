import { BaseFeature } from "../../../BaseFeature.js";

import { CauldronTemplate } from "./CauldronTemplate.js";

export class Cauldrons extends BaseFeature {

    constructor(account) {
        super(account);

        let cauldron_data = account.save_data["CauldronInfo"].slice(0, 4)
        console.log(cauldron_data)

        this.power = new CauldronTemplate(account, "POWER", cauldron_data[0])
        this.quicc = new CauldronTemplate(account, "QUICC", cauldron_data[1])
        this.highiq = new CauldronTemplate(account, "HIGH_IQ", cauldron_data[2])
        this.kazam = new CauldronTemplate(account, "KAZAM", cauldron_data[3])

        this.child_features.push(this.power)
        this.child_features.push(this.quicc)
        this.child_features.push(this.highiq)
        this.child_features.push(this.kazam)

    }


}

export const DATA_CAULDRONS = {
    "POWER": [["ROID_RAGIN", { "type": "add", "x1": 1 }, [["OakTree", 5], ["Liquid1", 2]]], ["WARRIORS_RULE", { "type": "decayMulti", "x1": 2, "x2": 50 }, [["Grasslands1", 7], ["Liquid1", 2]]], ["HEARTY_DIGGY", { "type": "decay", "x1": 0.5, "x2": 100 }, [["JungleTree", 10], ["Liquid1", 2]]], ["WYOMING_BLOOD", { "type": "bigBase", "x1": 23.5, "x2": 1.5 }, [["Bug1", 15], ["Liquid1", 3]]], ["REELY_SMART", { "type": "decay", "x1": 1, "x2": 80 }, [["CraftMat6", 25], ["Liquid1", 3]]], ["BIG_MEATY_CLAWS", { "type": "add", "x1": 4 }, [["DesertB2", 200], ["Liquid1", 4]]], ["SPLOOSH_SPLOOSH", { "type": "bigBase", "x1": 23.5, "x2": 1.5 }, [["Fish2", 100], ["Liquid1", 4]]], ["STRONK_TOOLS", { "type": "decay", "x1": 0.65, "x2": 70 }, [["Plat", 60], ["Liquid1", 4]]], ["FMJ", { "type": "add", "x1": 0.5 }, [["Bug4", 50], ["Liquid1", 5]]], ["BAPPITY_BOOPITY", { "type": "decay", "x1": 0.35, "x2": 100 }, [["CraftMat8", 100], ["Liquid1", 5]]], ["BRITTLEY_SPEARS", { "type": "decay", "x1": 0.4, "x2": 50 }, [["Critter1", 10], ["Liquid2", 3]]], ["CALL_ME_BOB", { "type": "bigBase", "x1": 25, "x2": 2.5 }, [["SnowA3", 120], ["Liquid2", 3]]], ["CARPENTER", { "type": "decay", "x1": 0.05, "x2": 50 }, [["Refinery2", 3], ["Liquid2", 4]]], ["BUFF_BOI_TALENT", { "type": "bigBase", "x1": 5, "x2": 1 }, [["Critter4", 50], ["Liquid2", 2]]], ["ORANGE_BARGAIN", { "type": "decay", "x1": 0.4, "x2": 12 }, [["Soul4", 30], ["Liquid2", 3]]], ["PENNY_OF_STRENGTH", { "type": "decay", "x1": 0.18, "x2": 30 }, [["Fish5", 200], ["Liquid3", 3]]], ["MULTORANGE", { "type": "decayMulti", "x1": 1.4, "x2": 30 }, [["GalaxyA3", 250], ["Liquid3", 3]]], ["DREAM_OF_IRONFISH", { "type": "decay", "x1": 0.12, "x2": 30 }, [["CraftMat13", 200], ["Liquid3", 4]]], ["SHIMMERON", { "type": "decay", "x1": 0.8, "x2": 40 }, [["CraftMat14", 300], ["Liquid3", 4]]], ["BITE_BUT_NOT_CHEW", { "type": "decay", "x1": 0.5, "x2": 40 }, [["GalaxyC4", 200], ["Liquid3", 5]]], ["SPEAR_POWAH", { "type": "decay", "x1": 0.4, "x2": 60 }, [["Bits", 10000], ["Liquid3", 5]]], ["SLABI_OREFISH", { "type": "decay", "x1": 0.03, "x2": 60 }, [["Soul6", 150], ["Liquid3", 5]]], ["GAMER_AT_HEART", { "type": "decay", "x1": 0.2, "x2": 60 }, [["SailTr9", 100], ["Liquid3", 6]]], ["SLABI_STRENGTH", { "type": "decay", "x1": 0.25, "x2": 60 }, [["LavaB3b", 2], ["Liquid3", 6]]], ["POWER_TRIONE", { "type": "decay", "x1": 0.23, "x2": 50 }, [["SailTr20", 150], ["Liquid3", 6]]], ["FARQUAD_FORCE", { "type": "decay", "x1": 0.3, "x2": 60 }, [["W6item1", 100], ["Liquid3", 5]]], ["ENDGAME_EFF_I", { "type": "decay", "x1": 0.03, "x2": 60 }, [["SpiA2b", 150], ["Liquid3", 5]]], ["TOME_STRENGTH", { "type": "decay", "x1": 0.025, "x2": 60 }, [["W6item8", 500], ["Liquid4", 6]]], ["ESSENCE_BOOST", { "type": "decay", "x1": 0.5, "x2": 60 }, [["Tree13", 200], ["Liquid4", 6]]], ["CROP_CHAPTER", { "type": "decay", "x1": 0.12, "x2": 50 }, [["W6item10", 1500], ["Liquid4", 6]]]],

    "QUICC": [["SWIFT_STEPPIN", { "type": "add", "x1": 1 }, [["Copper", 5], ["Liquid1", 2]]], ["ARCHER_OR_BUST", { "type": "decayMulti", "x1": 2, "x2": 50 }, [["Grasslands1", 7], ["Liquid1", 2]]], ["HAMMER_HAMMER", { "type": "bigBase", "x1": 23, "x2": 2 }, [["Iron", 10], ["Liquid1", 2]]], ["LIL_BIG_DAMAGE", { "type": "decay", "x1": 0.2, "x2": 100 }, [["Fish1", 20], ["Liquid1", 3]]], ["ANVILNOMICS", { "type": "decay", "x1": 0.4, "x2": 100 }, [["ForestTree", 50], ["Liquid1", 3]]], ["QUICK_SLAP", { "type": "add", "x1": 4 }, [["DesertB1", 90], ["Liquid1", 4]]], ["SANIC_TOOLS", { "type": "decay", "x1": 0.65, "x2": 70 }, [["Jungle1", 130], ["Liquid1", 4]]], ["BUG]", { "type": "bigBase", "x1": 23.5, "x2": 1.5 }, [["Bug3", 70], ["Liquid1", 4]]], ["SHAQURACY", { "type": "add", "x1": 1 }, [["Fish4", 65], ["Liquid1", 5]]], ["CHEAP_SHOT", { "type": "decay", "x1": 0.07, "x2": 100 }, [["Bug5", 35], ["Liquid1", 5]]], ["BOW_JACK", { "type": "decay", "x1": 0.4, "x2": 50 }, [["Soul1", 5], ["Liquid2", 3]]], ["CALL_ME_ASH", { "type": "bigBase", "x1": 25, "x2": 2 }, [["SaharanFoal", 100], ["Liquid2", 3]]], ["CUZ_I_CATCH_EM_ALL", { "type": "decayMulti", "x1": 3, "x2": 100 }, [["Soul3", 25], ["Liquid2", 4]]], ["FAST_BOI_TALENT", { "type": "bigBase", "x1": 5, "x2": 1 }, [["Bug6", 120], ["Liquid2", 2]]], ["GREEN_BARGAIN", { "type": "decay", "x1": 0.4, "x2": 12 }, [["Critter5", 200], ["Liquid2", 3]]], ["DOLLAR_OF_AGILITY", { "type": "decay", "x1": 0.18, "x2": 30 }, [["CraftMat11", 250], ["Liquid3", 3]]], ["PREMIGREEN", { "type": "decayMulti", "x1": 1.4, "x2": 30 }, [["Critter8", 150], ["Liquid3", 3]]], ["FLY_IN_MIND", { "type": "decay", "x1": 0.12, "x2": 40 }, [["Bug7", 350], ["Liquid3", 4]]], ["KILL_PER_KILL", { "type": "decay", "x1": 0.7, "x2": 40 }, [["Refinery4", 6], ["Liquid3", 4]]], ["AFK_EXPEXP", { "type": "decay", "x1": 0.4, "x2": 40 }, [["Bug8", 300], ["Liquid3", 5]]], ["BOW_POWER", { "type": "decay", "x1": 0.4, "x2": 60 }, [["Bits", 10000], ["Liquid3", 5]]], ["SLABO_CRITTERBUG", { "type": "decay", "x1": 0.03, "x2": 60 }, [["Tree9", 500], ["Liquid3", 5]]], ["SAILOR_AT_HEART", { "type": "decay", "x1": 0.16, "x2": 60 }, [["SailTr11", 100], ["Liquid3", 6]]], ["SLABO_AGILITY", { "type": "decay", "x1": 0.25, "x2": 60 }, [["LavaB6", 250], ["Liquid3", 6]]], ["POWER_TRITWO", { "type": "decay", "x1": 0.23, "x2": 50 }, [["SailTr24", 150], ["Liquid3", 6]]], ["QUICKDRAW_QUIVER", { "type": "decay", "x1": 0.4, "x2": 60 }, [["W6item0", 25000], ["Liquid3", 5]]], ["ESSENCE_BOOST", { "type": "decay", "x1": 0.5, "x2": 60 }, [["Tree12", 500], ["Liquid3", 5]]], ["ENDGAME_EFF_II", { "type": "decay", "x1": 0.03, "x2": 60 }, [["W6item3", 150], ["Liquid4", 6]]], ["TOME_AGILITY", { "type": "decay", "x1": 0.025, "x2": 60 }, [["Bug13", 750], ["Liquid4", 6]]], ["STEALTH_CHAPTER", { "type": "decay", "x1": 0.1, "x2": 50 }, [["W6item5", 250], ["Liquid4", 6]]]],

    "HIGH_IQ": [["STABLE_JENIUS", { "type": "add", "x1": 1 }, [["BirchTree", 5], ["Liquid1", 2]]], ["MAGE_IS_BEST", { "type": "decayMulti", "x1": 2, "x2": 50 }, [["Grasslands1", 7], ["Liquid1", 2]]], ["HOCUS_CHOPPUS", { "type": "decay", "x1": 0.5, "x2": 100 }, [["CraftMat5", 10], ["Liquid1", 2]]], ["MOLTO_LOGGO", { "type": "bigBase", "x1": 23.5, "x2": 1.5 }, [["IronBar", 15], ["Liquid1", 3]]], ["NOODUBBLE", { "type": "decay", "x1": 1, "x2": 60 }, [["CraftMat7", 20], ["Liquid1", 3]]], ["NAME_I_GUESS", { "type": "add", "x1": 4 }, [["Gold", 40], ["Liquid1", 4]]], ["LE_BRAIN_TOOLS", { "type": "decay", "x1": 0.65, "x2": 70 }, [["Bug3", 55], ["Liquid1", 4]]], ["COOKIN_ROADKILL", { "type": "decay", "x1": 1.2, "x2": 70 }, [["ToiletTree", 75], ["Liquid1", 4]]], ["BREWSTACHIO", { "type": "decay", "x1": 0.5, "x2": 100 }, [["DesertC1", 150], ["Liquid1", 5]]], ["ALL_FOR_KILL", { "type": "decay", "x1": 0.4, "x2": 100 }, [["StumpTree", 100], ["Liquid1", 5]]], ["MATTY_STAFFORD", { "type": "decay", "x1": 0.4, "x2": 50 }, [["Refinery1", 3], ["Liquid2", 3]]], ["CALL_ME_POPE", { "type": "decayMulti", "x1": 2.4, "x2": 70 }, [["Critter2", 25], ["Liquid2", 3]]], ["GOSPEL_LEADER", { "type": "decay", "x1": 0.6, "x2": 30 }, [["Bug5", 150], ["Liquid2", 4]]], ["SMART_BOI_TALENT", { "type": "bigBase", "x1": 5, "x2": 1 }, [["SnowC1", 150], ["Liquid2", 2]]], ["PURPLE_BARGAIN", { "type": "decay", "x1": 0.4, "x2": 12 }, [["Soul1", 500], ["Liquid2", 3]]], ["NICKEL_OF_WISDOM", { "type": "decay", "x1": 0.18, "x2": 30 }, [["AlienTree", 150], ["Liquid3", 3]]], ["SEVERAPURPLE", { "type": "decayMulti", "x1": 1.4, "x2": 30 }, [["Void", 175], ["Liquid3", 3]]], ["TREE_SLEEPER", { "type": "decay", "x1": 0.12, "x2": 40 }, [["Soul5", 60], ["Liquid3", 4]]], ["HYPERSWIFT", { "type": "decay", "x1": 0.3, "x2": 30 }, [["Fish7", 250], ["Liquid3", 4]]], ["MATRIX_EVOLVED", { "type": "decay", "x1": 0.6, "x2": 40 }, [["Tree8", 250], ["Liquid3", 5]]], ["WAND_PAWUR", { "type": "decay", "x1": 0.4, "x2": 60 }, [["Bits", 10000], ["Liquid3", 5]]], ["SLABE_LOGSOUL", { "type": "decay", "x1": 0.03, "x2": 60 }, [["Bug9", 250], ["Liquid3", 5]]], ["PIOUS_AT_HEART", { "type": "decay", "x1": 3, "x2": 100 }, [["SailTr13", 15], ["Liquid3", 6]]], ["SLABE_WISDOM", { "type": "decay", "x1": 0.25, "x2": 60 }, [["LavaC1", 200], ["Liquid3", 6]]], ["POWER_TRITHREE", { "type": "decay", "x1": 0.23, "x2": 50 }, [["SailTr28", 200], ["Liquid3", 6]]], ["SMARTER_SPELLS", { "type": "decay", "x1": 0.25, "x2": 60 }, [["W6item6", 500], ["Liquid3", 5]]], ["ENDGAME_EFF_III", { "type": "decay", "x1": 0.03, "x2": 60 }, [["W6item7", 950], ["Liquid3", 5]]], ["ESSENCE_BOOST", { "type": "decay", "x1": 0.5, "x2": 100 }, [["Soul7", 250], ["Liquid4", 6]]], ["TOME_WISDOM", { "type": "decay", "x1": 0.025, "x2": 60 }, [["W6item4", 150], ["Liquid4", 6]]], ["ESSENCE_CHAPTER", { "type": "decay", "x1": 0.15, "x2": 50 }, [["W6item0", 250000], ["Liquid4", 6]]]],

    "KAZAM": [
        ["LOTTO_SKILLS", { "type": "add", "x1": 1 }, [["CraftMat1", 5], ["Liquid1", 2]]],
        ["DROPPIN_LOADS", { "type": "decay", "x1": 0.4, "x2": 70 }, [["Fish1", 7], ["Liquid1", 2]]],
        ["STARTUE_EXP", { "type": "decay", "x1": 0.25, "x2": 60 }, [["DesertA1", 10], ["Liquid1", 2]]],
        ["LEVEL_UP_GIFT", { "type": "decay", "x1": 1, "x2": 30 }, [["DesertA3", 15], ["Liquid1", 2]]],
        ["PROWESESSARY", { "type": "decayMulti", "x1": 1.5, "x2": 60 }, [["ToiletTree", 30], ["Liquid1", 3]]],
        ["STAMP_TRAMP", { "type": "add", "x1": 1 }, [["Bug2", 45], ["Liquid1", 4]]],
        ["UNDEVELOPED_COSTS", { "type": "decay", "x1": 0.4, "x2": 70 }, [["Fish3", 65], ["Liquid1", 6]]],
        ["DA_DAILY_DRIP", { "type": "decay", "x1": 0.3, "x2": 100 }, [["CraftMat9", 125], ["Liquid1", 8]]],
        ["GRIND_TIME", { "type": "bigBase", "x1": 9.7, "x2": 0.3 }, [["Liquid1", 50], ["Liquid2", 25]]],
        ["LAAARRRRYYYY", { "type": "decay", "x1": 1.2, "x2": 100 }, [["Dementia", 50], ["Liquid2", 4]]],
        ["COGS_FOR_HANDS", { "type": "add", "x1": 4 }, [["SnowA2", 50], ["Liquid2", 3]]],
        ["SAMPLE_IT", { "type": "decay", "x1": 0.12, "x2": 40 }, [["Soul2", 15], ["Liquid2", 3]]], ["BIG_GAME_HUNTER", { "type": "decay", "x1": 0.6, "x2": 30 }, [["Critter3", 40], ["Liquid2", 4]]], ["IGNORE_OVERDUES", { "type": "decay", "x1": 1, "x2": 60 }, [["Tree7", 120], ["Liquid2", 2]]], ["YELLOW_BARGAIN", { "type": "decay", "x1": 0.4, "x2": 12 }, [["Critter6", 250], ["Liquid2", 3]]], ["MR_MASSACRE", { "type": "decay", "x1": 0.9, "x2": 50 }, [["Refinery3", 8], ["Liquid3", 3]]], ["EGG_INK", { "type": "decay", "x1": 0.4, "x2": 40 }, [["Spice0", 100], ["Liquid3", 4]]], ["DIAMOND_CHEF", { "type": "decayMulti", "x1": 0.3, "x2": 13 }, [["Spice6", 100], ["Liquid3", 4]]], ["CARD_CHAMP", { "type": "decay", "x1": 1, "x2": 40 }, [["Spice9", 100], ["Liquid3", 5]]], ["PETTING_THE_RIFT", { "type": "decay", "x1": 0.15, "x2": 50 }, [["Critter10", 100], ["Liquid3", 5]]], ["BOATY_BUBBLE", { "type": "decay", "x1": 1.35, "x2": 70 }, [["Bits", 5000], ["Liquid3", 5]]], ["BIG_P", { "type": "decayMulti", "x1": 0.5, "x2": 60 }, [["SailTr1", 50], ["Liquid3", 5]]], ["BIT_BY_BIT", { "type": "decay", "x1": 0.5, "x2": 70 }, [["Tree10", 200], ["Liquid3", 5]]], ["GIFTS_ABOUND", { "type": "decay", "x1": 0.4, "x2": 60 }, [["Bug10", 200], ["Liquid3", 6]]], ["ATOM_SPLIT", { "type": "decay", "x1": 0.14, "x2": 40 }, [["LavaC2", 250], ["Liquid3", 6]]], ["CROPIUS_MAPPER", { "type": "decay", "x1": 0.05, "x2": 70 }, [["SpiA5", 1000], ["Liquid3", 5]]], ["ESSENCE_BOOST", { "type": "decay", "x1": 0.5, "x2": 60 }, [["Bug12", 1500], ["Liquid3", 5]]], ["HINGE_BUSTER", { "type": "decay", "x1": 1, "x2": 70 }, [["W6item2", 120], ["Liquid4", 5]]], ["NINJA_LOOTER", { "type": "decayMulti", "x1": 0.3, "x2": 60 }, [["W6item9", 1200], ["Liquid4", 6]]], ["LO_COST_MO_JADE", { "type": "decay", "x1": 0.99, "x2": 40 }, [["SpiD1", 2500], ["Liquid4", 6]]]
    ]
}