import { BaseFeature } from "../BaseFeature.js";



export class CarryCap extends BaseFeature {



    constructor(account, char_index, char_props) {
        super(account);
        this.char_index = char_index

        // this.skill_levels = char_props["Lv0"].slice(1, 19)
        // delete char_props["Lv0"]

        this.pouch_tiers = {}

        for (const [cat, gamecat] of Object.entries(DATA_ITEM_CATEGORIES)) {

            let basecap = char_props["MaxCarryCap"][gamecat] ?? 0

            let tier = DATA_CARRY_CAP.findIndex((v, i) => (v == basecap))

            this.pouch_tiers[cat] = tier


        }

        delete char_props["MaxCarryCap"]

        this.inv_slots = 0
        for (const [bag, slots] of Object.entries(char_props["InvBagsUsed"])) {
            this.inv_slots += Number(slots)
        }
        delete char_props["InvBagsUsed"]
    }

    test() {
        console.log(this.pouch_tiers)
        console.log(this.inv_slots)
    }


    getCapacity(category) {
        if (category == "Quest") {
            return 1000000
        }
        if (category == "Equipment") {
            return 1
        }

        let pouch_tier = this.pouch_tiers[category]

        let base_cap = DATA_CARRY_CAP[pouch_tier] + this.account.general.vault.getBonusByName("Carry_Capacity")
        base_cap *= 3.5 // Gem Shop Carry Capacity
            * (1 + 1.77 + 0.05) // Prayer Ruck Sack + Bribe	Bottomless Bags
            * (1 + 0.3 * 50 / (60 + 50) + 0) //Star Talent Telekinetic Storage + Guild Rucksack
            * (1 + 0) // Shrine Pantheon
            * (1
                + this.account.world1.stamps.getBonusByName("MASON_JAR_STAMP") // Stamp Mason Jar
                + (0.1 + 0.05 + 0.3) * 2 * Math.pow(1.1, Math.ceil((121 + 1) / 20)) // Star signs: Pack Mule, The OG Skiller, Mr No Sleep. Doubled by chip
            )

        return base_cap
    }

    getTotalCapacity(category) {
        return this.inv_slots * this.getCapacity(category)

    }


    getDisplay() {
        let display = document.createElement("table")

        for (let [cat, _] of Object.entries(DATA_ITEM_CATEGORIES)) {
            let tier = this.pouch_tiers[cat]

            let row = display.appendChild(document.createElement("tr"))

            let td = row.appendChild(document.createElement("td"))
            td.innerText = cat

            td = row.appendChild(document.createElement("td"))

            if (tier >= 0) {
                let input = td.appendChild(document.createElement("select"))

                for (const [t, pouchname] of DATA_POUCHES.entries()) {
                    let opt = input.appendChild(document.createElement("option"))
                    opt.value = t
                    opt.innerText = pouchname
                    if (tier == t) {
                        opt.selected = true
                    }
                }


                input.addEventListener("input", (event) => {
                    console.log("change pouch tier for", cat, "from", this.pouch_tiers[cat], "to", Number(input.value))
                    this.pouch_tiers[cat] = Number(input.value)
                    this.account.setModifiedFromSaveData()
                });

            }

            td = row.appendChild(document.createElement("td"))
            td.innerText = this.getCapacity(cat)
        }
        return display
    }
}



const DATA_CARRY_CAP = [
    25,
    50,
    100,
    250,
    500,
    1000,
    2000,
    5000,
    10000,
    20000,
    25000,
    30000
]
const DATA_POUCHES = [
    "NONE",
    "CRAMPED",
    "SMALL",
    "AVERAGE",
    "SIZABLE",
    "BIG",
    "LARGE",
    "MASSIVE",
    "VOLUMETRIC",
    "COLOSSAL",
    "GARGANTUAN",
    "HERCULEAN"
]

const DATA_ITEM_CATEGORIES = {
    "Material": "bCraft",
    "Food": "Foods",
    "Chopping": "Chopping",
    "Mining": "Mining",
    "Fishing": "Fishing",
    "Catching": "Bugs",
    "Trapping": "Critters",
    "Worship": "Souls",
    "Equipment": "",
    "Quest": "",
}
