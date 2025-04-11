import { BaseFeature } from "../../BaseFeature.js";


export class Kitchens extends BaseFeature {


    constructor(account) {
        super(account);

        let kitchen_data = account.save_data["Cooking"]
        delete account.save_data_pruned["Cooking"]

        this.kitchen_stats = []
        for (let i = 0; i < kitchen_data.length; i++) {
            this.kitchen_stats.push({
                "cookedMeal": kitchen_data[i][0], // TODO check
                "isRichelin": true, // need to parse gem shop actually
                "speedLv": kitchen_data[i][6],
                "fireLv": kitchen_data[i][7],
                "luckLv": kitchen_data[i][8]
            })
        }
    }

    getTotalLevels() {
        return this.kitchen_stats.reduce((a, b) => (a + b.speedLv + b.fireLv + b.luckLv), 0)
    }
    getDisplay() {

        let table = document.createElement("table")
        table.classList.add("outlined")
        let row = table.appendChild(document.createElement("tr"))
        row.appendChild(document.createElement("th")).innerText = "Kitchen"
        row.appendChild(document.createElement("th")).innerText = "Speed Lvl"
        row.appendChild(document.createElement("th")).innerText = "Fire Lvl"
        row.appendChild(document.createElement("th")).innerText = "Luck Lvl"
        row.appendChild(document.createElement("th")).innerText = "Richelin ?"
        for (let [ind, kitchen] of this.kitchen_stats.entries()) {
            row = table.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = `Kitchen n°${ind + 1}`

            let td = row.appendChild(document.createElement("td"))
            let input_speed = td.appendChild(document.createElement("input"))
            input_speed.type = "number"
            input_speed.min = 0
            input_speed.value = kitchen.speedLv
            new InputSpinner(input_speed)
            input_speed.addEventListener("input", (event) => {
                console.log("change kitchen", ind, "speed", this.kitchen_stats[ind].speedLv, "to", Number(input_speed.value))
                this.kitchen_stats[ind].speedLv = Number(input_speed.value)
                this.account.setModifiedFromSaveData()
            });

            td = row.appendChild(document.createElement("td"))
            let input_fire = td.appendChild(document.createElement("input"))
            input_fire.type = "number"
            input_fire.min = 0
            input_fire.value = kitchen.fireLv
            new InputSpinner(input_fire)
            input_fire.addEventListener("input", (event) => {
                console.log("change kitchen", ind, "fire", this.kitchen_stats[ind].fireLv, "to", Number(input_fire.value))
                this.kitchen_stats[ind].fireLv = Number(input_fire.value)
                this.account.setModifiedFromSaveData()
            });

            td = row.appendChild(document.createElement("td"))
            let input_luck = td.appendChild(document.createElement("input"))
            input_luck.type = "number"
            input_luck.min = 0
            input_luck.value = kitchen.luckLv
            new InputSpinner(input_luck)
            input_luck.addEventListener("input", (event) => {
                console.log("change kitchen", ind, "luck", this.kitchen_stats[ind].luckLv, "to", Number(input_luck.value))
                this.kitchen_stats[ind].luckLv = Number(input_luck.value)
                this.account.setModifiedFromSaveData()
            });

            td = row.appendChild(document.createElement("td"))
            let input_rich = td.appendChild(document.createElement("input"))
            input_rich.type = "checkbox"
            input_rich.checked = kitchen.isRichelin
            input_rich.addEventListener("input", (event) => {
                console.log("change kitchen", ind, "richelin", this.kitchen_stats[ind].isRichelin, "to", (input_rich.checked))
                this.kitchen_stats[ind].isRichelin = (input_rich.checked)
                this.account.setModifiedFromSaveData()
            });
        }

        return table
    }
}