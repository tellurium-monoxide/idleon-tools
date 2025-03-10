import { BaseFeature } from "../../BaseFeature.js";

export class ShinyPets extends BaseFeature {

    constructor(account) {
        super(account);
        let breeding_data = (account.save_data["Breeding"])
        let breeding_times = breeding_data.slice(22, 26)
        // console.log(breeding_times)


        this.shiny_levels = {}
        this.map_name_to_indexes = {}
        for (let [indWorld, worldXpets] of DATA_SHINY_PETS.entries()) {

            for (let [indPet, pet] of worldXpets.entries()) {
                let [name, passiveIndex, bonus] = pet
                let time = Number(breeding_times[indWorld][indPet])
                let level = this.calcShinyLevel(time)
                this.shiny_levels[name] = level
                this.map_name_to_indexes[name] = [indWorld, indPet]
            }
        }

        // console.log(this.shiny_levels)

    }

    test() {
        console.log(this.getLevelByName("Green_Mushroom"))
        console.log(this.getLevelByEffect("Faster_Shiny_Pet_Lv_Up"))
    }
    getLevelByName(name) {
        let lvl = this.shiny_levels[name]
        if (lvl) {
            return lvl
        } else {
            throw new Error(`${name} is not a valid pet name`);
        }
    }
    getLevelByEffect(bonus_name) {
        let lvls = 0
        for (let category of DATA_SHINY_PETS) {
            for (let pet of category) {
                if (pet[2].includes(bonus_name)) {
                    lvls += this.shiny_levels[pet[0]]
                }
            }
        }
        return lvls

    }

    calcTimeForShinyLevel(goal) {
        return Math.floor((1 + Math.pow(goal, 1.6)) * Math.pow(1.7, goal));
    }

    calcShinyLevel(time) {
        let lvl = 1;
        while (this.calcTimeForShinyLevel(lvl) < time) {
            lvl += 1;
        }
        return lvl;
    }

    getTotalShinyLevels() {
        let total = 0
        for (let [name, lvl] of Object.entries(this.shiny_levels)) {
            total += lvl
        }
        return total
    }
    getDisplay() {
        let display = document.createElement("table")

        let header_row = document.createElement("tr")
        display.appendChild(header_row)
        let cell = document.createElement("th")
        cell.innerText = "Pet name"
        header_row.appendChild(cell)
        cell = document.createElement("th")
        cell.innerText = "World"
        header_row.appendChild(cell)
        cell = document.createElement("th")
        cell.innerText = "Level"
        header_row.appendChild(cell)
        // TODO: nicer display with world grouping
        for (let [name, [indW, indP]] of Object.entries(this.map_name_to_indexes)) {

            let level = this.shiny_levels[name]

            let row = document.createElement("tr")
            display.appendChild(row)
            let name_cell = document.createElement("td")
            name_cell.innerText = `${name}`
            row.appendChild(name_cell)

            let world_cell = document.createElement("td")
            world_cell.innerText = indW + 1
            row.appendChild(world_cell)
            let input_cell = document.createElement("td")
            row.appendChild(input_cell)
            let input_base = document.createElement("input")
            input_base.type = "number"
            input_base.min = 0
            input_base.max = 20
            input_base.value = level
            input_cell.appendChild(input_base)
            new InputSpinner(input_base, { inputSize: 5 })
            input_base.addEventListener("input", (event) => {
                console.log("change shiny level", name, this.shiny_levels[name], "to", Number(input_base.value))
                this.shiny_levels[name] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }

}

export const DATA_SHINY_PETS = [
    [
        ["Green_Mushroom", "1", "+{%_Faster_Shiny_Pet_Lv_Up_Rate"], ["Squirrel", "2", "+{_Infinite_Star_Signs"], ["Frog", "3", "+{%_Total_Damage"], ["Bored_Bean", "4", "+{%_Faster_Refinery_Speed"], ["Red_Mushroom", "5", "+{%_Bonuses_from_All_Meals"], ["Slime", "6", "+{%_Drop_Rate"], ["Piggo", "8", "+{_Infinite_Star_Signs"], ["Baby_Boa", "9", "+{%_Multikill_Per_Tier"], ["Carrotman", "11", "+{_Base_Efficiency_for_All_Skills"], ["Glublin", "13", "+{_Infinite_Star_Signs"], ["Wode_Board", "16", "+{%_Faster_Shiny_Pet_Lv_Up_Rate"], ["Gigafrog", "19", "+{_Base_Efficiency_for_All_Skills"], ["Wild_Boar", "22", "+{_Base_AGI"], ["Walking_Stick", "28", "+{_Base_Critters_per_Trap"], ["Nutto", "33", "+{%_Total_Damage"], ["Poop", "38", "+{%_Farming_EXP_gain"], ["Rat", "44", "+{%_Multikill_Per_Tier"]
    ], [
        ["Sandy_Pot", "7", "+{%_Class_EXP"], ["Mimic", "10", "+{_Tab_1_Talent_Pts"], ["Crabcake", "12", "+{%_Skill_EXP"], ["Mafioso", "14", "+{_Tab_2_Talent_Pts"], ["Mallay", "15", "+{%_Line_Width_in_Lab"], ["Sand_Castle", "17", "+{_Base_STR"], ["Pincermin", "18", "+{%_Total_Damage"], ["Mashed_Potato", "19", "+{_Base_Efficiency_for_All_Skills"], ["Tyson", "20", "+{%_Higher_Artifact_Find_Chance"], ["Whale", "24", "+{%_Faster_Refinery_Speed"], ["Moonmoon", "26", "+{_Base_WIS"], ["Sand_Giant", "30", "+{_Base_Efficiency_for_All_Skills"], ["Snelbie", "35", "+{_Tab_4_Talent_Pts"], ["Dig_Doug", "46", "+{%_Farming_EXP_gain"], ["Beefie", "53", "+{_Base_LUK"], ["Crescent_Spud", "60", "+{%_Faster_Shiny_Pet_Lv_Up_Rate"], ["Chippy", "62", "+{%_Summoning_EXP_gain"]
    ], [
        ["Sheepie", "21", "+{%_Bonuses_from_All_Meals"], ["Frost_Flake", "23", "+{_Tab_3_Talent_Pts"], ["Sir_Stache", "25", "+{_Infinite_Star_Signs"], ["Xylobone", "27", "+{%_Drop_Rate"], ["Bunny", "29", "+{_Base_LUK"], ["Bloque", "31", "+{%_Multikill_Per_Tier"], ["Mamooth", "32", "+{%_Higher_Artifact_Find_Chance"], ["Snowman", "34", "+{%_Class_EXP"], ["Penguin", "36", "+{_Infinite_Star_Signs"], ["Thermister", "37", "+{%_Skill_EXP"], ["Quenchie", "39", "+{%_Faster_Shiny_Pet_Lv_Up_Rate"], ["Cryosnake", "40", "+{_Star_Talent_Pts"], ["Mecho_Mouse", "43", "+{_Base_STR"], ["Bop_Box", "51", "+{_Infinite_Star_Signs"], ["Neyeptune", "54", "+{%_Farming_EXP_gain"], ["Dedotated_Ram", "58", "+{%_Multikill_Per_Tier"], ["Bloodbone", "61", "+{%_Farming_EXP_gain"], ["Panda", "64", "+{%_Total_Damage"]
    ], [
        ["Purp_Mushroom", "38", "+{%_Farming_EXP_gain"], ["TV", "41", "+{%_Sail_Captain_EXP_Gain"], ["Donut", "42", "+{%_Summoning_EXP_gain"], ["Demon_Genie", "45", "+{%_Faster_Refinery_Speed"], ["Flying_Worm", "47", "+{_Base_AGI"], ["Dog", "48", "+{%_Lower_Minimum_Travel_Time_for_Sailing"], ["Soda_Can", "49", "+{%_Higher_Artifact_Find_Chance"], ["Gelatinous_Cuboid", "50", "+{%_Total_Damage"], ["Choccie", "52", "+{%_Drop_Rate"], ["Biggole_Wurm", "55", "+{%_Class_EXP"], ["Cool_Bird", "56", "+{_Base_STR"], ["Clammie", "57", "+{%_Skill_EXP"], ["Octodar", "59", "+{_Base_Critters_per_Trap"], ["Flombeige", "63", "+{_Base_AGI"], ["Stilted_Seeker", "65", "+{_Base_WIS"], ["Hedgehog", "66", "+{_Base_LUK"]
    ]
];
