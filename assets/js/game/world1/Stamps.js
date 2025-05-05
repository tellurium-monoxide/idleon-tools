import { BaseFeature } from "../BaseFeature.js";
export class Stamps extends BaseFeature {

    constructor(account) {
        super(account);


        let stamp_lvls = account.save_data["StampLv"]
        let stamp_maxlvls = account.save_data["StampLvM"]

        let exalted = account.save_data.Compass[4]
        delete account.save_data_pruned["StampLv"]
        delete account.save_data_pruned["StampLvM"]



        this.stamp_lvls = [[], [], []]
        this.stamp_maxlvls = [[], [], []]
        this.exalted_stamps = [[], [], []]

        this.map_name_to_indexes = {}
        for (let [ind_cat, STAMPS] of DATA_STAMPS.entries()) {
            for (let [ind_stamp, stamp] of STAMPS.entries()) {
                this.stamp_lvls[ind_cat].push(stamp_lvls[ind_cat][ind_stamp])
                this.stamp_maxlvls[ind_cat].push(stamp_maxlvls[ind_cat][ind_stamp])
                this.exalted_stamps[ind_cat].push(false)

                this.map_name_to_indexes[stamp[0]] = [ind_cat, ind_stamp]
            }

        }

        for (const stamp of exalted) {
            const cat = stamp.slice(0, 1)
            const id = Number(stamp.slice(1))

            if (cat == "a") {
                this.exalted_stamps[1][id] = true
            } else if (cat == "b") {
                this.exalted_stamps[2][id] = true
            }
        }



    }

    test() {

        console.log("REFINERY_STAMP", this.getBonusByName("REFINERY_STAMP"))
    }

    getBonusByName(name) {
        // TODO vault Stamp_Bonanza
        if (name in this.map_name_to_indexes) {
            let [ind1, ind2] = this.map_name_to_indexes[name]
            let lvl = this.stamp_lvls[ind1][ind2]
            let grow = DATA_STAMPS[ind1][ind2][2]
            let mult = 1
            if (ind1 < 2) {
                mult *= 2.25 // TODO stamp multi with pristine and lab
            }

            if (this.exalted_stamps[ind1][ind2]) {
                let exalt_multi = 2 // TODO exalt bonus from atoms and pristine
                if (this.account.world6.sneaking.charms.has("JELLYPICK")) {
                    exalt_multi += 0.2
                }
                mult *= exalt_multi
            }
            return mult * calcGrowingValue(grow, lvl)

        }

        throw new Error(`${name} is not a valid stamp`)

    }
    getTotalLevels() {
        return this.stamp_lvls.reduce((a, b) => a + b.reduce((a, b) => a + b, 0), 0)
    }

    getDisplay() {


        let tab = document.createElement("div")
        tab.classList.add("jquery-tab")
        let header = tab.appendChild(document.createElement("ul"))



        for (let [ind_cat, STAMPS] of DATA_STAMPS.entries()) {

            let li = header.appendChild(document.createElement("li"))
            let a = li.appendChild(document.createElement("a"))

            let ref = `tab_stamps_${DATA_STAMP_CATEGORY[ind_cat]}`
            a.href = `#${ref}`
            a.innerHTML = DATA_STAMP_CATEGORY[ind_cat]



            let tab_content = tab.appendChild(document.createElement("div"))
            tab_content.id = ref


            let table = tab_content.appendChild(document.createElement("table"))
            table.classList.add("outlined")

            let row = table.appendChild(document.createElement("tr"))

            for (let [ind_stamp, stamp] of STAMPS.entries()) {
                if (ind_stamp % 4 == 0) {
                    row = table.appendChild(document.createElement("tr"))
                }

                let lvl = this.stamp_lvls[ind_cat][ind_stamp]
                let maxlvl = this.stamp_maxlvls[ind_cat][ind_stamp]
                let is_exalted = this.exalted_stamps[ind_cat][ind_stamp]
                let [name] = stamp

                let elem = row.appendChild(document.createElement("td"))
                let local_table = elem.appendChild(document.createElement("table"))
                let local_row = local_table.appendChild(document.createElement("tr"))
                local_row.innerHTML = name
                // local_row.innerHTML = `<img src="${GET_STAMP_ICON(name)}" style="height:72px;width:72px;" />`
                local_row.title = name

                local_row = local_table.appendChild(document.createElement("tr"))
                let input_lvl = local_row.appendChild(document.createElement("input"))
                input_lvl.min = 0
                input_lvl.max = maxlvl
                input_lvl.value = lvl
                new InputSpinner(input_lvl, { "inputSize": 5 })
                input_lvl.addEventListener("input", (event) => {
                    console.log("change stamp", name, "lvl from", this.stamp_lvls[ind_cat][ind_stamp], "to", Number(input_lvl.value))
                    this.stamp_lvls[ind_cat][ind_stamp] = Number(input_lvl.value)
                    this.account.setModifiedFromSaveData()
                });



                local_row = local_table.appendChild(document.createElement("tr"))
                let input_maxlvl = local_row.appendChild(document.createElement("input"))
                input_maxlvl.min = 0
                input_maxlvl.value = maxlvl
                input_maxlvl.step = stamp[3].lvstep
                new InputSpinner(input_maxlvl, { "inputSize": 5 })

                input_maxlvl.addEventListener("input", (event) => {
                    console.log("change stamp", name, "max lvl from", this.stamp_maxlvls[ind_cat][ind_stamp], "to", Number(input_maxlvl.value))
                    this.stamp_maxlvls[ind_cat][ind_stamp] = Number(input_maxlvl.value)
                    input_lvl.max = Number(input_maxlvl.value)
                    this.account.setModifiedFromSaveData()
                });

                local_row = local_table.appendChild(document.createElement("tr"))
                let text = local_row.appendChild(document.createElement("span"))
                text.innerText = "Exalted?"

                let input_exalt = local_row.appendChild(document.createElement("input"))
                input_exalt.type = "checkbox"
                input_exalt.checked = is_exalted
                input_exalt.addEventListener("input", (event) => {
                    console.log("change stamp", name, "exalted from", this.exalted_stamps[ind_cat][ind_stamp], "to", input_exalt.checked)
                    this.exalted_stamps[ind_cat][ind_stamp] = input_exalt.checked
                    this.account.setModifiedFromSaveData()
                });
            }

        }

        return tab
    }
}

const DATA_STAMP_CATEGORY = ["Combat", "Skill", "Misc"]
export const DATA_STAMPS = [
    [
        ["SWORD_STAMP", "+{_BASE_DAMAGE", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 3, "x2": 5, "lvstep": 5 }, { "type": "stampCost", "x1": 10, "x2": 1.2 }, ["Spore_Cap", "Material"]],
        ["HEART_STAMP", "+{_BASE_HP", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 5, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 15, "x2": 1.2 }, ["Oak_Logs", "Chopping"]],
        ["MANA_STAMP", "+{_BASE_MP", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 6, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 30, "x2": 1.2 }, ["Copper_Ore", "Mining"]],
        ["TOMAHAWK_STAMP", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.06, "x2": 40 }, { "type": "stampMat", "x1": 5, "x2": 6, "lvstep": 4 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Copper_Bar", "Mining"]],
        ["TARGET_STAMP", "+{_BASE_ACCURACY", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 5, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Thread", "Material"]],
        ["SHIELD_STAMP", "+{_BASE_DEFENCE", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 5, "x2": 7, "lvstep": 5 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Iron_Ore", "Mining"]],
        ["LONGSWORD_STAMP", "+{_BASE_DAMAGE", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 10, "x2": 6, "lvstep": 4 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Bean_Slices", "Material"]],
        ["KAPOW_STAMP", "+{%_CRITICAL_DAMAGE", { "type": "decay", "x1": 0.08, "x2": 40 }, { "type": "stampMat", "x1": 20, "x2": 6, "lvstep": 3 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Trusty_Nails", "Material"]],
        ["FIST_STAMP", "+{_STR", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 20, "x2": 7, "lvstep": 2 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Bleach_Logs", "Chopping"]],
        ["BATTLEAXE_STAMP", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.1, "x2": 40 }, { "type": "stampMat", "x1": 15, "x2": 4, "lvstep": 4 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Grass_Leaf", "Chopping"]],
        ["AGILE_STAMP", "+{_AGI", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 1, "x2": 4, "lvstep": 2 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Copper_Chopper", "Equipment"]],
        ["VITALITY_STAMP", "+{_BASE_HP", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 4 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Snake_Skin", "Material"]],
        ["BOOK_STAMP", "+{_WIS", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 20, "x2": 5, "lvstep": 2 }, { "type": "stampCost", "x1": 50, "x2": 1.35 }, ["Iron_Bar", "Mining"]],
        ["MANAMOAR_STAMP", "+{_BASE_MP", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 3 }, { "type": "stampCost", "x1": 75, "x2": 1.32 }, ["Glublin_Ear", "Material"]],
        ["CLOVER_STAMP", "+{_LUK", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 1, "x2": 2, "lvstep": 2 }, { "type": "stampCost", "x1": 300, "x2": 1.38 }, ["Iron_Platebody", "Equipment"]],
        ["SCIMITAR_STAMP", "+{_BASE_DAMAGE", { "type": "add", "x1": 3 }, { "type": "stampMat", "x1": 75, "x2": 7, "lvstep": 4 }, { "type": "stampCost", "x1": 2000, "x2": 1.33 }, ["Goldfish", "Fishing"]],
        ["BULLSEYE_STAMP", "+{_BASE_ACCURACY.", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 100, "x2": 10, "lvstep": 5 }, { "type": "stampCost", "x1": 5000, "x2": 1.36 }, ["Sentient_Cereal", "Catching"]],
        ["FEATHER_STAMP", "+{%_MOVEMENT_SPEED", { "type": "decay", "x1": 0.05, "x2": 50 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 2500, "x2": 1.3 }, ["Coconotnotto", "Material"]],
        ["POLEARM_STAMP", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.16, "x2": 40 }, { "type": "stampMat", "x1": 1, "x2": 2, "lvstep": 6 }, { "type": "stampCost", "x1": 3000, "x2": 1.3 }, ["Steel_Axe", "Equipment"]],
        ["VIOLENCE_STAMP", "+{_STR", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 10, "x2": 7, "lvstep": 3 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Dementia_Ore", "Mining"]],
        ["BUCKLER_STAMP", "+{_BASE_DEFENCE", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 7 }, { "type": "stampCost", "x1": 2200, "x2": 1.305 }, ["Platinum_Bar", "Mining"]],
        ["HERMES_STAMP", "+{_AGI", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 30, "x2": 7, "lvstep": 3 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Rooted_Soul", "Worship"]],
        ["SUKKA_FOO", "+{%_DAMAGE_TOWARD_BOSSES", { "type": "decay", "x1": 0.2, "x2": 60 }, { "type": "stampMat", "x1": 3, "x2": 5, "lvstep": 10 }, { "type": "stampCost", "x1": 10000, "x2": 1.34 }, ["Amarok_Slab", "Quest"]],
        ["ARCANE_STAMP", "+{_WIS", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 50, "x2": 7, "lvstep": 3 }, { "type": "stampCost", "x1": 1550, "x2": 1.36 }, ["Gold_Bar", "Mining"]],
        ["AVAST_YAR_STAMP", "+{_BASE_DAMAGE", { "type": "add", "x1": 6 }, { "type": "stampMat", "x1": 75, "x2": 7, "lvstep": 5 }, { "type": "stampCost", "x1": 15000, "x2": 1.33 }, ["Bunny", "Trapping"]],
        ["STEVE_SWORD", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.2, "x2": 60 }, { "type": "stampMat", "x1": 150, "x2": 5, "lvstep": 10 }, { "type": "stampCost", "x1": 10000, "x2": 1.32 }, ["Fruitfly", "Catching"]],
        ["BLOVER_STAMP", "+{_LUK", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 100, "x2": 7, "lvstep": 4 }, { "type": "stampCost", "x1": 25000, "x2": 1.39 }, ["Jellyfish", "Fishing"]],
        ["STAT_GRAPH_STAMP", "+{_ALL_STATS", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 2, "x2": 2, "lvstep": 2 }, { "type": "stampCost", "x1": 2000, "x2": 1.36 }, ["Mystery_Upgrade_Stone_I", "Material"]],
        ["GILDED_AXE_STAMP", "+{_BASE_DAMAGE", { "type": "add", "x1": 8 }, { "type": "stampMat", "x1": 200, "x2": 6, "lvstep": 6 }, { "type": "stampCost", "x1": 2000000, "x2": 1.43 }, ["Thingymabob", "Material"]],
        ["DIAMOND_AXE_STAMP", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.2, "x2": 60 }, { "type": "stampMat", "x1": 200, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 3000000, "x2": 1.47 }, ["PVC_Pipe", "Material"]],
        ["TRIPLESHOT_STAMP", "+{_BASE_ACCURACY", { "type": "add", "x1": 3 }, { "type": "stampMat", "x1": 200, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 1500000, "x2": 1.4 }, ["Tangled_Cords", "Material"]],
        ["BLACKHEART_STAMP", "+{_BASE_HP", { "type": "add", "x1": 10 }, { "type": "stampMat", "x1": 200, "x2": 6, "lvstep": 15 }, { "type": "stampCost", "x1": 1000000, "x2": 1.4 }, ["Purple_Screw", "Material"]],
        ["MAXO_SLAPPO_STAMP", "+{_STR", { "type": "add", "x1": 4 }, { "type": "stampMat", "x1": 1000, "x2": 10, "lvstep": 7 }, { "type": "stampCost", "x1": 100000000, "x2": 1.4 }, ["Maple_Logs", "Chopping"]],
        ["SASHE_SIDESTAMP", "+{_AGI", { "type": "add", "x1": 4 }, { "type": "stampMat", "x1": 1000, "x2": 10, "lvstep": 7 }, { "type": "stampCost", "x1": 100000000, "x2": 1.4 }, ["Scarab", "Catching"]],
        ["INTELLECTOSTAMPO", "+{_WIS", { "type": "add", "x1": 4 }, { "type": "stampMat", "x1": 150, "x2": 7, "lvstep": 7 }, { "type": "stampCost", "x1": 100000000, "x2": 1.4 }, ["Oozie_Soul", "Worship"]],
        ["CONJOCHARMO_STAMP", "+{_LUK", { "type": "add", "x1": 4 }, { "type": "stampMat", "x1": 1000, "x2": 10, "lvstep": 10 }, { "type": "stampCost", "x1": 100000000, "x2": 1.4 }, ["Suggma_Ashes", "Material"]],
        ["DEMENTIA_SWORD_STAMP", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.25, "x2": 80 }, { "type": "stampMat", "x1": 1000, "x2": 10, "lvstep": 10 }, { "type": "stampCost", "x1": 200000000, "x2": 1.43 }, ["Dreadlo_Ore", "Mining"]],
        ["GOLDEN_SIXES_STAMP", "+{%_DROP_RATE", { "type": "decay", "x1": 0.2, "x2": 80 }, { "type": "stampMat", "x1": 250, "x2": 10, "lvstep": 10 }, { "type": "stampCost", "x1": 10000000, "x2": 1.43 }, ["Kraken", "Fishing"]],
        ["STAT_WALLSTREET_STAMP", "+{_ALL_STATS.", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 5, "x2": 2, "lvstep": 2 }, { "type": "stampCost", "x1": 25000000, "x2": 1.36 }, ["Mystery_Upgrade_Stone_II", "Material"]],
        ["VOID_SWORD_STAMP", "+{_BASE_DAMAGE", { "type": "add", "x1": 12 }, { "type": "stampMat", "x1": 20000, "x2": 10, "lvstep": 10 }, { "type": "stampCost", "x1": 2500000000, "x2": 1.36 }, ["Rice_Cake", "Material"]],
        ["VOID_AXE_STAMP", "+{%_TOTAL_DAMAGE", { "type": "decay", "x1": 0.35, "x2": 200 }, { "type": "stampMat", "x1": 25000, "x2": 10, "lvstep": 15 }, { "type": "stampCost", "x1": 66000000000, "x2": 1.36 }, ["Bamboo_Logs", "Chopping"]],
        ["CAPTALIST_STATS_STAMP", "+{%_ALL_STATS", { "type": "decay", "x1": 0.05, "x2": 100 }, { "type": "stampMat", "x1": 40000, "x2": 10, "lvstep": 10 }, { "type": "stampCost", "x1": 2200000000000, "x2": 1.36 }, ["Firefly", "Catching"]]
    ],
    [
        ["PICKAXE_STAMP", "+{_BASE_MINING_EFFICIENCY", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 5, "x2": 4, "lvstep": 10 }, { "type": "stampCost", "x1": 10, "x2": 1.2 }, ["Oak_Logs", "Chopping"]],
        ["HATCHET_STAMP", "+{_BASE_CHOPPIN'_EFFICIENCY", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 10, "x2": 4, "lvstep": 10 }, { "type": "stampCost", "x1": 10, "x2": 1.2 }, ["Thread", "Material"]],
        ["ANVIL_ZOOMER_STAMP", "+{%_ANVIL_PRODUCTION_SPEED", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Copper_Ore", "Mining"]],
        ["LIL'_MINING_BAGGY_STAMP", "+{%_CARRYING_CAPACITY_FOR_MINING_ITEMS", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Jungle_Logs", "Chopping"]],
        ["TWIN_ORES_STAMP", "+{%_MULTI-ORE_CHANCE", { "type": "decay", "x1": 0.15, "x2": 40 }, { "type": "stampMat", "x1": 1, "x2": 3, "lvstep": 5 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Thief_Hood", "Equipment"]],
        ["CHOPPIN'_BAG_STAMP", "+{%_CARRYING_CAPACITY_FOR_CHOPPIN'_ITEMS", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Carrot_Cube", "Material"]],
        ["DUPLOGS_STAMP", "+{%_MULTI-LOG_CHANCE", { "type": "decay", "x1": 0.15, "x2": 40 }, { "type": "stampMat", "x1": 1, "x2": 3, "lvstep": 5 }, { "type": "stampCost", "x1": 20000, "x2": 1.3 }, ["Militia_Helm", "Equipment"]],
        ["MATTY_BAG_STAMP", "+{%_CARRYING_CAPACITY_FOR_MATERIAL_ITEMS", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 1, "x2": 2, "lvstep": 10 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Cramped_Material_Pouch", "Equipment"]],
        ["SMART_DIRT_STAMP", "+{%_MINING_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 80, "x2": 1.35 }, ["Plank", "Material"]],
        ["COOL_DIGGY_TOOL_STAMP", "+{_BASE_MINING_EFFICICENCY", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 1, "x2": 2, "lvstep": 10 }, { "type": "stampCost", "x1": 35000, "x2": 1.4 }, ["Iron_Hatchet", "Equipment"]],
        ["HIGH_IQ_LUMBER_STAMP", "+{%_CHOPPIN_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 80, "x2": 1.35 }, ["Bullfrog_Horn", "Material"]],
        ["SWAG_SWINGY_TOOL_STAMP", "+{_BASE_CHOPPIN'_EFFICIENCY", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 1, "x2": 2, "lvstep": 10 }, { "type": "stampCost", "x1": 50000, "x2": 1.36 }, ["Copper_Pickaxe", "Equipment"]],
        ["ALCH_GO_BRRR_STAMP", "+{%_ALCHEMY_SPEED", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 40, "x2": 6, "lvstep": 4 }, { "type": "stampCost", "x1": 800, "x2": 1.29 }, ["Forest_Fibres", "Chopping"]],
        ["BRAINSTEW_STAMPS", "+{%_ALCHEMY_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 40, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 1250, "x2": 1.28 }, ["Gold_Ore", "Mining"]],
        ["DRIPPY_DROP_STAMP", "+{%_LIQUID_REGEN_SPEED_IN_ALCHEMY", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 60, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 1000, "x2": 1.3 }, ["Pocket_Sand", "Material"]],
        ["DROPLOTS_STAMP", "+{_CAP_FOR_ALL_LIQUIDS_IN_ALCHEMY", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 25, "x2": 4, "lvstep": 2 }, { "type": "stampCost", "x1": 2500, "x2": 1.3 }, ["Bloach", "Fishing"]],
        ["FISHING_ROD_STAMP", "+{_BASE_FISHING_EFFICIENCY_", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 50, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 1000, "x2": 1.32 }, ["Fly", "Catching"]],
        ["FISHHEAD_STAMP", "+{%_FISHING_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 55, "x2": 9, "lvstep": 5 }, { "type": "stampCost", "x1": 1500, "x2": 1.33 }, ["Megalodon_Tooth", "Material"]],
        ["CATCH_NET_STAMP", "+{_BASE_CATCHING_EFFICIENCY", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 50, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 1000, "x2": 1.3 }, ["Goldfish", "Fishing"]],
        ["FLY_INTEL_STAMP", "+{%_CATCHING_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 40, "x2": 10, "lvstep": 5 }, { "type": "stampCost", "x1": 1500, "x2": 1.33 }, ["Crabby_Cakey", "Material"]],
        ["BAG_O_HEADS_STAMP", "+{%_CARRY_CAPACITY_FOR_FISHING_ITEMS", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 35, "x2": 7, "lvstep": 8 }, { "type": "stampCost", "x1": 1000, "x2": 1.3 }, ["Butterfly", "Catching"]],
        ["HOLY_MACKEREL_STAMP", "+{%_MULTI-FISH_CHANCE", { "type": "decay", "x1": 0.2, "x2": 40 }, { "type": "stampMat", "x1": 30, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 1500, "x2": 1.3 }, ["Platinum_Ore", "Mining"]],
        ["BUGSACK_STAMP", "+{%_CARRY_CAPACITY_FOR_CATCHING_ITEMS", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 35, "x2": 7, "lvstep": 8 }, { "type": "stampCost", "x1": 1000, "x2": 1.3 }, ["Hermit_Can", "Fishing"]],
        ["BUZZ_BUZZ_STAMP", "+{%_MULTI-BUG_CHANCE", { "type": "decay", "x1": 0.2, "x2": 40 }, { "type": "stampMat", "x1": 45, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 1500, "x2": 1.3 }, ["Potty_Rolls", "Chopping"]],
        ["HIDEY_BOX_STAMP", "+{_BASE_TRAPPING_EFFICIENCY", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 100, "x2": 5, "lvstep": 10 }, { "type": "stampCost", "x1": 7500, "x2": 1.3 }, ["Crabbo", "Trapping"]],
        ["PURP_FROGE_STAMP", "+{%_SHINY_CATCH_RATE,_MULTIPLIER", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 125, "x2": 6, "lvstep": 5 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Scorpie", "Trapping"]],
        ["SPIKEMOUTH_STAMP", "+{%_TRAPPING_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 150, "x2": 6, "lvstep": 3 }, { "type": "stampCost", "x1": 12500, "x2": 1.3 }, ["Mousey", "Trapping"]],
        ["SHINY_CRAB_STAMP", "+{%_SHINY_CATCH_RATE,_MULTIPLIER", { "type": "add", "x1": 0.02 }, { "type": "stampMat", "x1": 200, "x2": 7, "lvstep": 3 }, { "type": "stampCost", "x1": 15000, "x2": 1.3 }, ["Owlio", "Trapping"]],
        ["GEAR_STAMP", "+{%_BUILDING_SPEED", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 100, "x2": 5, "lvstep": 3 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Sticky_Stick", "Material"]],
        ["STAMPLE_STAMP", "+{%_3D_PRINTER_SAMPLING_SIZE", { "type": "decay", "x1": 0.04, "x2": 30 }, { "type": "stampMat", "x1": 100, "x2": 6, "lvstep": 4 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Floof_Ploof", "Material"]],
        ["SAW_STAMP", "+{%_CONSTRUCTION_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 20, "x2": 5, "lvstep": 3 }, { "type": "stampCost", "x1": 15000, "x2": 1.3 }, ["Dementia_Bar", "Mining"]],
        ["AMPLESTAMPLE_STAMP", "+{%_3D_PRINTER_SAMPLING_SIZE", { "type": "decay", "x1": 0.05, "x2": 30 }, { "type": "stampMat", "x1": 2500, "x2": 12, "lvstep": 4 }, { "type": "stampCost", "x1": 50000, "x2": 1.5 }, ["Mosquisnow", "Catching"]],
        ["SPOOOKY_STAMP", "+{_BASE_WORSHIP_EFFICIENCY", { "type": "add", "x1": 2 }, { "type": "stampMat", "x1": 45, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 7500, "x2": 1.3 }, ["Forest_Soul", "Worship"]],
        ["FLOWIN_STAMP", "+{%_CHARGE_RATE_PER_HOUR,_MULTIPLIER", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 2, "x2": 5, "lvstep": 2 }, { "type": "stampCost", "x1": 15000, "x2": 1.3 }, ["Redox_Salts", "Material"]],
        ["PRAYDAY_STAMP", "+{%_MAX_CHARGE", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 150, "x2": 6, "lvstep": 2 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Cracked_Glass", "Material"]],
        ["BANKED_PTS_STAMP", "+{_STARTING_POINTS_IN_WORSHIP_TOWER_DEFENSE", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 100, "x2": 3, "lvstep": 6 }, { "type": "stampCost", "x1": 6000, "x2": 1.3 }, ["Dune_Soul", "Worship"]],
        ["COOKED_MEAL_STAMP", "+{%_MEAL_COOKING_SPEED", { "type": "add", "x1": 0.02 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 15 }, { "type": "stampCost", "x1": 1000000, "x2": 1.35 }, ["Skelefish", "Fishing"]],
        ["SPICE_STAMP", "+{%_NEW_RECIPE_COOKING_SPEED", { "type": "add", "x1": 0.02 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 15 }, { "type": "stampCost", "x1": 1000000, "x2": 1.35 }, ["Purple_Mush_Cap", "Material"]],
        ["LADLE_STAMP", "+{_COOKING_EFFICIENCY", { "type": "add", "x1": 25 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 10 }, { "type": "stampCost", "x1": 1000000, "x2": 1.35 }, ["Sand_Shark", "Fishing"]],
        ["NEST_EGGS_STAMP", "+{%_BREEDING_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 10 }, { "type": "stampCost", "x1": 1000000, "x2": 1.4 }, ["Alien_Hive_Chunk", "Chopping"]],
        ["EGG_STAMP", "+{%_NEW_PET_CHANCE", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 15 }, { "type": "stampCost", "x1": 1000000, "x2": 1.4 }, ["Half_Eaten_Donut", "Material"]],
        ["LAB_TUBE_STAMP", "+{%_LAB_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 10 }, { "type": "stampCost", "x1": 1000000, "x2": 1.35 }, ["Bottle_Cap", "Material"]],
        ["SAILBOAT_STAMP", "+{%_SAILING_SPEED", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 1000, "x2": 5, "lvstep": 5 }, { "type": "stampCost", "x1": 500000000, "x2": 1.35 }, ["Stilt_Pole", "Material"]],
        ["GAMEJOY_STAMP", "+{%_GAMING_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 500, "x2": 8, "lvstep": 5 }, { "type": "stampCost", "x1": 500000000, "x2": 1.35 }, ["Dandielogs", "Chopping"]],
        ["DIVINE_STAMP", "+{%_DIVINITY_EXP_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 1000, "x2": 10, "lvstep": 8 }, { "type": "stampCost", "x1": 500000000, "x2": 1.35 }, ["Orange_Slice", "Material"]],
        ["MULTITOOL_STAMP", "+{_ALL_SKILL_EFFICIENCY", { "type": "add", "x1": 10 }, { "type": "stampMat", "x1": 500, "x2": 8, "lvstep": 10 }, { "type": "stampCost", "x1": 800000000, "x2": 1.35 }, ["Dust_Mote", "Catching"]],
        ["SKELEFISH_STAMP", "+{%_FISHING_EFFICIENCY_PER_FISHING_LV", { "type": "decay", "x1": 0.002, "x2": 20 }, { "type": "stampMat", "x1": 250, "x2": 10, "lvstep": 2 }, { "type": "stampCost", "x1": 800000000, "x2": 1.35 }, ["Skelefish", "Fishing"]],
        ["CROP_EVO_STAMP", "+{%_CROP_EVOLUTION_CHANCE", { "type": "add", "x1": 0.05 }, { "type": "stampMat", "x1": 12000, "x2": 10, "lvstep": 5 }, { "type": "stampCost", "x1": 100000000000, "x2": 1.37 }, ["Icefish", "Fishing"]],
        ["SNEAKY_PEEKY_STAMP", "+{%_SNEAKING_EXP_GAIN", { "type": "decay", "x1": 0.5, "x2": 150 }, { "type": "stampMat", "x1": 20000, "x2": 10, "lvstep": 8 }, { "type": "stampCost", "x1": 50000000000, "x2": 1.37 }, ["Leafy_Horn", "Material"]],
        ["JADE_MINT_STAMP", "+{%_JADE_COIN_GAIN", { "type": "add", "x1": 0.005 }, { "type": "stampMat", "x1": 15, "x2": 7, "lvstep": 10 }, { "type": "stampCost", "x1": 20000000000, "x2": 1.37 }, ["Stacked_Rice_Cake", "Material"]],
        ["SUMMONER_STONE_STAMP", "+{%_SUMMONING_EXP_GAIN", { "type": "decay", "x1": 0.5, "x2": 150 }, { "type": "stampMat", "x1": 8000, "x2": 10, "lvstep": 8 }, { "type": "stampCost", "x1": 50000000000, "x2": 1.37 }, ["Breezy_Soul", "Worship"]],
        ["WHITE_ESSENCE_STAMP", "+{%_WHITE_ESSENCE_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 15000, "x2": 10, "lvstep": 8 }, { "type": "stampCost", "x1": 60000000000, "x2": 1.37 }, ["Ladybug", "Catching"]],
        ["TRIAD_ESSENCE_STAMP", "+{%_G,_Y,_B_ESSENCE_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 8000, "x2": 10, "lvstep": 8 }, { "type": "stampCost", "x1": 800000000000, "x2": 1.37 }, ["Caulifish", "Fishing"]],
        ["DARK_TRIAD_ESSENCE_STAMP", "+{%_P,_R,_C_ESSENCE_GAIN", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 45000, "x2": 10, "lvstep": 8 }, { "type": "stampCost", "x1": 12000000000000, "x2": 1.37 }, ["Effervescent_Logs", "Chopping"]]
    ],
    [
        ["QUESTIN_STAMP", "+{%_QUEST_EXP", { "type": "decay", "x1": 0.7, "x2": 50 }, { "type": "stampMat", "x1": 30, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 500, "x2": 1.32 }, ["Slime_Sludge", "Material"]],
        ["MASON_JAR_STAMP", "+{%_CARRY_CAPACITY_FOR_ALL_ITEM_TYPES!", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 1, "x2": 3, "lvstep": 4 }, { "type": "stampCost", "x1": 4000, "x2": 1.28 }, ["Glass_Shard", "Material"]],
        ["CRYSTALLIN", "+{%_CRYSTAL_MONSTER_SPAWN_CHANCE", { "type": "decay", "x1": 1.1, "x2": 50 }, { "type": "stampMat", "x1": 35, "x2": 8, "lvstep": 10 }, { "type": "stampCost", "x1": 800, "x2": 1.31 }, ["Boring_Brick", "Material"]],
        ["ARCADE_BALL_STAMP", "+{%_ARCADE_BALL_RECHARGE_RATE", { "type": "decay", "x1": 0.5, "x2": 100 }, { "type": "stampMat", "x1": 30, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 1500, "x2": 1.33 }, ["Copper_Ore", "Mining"]],
        ["GOLD_BALL_STAMP", "+{%_REDUCED_GOLDEN_BALL_COST_FOR_UPGRADES", { "type": "decay", "x1": 0.4, "x2": 100 }, { "type": "stampMat", "x1": 50, "x2": 6.5, "lvstep": 10 }, { "type": "stampCost", "x1": 1000, "x2": 1.33 }, ["Goldfish", "Fishing"]],
        ["POTION_STAMP", "+{%_EFFECT_FROM_BOOST_FOOD", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 50, "x2": 8, "lvstep": 5 }, { "type": "stampCost", "x1": 1500, "x2": 1.305 }, ["Icing_Ironbite", "Equipment"]],
        ["GOLDEN_APPLE_STAMP", "+{%_EFFECT_FROM_GOLDEN_FOOD", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 2, "x2": 4, "lvstep": 4 }, { "type": "stampCost", "x1": 3000, "x2": 1.3 }, ["Golden_Nomwich", "Food"]],
        ["BALL_TIMER_STAMP", "+{HR_ARCADE_BALL_CLAIM_MAX_TIME", { "type": "decay", "x1": 12, "x2": 30 }, { "type": "stampMat", "x1": 100, "x2": 15, "lvstep": 5 }, { "type": "stampCost", "x1": 1000, "x2": 1.32 }, ["Oak_Logs", "Chopping"]],
        ["CARD_STAMP", "+{%_CARD_DROP_RATE", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 10 }, { "type": "stampCost", "x1": 1200, "x2": 1.31 }, ["Furled_Flag", "Material"]],
        ["FORGE_STAMP", "+{%_FORGE_MAX_CAPACITY", { "type": "decay", "x1": 1.2, "x2": 250 }, { "type": "stampMat", "x1": 250, "x2": 8, "lvstep": 10 }, { "type": "stampCost", "x1": 5000000000000, "x2": 1.3 }, ["Godshard_Ore", "Mining"]],
        ["VENDOR_STAMP", "+{%_SHOP_STOCK_QUANTITY", { "type": "decay", "x1": 0.35, "x2": 100 }, { "type": "stampMat", "x1": 100, "x2": 10, "lvstep": 10 }, { "type": "stampCost", "x1": 30000, "x2": 1.5 }, ["Cue_Tape", "Material"]],
        ["SIGIL_STAMP", "+{%_SIGIL_CHARGE_RATE", { "type": "decay", "x1": 0.4, "x2": 150 }, { "type": "stampMat", "x1": 2000, "x2": 6, "lvstep": 12 }, { "type": "stampCost", "x1": 1000000, "x2": 1.32 }, ["Ram_Wool", "Material"]],
        ["TALENT_I_STAMP", "+{_TALENT_POINTS_FOR_TAB_1", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 50, "x2": 10, "lvstep": 2 }, { "type": "stampCost", "x1": 2000, "x2": 1.4 }, ["Frog_Leg", "Material"]],
        ["TALENT_II_STAMP", "+{_TALENT_POINTS_FOR_TAB_2", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 200, "x2": 8, "lvstep": 2 }, { "type": "stampCost", "x1": 4000, "x2": 1.35 }, ["Pincer_Arm", "Material"]],
        ["TALENT_III_STAMP", "+{_TALENT_POINTS_FOR_TAB_3", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 20, "x2": 4, "lvstep": 2 }, { "type": "stampCost", "x1": 40000, "x2": 1.35 }, ["Arctic_Leaf", "Chopping"]],
        ["TALENT_IV_STAMP", "+{_TALENT_POINTS_FOR_TAB_4", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 2, "x2": 3, "lvstep": 2 }, { "type": "stampCost", "x1": 300000000, "x2": 1.4 }, ["Royal_Suggma_Urn", "Material"]],
        ["TALENT_V_STAMP", "+{_TALENT_POINTS_FOR_TAB_5", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 25, "x2": 6, "lvstep": 2 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Copper_Ore", "Mining"]],
        ["TALENT_S_STAMP", "+{_TALENT_POINTS_FOR_STAR_TAB", { "type": "add", "x1": 1 }, { "type": "stampMat", "x1": 20, "x2": 4, "lvstep": 2 }, { "type": "stampCost", "x1": 50, "x2": 1.3 }, ["Twisty_Leaf", "Chopping"]],
        ["MULTIKILL_STAMP", "+{%_BASE_MULTIKILL_RATE,_FOR_ALL_WORLDS.", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 100, "x2": 3, "lvstep": 2 }, { "type": "stampCost", "x1": 10000, "x2": 1.3 }, ["Spore_Cap", "Material"]],
        ["BIBLIO_STAMP", "+{%_TALENT_BOOK_LIBRARY_REFRESH_SPEED", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 125, "x2": 5, "lvstep": 2 }, { "type": "stampCost", "x1": 12500, "x2": 1.3 }, ["Tundra_Logs", "Chopping"]],
        ["DNA_STAMP", "+{%_DNA_GAINED_FROM_SPLICING", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 200, "x2": 5, "lvstep": 3 }, { "type": "stampCost", "x1": 1000000, "x2": 1.6 }, ["Worker_Bee", "Catching"]],
        ["REFINERY_STAMP", "+{%_FASTER_REFINERY_CYCLES", { "type": "add", "x1": 0.01 }, { "type": "stampMat", "x1": 250, "x2": 5, "lvstep": 5 }, { "type": "stampCost", "x1": 25000000, "x2": 1.52 }, ["Cheesy_Crumbs", "Material"]],
        ["ATOMIC_STAMP", "+{%_LOWER_ATOM_UPGRADE_COSTS", { "type": "decay", "x1": 0.2, "x2": 80 }, { "type": "stampMat", "x1": 2500, "x2": 5, "lvstep": 8 }, { "type": "stampCost", "x1": 25000000, "x2": 1.52 }, ["Bamboo", "Material"]],
        ["CAVERN_RESOURCE_STAMP", "+{%_MORE_RESOURCES_FROM_CAVERNS", { "type": "decay", "x1": 1, "x2": 250 }, { "type": "stampMat", "x1": 10, "x2": 20, "lvstep": 20 }, { "type": "stampCost", "x1": 2000000000, "x2": 1.72 }, ["Cooking_Ladle", "Quest"]],
        ["STUDY_HALL_STAMP", "+{%_FASTER_STUDY_RATE_FOR_BOLAIA", { "type": "decay", "x1": 0.3, "x2": 160 }, { "type": "stampMat", "x1": 30, "x2": 20, "lvstep": 15 }, { "type": "stampCost", "x1": 2000000000, "x2": 1.72 }, ["Villager_Statue", "Quest"]],
    ]
]

const DATA_LIMITED_ITEMS = [
    // bars because they are a pain to craft
    "Copper_Bar",
    "Gold_Bar",
    "Platinum_Bar",
    "Dementia_Bar",
    // rare drops
    "Glass_Shard",
    "Royal_Suggma_Urn",
    "Stacked_Rice_Cake",
    "Golden_Nomwich",
    // refinery
    "Redox_Salts",
    // shop items
    "Cue_Tape",
]