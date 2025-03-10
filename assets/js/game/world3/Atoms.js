import { BaseFeature } from "../BaseFeature.js";

export class Atoms extends BaseFeature {

    constructor(account) {
        super(account);

        let atom_data = account.save_data["Atoms"]

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
        // TODO
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
    ["OXYGEN_-_LIBRARY_BOOKER", 0.02, [2000, 1.24, 3250]],
    ["FLUORIDE_-_VOID_PLATE_CHEF", 0.01, [12000, 1.23, 10000]],
    ["NEON_-_DAMAGE_N'_CHEAPENER", 0.01, [40000, 1.22, 40000]],
    ["SODIUM_-_SNAIL_KRYPTONITE", 5, [50000, 2, 50000]]
];
