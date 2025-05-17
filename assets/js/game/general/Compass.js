import { BaseFeature } from "../BaseFeature.js";


export class Compass extends BaseFeature {

    constructor(account) {
        super(account);

        let compass_data = account.save_data["Compass"]
        delete account.save_data_pruned["Compass"]


        // let data = []
        // for (let obj of compass) {
        //     let { name, x1, x2, x4, } = obj
        //     data.push([name, x4, [x1, x2]])
        // }
        // console.log(JSON.stringify(data))

        this.compass_levels = []
        this.map_name_to_index = {}


        for (let [ind, upg] of DATA_COMPASS.entries()) {
            this.compass_levels.push(compass_data[0][ind])
            this.map_name_to_index[upg[0]] = ind
        }
    }


    getLevelByName(name) {
        return this.compass_levels[this.map_name_to_index[name]]
    }

    getDisplay() {
        let display = document.createElement("table")
        for (let [ind, upg] of DATA_COMPASS.entries()) {

            let level = this.compass_levels[ind]
            let [name, max] = upg

            let row = display.appendChild(document.createElement("tr"))
            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = name

            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.max = max
            input_base.value = level

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change compass upgrade", name, this.compass_levels[ind], "to", Number(input_base.value))
                this.compass_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}




const DATA_COMPASS = [
    ["PATHFINDER", 1, [2, 1.1]],
    ["ELEMENTAL_PATH", 24, [30, 3.1]],
    ["ELEMENTAL_VISION", 1, [8, 1.1]],
    ["WEAPON_DROP", 1, [14, 1.1]],
    ["STONE_DROP", 1, [20, 1.1]],
    ["MEDALLION_COLLECTION", 1, [50, 1.1]],
    ["MEDALLION_MAGNATE", 999999, [8, 28]],
    ["THE_LUCK_FACTOR", 25, [8, 9.6]],
    ["ELEMENTAL_DESTRUCTION", 50, [8, 1.6]],
    ["TOP_OF_THE_MORNIN'", 999999, [8, 1.1]],
    ["WEAPON_IMPROVEMENT", 999999, [8, 1.08]],
    ["STONE_FAILSAFE", 25, [8, 1.9]],
    ["RING_DROP", 1, [40, 1.1]],
    ["FIGHTER_PATH", 31, [2, 2.9]],
    ["TEMPEST_DAMAGE", 999999, [4, 1.12]],
    ["TEMPEST_MEGA_DAMAGE", 999999, [8, 1.15]],
    ["TEMPEST_CRITS", 25, [8, 1.7]],
    ["TEMPEST_ACCURACY", 999999, [5, 1.07]],
    ["MULTISHOT", 999999, [8, 1.25]],
    ["TEMPEST_BULLSEYE", 999999, [8, 1.085]],
    ["TEMPEST_MAXHIT", 999999, [8, 1.35]],
    ["TEMPEST_RAPIDSHOT", 999999, [8, 1.75]],
    ["STARDUST_HOARDING", 999999, [8, 1.1]],
    ["COOLDUST_HOARDING", 999999, [8, 1.1]],
    ["TEMPEST_ULTRA_DAMAGE", 999999, [8, 1.15]],
    ["TEMPEST_ONE_HUUUUNDRED_AND_EIGHTY", 999999, [8, 1.13]],
    ["MASTERY_DESTRUCTION", 999999, [8, 1.35]],
    ["SURVIVAL_PATH", 26, [4, 3]],
    ["TEMPEST_HEARTBEAT", 999999, [8, 1.08]],
    ["TEMPEST_DEFENCE", 999999, [8, 1.1]],
    ["MOONDUST_HOARDING", 999999, [8, 1.1]],
    ["MOUNTAINS_OF_DUST", 999999, [8, 1.25]],
    ["TEMPEST_REACH", 100, [8, 1.3]],
    ["NOVADUST_DISCOVERY", 999999, [8, 1.2]],
    ["SOLARDUST_HOARDING", 999999, [8, 1.42]],
    ["5_MINUTE_MILE", 999999, [8, 1.15]],
    ["KNOCKOFF_COMPASS", 999999, [8, 1.75]],
    ["CAN'T_TOUCH_THIS", 30, [8, 1.6]],
    ["SPIRE_OF_DUST", 999999, [8, 1.4]],
    ["CIRCLE_SUPREMACY", 999999, [8, 1.9]],
    ["NOMADIC_PATH", 38, [8, 2.8]],
    ["JADE_COINAGE", 999999, [8, 1.07]],
    ["CRITTER_CULTURE", 999999, [8, 1.4]],
    ["MOON_OF_PRINT", 200, [8, 1.1]],
    ["EXALTED_STAMPS", 999999, [95, 20]],
    ["MOON_OF_SNEAK", 999999, [8, 1.1]],
    ["TALENTED_MASTERS", 999999, [8, 1.22]],
    ["MAGNESIUM_ATOM", 1, [80, 1.1]],
    ["MOON_OF_DAMAGE", 999999, [8, 1.06]],
    ["ALL_KNOWING_EYE", 999999, [8, 1.05]],
    ["ATOMIC_COST_CRASH", 999999, [8, 1.18]],
    ["MOON_OF_EXPERIENCE", 999999, [8, 1.04]],
    ["OPA_OPA_OPA!", 25, [8, 2.1]],
    ["ATOMIC_POTENTIAL", 20, [8, 1.95]],
    ["PRISTINE_COLLECTOR", 999999, [8, 1.65]],
    ["MONUMENT_HOMAGE", 999999, [8, 1.3]],
    ["MY_TALENT_IS_BEST_TALENT", 200, [8, 1.16]],
    ["MOON_OF_SLEEP", 999999, [8, 1.4]],
    ["ALUMINIUM_ATOM", 1, [2800, 1.1]],
    ["VILLAGERZ_LEARNZ", 999999, [8, 1.32]],
    ["ABOMINATION_SLAYER_I", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_II", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_III", 999999, [8, 1.21]],
    ["ABOMINATION_SLAYER_IV", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_V", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_VI", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_VII", 999999, [8, 3.5]],
    ["ABOMINATION_SLAYER_VIII", 999999, [8, 2.1]],
    ["ABOMINATION_SLAYER_IX", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_X", 999999, [8, 1.5]],
    ["ABOMINATION_SLAYER_XI", 999999, [8, 5.1]],
    ["ABOMINATION_SLAYER_XII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XIII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XIV", 999999, [8, 1.3]],
    ["ABOMINATION_SLAYER_XV", 999999, [8, 1.2]],
    ["ABOMINATION_SLAYER_XVI", 999999, [8, 1.25]],
    ["ABOMINATION_SLAYER_XVII", 999999, [8, 37]],
    ["ABOMINATION_SLAYER_XVIII", 999999, [8, 1.45]],
    ["ABOMINATION_SLAYER_XIX", 999999, [8, 1.25]],
    ["ABOMINATION_SLAYER_XX", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXI", 999999, [8, 4.65]],
    ["ABOMINATION_SLAYER_XXII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXIII", 999999, [8, 1.12]],
    ["ABOMINATION_SLAYER_XXIV", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXV", 999999, [8, 1.25]],
    ["ABOMINATION_SLAYER_XXVI", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXVII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXVIII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXIX", 999999, [8, 1.5]],
    ["ABOMINATION_SLAYER_XXX", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXI", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXIII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXIV", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXV", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXVI", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXVII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXVIII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XXXIX", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XL", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XLI", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XLII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XLIII", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XLIV", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XLV", 999999, [8, 1.1]],
    ["ABOMINATION_SLAYER_XLVI", 999999, [8, 1.1]],
    ["WEAPON_DROPS", 999999, [8, 1.1]],
    ["MEDALLION_DROPS", 999999, [8, 1.1]],
    ["GRASS_WEAPON_DROPS", 999999, [8, 1.1]],
    ["FIRE_WEAPON_DROPS", 999999, [8, 1.1]],
    ["STONE_DROPS_I", 999999, [8, 1.1]],
    ["LUCKY_DROPS_I", 999999, [8, 1.1]],
    ["RING_DROPS_I", 999999, [8, 1.1]],
    ["STONE_DROPS_II", 999999, [8, 1.1]],
    ["WIND_WEAPON_DROPS", 999999, [8, 1.1]],
    ["LUCKY_DROPS_II", 999999, [8, 1.1]],
    ["LUCKY_DROPS_III", 999999, [8, 1.1]],
    ["ICE_WEAPON_DROPS", 999999, [8, 1.1]],
    ["RING_DROPS_II", 999999, [8, 1.1]],
    ["TEMPEST_DAMAGE_I", 999999, [8, 1.04]],
    ["TEMPEST_ACCURACY_I", 999999, [8, 1.03]],
    ["TEMPEST_DAMAGE_IV", 999999, [8, 1.06]],
    ["TEMPEST_DAMAGE_II", 999999, [8, 1.04]],
    ["TEMPEST_DAMAGE_III", 999999, [8, 1.05]],
    ["TEMPEST_ACCURACY_II", 999999, [8, 1.04]],
    ["TEMPEST_ACCURACY_III", 999999, [8, 1.05]],
    ["TEMPEST_DAMAGE_X", 999999, [1, 1.04]],
    ["TEMPEST_DAMAGE_VII", 999999, [8, 1.09]],
    ["TEMPEST_ACCURACY_V", 999999, [8, 1.07]],
    ["TEMPEST_DAMAGE_V", 999999, [8, 1.07]],
    ["TEMPEST_DAMAGE_VI", 999999, [8, 1.08]],
    ["TEMPEST_ACCURACY_VII", 999999, [8, 1.09]],
    ["TEMPEST_DAMAGE_VIII", 999999, [8, 1.1]],
    ["TEMPEST_ACCURACY_VI", 999999, [8, 1.08]],
    ["TEMPEST_ACCURACY_IV", 999999, [8, 1.06]],
    ["TEMPEST_DAMAGE_IX", 999999, [8, 1.1]],
    ["TEMPEST_ACCURACY_VIII", 999999, [8, 1.1]],
    ["TEMPEST_DEFENCE_I", 999999, [8, 1.05]],
    ["TEMPEST_DEFENCE_III", 999999, [8, 1.08]],
    ["DE_DUST_I", 999999, [8, 1.1]],
    ["TEMPEST_HEALTH_I", 999999, [8, 1.1]],
    ["TEMPEST_DEFENCE_II", 999999, [8, 1.06]],
    ["DE_DUST_II", 999999, [8, 1.1]],
    ["TEMPEST_DEFENCE_VI", 999999, [8, 1.1]],
    ["TEMPEST_DEFENCE_IV", 999999, [8, 1.09]],
    ["DE_DUST_III", 999999, [8, 1.1]],
    ["TEMPEST_HEALTH_II", 999999, [8, 1.1]],
    ["TEMPEST_ACCURACY..?", 999999, [8, 1.1]],
    ["DE_DUST_IV", 999999, [8, 1.1]],
    ["TEMPEST_DEFENCE_V", 999999, [8, 1.1]],
    ["DE_DUST_V", 999999, [8, 1.1]],
    ["SNEAKY_SALE_I", 999999, [8, 1.1]],
    ["SNEAKY_SALE_II", 999999, [8, 1.1]],
    ["SNEAKY_SALE_III", 999999, [8, 1.1]],
    ["PRINTER_SALE_I", 999999, [8, 1.1]],
    ["DAMAGE_SALE_I", 999999, [8, 1.1]],
    ["PRINTER_SALE_II", 999999, [8, 1.1]],
    ["DAMAGE_SALE_II", 999999, [8, 1.1]],
    ["DAMAGE_SALE_III", 999999, [8, 1.1]],
    ["SNOOZER_SALE_I", 999999, [8, 1.1]],
    ["SNOOZER_SALE_II", 999999, [8, 1.1]],
    ["SNOOZER_SALE_III", 999999, [8, 1.1]],
    ["EXPERIENCE_SALE_I", 999999, [8, 1.1]],
    ["EXPERIENCE_SALE_II", 999999, [8, 1.1]],
    ["EXPERIENCE_SALE_III", 999999, [8, 1.1]],
    ["PRISTINE_SALE_I", 999999, [8, 1.1]],
    ["EXPERIENCE_SALE_IV", 999999, [8, 1.1]],
    ["EXPERIENCE_SALE_V", 999999, [8, 1.1]],
    ["SNOOZER_SALE_IV", 999999, [8, 1.1]],
    ["PRISTINE_SALE_II", 999999, [8, 1.1]],
    ["WORLDFINDER", 1, [2, 1.1]],
]
