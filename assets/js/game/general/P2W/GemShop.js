import { BaseFeature } from "../../BaseFeature.js";

// import { gemShop } from "../../website-data.js";

export class GemShop extends BaseFeature {

    constructor(account) {
        super(account);
        let purchased = account.save_data["GemItemsPurchased"]
        this.purchased = {}
        for (let [category, sections] of Object.entries(DATA_GEMSHOP)) {

            for (let [section, upgs] of Object.entries(sections)) {

                for (let upg of upgs) {

                    // TODO: sum if same name
                    let [name, index] = upg
                    this.purchased[name] = purchased[index]
                }
            }
        }
    }

    getLevelPurchased(name) {
        return this.purchased[name]
    }


    convertFromIT() {
        // let data = {}
        // for (let [ind, sections] of gemShop.entries()) {
        //     data[sections.name] = {}
        //     console.log(sections.name)
        //     for (let [cat, obj] of Object.entries(sections.sections)) {
        //         data[sections.name][cat] = []
        //         console.log(obj)
        //         for (let upg of obj) {

        //             let { displayName, cost, globalIndex, maxPurchases, quantity, costIncrement } = upg

        //             data[sections.name][cat].push([displayName, globalIndex, [cost, costIncrement, maxPurchases], quantity])
        //         }
        //     }
        // }

        // console.log((data))
        // console.log(JSON.stringify(data))
    }
}

const DATA_GEMSHOP = {
    "oddities": {
        "CAVERNS": [
            ["2_HOUR_LANTERN", 0, [245, 0, 6], 1],
            ["PARALLEL_VILLAGERS", 1, [780, 0, 5], 0],
            ["RESOURCE_BOOST", 2, [420, 15, 10], 0],
            ["NAME_OF_ITEM", 3, [250, 0, 100000], 1],
            ["CONJUROR_PTS", 4, [330, 15, 12], 0],
            ["OPAL", 5, [275, 10, 20], 0],
            ["NAME_OF_ITEM", 6, [3000, 0, 100000], 1],
            ["NAME_OF_ITEM", 7, [200, 0, 100000], 1],
        ],
    },
    "usables": {
        "Time_Candy": [
            ["JUST_ONE,_PLEASE", 47, [40, 0, 4], 1],
            ["BABY'S_FIRST_LOLLY", 48, [80, 0, 4], 1],
            ["KID_IN_A_CANDY_STORE", 49, [150, 0, 4], 1],
            ["ABSOLUTE_SUGAR_MANIAC", 50, [270, 0, 4], 1],
            ["NAME_OF_ITEM", 51, [null, 0, 1], 1],
            ["NAME_OF_ITEM", 52, [null, 0, 1], 1],
            ["NAME_OF_ITEM", 53, [null, 0, 1], 1],
            ["COSMIC_CANDY", 54, [325, 0, 100000], 1]
        ],
        "Inventory_&_Storage": [
            ["ITEM_BACKPACK_SPACE", 55, [200, 25, 6], 1],
            ["STORAGE_CHEST_SPACE", 56, [175, 25, 12], 1],
            ["CARRY_CAPACITY", 58, [150, 25, 10], 0],
            ["FOOD_SLOT", 59, [450, 300, 2], 0],
            ["NAME_OF_ITEM", 60, [null, 0, 1], 1],
            ["MORE_STORAGE_SPACE", 109, [450, 12, 10], 1],
            ["CARD_PRESETS", 66, [250, 160, 5], 0],
            ["NAME_OF_ITEM", 62, [null, 0, 1], 1]
        ],
        "Dailies_N_Resets": [
            ["DAILY_TELEPORTS", 71, [120, 40, 10], 0],
            ["DAILY_MINIGAME_PLAYS", 72, [150, 50, 4], 0],
            ["REGULAR_TALENT_RESET", 73, [200, 0, 10], 1],
            ["STAR_TALENT_RESET", 74, [300, 0, 3], 1],
            ["SUBCLASS_SWAP_TOKEN", 75, [500, 250, 2], 1],
            ["PANDORAS_OFFICE_BOX", 76, [250, 0, 1], 1],
            ["NAME_OF_ITEM", 77, [null, 0, 1], 1],
            ["NAME_OF_ITEM", 78, [null, 0, 1], 1]
        ],
        "Cards": [
            ["NEWBIE_CARD_PACK", 64, [200, 0, 100000], 1],
            ["ANCIENT_CARD_PACK", 65, [425, 0, 100000], 1],
            ["ETERNAL_CARD_PACK", 65, [600, 0, 100000], 1],
            ["GALAXY_CARD_PACK", 69, [650, 0, 100000], 1],
            ["EXTRA_CARD_SLOT", 63, [150, 40, 4], 0],
            ["4_STAR_CARDIFIER", 67, [325, 0, 100000], 0],
            ["SMOLDERIN_CARD_PACK", 61, [690, 0, 100000], 1],
            ["SPIRIT_CARD_PACK", 70, [720, 0, 100000], 1]
        ],
        "Goods_&_Services": [
            ["SMOL_ARCADE_BALLS", 79, [100, 0, 100000], 0],
            ["MED_ARCADE_BALLS", 80, [275, 0, 100000], 0],
            ["BIGGY_ARCADE_BALLS", 81, [1250, 0, 100000], 0],
            ["NAME_OF_ITEM", 82, [null, 0, 1], 1],
            ["WEEKLY_DUNGEON_BOOSTERS", 84, [275, 40, 11], 0],
            ["TIER_1_KEYCHAIN", 86, [150, 0, 100000], 0],
            ["TIER_2_KEYCHAIN", 85, [325, 0, 100000], 0],
            ["TIER_3_KEYCHAIN", 83, [490, 0, 100000], 0]
        ],
        "Limited_Specials": [
            // ["2_HOUR_LANTERN", 87, [1, 0, 1], 1],
            // ["2_HOUR_LANTERN", 88, [1, 0, 2], 1],
            // ["2_HOUR_LANTERN", 89, [1, 0, 1], 1],
            // ["2_HOUR_LANTERN", 90, [1, 0, 3], 1],
            // ["2_HOUR_LANTERN", 91, [1, 0, 1], 1],
            // ["2_HOUR_LANTERN", 92, [1, 0, 1], 1],
            // ["2_HOUR_LANTERN", 93, [1, 0, 2], 1],
            // ["2_HOUR_LANTERN", 94, [1, 0, 1], 1]
        ]
    },
    "bonuses": {
        "Premium_Stones": [
            ["STR_STONE", 95, [200, 0, 100000], 1],
            ["AGI_STONE", 96, [200, 0, 100000], 1],
            ["WIS_STONE", 97, [200, 0, 100000], 1],
            ["LUK_STONE", 98, [175, 0, 100000], 1],
            ["NAME_OF_ITEM", 99, [null, 0, 1], 1],
            ["HAT_PREMIUMIFIER", 100, [250, 0, 100000], 1],
            ["PREMIUM_HAT_SWAPPER", 101, [25, 0, 100000], 1],
            ["PREMIUM_STONE_REFUND", 102, [30, 0, 100000], 1]],
        "World_1_&_2": [
            ["INFINITY_HAMMER", 103, [300, 0, 1], 0],
            ["BRIMSTONE_FORGE_SLOT", 104, [100, 15, 16], 0],
            ["IVORY_BUBBLE_CAULDRONS", 105, [300, 50, 4], 0],
            ["BLEACH_LIQUID_CAULDRONS", 106, [500, 0, 4], 0],
            ["OBOL_STORAGE_SPACE", 57, [250, 50, 12], 0],
            ["QUALITY_OBOL_STACK", 107, [250, 0, 100000], 1],
            ["MARVELOUS_OBOL_STACK", 108, [550, 0, 100000], 1],
            ["SIGIL_SUPERCHARGE", 110, [250, 30, 10], 0]
        ],
        "World_3": [
            ["CRYSTAL_3D_PRINTER", 111, [875, 0, 1], 0],
            ["MORE_SAMPLE_SPACES", 112, [275, 100, 6], 0],
            ["BURNING_BAD_BOOKS", 113, [250, 75, 4], 0],
            ["PRAYER_SLOTS", 114, [250, 75, 4], 0],
            ["ZEN_COGS", 115, [500, 125, 8], 0],
            ["COG_INVENTORY_SPACE", 116, [100, 40, 20], 0],
            ["TOWER_BUILDING_SLOTS", 117, [350, 100, 4], 0],
            ["FLUORESCENT_FLAGGIES", 118, [250, 75, 6], 0]
        ],
        "World_4": [
            ["ROYAL_EGG_CAP", 119, [350, 50, 5], 0],
            ["RICHELIN_KITCHEN", 120, [250, 40, 10], 0],
            ["CONSOLE_CHIP", 121, [385, 0, 7], 0],
            ["MAINFRAME_JEWEL", 122, [450, 0, 2], 0],
            ["SOUPED_UP_TUBE", 123, [480, 65, 5], 0],
            ["PET_STORAGE", 124, [325, 55, 12], 0],
            ["FENCEYARD_SPACE", 125, [275, 45, 6], 0],
            ["CARTON_OF_EGGS", 126, [270, 0, 4], 1]
        ],
        "World_5": [
            ["MIRACLE_CHEST", 127, [345, 0, 3], 0],
            ["BOTTLED_WIND", 128, [190, 0, 4], 1],
            ["CHEST_SLUGGO", 129, [250, 40, 12], 0],
            ["ANCIENT_ARTIFACT", 134, [790, 0, 2], 0],
            ["DIVINITY_SPARKIE", 130, [250, 50, 6], 0],
            ["GOLDEN_SPRINKLER", 131, [400, 75, 4], 0],
            ["GAMING_FERTILIZER", 132, [230, 0, 4], 1],
            ["LAVA_SPROUTS", 133, [310, 70, 6], 0]
        ],
        "World_6": [
            ["PLOT_OF_LAND", 135, [420, 40, 12], 0],
            ["PRISTINE_CHARM", 136, [920, 0, 2], 0],
            ["SHROOM_FAMILIAR", 137, [750, 40, 6], 0],
            ["SAND_OF_TIME", 138, [190, 0, 6], 1],
            ["INSTAGROW_GENERATOR", 139, [610, 50, 8], 0],
            ["LIFE_REFILL", 140, [75, 12, 12], 0],
            ["COMPOST_BAG", 150, [155, 0, 9], 1],
            ["SUMMONER_STONE", 151, [155, 0, 9], 1]
        ]
    },
    "mtx": {
        "etc": [

            ["LOVERS_CHAT_RING", 24, [300, 0, 100000], 1],
            ["ALL_NATURAL_CHAT_RING", 25, [250, 0, 100000], 1],
            ["BANDIT_BOB_CHAT_RING", 26, [350, 0, 100000], 1],
            ["BUBBLE_POP_CHAT_RING", 27, [325, 0, 100000], 1],
            ["EYES_OF_CTHULU_CHAT_RING", 28, [400, 0, 100000], 1],
            ["MONEY_TALKS_CHAT_RING", 31, [2500, 0, 100000], 1],
            ["HONK_RING", 29, [300, 0, 100000], 1],]
    }
}