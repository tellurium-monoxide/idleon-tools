import { BaseCharFeature } from "./BaseCharFeature.js";



export class CarryCap extends BaseCharFeature {



    constructor(account, character) {
        super(account, character);

        // this.skill_levels = char_props["Lv0"].slice(1, 19)
        // delete char_props["Lv0"]

        this.pouch_tiers = {}

        for (const [cat, gamecat] of Object.entries(DATA_ITEM_CATEGORIES)) {

            let basecap = character.props["MaxCarryCap"][gamecat] ?? 0

            let tier = DATA_CARRY_CAP.findIndex((v, i) => (v == basecap))

            this.pouch_tiers[cat] = tier


        }

        delete character.props["MaxCarryCap"]

        this.inv_slots = 0
        for (const [bag, slots] of Object.entries(character.props["InvBagsUsed"])) {
            this.inv_slots += Number(slots)
        }
        delete character.props["InvBagsUsed"]
    }

    test() {
        console.log(this.pouch_tiers)
        console.log(this.getInvSlots())
    }

    getInvSlots() {
        let slots = 16
        slots += this.account.general.p2w.bundles.has("Auto-Loot_Pack") * 5
        slots += this.account.general.p2w.bundles.has("Eternal_Hunter_Pack") * 8

        slots += 3 // TODO event shop
        slots += this.inv_slots
        return slots
    }


    getCapacity(category) {
        if (category == "Quest") {
            return 1000000
        }
        if (category == "Equipment") {
            return 1
        }

        let pouch_tier = this.pouch_tiers[category]

        let summoning_lvl = this.character.skill_levels.getLevel("SUMMONING")
        // TODO gigafrog companion
        let base_cap = DATA_CARRY_CAP[pouch_tier] + this.account.general.vault.getBonusByName("Carry_Capacity")
        base_cap *= 3.5 // Gem Shop Carry Capacity
            * (1 + 1.77 + 0.05) // Prayer Ruck Sack + Bribe	Bottomless Bags
            * (1 + this.character.talents.getTalentBonusByName("TELEKINETIC_STORAGE") + 0) //Star Talent Telekinetic Storage + Guild Rucksack
            * (1 + this.account.world3.construction.shrines.getBonusByName("PANTHEON_SHRINE"))
            * (1
                + this.account.world1.stamps.getBonusByName("MASON_JAR_STAMP") // Stamp Mason Jar
                + (0.1 + 0.05 + 0.3) * 2 * Math.pow(1.1, Math.ceil((summoning_lvl + 1) / 20)) // Star signs: Pack Mule, The OG Skiller, Mr No Sleep. Doubled by chip
            )
        if (category == "Material") {
            base_cap *= (1
                + this.account.world1.stamps.getBonusByName("MATTY_BAG_STAMP")
                + this.character.talents.getTalentBonusByName("EXTRA_BAGS")
            )
        } else if (category == "Chopping") {
            base_cap *= (1 + this.account.world1.stamps.getBonusByName("CHOPPIN'_BAG_STAMP"))
        } else if (category == "Mining") {
            base_cap *= (1 + this.account.world1.stamps.getBonusByName("LIL'_MINING_BAGGY_STAMP"))
        } else if (category == "Fishing") {
            base_cap *= (1 + this.account.world1.stamps.getBonusByName("BAG_O_HEADS_STAMP"))
        } else if (category == "Catching") {
            base_cap *= (1 + this.account.world1.stamps.getBonusByName("BUGSACK_STAMP"))
        }
        return base_cap
    }

    getTotalCapacity(category) {
        return this.getInvSlots() * this.getCapacity(category)

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
            td.innerText = formatIdleonNumbers(this.getCapacity(cat))
            td = row.appendChild(document.createElement("td"))
            td.innerText = formatIdleonNumbers(this.getTotalCapacity(cat))
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
