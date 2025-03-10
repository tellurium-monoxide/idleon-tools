import { BaseFeature } from "../../BaseFeature.js";

export class Vials extends BaseFeature {

    constructor(account) {
        super(account);

        let vial_levels = account.save_data["CauldronInfo"][4]


        this.vial_data = DATA_VIALS
        this.max_level_vials = 0
        for (let name in this.vial_data) {
            let id = this.vial_data[name].id
            this.vial_data[name].level = vial_levels[id]
            if (this.vial_data[name].level >= 13) {
                this.max_level_vials++
            }
        }
        // console.log(this.vial_data)
        // this.convertFromIT(vials)

    }

    test() {


        console.log("vial multiplier:", this.getVialBonusMultiplier())
    }


    getVialBonusMultiplier() {
        // TODO
        // takes from vault, lab, rift and max level vials

        let vault_vial_bonus = this.account.general.vault.getBonusByName("Vial_Overtune")
        return (1 + (0.02 * this.max_level_vials)) * (2)
    }
    getVialBonusByName(name) {
        let vial = this.vial_data[name]
        let vial_multi = this.getVialBonusMultiplier()
        return vial_multi * calcGrowingValue(vial.grow, vial.level)
    }
    getDisplay() {
        let display = document.createElement("table")
        for (let [name, vial] of Object.entries(this.vial_data)) {
            let row = document.createElement("tr")
            display.appendChild(row)
            let name_cell = document.createElement("td")
            name_cell.innerText = `${name}`
            row.appendChild(name_cell)

            let input_cell = document.createElement("td")
            row.appendChild(input_cell)
            let input_base = document.createElement("input")
            input_base.type = "number"
            input_base.min = 0
            input_base.max = 13
            input_base.value = vial.level
            input_cell.appendChild(input_base)
            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", name, vial.level, "to", Number(input_base.value))
                vial.level = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }

}




export const DATA_VIALS = { "COPPER_CORONA": { "id": 0, "grow": { "type": "add", "x1": 3 } }, "SIPPY_SPLINTERS": { "id": 1, "grow": { "type": "add", "x1": 3 } }, "MUSHROOM_SOUP": { "id": 2, "grow": { "type": "add", "x1": 3 } }, "SPOOL_SPRITE": { "id": 3, "grow": { "type": "add", "x1": 3 } }, "BARIUM_MIXTURE": { "id": 4, "grow": { "type": "add", "x1": 3 } }, "DIETER_DRINK": { "id": 5, "grow": { "type": "add", "x1": 1 } }, "SKINNY_0_CAL": { "id": 6, "grow": { "type": "add", "x1": 2.5 } }, "THUMB_POW": { "id": 7, "grow": { "type": "add", "x1": 1 } }, "JUNGLE_JUICE": { "id": 8, "grow": { "type": "add", "x1": 1 } }, "BARLEY_BREW": { "id": 9, "grow": { "type": "add", "x1": 1 } }, "ANEARFUL": { "id": 10, "grow": { "type": "add", "x1": 2 } }, "TEA_WITH_PEA": { "id": 11, "grow": { "type": "add", "x1": 3 } }, "GOLD_GUZZLE": { "id": 12, "grow": { "type": "add", "x1": 1 } }, "RAMIFICOCTION": { "id": 13, "grow": { "type": "add", "x1": 1 } }, "SEAWATER": { "id": 14, "grow": { "type": "add", "x1": 1 } }, "TAIL_TIME": { "id": 15, "grow": { "type": "add", "x1": 0.5 } }, "FLY_IN_MY_DRINK": { "id": 16, "grow": { "type": "add", "x1": 3 } }, "MIMICRAUGHT": { "id": 17, "grow": { "type": "add", "x1": 1 } }, "BLUE_FLAV": { "id": 18, "grow": { "type": "decay", "x1": 30, "x2": 7 } }, "SLUG_SLURP": { "id": 19, "grow": { "type": "add", "x1": 2 } }, "PICKLE_JAR": { "id": 20, "grow": { "type": "add", "x1": 50 } }, "FUR_REFRESHER": { "id": 21, "grow": { "type": "add", "x1": 2 } }, "SIPPY_SOUL": { "id": 22, "grow": { "type": "add", "x1": 1 } }, "CRAB_JUICE": { "id": 23, "grow": { "type": "add", "x1": 4 } }, "VOID_VIAL": { "id": 24, "grow": { "type": "add", "x1": 1 } }, "RED_MALT": { "id": 25, "grow": { "type": "add", "x1": 1 } }, "EW_GROSS_GROSS": { "id": 26, "grow": { "type": "add", "x1": 1 } }, "THE_SPANISH_SAHARA": { "id": 27, "grow": { "type": "add", "x1": 1 } }, "POISON_TINCTURE": { "id": 28, "grow": { "type": "add", "x1": 3 } }, "ETRUSCAN_LAGER": { "id": 29, "grow": { "type": "add", "x1": 1 } }, "CHONKER_CHUG": { "id": 30, "grow": { "type": "add", "x1": 1 } }, "BUBONIC_BURP": { "id": 31, "grow": { "type": "add", "x1": 1 } }, "VISIBLE_INK": { "id": 32, "grow": { "type": "add", "x1": 1 } }, "ORANGE_MALT": { "id": 33, "grow": { "type": "add", "x1": 5 } }, "SNOW_SLURRY": { "id": 34, "grow": { "type": "add", "x1": 0.5 } }, "SLOWERGY_DRINK": { "id": 35, "grow": { "type": "add", "x1": 1 } }, "SIPPY_CUP": { "id": 36, "grow": { "type": "add", "x1": 1 } }, "BUNNY_BREW": { "id": 37, "grow": { "type": "add", "x1": 1 } }, "40-40_PURITY": { "id": 38, "grow": { "type": "add", "x1": 1 } }, "SHAVED_ICE": { "id": 39, "grow": { "type": "add", "x1": 1 } }, "GOOSEY_GLUG": { "id": 40, "grow": { "type": "add", "x1": 1 } }, "BALL_PICKLE_JAR": { "id": 41, "grow": { "type": "add", "x1": 25 } }, "CAPACHINO": { "id": 42, "grow": { "type": "add", "x1": 4 } }, "DONUT_DRINK": { "id": 43, "grow": { "type": "add", "x1": 5 } }, "LONG_ISLAND_TEA": { "id": 44, "grow": { "type": "add", "x1": 6 } }, "SPOOK_PINT": { "id": 45, "grow": { "type": "add", "x1": 5 } }, "CALCIUM_CARBONATE": { "id": 46, "grow": { "type": "add", "x1": 11 } }, "BLOAT_DRAFT": { "id": 47, "grow": { "type": "add", "x1": 3 } }, "CHOCO_MILKSHAKE": { "id": 48, "grow": { "type": "decay", "x1": 50, "x2": 7 } }, "PEARL_SELTZER": { "id": 49, "grow": { "type": "add", "x1": 0.5 } }, "KRAKENADE": { "id": 50, "grow": { "type": "add", "x1": 1 } }, "ELECTROLYTE": { "id": 51, "grow": { "type": "add", "x1": 2 } }, "ASH_AGUA": { "id": 52, "grow": { "type": "add", "x1": 2 } }, "MAPLE_SYRUP": { "id": 53, "grow": { "type": "add", "x1": 2 } }, "HAMPTER_DRIPPY": { "id": 54, "grow": { "type": "add", "x1": 2 } }, "DREADNOG": { "id": 55, "grow": { "type": "add", "x1": 2 } }, "DUSTED_DRINK": { "id": 56, "grow": { "type": "add", "x1": 2 } }, "OJ_JOOCE": { "id": 57, "grow": { "type": "add", "x1": 2 } }, "OOZIE_OOBLEK": { "id": 58, "grow": { "type": "add", "x1": 2 } }, "VENISON_MALT": { "id": 59, "grow": { "type": "add", "x1": 2 } }, "MARBLE_MOCHA": { "id": 60, "grow": { "type": "add", "x1": 5 } }, "WILLOW_SIPPY": { "id": 61, "grow": { "type": "add", "x1": 4 } }, "SHINYFIN_STEW": { "id": 62, "grow": { "type": "add", "x1": 7 } }, "DREAMY_DRINK": { "id": 63, "grow": { "type": "add", "x1": 3.5 } }, "RICECAKORADE": { "id": 64, "grow": { "type": "add", "x1": 2 } }, "LADYBUG_SERUM": { "id": 65, "grow": { "type": "add", "x1": 4 } }, "FLAVORGIL": { "id": 66, "grow": { "type": "add", "x1": 7 } }, "GREENLEAF_TEA": { "id": 67, "grow": { "type": "add", "x1": 1.5 } }, "FIREFLY_GROG": { "id": 68, "grow": { "type": "add", "x1": 5 } }, "DABAR_SPECIAL": { "id": 69, "grow": { "type": "add", "x1": 4 } }, "REFRESHMENT": { "id": 70, "grow": { "type": "add", "x1": 2 } }, "GIBBED_DRINK": { "id": 71, "grow": { "type": "add", "x1": 3.5 } }, "DED_SAP": { "id": 72, "grow": { "type": "add", "x1": 3.5 } }, "ROYALE_COLA": { "id": 73, "grow": { "type": "add", "x1": 3.5 } }, "TURTLE_TISANE": { "id": 74, "grow": { "type": "add", "x1": 4 } } };
