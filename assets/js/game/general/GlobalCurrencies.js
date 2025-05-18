import { BaseFeature } from "../BaseFeature.js";


export class GlobalCurrencies extends BaseFeature {


    constructor(account) {
        super(account);

        this.currencies = {}

        for (const cur of DATA_CURRENCIES) {
            this.currencies[cur[0]] = 0
            for (const key of cur[1]) {
                this.currencies[cur[0]] += account.save_data[key]
                delete account.save_data_pruned[key]
            }
        }
        for (let i = 0; i < 8; i++) {
            this.currencies[`Key_World_${i + 1}`] = account.save_data["CYKeysAll"][i]
        }
        delete account.save_data_pruned["CYKeysAll"]

        for (let i = 0; i < 6; i++) {
            this.currencies[`Talent_Points_Tab_${i + 1}`] = account.save_data["CYTalentPoints"][i]
        }
        delete account.save_data_pruned["CYTalentPoints"]

    }

    get(name) {
        return this.currencies[name]
    }


    getDisplay() {
        let display = document.createElement("table")

        for (let [name, qtt] of Object.entries(this.currencies)) {

            let row = display.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = name



            let td = row.appendChild(document.createElement("td"))

            let input_base = td.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.value = qtt

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change qtt", name, this.currencies[name], "to", Number(input_base.value))
                this.currencies[name] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            })

        }

        return display
    }
}

export const DATA_CURRENCIES = [
    ["PO_Box", ["CYDeliveryBoxComplete", "CYDeliveryBoxMisc", "CYDeliveryBoxStreak"]],
    ["Silver_Pens", ["CYSilverPens"]],
    ["Gold_Pens", ["CYGoldPens"]],
    ["Colosseum_Tickets", ["CYColosseumTickets"]],
    ["Obol_Fragments", ["CYObolFragments"]],
    ["CYAFKdoubles", ["CYAFKdoubles"]],
    ["CYGems?", ["CYGems"]],
]