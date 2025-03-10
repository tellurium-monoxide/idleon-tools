import { BaseFeature } from "../BaseFeature.js";

export class Vault extends BaseFeature {

    constructor(account) {
        super(account);

        let vault_data = account.save_data["UpgVault"]


        // console.log(vault_data)

        this.vault_levels = []
        this.map_name_to_ind = {}


        this.vault_data = DATA_VAULT

        let data = Array(100)
        for (let [ind, upg] of DATA_VAULT.entries()) {
            this.vault_levels.push(vault_data[ind])
            this.map_name_to_ind[upg[0]] = ind
        }




        // this.convertFromIT(upgradeVault)

    }
    test() {

        // console.log(this.vault_data)
        console.log("Vault_Mastery:", this.getBonusByName("Vault_Mastery"))
        console.log("Cooking_Knowledge:", this.getBonusByName("Cooking_Knowledge"), "%")
        console.log("Kitchen_Dream-mare:", "x", 1 + this.getBonusByName("Kitchen_Dream-mare") / 100,)

    }

    getBonusByName(name) {
        let upg = DATA_VAULT[this.map_name_to_ind[name]]
        let level = this.vault_levels[this.map_name_to_ind[name]]

        let [n, grow, max, mastery] = upg
        let mastery_mult = this.getMasteryMultiplier(mastery)


        let base = calcGrowingValue(grow, level)

        return base * mastery_mult

    }

    getMasteryMultiplier(mastery) {
        if (mastery == 1) {
            return 1 + this.getBonusByName("Vault_Mastery") / 100
        } else if (mastery == 2) {
            return 1 + this.getBonusByName("Vault_Mastery_II") / 100
        }
        return 1
    }

    getDisplay() {
        let display = document.createElement("table")
        for (let [name, ind] of Object.entries(this.map_name_to_ind)) {

            let level = this.vault_levels[ind]
            let upg = DATA_VAULT[ind]
            let [n, grow, max, mastery] = upg
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
            input_base.max = max
            input_base.value = level
            input_cell.appendChild(input_base)
            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change vault upgrade", name, this.vault_levels[ind], "to", Number(input_base.value))
                this.vault_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }



}
export const DATA_VAULT = [
    ["Bigger_Damage", { "type": "vaultSpecial", "x1": 1, "addThresholds": [[25, 1], [50, 1], [100, 1]], "multiThresholds": [] }, 500, 1], ["Natural_Talent", { "type": "add", "x1": 1 }, 200, 0], ["Monster_Tax", { "type": "add", "x1": 2 }, 500, 1], ["Wicked_Smart", { "type": "add", "x1": 2 }, 500, 1], ["Bullseye", { "type": "add", "x1": 1 }, 200, 1], ["Steel_Guard", { "type": "add", "x1": 1 }, 100, 1], ["Evolving_Talent", { "type": "add", "x1": 1 }, 200, 0], ["Massive_Whirl", { "type": "add", "x1": 2 }, 1, 0], ["Rapid_Arrows", { "type": "add", "x1": 1 }, 1, 0], ["Dual_Fireballs", { "type": "add", "x1": 1 }, 1, 0], ["Weapon_Craft", { "type": "add", "x1": 10 }, 5, 1], ["Mining_Payday", { "type": "add", "x1": 2 }, 40, 1], ["Baby_on_Board", { "type": "add", "x1": 2 }, 50, 1], ["Major_Discount", { "type": "add", "x1": 1 }, 80, 0], ["Bored_to_Death", { "type": "add", "x1": 5 }, 10, 1], ["Knockout!", { "type": "add", "x1": 1 }, 5, 1], ["Stamp_Bonanza", { "type": "add", "x1": 2 }, 100, 1], ["Carry_Capacity", { "type": "add", "x1": 5 }, 100, 1], ["Drops_for_Days", { "type": "add", "x1": 1 }, 50, 1], ["Happy_Doggy", { "type": "add", "x1": 2 }, 100, 1], ["Slice_N_Dice", { "type": "add", "x1": 2 }, 100, 1], ["Go_Go_Secret_Owl", { "type": "add", "x1": 5 }, 100, 1], ["Boss_Decimation", { "type": "add", "x1": 1 }, 25, 1], ["Sleepy_Time", { "type": "add", "x1": 1 }, 20, 1], ["Production_Revolution", { "type": "add", "x1": 5 }, 100, 1], ["Statue_Bonanza", { "type": "add", "x1": 2 }, 50, 1], ["Beeg_Forge", { "type": "add", "x1": 5 }, 100, 1], ["Stick_Snapping", { "type": "add", "x1": 1 }, 50, 1], ["Liquid_Knowledge", { "type": "add", "x1": 1 }, 100, 1], ["Bug_Knowledge", { "type": "add", "x1": 1 }, 100, 1], ["Fish_Knowledge", { "type": "add", "x1": 1 }, 100, 1], ["Dirty_Money", { "type": "add", "x1": 2 }, 25, 1], ["Vault_Mastery", { "type": "add", "x1": 1 }, 50, 0], ["Storage_Slots", { "type": "add", "x1": null }, null, 0], ["Recipe_for_Profit", { "type": "add", "x1": 1 }, 50, 2], ["Schoolin'_the_Fish", { "type": "add", "x1": 1 }, 20, 2],
    ["Straight_to_Storage", { "type": "add", "x1": 1 }, 1, 0], ["Bubble_Money", { "type": "add", "x1": 1 }, 10, 2], ["Drip_Drip_Drip", { "type": "add", "x1": 5 }, 20, 2], ["Active_Learning", { "type": "add", "x1": 2 }, 100, 2], ["Stunning_Talent", { "type": "add", "x1": 1 }, 100, 0], ["Bug_Power_En_Masse", { "type": "add", "x1": 1 }, 20, 2], ["Vial_Overtune", { "type": "add", "x1": 10 }, 3, 0], ["Active_Murdering", { "type": "add", "x1": 1 }, 100, 0], ["Card_Retirement", { "type": "add", "x1": 1 }, 1, 0], ["Go_Go_Secret_Kangaroo_Mouse", { "type": "add", "x1": 10 }, 250, 2], ["All_Armoured_Up", { "type": "add", "x1": 1 }, 100, 2], ["Daily_Mailbox", { "type": "add", "x1": 1 }, 10, 2], ["Buildie_Sheepie", { "type": "add", "x1": 2 }, 20, 2], ["Quest_KAPOW!", { "type": "add", "x1": 1 }, 200, 0], ["Critters_'n_Souls", { "type": "add", "x1": 1 }, 300, 2], ["Slight_Do-Over", { "type": "add", "x1": 1 }, 20, 0], ["Duplicate_Entries", { "type": "add", "x1": 1 }, 1, 0], ["Special_Talent", { "type": "add", "x1": 1 }, 150, 0], ["Kitchen_Dream-mare", { "type": "add", "x1": 6 }, 500, 2], ["Lab_Knowledge", { "type": "add", "x1": 1 }, 100, 2], ["Foraging_Forever", { "type": "add", "x1": 1 }, 250, 0], ["Teh_TOM", { "type": "add", "x1": 2 }, 500, 0], ["Pet_Punchies", { "type": "add", "x1": 2 }, 250, 2], ["Breeding_Knowledge", { "type": "add", "x1": 2 }, 100, 2], ["Cooking_Knowledge", { "type": "vaultSpecial", "x1": 2, "addThresholds": [[25, 1], [50, 1], [100, 2], [200, 3], [300, 5], [400, 7], [450, 10]], "multiThresholds": [[25, 0.2]] }, 500, 2], ["Vault_Mastery_II", { "type": "add", "x1": 1 }, 50, 0]
];
