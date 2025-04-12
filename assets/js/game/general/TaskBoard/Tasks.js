import { BaseFeature } from "../../BaseFeature.js";
import { TaskTemplate } from "./TaskTemplate.js";

export class Tasks extends BaseFeature {

    constructor(account) {
        super(account);
        let task_stats = account.save_data["TaskZZ0"]
        let task_lvls = account.save_data["TaskZZ1"]
        delete account.save_data_pruned["TaskZZ0"]
        delete account.save_data_pruned["TaskZZ1"]

        this.tasks_data = []
        this.map_name_to_index = {}

        for (let [index, world_tsks] of DATA_TASKS.entries()) {

            let tasks = new TaskTemplate(account, `World_${index + 1}`, world_tsks, task_stats[index], task_lvls[index])

            for (let name of world_tsks) {
                this.map_name_to_index[name] = index
            }
            this.child_features.push(tasks)
        }


    }

    getTotal() {
        return this.child_features.reduce((acc, v) => (acc + v.getTotal()), 0)
    }

    getLevel(name) {
        let index = this.map_name_to_index[name]
        return this.child_features[index].getLevel(name)
    }
    getTaskStat(name) {
        let index = this.map_name_to_index[name]
        return this.child_features[index].getTaskStat(name)
    }
}


const DATA_TASKS = [
    [
        "FACELESS_DEATHMACHINE",
        "JUST_ONE_MORE_BEFORE_BED",
        "SUPER_EXPLOSIVE_GAMEPLAY",
        "NAKEDKNUCKLE_BOXING",
        "PACK_MULE_CRAFTER",
        "STAMP_COOLECTION",
        "SUCH_ROCK_VERY_DOG_WOW",
        "ACHIEVEMENT_HUNTER"
    ],
    [
        "ROAD_TO_MAX_DAMAGE",
        "INVESTING_IN..._BUBBLES?",
        "AVAST,_BANKRUPTCY_HO!",
        "MAXIMUM_EFFICIENCY",
        "NO_TIME_TO_BREWS!",
        "THE_UNSTOPPABLE_USPS",
        "TWILIGHT_TOMBSTONE",
        "ACHIEVEMENT_COWBOY"
    ],
    [
        "WHY_SO_SALTY?",
        "POOF,_COGONE!",
        "MY_SHRINES,_M'LORD.",
        "PRINTER_GO_BRRRR",
        "THE_TRUE_TD_WIZARD",
        "COME_'ERE_CRITTERS!",
        "CHILL_OUT_BIG_BOY!",
        "ACHIEVEMENT_INUIT"
    ],
    [
        "FIRING_UP_LE_GRILL",
        "DISHIN'_OUT_SOME_MEALS",
        "CRACKING_EGGS",
        "PET_BULLET_BURSTING",
        "LIGHT_'EM_UP_UP_UP",
        "CONSOLIDATING_CHIPS",
        "BEGONE_TROLL!",
        "ACHIEVEMENT_ASTRONAUT"
    ],
    [
        "SAILIN'_ROUND_TOWN",
        "DECKED_OUT_DECKS",
        "DIVINILICIOUS_LICKS",
        "TRULY_RIVETING_GAMING",
        "NOW_I_AINT_SAYIN_YOU_A...",
        "SLAB_OF_LEGEND",
        "CRACKING_THE_KRUK!",
        "ACHIEVEMENT_PROMETHEAN"
    ],
    [
        "CROP_NUMBAH",
        "OG,_OH_GEEZ",
        "PEAK_SNEAK",
        "GOLD'S_CHARM",
        "ESSENTIAL_DIGITS",
        "I'LL_TAKE_IT",
        "PILLAGING_THE_EMPEROR!",
        "ACHIEVEMENT_THEIST"
    ]
]