import { BaseFeature } from "../../BaseFeature.js";


export class TaskTemplate extends BaseFeature {

    constructor(account, world, task_names, task_stats, task_lvls) {
        super(account);

        this.world = world

        this.task_data = []
        this.map_name_to_index = {}

        for (let [index, name] of task_names.entries()) {

            let lvl = task_lvls[index]
            let stat = task_stats[index]
            this.task_data.push([lvl, stat])
            this.map_name_to_index[name] = index

        }


    }

    getTotal() {
        return this.task_data.reduce((acc, v) => (acc + v[0]), 0)
    }
    getLevel(name) {
        let index = this.map_name_to_index[name]
        return this.task_data[index][0]
    }
    getTaskStat(name) {
        let index = this.map_name_to_index[name]
        return this.task_data[index][1]
    }
    getFeatureName() {
        return this.world
    }

    getDisplay() {
        let table = document.createElement("table")
        table.classList.add("outlined")
        let row = table.appendChild(document.createElement("tr"))
        row.appendChild(document.createElement("th")).innerText = "Task"
        row.appendChild(document.createElement("th")).innerText = "Lvl"
        row.appendChild(document.createElement("th")).innerText = "Current progress"
        for (let [name, index] of Object.entries(this.map_name_to_index)) {
            let [lvl, stat] = this.task_data[index]


            row = table.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = name

            let td = row.appendChild(document.createElement("td"))
            let input_level = td.appendChild(document.createElement("input"))
            input_level.type = "number"
            input_level.min = 0
            input_level.max = 10
            input_level.value = lvl
            new InputSpinner(input_level)
            input_level.addEventListener("input", (event) => {
                console.log("change bubble", name, "level", this.bubble_levels[ind], "to", Number(input_level.value))
                this.bubble_levels[ind] = Number(input_level.value)
                this.account.setModifiedFromSaveData()
            });


            row.appendChild(document.createElement("td")).innerText = stat

        }

        return table
    }
}

