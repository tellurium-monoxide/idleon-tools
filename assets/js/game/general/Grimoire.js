import { BaseFeature } from "../BaseFeature.js";
// import { grimoire } from "../website-data.js";
export class Grimoire extends BaseFeature {

    constructor(account) {
        super(account);

        let grimoire_data = account.save_data["Grimoire"]
        delete account.save_data_pruned["Grimoire"]

        // console.log(vault_data)

        // let data = []
        // for (let obj of grimoire) {
        //     let { name, boneType, x1, x2, x5, unlockLevel, x4, x7, x8 } = obj
        //     data.push([name, x4, [x1, x2, x5], boneType, unlockLevel])
        // }
        // console.log(JSON.stringify(data))

        this.grimoire_levels = []
        this.map_name_to_index = {}


        for (let [ind, upg] of DATA_GRIMOIRE.entries()) {
            this.grimoire_levels.push(grimoire_data[ind])
            this.map_name_to_index[upg[0]] = ind
        }
    }


    getLevelByName(name) {
        return this.grimoire_levels[this.map_name_to_index[name]]
    }
}
// schema is
// name, maxlvl, [cost calc?], bone, unlockReq
const DATA_GRIMOIRE = [
    ["WRAITH_DAMAGE", 999999, [8, 1.1, 1], 0, 0],
    ["WRAITH_ACCURACY", 999999, [8, 1.04, 1], 0, 1],
    ["WRAITH_DEFENCE", 999999, [9, 1.1, 1], 0, 5],
    ["WRAITH_HEALTH", 999999, [10, 1.07, 1], 0, 10],
    ["RIBBON_SHELF", 1, [1000, 1.3, 1], 0, 25],
    ["RIBBON_WINNING", 50, [50, 1.6, 1], 0, 26],
    ["WRAITH_DAMAGE_II", 999999, [25, 1.11, 3], 0, 80],
    ["WRAITH_OF_ALL_TRADES", 999999, [50, 1.18, 1], 0, 125],
    ["WRAITH_DESTRUCTION", 999999, [70, 1.15, 1], 0, 155],
    ["LAND_RANK_DATABASE_MAXIM", 10, [100, 10, 1], 0, 190],
    ["WRAITH_CRITS", 40, [150, 1.25, 1], 0, 220],
    ["PURE_OPALS", 25, [1500, 1.8, 1], 1, 255],
    ["WRAITH_ACCURACY_II", 999999, [200, 1.06, 3], 0, 290],
    ["KNOCKOUT!", 999999, [450, 1.45, 1], 1, 330],
    ["SACRIFICE_OF_HARVEST", 999999, [300, 1.04, 5], 0, 380],
    ["WRAITH_DEFENCE_II", 999999, [500, 1.12, 1], 1, 425],
    ["WRAITH_DAMAGE_III", 999999, [750, 1.12, 15], 1, 470],
    ["GREY_TOME_BOOK", 150, [2000, 1.25, 1], 1, 500],
    ["FEMUR_HOARDING", 999999, [3500, 1.15, 2], 1, 550],
    ["WRAITH_HEALTH_II", 999999, [4000, 1.07, 2], 1, 650],
    ["WRAITH_STRIKEFORCE", 999999, [5800, 1.15, 2], 1, 770],
    ["ELIMINATION!", 999999, [6250, 1.45, 1], 1, 900],
    ["SUPERIOR_CROP_RESEARCH", 200, [7500, 1.25, 1], 0, 1050],
    ["BONES_O'_PLENTY", 999999, [8000, 1.2, 2], 1, 1250],
    ["SKULL_OF_MAJOR_EXPERIENCE", 999999, [8500, 1.03, 8], 1, 1475],
    ["WRAITH_ACCURACY_III", 999999, [10500, 1.07, 5], 2, 1700],
    ["SUPREME_HEAD_CHEF_STATUS", 20, [11000, 1.4, 1], 1, 1900],
    ["RIBCAGE_HOARDING", 999999, [12000, 1.2, 1], 0, 2150],
    ["WRAITH_DESTRUCTION_II", 999999, [13900, 1.17, 3], 1, 2300],
    ["VILLAGER_EXTRACIRICULAR", 999999, [15000, 1.15, 1], 2, 2500],
    ["WRAITH_DEFENCE_III", 999999, [14500, 1.11, 2], 2, 2800],
    ["ANNIHILATION!", 999999, [16500, 1.55, 1], 2, 2900],
    ["TALENTS_FOR_ME,_NOT_FOR_THEE", 200, [18000, 1.1, 1], 2, 3150],
    ["WRAITH_DAMAGE_IV", 999999, [19750, 1.13, 50], 2, 3300],
    ["WRAITH_HEALTH_III", 999999, [21500, 1.07, 3], 2, 3500],
    ["SKULL_OF_MAJOR_DAMAGE", 999999, [23000, 1.04, 3], 2, 3750],
    ["WRITHING_GRIMOIRE", 50, [27000, 1.2, 1], 1, 4100],
    ["WRAITH_ACCURACY_IV", 999999, [34000, 1.08, 5], 2, 4200],
    ["WRAITH_OF_ALL_TRADES_II", 999999, [42000, 1.06, 1], 3, 4500],
    ["SKULL_OF_MAJOR_TALENT", 30, [50000, 1.65, 1], 3, 4600],
    ["WRAITH_DEFENCE_IV", 999999, [57000, 1.13, 3], 3, 4800],
    ["CRANIUM_HOARDING", 999999, [63000, 1.07, 1], 3, 5000],
    ["WRAITH_HEALTH_IV", 999999, [75000, 1.09, 5], 3, 5200],
    ["WRAITH_DESTRUCTION_III", 999999, [85000, 1.17, 5], 3, 5400],
    ["SKULL_OF_MAJOR_DROPRATE", 999999, [100000, 1.08, 1], 3, 5600],
    ["OK_FINE,_TALENTS_FOR_THEE_TOO", 999999, [120000, 1.15, 1], 3, 5850],
    ["WRAITH_DAMAGE_V", 999999, [150000, 1.15, 1], 2, 6200],
    ["WRAITH_ACCURACY_V", 999999, [200000, 1.1, 1], 2, 6500],
    ["BOVINAE_HOARDING", 999999, [300000, 1.35, 1], 2, 6800],
    ["WRAITH_DEFENCE_V", 999999, [500000, 1.15, 1], 3, 7100],
    ["WRAITH_DESTRUCTION_IV", 999999, [600000, 1.18, 8], 3, 7200],
    ["DEATH_OF_THE_ATOM_PRICE", 999999, [750000, 1.15, 1], 3, 7500],
    ["RIPPED_PAGE", 1, [1999999999, 99999, 1], 1, 7600],
    ["RIPPED_PAGE", 1, [1999999999, 99999, 1], 1, 7700],
    ["RIPPED_PAGE", 1, [1999999999, 99999, 1], 1, 7800]
]