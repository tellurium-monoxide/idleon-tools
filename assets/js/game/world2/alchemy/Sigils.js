import { BaseFeature } from "../../BaseFeature.js";

export class Sigils extends BaseFeature {

    constructor(account) {
        super(account);
        // let cauldron_p2w = (account.save_data["CauldronP2W"])
        let sigil_data = (account.save_data["CauldronP2W"][4])

        // let sigil_pipe_gauge_time = cauldron_p2w[4][2 * (11 - 1)]


        this.sigil_levels = []
        this.sigil_map_name_to_id = {}
        for (let [ind, data] of sigil_data.entries()) {
            if (ind % 2 == 0) {
                let time = data
                let level = DATA_SIGILS[ind / 2][1].filter(num => (num <= time)).length;
                this.sigil_levels.push(level)
                this.sigil_map_name_to_id[DATA_SIGILS[ind / 2][0]] = ind / 2
            }
        }
        // console.log("sigils")
        // console.log(this.sigil_levels)
        // console.log(this.sigil_map_name_to_id)


    }

    test() {
        console.log("PIPE_GAUGE: ", this.getBonusByName("PIPE_GAUGE"))

    }


    getBonusByName(name) {
        let ind = this.sigil_map_name_to_id[name]
        if (ind) {
            let level = this.sigil_levels[ind]
            let base = (level > 0) ? DATA_SIGILS[ind][2][level - 1] : 0
            let multiplier = 1 + this.account.world5.artifacts.getBonusByName("CHILLED_YARN")
            return base * multiplier

        } else {
            throw new Error(`${name} is not a valid sigil name`);
        }

    }
    getDisplay() {
        let display = document.createElement("table")
        for (let [name, ind] of Object.entries(this.sigil_map_name_to_id)) {
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
            input_base.max = 3
            input_base.value = this.sigil_levels[ind]
            input_cell.appendChild(input_base)
            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change", name, this.sigil_levels[ind], "to", Number(input_base.value))
                this.sigil_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
    convertFromIT(sigils) {
        console.log(sigils)

        for (let [ind, sig] of sigils.entries()) {
            let { name, unlockCost, boostCost, jadeCost, unlockBonus, boostBonus, jadeBonus } = sig

            data_all.push([name, [unlockCost, boostCost, jadeCost], [unlockBonus, boostBonus, jadeBonus]])
        }

        console.log(JSON.stringify(data_all))
    }
}


// each sigil is made of [name, array of time costs for levels, array of bonus for given level]
export const DATA_SIGILS = [
    ["BIG_MUSCLE", [2, 100, 50000], [10, 20, 40]],
    ["PUMPED_KICKS", [3, 150, 60000], [10, 20, 40]],
    ["ODD_LITEARTURE", [5, 200, 70000], [10, 20, 40]],
    ["GOOD_FORTUNE", [8, 300, 90000], [10, 20, 40]],
    ["PLUNGING_SWORD", [15, 700, 100000], [75, 225, 1000]],
    ["WIZARDLY_HAT", [24, 1250, 130000], [10, 20, 30]],
    ["ENVELOPE_PILE", [60, 2500, 160000], [12, 25, 40]],
    ["SHINY_BEACON", [120, 4000, 200000], [1, 2, 5]],
    ["METAL_EXTERIOR", [250, 7000, 240000], [6, 12, 20]],
    ["TWO_STARZ", [500, 10000, 280000], [10, 25, 45]],
    ["PIPE_GAUGE", [700, 12000, 320000], [10, 20, 30]],
    ["TROVE", [1300, 14000, 400000], [10, 20, 30]],
    ["PEA_POD", [2100, 15000, 420000], [25, 50, 100]],
    ["TUFT_OF_HAIR", [3000, 25000, 450000], [3, 6, 10]],
    ["EMOJI_VEGGIE", [4500, 33000, 480000], [10, 25, 40]],
    ["VIP_PARCHMENT", [6300, 42000, 520000], [10, 25, 50]],
    ["DREAM_CATCHER", [7000, 50000, 560000], [1, 2, 4]],
    ["DUSTER_STUDS", [8000, 60000, 600000], [3, 7, 15]],
    ["GARLIC_GLOVE", [9000, 70000, 650000], [15, 35, 60]],
    ["LAB_TESSTUBE", [12000, 80000, 700000], [8, 20, 35]],
    ["PECULIAR_VIAL", [17000, 120000, 750000], [15, 25, 35]],
    ["LOOT_PILE", [23000, 160000, 900000], [10, 20, 30]],
    ["DIV_SPIRAL", [26000, 200000, 1200000], [10, 30, 50]],
    ["COOL_COIN", [30000, 250000, 2000000], [20, 50, 100]]];
