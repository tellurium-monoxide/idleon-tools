import { BaseFeature } from "../../BaseFeature.js";


export class Bundles extends BaseFeature {

    constructor(account) {
        super(account);
        let bundles = account.save_data["BundlesReceived"]
        delete account.save_data_pruned["BundlesReceived"]


        this.bundles = {}
        for (let [bun, fullname] of Object.entries(DATA_BUNDLES)) {
            delete account.save_data_pruned[bun]
            this.bundles[fullname] = (bundles[bun] == 1)
        }

        // console.log(this.bundles)
    }

    has(name) {
        return this.bundles[name]
    }

    getDisplay() {
        let display = document.createElement("table")

        for (let [name, has] of Object.entries(this.bundles)) {

            let row = display.appendChild(document.createElement("tr"))

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = `${name}`


            let input_cell = row.appendChild(document.createElement("td"))
            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "checkbox"
            input_base.checked = has

            input_base.addEventListener("input", (event) => {
                console.log("change bundle", name, this.bundles[name], "to", input_base.checked)
                this.bundles[name] = input_base.checked
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}


const DATA_BUNDLES = {
    "bun_a": "Lava_Supporter_Pack",
    "bun_b": "New_Year_Pack",
    "bun_c": "Starter_Pack",
    "bun_d": "Easter_Bundle",
    "bun_e": "Totally_Chill_Pack",
    "bun_f": "Summer_Bundle",
    "bun_g": "Dungeon_Bundle",
    "bun_h": "Giftmas_Bundle",
    "bun_i": "Auto-Loot_Pack",
    "bun_j": "Outta_This_World_Pack",
    "bun_k": "Eggscellent_Pack",
    "bun_l": "Super_Hot_Fire_Pack",
    "bun_m": "Gem_Motherlode_Pack",
    "bun_n": "Riftwalker_Pack",
    "bun_o": "Bloomin'_Pet_Pack",
    "bun_p": "Island_Explorer_Pack",
    "bun_q": "Equinox_Pack",
    "bun_r": "Calm_Serenity_Pack",
    "bun_s": "Sacred_Methods_Pack",
    "bun_t": "Timeless_Pack",
    "bun_u": "Ancient_Echos_Pack",
    "bun_v": "Deathbringer_Pack",
    "bun_w": "Windwalker_Pack",
    //_No_bun_x_yet_as_of_v2.36
    "bun_y": "Valenslime_Day_Pack",
    "bun_z": "Fallen_Spirits_Pet_Pack",
    "bon_a": "Storage_Ram_Pack",
    //_No_bon_b_yet_as_of_v2.36
    "bon_c": "Blazing_Star_Anniversary_Pack",
    "bon_d": "Midnight_Tide_Anniversary_Pack",
    "bon_e": "Lush_Emerald_Anniversary_Pack",
    "bon_f": "Eternal_Hunter_Pack"
}