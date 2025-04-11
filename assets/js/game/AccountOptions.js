import { BaseFeature } from "./BaseFeature.js";

export class AccountOptions extends BaseFeature {


    constructor(account) {
        super(account);

        this.options_values = account.save_data["OptLacc"]
        delete account.save_data_pruned["OptLacc"]
    }

    test() {
        console.log(this.options_values)
    }


    get(index) {
        return this.options_values[index]
    }
    set(index, value) {
        this.options_values[index] = value
    }

    getDisplay() {
        let display = document.createElement("table")
        let head = display.appendChild(document.createElement("tr"))
        let head1 = display.appendChild(document.createElement("th"))
        let head2 = display.appendChild(document.createElement("th"))
        head2.innerText = "Hole global options"
        for (let [key, opt] of Object.entries(DATA_OPTIONS)) {


            let row = display.appendChild(document.createElement("tr"))

            let elem = row.appendChild(document.createElement("td"))
            elem.innerText = `${opt[0]}`


            elem = row.appendChild(document.createElement("td"))
            elem.innerText = `${this.get(key)}`

        }

        return display
    }
}

const DATA_OPTIONS = {
    198: ["Most_Money_held_in_Storage"],
    208: ["Most_Spore_Caps_held_in_Inventory_at_once"],
    201: ["Best_Spiketrap_Surprise_round"],
    172: ["DPS_Record_on_Shimmer_Island"],
    202: ["Best_Crystal_Mob_Spawn_Chance"],
    200: ["Highest_Drop_Rarity_Multi"],
    203: ["Most_DMG_Dealt_to_Gravestone_in_a_Weekly_Battle"],

    199: ["Jackpots_Hit_in_Arcade"],
    204: ["Highest_Killroy_Score_on_a_Warrior"],
    205: ["Highest_Killroy_Score_on_an_Archer"],
    206: ["Highest_Killroy_Score_on_a_Mage"],
    207: ["Fastest_Time_to_kill_Chaotic_Efaunt_"],
    211: ["Largest_Oak_Log_Printer_Sample"],
    212: ["Largest_Copper_Ore_Printer_Sample"],
    213: ["Largest_Spore_Cap_Printer_Sample"],
    214: ["Largest_Goldfish_Printer_Sample"],
    215: ["Largest_Fly_Printer_Sample"],
    209: ["Best_Non_Duplicate_Goblin_Gorefest_Wave"],
    224: ["Most_Greenstacks_in_Storage"],
    220: ["Fastest_Time_reaching_Round_100_Arena_"],
    217: ["Most_Giants_Killed_in_a_Single_Week"],
    218: ["Fastest_Time_to_Kill_200_Tremor_Wurms_(in_Seconds)"],
    210: ["Highest_Immortal_Snail_LV"],
    219: ["Highest_Crop_OG"],
    221: ["Largest_Magic_Bean_Trade"],
    222: ["Most_Balls_earned_from_LBoFaF"],
    262: ["Megafeathers_Earned_from_Orion"],
    279: ["Megafish_Earned_from_Poppy"],
    356: ["Best_Deathbringer_Max_Damage_in_Wraith_Mode"],
    353: ["Best_Pure_Memory_Round_Reached"],
}

