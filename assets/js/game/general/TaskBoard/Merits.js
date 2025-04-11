import { BaseFeature } from "../../BaseFeature.js";

export class Merits extends BaseFeature {

    constructor(account) {
        super(account);
        let merit_levels = account.save_data["TaskZZ2"]
        delete account.save_data_pruned["TaskZZ2"]

        this.merit_levels = []

        for (let [ind, world_merits] of DATA_MERITS.entries()) {
            let world_merit_lvl = []
            for (let [ind2, merit] of world_merits.entries()) {


                world_merit_lvl.push(merit_levels[ind][ind2])
            }
            this.merit_levels.push(world_merit_lvl)

        }

    }

    getMeritLevel(world, merit_index) {
        return this.merit_levels[world - 1][merit_index - 1]

    }

    getDisplay() {
        let tab = document.createElement("div")
        tab.classList.add("jquery-tab")
        let header = document.createElement("ul")
        tab.appendChild(header)

        for (let [ind, world_merits] of DATA_MERITS.entries()) {
            let li = document.createElement("li")
            let a = document.createElement("a")
            let ref = `tab_merits_${ind}`
            a.href = `#${ref}`
            a.innerHTML = `World ${ind + 1}`
            li.appendChild(a)
            header.appendChild(li)

            let tab_content = document.createElement("div")
            tab_content.id = ref
            tab.appendChild(tab_content)

            let talent_table = document.createElement("table")
            talent_table.classList.add("outlined")
            tab_content.appendChild(talent_table)
            let row = document.createElement("tr")
            talent_table.appendChild(row)
            for (let [ind2, merit] of world_merits.entries()) {
                let lvl = this.merit_levels[ind][ind2]
                let max = DATA_MERITS[ind][ind2][0]

                if (ind2 % 2 == 0) {
                    row = document.createElement("tr")
                    talent_table.appendChild(row)
                }

                let elem = document.createElement("td")
                row.appendChild(elem)



                let input_base = document.createElement("input")
                input_base.type = "number"
                input_base.min = 0
                input_base.max = max
                input_base.value = lvl
                elem.appendChild(input_base)
                new InputSpinner(input_base, { inputSize: 6 })
                input_base.addEventListener("input", (event) => {
                    console.log("change merit upgrade", ind, ind, "from", this.merit_levels[ind][ind2], "to", Number(input_base.value))
                    this.merit_levels[ind][ind2] = Number(input_base.value)
                    this.account.setModifiedFromSaveData()
                });
            }


        }



        return tab
    }
}

// each merit has [max level, cost per level]
const DATA_MERITS = [
    [[5, 1], [10, 1], [12, 1], [10, 2], [10, 1], [5, 2], [6, 3]],
    [[7, 1], [10, 1], [10, 1], [10, 1], [8, 1], [5, 2], [8, 3], [5, 2]],
    [[4, 3], [10, 1], [5, 2], [10, 1], [10, 1], [5, 2], [5, 2]],
    [[3, 3], [10, 1], [2, 6], [5, 1], [8, 2], [4, 2], [3, 5]],
    [[20, 1], [10, 1], [7, 2], [10, 1], [5, 2], [9, 2], [4, 3]],
    [[20, 1], [10, 1], [15, 2], [20, 1], [10, 2], [9, 2], [4, 3]]
]
