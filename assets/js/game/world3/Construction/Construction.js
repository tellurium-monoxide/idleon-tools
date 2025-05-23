import { BaseFeature } from "../../BaseFeature.js";

import { Shrines } from "./Shrines.js";

export class Construction extends BaseFeature {

    constructor(account) {
        super(account);

        this.shrines = new Shrines(account)
        this.child_features.push(this.shrines)



        let building_data = this.account.save_data["Tower"]
        delete account.save_data_pruned["Tower"]


        let building_current_levels = building_data.slice(0, 27)
        let building_built_levels = building_data.slice(27, 54)
        let building_current_build_progress = building_data.slice(66, 93)



        this.buildings = {}

        this.building_total_levels_max = BUILDING_DATA.reduce((a, b) => (a + b.max_level), 0)

        this.building_levels = {}
        this.building_levels_built = {}
        this.building_progress = {}
        for (let ind = 0; ind < 27; ind++) {
            let building = BUILDING_DATA[ind]
            this.building_levels[building.name] = building_current_levels[ind]
            this.building_levels_built[building.name] = building_built_levels[ind]
            this.building_progress[building.name] = building_current_build_progress[ind]
            building.current_level = building_current_levels[ind]
            building.level_built = building_built_levels[ind]
            building.build_progress = building_current_build_progress[ind]
            this.buildings[building.name] = building
        }
    }

    test(collapsed = true) {
        console.log(this.getTotalBuildingLevels(), "/", this.building_total_levels_max)
        super.test(collapsed)
    }

    getBuildingLevel(name) {
        try {
            return this.building_levels[name]
        } catch (e) {
            throw new Error(`Wrong building name ${name}`)
        }

    }

    getTotalBuildingLevels() {
        return Object.entries(this.building_levels).reduce((sum, cur) => (sum + cur[1]), 0)
    }


    getBuildCostToMax(building_data, current_level) {
        let level = current_level
        let cost = 0
        while (level < building_data.max_level) {
            cost += this.getBuildCost(building_data, level)
            level += 1
        }
        return cost

    }

    getBuildCost(building_data, level) {
        if (level >= building_data.max_level) {
            return 0
        } else {
            let buildInc = building_data.buildInc
            let buildMultiplier = building_data.buildMultiplier
            if (buildInc == 1) { // special case for 3d printer
                return 20 * Math.pow(level + 1, 2) * Math.pow(1.6, level + 1);
            } else {
                return buildMultiplier * Math.pow(buildInc, level);
            }
        }

    }


    getDisplay() {
        let display = document.createElement("table")
        let row = display.appendChild(document.createElement("tr"))
        row.appendChild(document.createElement("th")).innerText = "Name"
        row.appendChild(document.createElement("th")).innerText = "Level"
        row.appendChild(document.createElement("th")).innerText = "Cost"
        row.appendChild(document.createElement("th")).innerText = "Progress"
        row.appendChild(document.createElement("th")).innerText = "Cost to max"


        for (let building_index = 0; building_index < 27; building_index++) {
            const building_data = BUILDING_DATA[building_index]
            const current_lvl = this.buildings[building_data.name].current_level
            const current_lvl_built = this.buildings[building_data.name].level_built
            const current_prog = this.buildings[building_data.name].build_progress
            const cost_to_next = this.getBuildCost(building_data, current_lvl)
            const cost_to_max = this.getBuildCostToMax(building_data, current_lvl)
            let progress = 0
            if (current_lvl_built != current_lvl) {
                progress = 1
            } else if (current_lvl < building_data.max_level) {
                progress = current_prog / cost_to_next
            }


            let row = display.appendChild(document.createElement("tr"))

            let td = row.appendChild(document.createElement("td")).innerText = formatName(building_data.name)



            td = row.appendChild(document.createElement("td"))

            let input_base = td.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.max = building_data.max_level
            input_base.value = current_lvl

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", building_data.name, "level from", this.buildings[building_data.name].current_level, "to", Number(input_base.value))
                this.buildings[building_data.name].current_level = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });

            if (current_lvl < building_data.max_level) {
                row.appendChild(document.createElement("td")).innerText = formatIdleonNumbers(cost_to_next)
                row.appendChild(document.createElement("td")).innerText = formatPercent(progress)
                row.appendChild(document.createElement("td")).innerText = formatIdleonNumbers(cost_to_max)

            }

        }

        return display



    }
}


const BUILDING_DATA = [
    {
        name: "3D_PRINTER",
        max_level: 10,
        category: "GENERAL",
        buildInc: 1,
        buildMultiplier: 15,
    },
    {
        name: "TALENT_BOOK_LIBRARY",
        max_level: 201,
        category: "GENERAL",
        buildInc: 1.18,
        buildMultiplier: 200,
    },
    {
        name: "DEATH_NOTE",
        max_level: 51,
        category: "GENERAL",
        buildInc: 1.23,
        buildMultiplier: 2250,
    },
    {
        name: "SALT_LICK",
        max_level: 10,
        category: "GENERAL",
        buildInc: 2,
        buildMultiplier: 12000,
    },
    {
        name: "CHEST_SPACE",
        max_level: 25,
        category: "GENERAL",
        buildInc: 1.27,
        buildMultiplier: 25000,
    },
    {
        name: "COST_CRUNCHER",
        max_level: 60,
        category: "GENERAL",
        buildInc: 1.106,
        buildMultiplier: 60000,
    },
    {
        name: "TRAPPER_DRONE",
        max_level: 50,
        category: "GENERAL",
        buildInc: 1.95,
        buildMultiplier: 100000,
    },
    {
        name: "AUTOMATION_ARM",
        max_level: 5,
        category: "GENERAL",
        buildInc: 4,
        buildMultiplier: 150000,
    },
    {
        name: "ATOM_COLLIDER",
        max_level: 200,
        category: "GENERAL",
        buildInc: 1.14,
        buildMultiplier: 50000000,
    },
    {
        name: "PULSE_MAGE",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.365,
        buildMultiplier: 25,
    },
    {
        name: "FIREBALL_LOBBER",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.33,
        buildMultiplier: 700,
    },
    {
        name: "BOULDER_ROLLER",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.276,
        buildMultiplier: 4500,
    },
    {
        name: "FROZONE_MALONE",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.246,
        buildMultiplier: 20000,
    },
    {
        name: "STORMCALLER",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.23,
        buildMultiplier: 40000,
    },
    {
        name: "PARTY_STARTER",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.222,
        buildMultiplier: 125000,
    },
    {
        name: "KRAKEN_COSPLAYER",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.22,
        buildMultiplier: 400000,
    },
    {
        name: "POISONIC_ELDER",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.21,
        buildMultiplier: 1000000,
    },
    {
        name: "VOIDINATOR",
        max_level: 140,
        category: "TOWER",
        buildInc: 1.4,
        buildMultiplier: 3500000,
    },
    {
        name: "WOODULAR_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.16,
        buildMultiplier: 60,
    },
    {
        name: "ISACCIAN_SHRINE",
        max_level: 200,
        category: "SHRINE",
        icon_url: "",
        buildInc: 1.15,
        buildMultiplier: 1250,
    },
    {
        name: "CRYSTAL_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.13,
        buildMultiplier: 6000,
    },
    {
        name: "PANTHEON_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.115,
        buildMultiplier: 27500,
    },
    {
        name: "CLOVER_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.11,
        buildMultiplier: 70000,
    },
    {
        name: "SUMMEREADING_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.106,
        buildMultiplier: 200000,
    },
    {
        name: "CRESCENT_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.106,
        buildMultiplier: 2000000,
    },
    {
        name: "UNDEAD_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.1,
        buildMultiplier: 7000000,
    },
    {
        name: "PRIMORDIAL_SHRINE",
        max_level: 200,
        category: "SHRINE",
        buildInc: 1.09,
        buildMultiplier: 60000000,
    },
]