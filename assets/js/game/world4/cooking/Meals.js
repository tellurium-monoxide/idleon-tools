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
    ["TURKEY_A_LA_THANK", "+{%_TOTAL_DAMAGE", 0.02, 10],
    ["EGG", "+{%_MEAL_COOKING_SPEED", 0.05, 15],
    ["SALAD", "+{%_CASH_FROM_MONSTERS", 0.03, 25],
    ["PIE", "+{%_NEW_RECIPE_COOKING_SPEED", 0.05, 40],
    ["FRENK_FRIES", "+{%_NEW_PET_BREEDING_ODDS", 0.05, 60],
    ["SPAGHETTI", "+{%_BREEDING_EXP", 0.04, 90],
    ["CORN", "+{%_SKILL_EFFICIENCY", 0.02, 125],
    ["GARLIC_BREAD", "+{%_VIP_LIBRARY_MEMBERSHIP", 0.04, 175],
    ["GARLICLESS_BREAD", "+{%_LAB_EXP", 0.02, 250],
    ["PIZZA", "+{%_NEW_PET_BREEDING_ODDS", 0.09, 350],
    ["APPLE", "+{_BASE_DEF", 5, 500],
    ["PANCAKES", "+{PX_LINE_WIDTH_IN_LAB_MAINFRAME", 0.02, 700],
    ["CORNDOG", "+{%_MEAL_COOKING_SPEED", 0.12, 1E3],
    ["CABBAGE", "+{%_COOKING_SPD_PER_10_KITCHEN_LVS", 0.05, 1400],
    ["POTATO_PEA_PASTRY", "+{%_LOWER_EGG_INCUBATOR_TIME", 0.01, 2E3],
    ["DANGO", "+{%_LOWER_KITCHEN_UPGRADE_COSTS", 0.02, 3E3],
    ["SOURISH_FISH", "+{%_VIP_LIBRARY_MEMBERSHIP", 0.04, 4E3],
    ["OCTOPLOP", "+{%_TOTAL_DAMAGE", 0.02, 5E3],
    ["CROISSANT", "+{%_PET_FIGHTING_DAMAGE", 0.01, 8E3],
    ["CANOPY", "+{%_NEW_RECIPE_COOKING_SPEED", 0.1, 12500],
    ["CANNOLI", "+{%_POINTS_EARNED_IN_TOWER_DEFENCE", 0.01, 2E4],
    ["CHEESE", "+{%_COOKING_EXP", 0.05, 35E3],
    ["SAWDUST", "+{%_LAB_EXP", 0.05, 5E4],
    ["EGGPLANT", "+{%_PET_BREEDABILITY_SPEED", 0.05, 75E3],
    ["CHEESY_BREAD", "+{%_TOTAL_ACCURACY", 0.01, 11E4],
    ["WILD_BOAR", "+{PX_LINE_WIDTH_IN_LAB_MAINFRAME", 2, 2E5],
    ["DONUT", "+{%_NEW_PET_BREEDING_ODDS", 0.15, 3E5],
    ["RICEBALL", "+{%_SKILL_EFFICIENCY", 0.03, 5E5],
    ["CAULIFLOWER", "+{%_BASIC_ATK_SPEED", 0.01, 75E4],
    ["DURIAN_FRUIT", "+{%_LOWER_KITCHEN_UPGRADE_COSTS", 0.06, 1E6],
    ["ORANGE", "+{%_VIP_LIBRARY_MEMBERSHIP", 0.03, 15E5],
    ["BUNT_CAKE", "+{%_CASH_FROM_MONSTERS", 0.07, 3E6],
    ["CHOCOLATE_TRUFFLE", "+{%_NEW_PET_BREEDING_ODDS", 0.25, 5E6],
    ["LEEK", "+{%_SKILLING_PROWESS", 0.02, 8E6],
    ["FORTUNE_COOKIE", "+{%_FASTER_LIBRARY_CHECKOUT_SPEED", 0.04, 12E6],
    ["PRETZEL", "+{%_LAB_EXP", 0.07, 2E7],
    ["SEA_URCHIN", "+{%_CRITTERS_FROM_TRAPS", 0.01, 3E7],
    ["MASHED_POTATO", "+{%_COOKING_EXP", 0.06, 4E7],
    ["MUTTON", "+{%_CRIT_CHANCE", 0.01, 9E7],
    ["WEDDING_CAKE", "+{%_PET_FIGHTING_DAMAGE", 0.02, 135E6],
    ["EEL", "+{%_LINE_WIDTH_IN_LAB_MAINFRAME", 0.01, 2E8],
    ["WHIPPED_COCOA", "+{%_SKILL_EFFICIENCY", 0.04, 3E8],
    ["ONION", "+{%_TOTAL_DAMAGE", 0.03, 5E8],
    ["SODA", "+{%_MEAL_COOKING_SPEED", 0.2, 7E8],
    ["SUSHI_ROLL", "+{%_VIP_LIBRARY_MEMBERSHIP", 0.07, 9E8],
    ["BUNCHA_BANANA", "+{_MAX_LVS_FOR_TP_PETE_STAR_TALENT", 0.04, 125E7],
    ["PUMPKIN", "+{%_LIQUID_CAP_FOR_LIQUIDS_1_AND_2", 0.02, 17E8],
    ["COTTON_CANDY", "+{%_DIVINITY_EXP", 0.02, 4E9],
    ["MASSIVE_FIG", "+{%_TOTAL_DAMAGE", 0.03, 7E9],
    ["HEAD_CHEF_GEUSTLOAF", "+{%_BITS_GAINED_IN_GAMING", 0.04, 1E10],
    ["KIWI_FRUIT", "+{%_LIQUID_CAP_FOR_LIQUIDS_3_AND_4", 0.02, 14E9],
    ["POPPED_CORN", "+{%_SAILING_SPEED", 0.02, 2E10],
    ["DOUBLE_CHERRY", "+{%_MEAL_COOKING_SPEED", 0.3, 32E9],
    ["RATATOUEY", "+{%_LOWER_KITCHEN_UPGRADE_COSTS", 0.08, 52E9],
    ["GIANT_TOMATO", "+{%_GAMING_EXP", 0.05, 9E10],
    ["WRATH_GRAPES", "+{%_DIVINITY_EXP", 0.04, 13E10],
    ["SAUSY_SAUSAGE", "+{%_BITS_GAINED_IN_GAMING", 0.06, 225E9],
    ["SEASONED_MARROW", "+{%_FARMING_EXP", 0.03, 35E10],
    ["STICKY_BUN", "+{%_ALL_SUMMONING_ESSENCE_GAIN", 0.05, 7E11],
    ["FRAZZLEBERRY", "+{%_SNEAKING_EXP", 0.02, 1E12],
    ["MISTERLOIN_STEAK", "+{%_JADE_GAIN_FROM_SNEAKING", 0.06, 17E11],
    ["LARGE_POHAYOH", "+{%_SUMMONING_EXP", 0.02, 6E12],
    ["BILL_JACK_PEPPER", "+{%_CROP_EVOLUTION_CHANCE", 0.05, 35E12],
    ["BURNED_MARSHMALLOW", "+{%_MEAL_COOKING_SPEED", 0.4, 9E13],
    ["YUMI_PEACHRING", "+{%_ALL_GOLDEN_FOOD_BONUS", 0.02, 8E14],
    ["PLUMPCAKES", "+{%_TOTAL_DAMAGE", 0.06, 6E15],
    ["NYANBORGIR", "+{%_CROP_EVOLUTION_CHANCE", 0.09, 5E16]
]
