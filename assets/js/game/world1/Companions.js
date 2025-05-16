import { BaseFeature } from "../BaseFeature.js";
export class Companions extends BaseFeature {

    constructor(account) {
        super(account);
        // let companions = account.save_data["Companions"]
        // delete account.save_data_pruned["Companions"]

        // true by default because I don't know where to look for this in save data
        this.companions = Array(DATA_COMPANIONS.length).fill(true)
        this.map_name_to_index = {}
        for (let [ind, comp] of DATA_COMPANIONS.entries()) {
            this.map_name_to_index[comp] = ind
        }
    }

    has(name) {
        return this.companions[this.map_name_to_index[name]]
    }
    getDisplay() {
        let display = document.createElement("table")
        for (let [ind, companion] of Object.entries(DATA_COMPANIONS)) {

            let row = display.appendChild(document.createElement("tr"))

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = companion


            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "checkbox"
            input_base.checked = this.companions[ind]

            input_base.addEventListener("input", (event) => {
                console.log("change companion", companion, "from", this.companions[ind], "to", (input_base.checked))
                this.companions[ind] = (input_base.checked)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}

const DATA_COMPANIONS = [
    "KING_DOOT",
    "RIFT_SLUG",
    "DEDOTATED_RAM",
    "CRYSTAL_CUSTARD",
    "SHEEPIE",
    "MOLTI",
    "BORED_BEAN",
    "SLIME",
    "SANDY_POT",
    "BLOQUE",
    "FROG",
    "GLUNKO_SUPREME",
    "ANCIENT_GOLEM",
    "SAMURAI_GUARDIAN",
    "RIFT_JOCUND",
    "LEEK_SPIRIT",
    "CRYSTAL_CAPYBARA",
    "BIGGOLE_MOLE",
    "GIGAFROG",
    "MASHED_POTATO",
    "FLYING_WORM",
    "POISONIC_FROG",
    "QUENCHIE",
    "GREEN_MUSHROOM",
    "COOL_BIRD",
    "AXOLOTL",
    "MALLAY",
    "REINDEER",
]