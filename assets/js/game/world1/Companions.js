import { BaseFeature } from "../BaseFeature.js";
export class Companions extends BaseFeature {

    constructor(account) {
        super(account);
        // let companions = account.save_data["Companions"]
        // delete account.save_data_pruned["Companions"]

        // true by default because I don't know where to look for this in save data
        this.companions = Array(DATA_COMPANIONS.length).fill(true)
        this.map_name_to_index = {}
        for (let [ind, comp] of DATA_COMPANIONS.entries()) {
            this.map_name_to_index[comp] = ind
        }
    }

    has(name) {
        return this.companions[this.map_name_to_index[name]]
    }
}

const DATA_COMPANIONS = [
    "KING_DOOT",
    "RIFT_SLUG",
    "DEDOTATED_RAM",
    "CRYSTAL_CUSTARD",
    "SHEEPIE",
    "MOLTI",
    "BORED_BEAN",
    "SLIME",
    "SANDY_POT",
    "BLOQUE",
    "FROG",
    "GLUNKO_SUPREME",
    "ANCIENT_GOLEM",
    "SAMURAI_GUARDIAN",
    "RIFT_JOCUND",
    "LEEK_SPIRIT",
    "CRYSTAL_CAPYBARA",
    "BIGGOLE_MOLE",
    "GIGAFROG",
    "MASHED_POTATO",
    "FLYING_WORM",
    "POISONIC_FROG",
    "QUENCHIE",
    "GREEN_MUSHROOM",
    "COOL_BIRD",
    "AXOLOTL",
    "MALLAY",
]