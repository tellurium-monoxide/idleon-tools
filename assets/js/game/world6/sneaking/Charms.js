import { BaseFeature } from "../../BaseFeature.js";

export class Charms extends BaseFeature {


    constructor(account) {
        super(account);
        let sneaking_data = account.save_data["Ninja"]

        // console.log(sneaking_data)


        this.charms_obtained = Array(DATA_PRISTINE_CHARMS.length).fill(false)
        this.map_name_to_index = {}
        for (let [ind, charm] of DATA_PRISTINE_CHARMS.entries()) {
            if (sneaking_data[107][ind]) {
                this.charms_obtained[ind] = true
            }
            this.map_name_to_index[charm[0]] = ind
        }

    }
    has(name) {
        let ind = this.map_name_to_index[name]
        if (ind) {
            return this.charms_obtained[ind]
        }

        throw new Error(`${name} is not a valid charm name`)
    }

    getBonusByName(name) {
        let ind = this.map_name_to_index[name]
        if (ind) {
            return this.charms_obtained[ind] ? DATA_PRISTINE_CHARMS[ind][1] : 0
        }

        throw new Error(`${name} is not a valid charm name`)
    }

    getDisplay() {
        let table = (document.createElement("table"))
        table.classList.add("outlined")
        for (let [ind, charm] of DATA_PRISTINE_CHARMS.entries()) {
            let name = charm[0]

            let row = table.appendChild(document.createElement("tr"))
            let elem = row.appendChild(document.createElement("td"))
            elem.innerText = name

            elem = row.appendChild(document.createElement("td"))
            let checkbox = elem.appendChild(document.createElement("input"))
            checkbox.type = "checkbox"
            checkbox.checked = this.charms_obtained[ind]
            checkbox.addEventListener("input", (event) => {
                console.log("change pristine charm", name, this.charms_obtained[ind], "to", checkbox.checked)
                this.charms_obtained[ind] = checkbox.checked
                this.account.setModifiedFromSaveData()
            });
        }

        return table
    }


}
const DATA_PRISTINE_CHARMS = [
    ["SPARKLE_LOG", 0.2],
    ["FRUIT_ROLLE", 0.2],
    ["GLOWING_VEIL", 0.4],
    ["COTTON_CANDY", 0.15],
    ["SUGAR_BOMB", 0.2],
    ["GUMM_EYE", 0.2],
    ["BUBBLEGUM_LAW", 0.25],
    ["SOUR_WOWZER", 0.5],
    ["CRYSTAL_COMB", 0.3],
    ["ROCK_CANDY", 0.5],
    ["LOLLIPOP_LAW", 0.2],
    ["TAFFY_DISC", 0.5],
    ["STICK_OF_CHEW", 0.3],
    ["TREAT_SACK", 0.4],
    ["GUMM_STICK", 0.5],
    ["LOLLY_FLOWER", 0.25],
    ["GUMBALL_NECKLACE", 0.4],
    ["LIQORICE_ROLLE", 0.25],
    ["GLIMMERCHAIN", 0.3],
    ["TWINKLE_TAFFY", 0.3],
    ["JELLYPICK", 0.2],
    ["CANDY_CACHE", 0.4],
    ["MYSTERY_FIZZ", 0.3],
]

