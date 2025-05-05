import { BaseFeature } from "../BaseFeature.js";

export class Atoms extends BaseFeature {

    constructor(account) {
        super(account);

        let atom_data = account.save_data["Atoms"]
        delete account.save_data_pruned["Atoms"]

        this.atom_levels = []
        this.map_name_to_index = {}
        for (const [ind, atom] of DATA_ATOMS.entries()) {
            this.map_name_to_index[atom[0]] = ind
            this.atom_levels.push(atom_data[ind])
        }

    }

    getBonusByName(name) {
        for (let [ind, atom] of DATA_ATOMS.entries()) {
            if (atom[0].includes(name.toUpperCase())) {
                return this.atom_levels[ind] * atom[1]
            }

        }
        throw new Error(`${name} is not a valid atom name`)
    }
    getLevelByName(name) {
        for (let [ind, atom] of DATA_ATOMS.entries()) {
            if (atom[0].includes(name.toUpperCase())) {
                return this.atom_levels[ind]
            }
        }
        throw new Error(`${name} is not a valid atom name`)
    }

    getTotalLevels() {
        return this.atom_levels.reduce((a, b) => (a + b), 0)
    }
    getDisplay() {
        let display = document.createElement("table")
        for (const [ind, atom] of DATA_ATOMS.entries()) {

            let level = this.atom_levels[ind]
            let upg = DATA_ATOMS[ind]
            let [name, stat_per_lvl, cost_data] = upg
            let row = display.appendChild(document.createElement("tr"))

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = `${name.substring(0, name.indexOf("_"))}`


            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.max = 50
            input_base.value = level

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change atom level", name, this.atom_levels[ind], "to", Number(input_base.value))
                this.atom_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}

export const DATA_ATOMS = [
    ["HYDROGEN_-_STAMP_DECREASER", 0.01, [1, 1.35, 2]],
    ["HELIUM_-_TALENT_POWER_STACKER", 1, [0, 10, 10]],
    ["LITHIUM_-_BUBBLE_INSTA_EXPANDER", 0.01, [10, 1.25, 25]],
    ["BERYLLIUM_-_POST_OFFICE_PENNER", 7, [20, 1.26, 75]],
    ["BORON_-_PARTICLE_UPGRADER", 2, [70, 1.37, 175]],
    ["CARBON_-_WIZARD_MAXIMIZER", 2, [250, 1.27, 500]],
    ["NITROGEN_-_CONSTRUCTION_TRIMMER", 0.15, [500, 1.25, 1000]],
    ["OXYGEN_-_LIBRARY_BOOKER", 0.02, [1000, 1.24, 3250]],
    ["FLUORIDE_-_VOID_PLATE_CHEF", 0.01, [2500, 1.23, 2500]],
    ["NEON_-_DAMAGE_N'_CHEAPENER", 0.01, [5000, 1.22, 5000]],
    ["SODIUM_-_SNAIL_KRYPTONITE", 5, [12000, 2, 12000]],
    ["MAGNESIUM_-_TRAP_COMPOUNDER", 0.01, [30000, 1.6, 30000]],
    ["ALUMINIUM_-_STAMP_SUPERCHARGER", 2, [200000, 1.3, 200000]],
];
