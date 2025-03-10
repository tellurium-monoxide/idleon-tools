import { BaseFeature } from "../../BaseFeature.js";

export class Meals extends BaseFeature {


    constructor(account) {
        super(account);
        let meal_data = account.save_data["Meals"]
        let data_ribbons = account.save_data["Ribbon"]

        let meal_count = DATA_MEALS.length
        this.meal_levels = meal_data[0].map(Number).slice(0, meal_count)
        this.meal_quantities = meal_data[2].map(Number).slice(0, meal_count)
        this.meal_ribbons = data_ribbons.slice(28, 28 + meal_count)

        this.map_name_to_index = {}
        for (let [ind, meal] of DATA_MEALS.entries()) {
            this.map_name_to_index[meal[0].toUpperCase()] = ind
        }

        console.log(this.map_name_to_index)



    }

    test() {
        console.log("meal effect", this.getMealEffect())
        console.log("Turkey_a_la_Thank", this.getBonusByName("Turkey_a_la_Thank"))
        console.log("_Total_Damage", this.getBonusByEffect("_Total_Damage"))
    }
    getBonusByName(name) {

        if (name.toUpperCase() in this.map_name_to_index) {
            let ind = this.map_name_to_index[name.toUpperCase()]
            let lvl = this.meal_levels[ind]
            let ribbon_tier = this.meal_ribbons[ind]
            let ribbon_mult = DATA_RIBBON_MULTIPLIERS[ribbon_tier]
            let meal_effect = this.getMealEffect()

            let base = DATA_MEALS[ind][2]
            return lvl * base * ribbon_mult * meal_effect
        }
        throw new Error(`${name} is not a valid meal name`)
    }

    getBonusByEffect(effect) {
        let sum = 0
        for (let [ind, meal] of DATA_MEALS.entries()) {
            if (meal[1].toUpperCase().includes(effect.toUpperCase())) {
                sum += this.getBonusByName(meal[0])
            }
        }

        return sum

    }

    getMealEffect() {
        // TODO : lab
        let lab_pure_opal_navette_active = true
        let lab_spelunkerobol_active = true
        let black_diamond = 0.16 * (1 + 0.1 * lab_pure_opal_navette_active + 0.5 * lab_spelunkerobol_active)
        let shiny_effect = this.account.world4.breeding.shiny_pets.getLevelByEffect("Bonuses_from_All_Meals") * 0.01
        let meal_effect = 1 + black_diamond + shiny_effect

        let summoning_mult = 1 + this.account.world6.summoning.battles.getBonusByStat("MEAL_BONUSES")

        meal_effect *= summoning_mult

        return meal_effect
    }

    getTotalLevels() {
        return this.meal_levels.reduce((a, b) => (a + b), 0)
    }


    getDisplay() {
        let table = document.createElement("table")
        table.classList.add("outlined")
        let row = table.appendChild(document.createElement("tr"))
        row.appendChild(document.createElement("th")).innerText = "Meal"
        row.appendChild(document.createElement("th")).innerText = "Lvl"
        row.appendChild(document.createElement("th")).innerText = "Quantity"
        row.appendChild(document.createElement("th")).innerText = "Ribbon Tier"
        for (let [ind, meal] of DATA_MEALS.entries()) {
            let [name, effect, base_value, cookReq] = meal

            let lvl = this.meal_levels[ind]
            let qtt = this.meal_quantities[ind]
            let ribbon_tier = this.meal_ribbons[ind]


            row = table.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = name

            let td = row.appendChild(document.createElement("td"))
            let input_level = td.appendChild(document.createElement("input"))
            input_level.type = "number"
            input_level.min = 0
            input_level.max = 110 // TODO: calc max meal lvl maybe
            input_level.value = lvl
            new InputSpinner(input_level)
            input_level.addEventListener("input", (event) => {
                console.log("change meal", name, "level", this.meal_levels[ind], "to", Number(input_level.value))
                this.meal_levels[ind] = Number(input_level.value)
                this.account.setModifiedFromSaveData()
            });

            td = row.appendChild(document.createElement("td"))
            let input_qtt = td.appendChild(document.createElement("input"))
            input_qtt.type = "text"
            input_qtt.value = qtt.toExponential(2)

            input_qtt.addEventListener("input", (event) => {
                console.log("change meal", name, "qtt", this.meal_quantities[ind], "to", Number(input_qtt.value))
                this.meal_quantities[ind] = Number(input_qtt.value)
                this.account.setModifiedFromSaveData()
            });

            td = row.appendChild(document.createElement("td"))
            let input_ribbon = td.appendChild(document.createElement("input"))
            input_ribbon.type = "number"
            input_ribbon.min = 0
            input_ribbon.max = 20
            input_ribbon.value = ribbon_tier
            new InputSpinner(input_ribbon)
            input_ribbon.addEventListener("input", (event) => {
                console.log("change meal", name, "ribbon", this.meal_ribbons[ind], "to", Number(input_ribbon.value))
                this.meal_ribbons[ind] = Number(input_ribbon.value)
                this.account.setModifiedFromSaveData()
            });


        }

        return table

    }
}
const DATA_RIBBON_MULTIPLIERS = [1, 1.05, 1.14, 1.19, 1.28, 1.46, 1.61, 1.66, 1.82, 1.87, 2.35, 2.4, 2.62, 2.67, 2.89, 3.39, 3.68, 3.73, 4.01, 4.06, 5]

const DATA_MEALS = [
    ["Turkey_a_la_Thank", "+{%_Total_Damage", 0.02, 10],
    ["Egg", "+{%_Meal_Cooking_Speed", 0.05, 15],
    ["Salad", "+{%_Cash_from_Monsters", 0.03, 25],
    ["Pie", "+{%_New_Recipe_Cooking_Speed", 0.05, 40],
    ["Frenk_Fries", "+{%_New_Pet_Breeding_Odds", 0.05, 60],
    ["Spaghetti", "+{%_Breeding_EXP", 0.04, 90],
    ["Corn", "+{%_Skill_Efficiency", 0.02, 125],
    ["Garlic_Bread", "+{%_VIP_Library_Membership", 0.04, 175],
    ["Garlicless_Bread", "+{%_Lab_EXP", 0.02, 250],
    ["Pizza", "+{%_New_Pet_Breeding_Odds", 0.09, 350],
    ["Apple", "+{_Base_DEF", 5, 500],
    ["Pancakes", "+{Px_Line_Width_in_Lab_Mainframe", 0.02, 700],
    ["Corndog", "+{%_Meal_Cooking_Speed", 0.12, 1e3],
    ["Cabbage", "+{%_Cooking_Spd_per_10_Kitchen_LVs", 0.05, 1400],
    ["Potato_Pea_Pastry", "+{%_Lower_Egg_Incubator_Time", 0.01, 2e3],
    ["Dango", "+{%_Lower_Kitchen_Upgrade_Costs", 0.02, 3e3],
    ["Sourish_Fish", "+{%_VIP_Library_Membership", 0.04, 4e3],
    ["Octoplop", "+{%_Total_Damage", 0.02, 5e3],
    ["Croissant", "+{%_Pet_Fighting_Damage", 0.01, 8e3],
    ["Canopy", "+{%_New_Recipe_Cooking_Speed", 0.1, 12500],
    ["Cannoli", "+{%_Points_earned_in_Tower_Defence", 0.01, 2e4],
    ["Cheese", "+{%_Cooking_EXP", 0.05, 35e3],
    ["Sawdust", "+{%_Lab_EXP", 0.05, 5e4],
    ["Eggplant", "+{%_Pet_Breedability_Speed", 0.05, 75e3],
    ["Cheesy_Bread", "+{%_Total_Accuracy", 0.01, 11e4],
    ["Wild_Boar", "+{Px_Line_Width_in_Lab_Mainframe", 2, 2e5],
    ["Donut", "+{%_New_Pet_Breeding_Odds", 0.15, 3e5],
    ["Riceball", "+{%_Skill_Efficiency", 0.03, 5e5],
    ["Cauliflower", "+{%_Basic_Atk_Speed", 0.01, 75e4],
    ["Durian_Fruit", "+{%_Lower_Kitchen_Upgrade_costs", 0.06, 1e6],
    ["Orange", "+{%_VIP_Library_Membership", 0.03, 15e5],
    ["Bunt_Cake", "+{%_Cash_from_Monsters", 0.07, 3e6],
    ["Chocolate_Truffle", "+{%_New_Pet_Breeding_Odds", 0.25, 5e6],
    ["Leek", "+{%_skilling_prowess", 0.02, 8e6],
    ["Fortune_Cookie", "+{%_Faster_Library_checkout_Speed", 0.04, 12e6],
    ["Pretzel", "+{%_Lab_EXP", 0.07, 2e7],
    ["Sea_Urchin", "+{%_Critters_from_traps", 0.01, 3e7],
    ["Mashed_Potato", "+{%_Cooking_EXP", 0.06, 4e7],
    ["Mutton", "+{%_Crit_Chance", 0.01, 9e7],
    ["Wedding_Cake", "+{%_Pet_Fighting_Damage", 0.02, 135e6],
    ["Eel", "+{%_Line_Width_in_Lab_Mainframe", 0.01, 2e8],
    ["Whipped_Cocoa", "+{%_Skill_Efficiency", 0.04, 3e8],
    ["Onion", "+{%_Total_Damage", 0.03, 5e8],
    ["Soda", "+{%_Meal_Cooking_Speed", 0.2, 7e8],
    ["Sushi_Roll", "+{%_VIP_Library_Membership", 0.07, 9e8],
    ["Buncha_Banana", "+{_Max_LVs_for_TP_Pete_Star_Talent", 0.04, 125e7],
    ["Pumpkin", "+{%_Liquid_Cap_for_liquids_1_and_2", 0.02, 17e8],
    ["Cotton_Candy", "+{%_Divinity_EXP", 0.02, 4e9],
    ["Massive_Fig", "+{%_Total_Damage", 0.03, 7e9],
    ["Head_Chef_Geustloaf", "+{%_Bits_Gained_in_Gaming", 0.04, 1e10],
    ["Kiwi_Fruit", "+{%_Liquid_Cap_for_liquids_3_and_4", 0.02, 14e9],
    ["Popped_Corn", "+{%_Sailing_Speed", 0.02, 2e10],
    ["Double_Cherry", "+{%_Meal_Cooking_Speed", 0.3, 32e9],
    ["Ratatouey", "+{%_Lower_Kitchen_Upgrade_costs", 0.08, 52e9],
    ["Giant_Tomato", "+{%_Gaming_EXP", 0.05, 9e10],
    ["Wrath_Grapes", "+{%_Divinity_EXP", 0.04, 13e10],
    ["Sausy_Sausage", "+{%_Bits_Gained_in_Gaming", 0.06, 225e9],
    ["Seasoned_Marrow", "+{%_Farming_EXP", 0.03, 35e10],
    ["Sticky_Bun", "+{%_All_Summoning_Essence_Gain", 0.05, 7e11],
    ["Frazzleberry", "+{%_Sneaking_EXP", 0.02, 1e12],
    ["Misterloin_Steak", "+{%_Jade_gain_from_Sneaking", 0.06, 17e11],
    ["Large_Pohayoh", "+{%_Summoning_EXP", 0.02, 6e12],
    ["Bill_Jack_Pepper", "+{%_Crop_Evolution_Chance", 0.05, 35e12],
    ["Burned_Marshmallow", "+{%_Meal_Cooking_Speed", 0.4, 9e13],
    ["Yumi_Peachring", "+{%_All_Golden_Food_bonus", 0.02, 8e14],
    ["Plumpcakes", "+{%_Total_Damage", 0.06, 6e15],
    ["Nyanborgir", "+{%_Crop_Evolution_Chance", 0.09, 5e16]
]
