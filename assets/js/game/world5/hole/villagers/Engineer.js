import { BaseFeature } from "../../../BaseFeature.js";

export class Engineer extends BaseFeature {


    constructor(account) {
        super(account);

        let schematics_data = account.save_data["Holes"][13]
        this.unlocks = []
        this.map_name_to_index = {}
        for (let [ind, sch] of DATA_SCHEMATICS.entries()) {
            this.unlocks.push(schematics_data[sch[1]] == 1)
            // this.unlocks.push(schematics_data[ind] == 1)
            this.map_name_to_index[sch[0]] = ind
        }
    }

    test() {


        // generate data from IT
        // let data = Array(holesBuildings.length)
        // let order = holesInfo[40]
        // console.log(order)
        // let ord = order.split(' ')
        // for (let [ind, pos] of ord.entries()) {
        //     let sch = holesBuildings[Number(pos)]
        //     let lvlreq = DATA_SCHEMATICS[ind][2]
        //     data[ind] = [sch.name, Number(pos), lvlreq]
        // }
        // console.log(JSON.stringify(data))
    }

    hasSchematic(name) {
        if (name in this.map_name_to_index) {
            let ind = this.map_name_to_index[name]
            let has = this.unlocks[ind]
            return has
        }
        throw new Error(`${name} is not a valid schematic`)
    }

    getDisplay() {
        let display = document.createElement("table")
        let row = display.appendChild(document.createElement("tr"))
        for (let [ind, sch] of DATA_SCHEMATICS.entries()) {

            if (ind % 6 == 0) {
                row = display.appendChild(document.createElement("tr"))
            }

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = `${sch[0]}`


            let input_cell = row.appendChild(document.createElement("td"))
            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "checkbox"
            input_base.checked = this.unlocks[ind]

            input_base.addEventListener("input", (event) => {
                console.log("change schematic", sch[0], this.unlocks[ind], "to", input_base.checked)
                this.unlocks[ind] = input_base.checked
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }

}
export const DATA_SCHEMATICS = [
    ["OPAL_DIVIDENDS", 0, 1],
    ["BETTER_BUCKETS", 1, 1],
    ["LOADIN'_SOME_'LODE", 58, 1],
    ["HIRING_THE_HOUNDS_FROM_BEYOND", 59, 1],
    ["CAVERN_'PORTING", 2, 2],
    ["BAR_EXPAND-O-RAMA", 12, 2],
    ["2ND_BUCKET!", 3, 2],
    ["DNA_ROCK_TUMBLER", 52, 3],
    ["MOTHERLODE_~_BUCKET_SYNERGY", 15, 3],
    ["GREEN_AMPLIFIER", 16, 3],
    ["EXPANDER_EXTRAVAGANZA", 14, 4],
    ["EVEN_BETTER_BUCKETS", 26, 4],
    ["THE_STORY_CHANGES_OVER_TIME...", 24, 4],
    ["3RD_BUCKET!", 4, 5],
    ["TRUE_GOLDEN_EDGE", 57, 5],
    ["DOUBLE_DINGER_RINGER", 42, 5],
    ["PINK_AMPLIFIER", 17, 5],
    ["HEAVY_REDSTONE_SEASONING", 56, 6],
    ["MOTHERLODE_TRICKLEDOWN", 49, 6],
    ["LOADED_HARP", 32, 6],
    ["EEE_STRING", 27, 7],
    ["UBER_BAR_EXPAND-O-RAMA-HALA", 13, 7],
    ["4TH_BUCKET!", 5, 7],
    ["YELLOW_AMPLIFIER", 18, 8],
    ["TUNE_OF_ARTIFACTION", 55, 8],
    ["IMPROVEMENT_STACKIN'", 45, 8],
    ["RNG_OXIDIZING_LAYER", 43, 9],
    ["STRINGY_EFFECT", 39, 9],
    ["PACKED_HARP", 33, 9],
    ["DOMINO_EFFECT", 37, 10],
    ["FRACTALFLY_~_HARP_SYNERGY", 41, 10],
    ["FIVE_NIGHTS_AT_BUCKET", 6, 10],
    ["EFF_STRING", 28, 10],
    ["CYAN_AMPLIFIER", 19, 11],
    ["TRIPLE_TAP_TINKLE", 60, 11],
    ["FIRST_TRY,_I_SWEAR!", 25, 11],
    ["AMPLIFIER_STACKIN'", 23, 12],
    ["GEEZ_STRING", 29, 12],
    ["FINAL_BALLAD_OF_THE_SNAIL", 53, 12],
    ["FRACTALFLY_TRICKLEDOWN", 50, 13],
    ["HEFTY_HARP", 34, 13],
    ["REROLL_KEEPER", 40, 13],
    ["6TH_BUCKET!", 7, 14],
    ["PURPLE_AMPLIFIER", 20, 14],
    ["GLOOMIE_LOOTIE", 46, 14],
    ["VARIETY_EFFECT", 38, 15],
    ["GLOOMIE_EXPIE", 47, 15],
    ["GLOOMIE_OPIE", 48, 15],
    ["NOISE_REDUCTION_THERAPY", 54, 15],
    ["GLOOMIE_MULCH", 44, 16],
    ["COMPOUND_INTEREST", 61, 16],
    ["MULTITUDINAL_HARP", 35, 16],
    ["7RTH_BARCKOT?!", 8, 17],
    ["WHITE_AMPLIFIER", 21, 17],
    ["AYE_STRING", 30, 17],
    ["LAST_BUCKET!", 9, 18],
    ["BIG_JAR_MACH_II", 62, 18],
    ["SUPERGIANT_JARS", 71, 18],
    ["EVERTREE_~_RUPIE_SYNERGY", 80, 19],
    ["BREAK_ALL_BUTTON", 69, 19],
    ["EVERTREE_TRICKLEDOWN", 79, 19],
    ["BIG_JAR_MACH_III", 63, 20],
    ["PEER_REVIEWED_BOOKS", 85, 20],
    ["JAR_PRODUCTION_LINE", 74, 20],
    ["ROCK_SMART", 81, 20],
    ["SUMPTUOUS_HARP", 36, 21],
    ["HORSEY_GAMBIT", 89, 21],
    ["BIG_JAR_MACH_IV", 64, 21],
    ["BISHOP_GAMBIT", 90, 22],
    ["COLLECT_'EM_ALL", 76, 22],
    ["MAX_MONUMENT_REWARDS", 70, 22],
    ["CUTTING_EDGE_RESEARCH", 87, 23],
    ["QUEEN_GAMBIT", 91, 23],
    ["BIG_JAR_MACH_V", 65, 23],
    ["THE_SICILIAN", 78, 24],
    ["LIGHT_SPEED", 72, 24],
    ["ALL_THIS_RINGING_IN_MY_EARS", 86, 24],
    ["BIG_JAR_MACH_VI", 66, 25],
    ["CASTLE_GAMBIT", 92, 25],
    ["DARK_AMPLIFIER", 22, 25],
    ["DARK_LUCK", 73, 25],
    ["SANCTUM_OF_LOOT", 82, 26],
    ["BIG_JAR_MACH_VII", 67, 26],
    ["9TH_BUCKET!", 10, 26],
    ["ADVANCED_COLLECTION", 75, 27],
    ["ROARING_FLAME", 77, 27],
    ["SANCTUM_OF_EXP", 83, 27],
    ["NOOB_GAMBIT", 93, 28],
    ["BUCKET_FINALE!", 11, 28],
    ["BIG_JAR_MACH_VIII", 68, 28],
    ["BILLION_DOLLAR_GRANT", 88, 29],
    ["SANCTUM_OF_DMG", 84, 29],
    ["RIFT_GUY", 51, 29],
    ["BEE_STRING", 31, 30]
]
