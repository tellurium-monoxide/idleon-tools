class CookingData {
  constructor() { }
  initFromSaveData(save_data) {


    // find current meal data
    let meal_data = JSON.parse(save_data["Meals"])
    // console.log(meal_data)

    this.meal_levels = meal_data[0]
    this.meal_quantities = meal_data[2]


    // TODO : check achiev id
    // find achievments data
    let achieve_data = JSON.parse(save_data["AchieveReg"])
    this.achiev_cabbage_patch = achieve_data[224]
    this.achiev_pretzel_bleu = achieve_data[225]
    this.achiev_best_plate = achieve_data[233]


    // find kitchen data
    this.kitchen_stats = []
    let kitchen_data = JSON.parse(save_data["Cooking"])

    for (let i = 0; i < 10; i++) {
      this.kitchen_stats.push({
        "isRichelin": kitchen_data[i][0] == 2,
        "speedLv": kitchen_data[i][6],
        "fireLv": kitchen_data[i][7],
        "luckLv": kitchen_data[i][8]
      })
    }
    // console.log("kitchen_data:")
    // console.log(this.kitchen_stats)
    // find voidWalker blood marrow and eclipse lvl
    this.voidwalker_blood_marrow_lvl = 0;
    this.voidwalker_eclipse_lvl = 0;
    for (let i = 0; i < 10; i++) {
      if (save_data[`CharacterClass_${i}`] == 4) {
        // console.log(`char ${i} is void walker`);
        let skill_max_levels = JSON.parse(save_data[`SM_${i}`]); // SM for max; SL and SLpre for currents

        this.voidwalker_blood_marrow_lvl = Math.max(skill_max_levels[59], this.voidwalker_blood_marrow_lvl);
        this.voidwalker_eclipse_lvl = Math.max(skill_max_levels[49], this.voidwalker_eclipse_lvl);
        this.apocalypse_active = this.voidwalker_eclipse_lvl >= 125 ? 1 : 0;
        // console.log(this.voidwalker_eclipse_lvl)
        // console.log("apocalypse_active:")
        // console.log(this.apocalypse_active)
      }
    }
    this.blood_marrow_bonus = (this.voidwalker_blood_marrow_lvl * 2.1) / (this.voidwalker_blood_marrow_lvl + 220) / 100;


    // find apocalypse count on BB
    this.blood_berserker_chow_count = 0
    for (let i = 0; i < 10; i++) {
      if (save_data[`CharacterClass_${i}`] == 10) {
        // console.log(`char ${i} is blood berserker`)
        let skill_max_levels = save_data[`SM_${i}`] // SM for max; SL and SLpre for currents
        let KLA = JSON.parse(save_data[`KLA_${i}`])
        // console.log(KLA)

        for (let k = 0; k < KLA.length; k++) {
          if ((KLA[k][0] - KILL_REQ[k]) < -100e6) {
            this.blood_berserker_chow_count += 1
          }
        }
        // console.log("chow count:")
        // console.log(this.blood_berserker_chow_count)
      }
    }

    this.apocalypse_bonus = Math.pow(1.1, this.apocalypse_active * this.blood_berserker_chow_count)
    // find boosts from atoms
    let atom_data = save_data["Atoms"]
    this.void_plate_chef_lvl = atom_data[8]
    // console.log(`void plate chef is lv ${this.void_plate_chef_lvl}`)


    // find boosts from farming
    let farming_crop_data = JSON.parse(save_data["FarmCrop"])
    this.crop_acquired = Object.keys(farming_crop_data).length
    this.crop_depot_bonus = Math.pow(1.1, this.crop_acquired)
    this.farming_lvl = save_data["Lv0_0"][16]
    this.summoning_lvl = save_data["Lv0_0"][18]
    // console.log(this.farming_lvl)

    // find lab boosts
    this.lab_vial_doubling = 1

    // find alchemy bonuses
    this.diamond_chef_lvl = save_data["CauldronInfo"][3]["17"]
    this.diamond_chef_bonus = (this.diamond_chef_lvl * 0.3) / (this.diamond_chef_lvl + 13)
    // console.log(this.diamond_chef_lvl)

    let vial_levels = []
    for (let i = 0; i < save_data["CauldronInfo"][4].length; i++) {
      vial_levels.push(save_data["CauldronInfo"][4][i])
    }
    this.max_level_vials = [...vial_levels].filter(x => x >= 13).length

    this.vial_turtle_bonus = (1 + 0.02 * this.max_level_vials) * vial_levels[74] * 0.04 * (1 + this.lab_vial_doubling)
    this.vial_firefly_bonus = (1 + 0.02 * this.max_level_vials) * vial_levels[68] * 0.05 * (1 + this.lab_vial_doubling)
    this.vial_cooking_bonus = (1 + 0.02 * this.max_level_vials) * (1 + this.lab_vial_doubling) * (
      vial_levels[44] * 0.06
      + vial_levels[55] * 0.02
    )


    // console.log(this.max_level_vials)
    // console.log(this.vial_turtle_bonus)
    // console.log(this.vial_firefly_bonus)
    // console.log(this.vial_cooking_bonus)


    // find gaming bonus (MSA mealing)

    let gaming_info = save_data[`Gaming`]
    let superbits = gaming_info[12]
    this.MSA_mealing_unlocked = (superbits.includes("m"))
    let totem_info = JSON.parse(save_data["TotemInfo"])
    this.total_waves = totem_info[0].reduce((a, b) => a + b)
    // console.log(this.MSA_mealing_unlocked)
    // console.log(this.total_waves)

    // TODO : for now this assumes everything is active in lab
    // find lab active jewels / bonuses
    let lab_info = JSON.parse(save_data["Lab"])
    // console.log("lab_info:")
    // console.log(lab_info)
    this.lab_black_diamond_rhinestone_active = 1

    this.lab_amethyst_rhinestone = 1
    this.lab_purple_rhombol = 1
    this.lab_purple_navette = 1

    this.lab_certified_stamp_book = 1
    this.lab_spelunkerobol_active = 1
    this.lab_depot_stidies_phd = 1 // TODO : this impacts crop depot bonus

    this.lab_amethyst_rhinestone_mult =
      (1 + this.lab_amethyst_rhinestone * (1 + (this.lab_purple_rhombol && this.lab_purple_navette))) // amethystRhinestone   
      * (1 + 0.5 * this.lab_spelunkerobol_active)

    // find meal efficiency
    let breeding_info = JSON.parse(save_data["Breeding"])
    let shiny_time_red_mush = breeding_info[22][4]
    let shiny_time_sheepie = breeding_info[24][0]
    this.shiny_lvl_red_mush = getShinyLevel(shiny_time_red_mush)
    this.shiny_lvl_sheepie = getShinyLevel(shiny_time_sheepie)
    // console.log(breeding_info)
    // console.log(shiny_time_red_mush)
    // console.log(shiny_time_sheepie)

    this.meal_efficiency = 1
      + 0.6 * this.lab_black_diamond_rhinestone_active * (1 + 0.5 * this.lab_spelunkerobol_active)
      + 0.01 * (this.shiny_lvl_red_mush + this.shiny_lvl_sheepie)


    // find stamp bonuses
    let stamp_info = save_data["StampLv"]
    this.stamp_cooked_meal_lvl = stamp_info[1][36]
    this.stamp_cooked_meal_bonus = 0.01
      * this.stamp_cooked_meal_lvl
      * (1 + this.lab_certified_stamp_book)
      * (1 + 0.25 * 0) // TODO : take sneaking into account
    // console.log("stamp_info:")
    // console.log(stamp_info)
    // console.log(this.stamp_cooked_meal_bonus)
    // TODO
    // find arcade bonus
    let arcade_levels = JSON.parse(save_data["ArcadeUpg"])
    this.arcade_cooking_bonus_lvl = arcade_levels[28]
    this.arcade_cooking_bonus = (this.arcade_cooking_bonus_lvl * 40) / (this.arcade_cooking_bonus_lvl + 100)
    // console.log(this.arcade_cooking_bonus_lvl)
    // console.log(this.arcade_cooking_bonus)


    // find sailing boost (triangulon)
    let sailing_info = JSON.parse(save_data["Sailing"])
    this.triangulon_lvl = sailing_info[3][13]

    // console.log(sailing_info)
    // console.log(this.triangulon_lvl)

    // find card infos
    let card0 = JSON.parse(save_data["Cards0"])
    console.log(card0)

    this.getCookingSpeed()

  }

  getCookingSpeed() {

    const total_meal_levels = (this.meal_levels.reduce((a, b) => a + b))

    // console.log(total_meal_levels)


    const diamond_plate_meals = [...this.meal_levels].filter(x => x >= 10).length
    const void_plate_meals = [...this.meal_levels].filter(x => x >= 30).length

    let triangulon_bonus = 0.15
      * this.triangulon_lvl
      * Math.log10(this.meal_quantities[0])

    const cooking_speed_meals_bonus = this.meal_efficiency * (
      this.meal_levels[1] * 0.05 //egg
      + this.meal_levels[12] * 0.12 //corndog
      + this.meal_levels[43] * 0.2 //soda
      + this.meal_levels[52] * 0.3 // cherry
    )

    const marshmallow_meal_bonus = 0.4
      * this.meal_efficiency
      * this.meal_levels[63]
      * Math.ceil((this.farming_lvl + 1) / 50)

    let global_meal_speed_mult = 10 / 3600
      * Math.pow(1 + this.blood_marrow_bonus, total_meal_levels)
      * (this.crop_depot_bonus)
      * (this.apocalypse_bonus)
      * (1 + marshmallow_meal_bonus)
      * Math.pow(1 + this.diamond_chef_bonus, diamond_plate_meals)
      * Math.pow(1 + 0.01 * this.void_plate_chef_lvl, void_plate_meals)
      * (1 + this.MSA_mealing_unlocked * 0.1 * this.total_waves / 10) //msa mealing superbit bonus
      * (1 + triangulon_bonus)
      * (1 + this.arcade_cooking_bonus)
      * (1 + this.vial_turtle_bonus)
      * (1 + this.vial_cooking_bonus)
      * (1 + this.stamp_cooked_meal_bonus)
      * (1 + cooking_speed_meals_bonus)
      * (1) // starSignBonus  
      * (1) // winnerBonus
      * (1) // cardCookingMulti
      * (1 + this.vial_firefly_bonus)
      * (this.lab_amethyst_rhinestone_mult)
      * (1 + 0 + this.achiev_cabbage_patch * 0.1 + this.achiev_pretzel_bleu * 0.2) // TODO : troll card + achievs    


    let total_cooking_speed = 0

    const cabbage_bonus = this.meal_efficiency * this.meal_levels[13] * 0.05

    let kitchen_speeds = []
    for (let i = 0; i < 10; i++) {
      const kitchen = this.kitchen_stats[i]
      const kitchen_total_lvl = kitchen.speedLv + kitchen.fireLv + kitchen.luckLv

      const kitchen_speed = global_meal_speed_mult
        * (1 + kitchen.speedLv / 10)
        * (1 + 2 * kitchen.isRichelin)
        * (1 + cabbage_bonus * kitchen_total_lvl / 10)
      total_cooking_speed += kitchen_speed
    }

    console.log("cooking speed:")
    console.log(total_cooking_speed.toExponential(2))

    return total_cooking_speed
  }



  fillDocumentInputForm() {
    for (let i = 0; i < meal_count; i++) {
      let lvl = this.meal_levels[i]

      document.getElementById(`meal${i}_level`).value = lvl

    }
    for (let i = 0; i < 10; i++) {
      let kitchen = this.kitchen_stats[i]
      document.getElementById(`kitchen${i}_speed_level`).value = kitchen.speedLv
      document.getElementById(`kitchen${i}_fire_level`).value = kitchen.fireLv
      document.getElementById(`kitchen${i}_luck_level`).value = kitchen.luckLv
      document.getElementById(`kitchen${i}_is_richelin`).checked = kitchen.isRichelin

    }

  }
}
const tryToParse = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};
async function onSubmit() {

  input_data = document.querySelector("#raw_data").value

  let raw_data = ""
  if (tryToParse(input_data) && "Meals" in tryToParse(input_data)) {
    console.log("found raw data")
    raw_data = input_data
    parseSaveData(raw_data)

  } else if (0 == 1) {
    console.log("found IT data")
    raw_data = JSON.parse(input_data)["save_data"]
    parseSaveData(raw_data)
  } else {
    console.log("assuming character name")
    url = `https://${input_data}.idleonefficiency.com`


  }
}

function parseSaveData(raw_data) {



  save_data = JSON.parse(raw_data)

  let cooking_data = new CookingData()
  cooking_data.initFromSaveData(save_data)
  cooking_data.fillDocumentInputForm()
  parseCooking(save_data);

  //console.log(raw_data);

}



function parseCooking(save_data) {

  meal_data = JSON.parse(save_data["Meals"])
  // console.log("meal_data:");
  // console.log(meal_data);

  cooking_data = {}
  cooking_data.meal_levels = meal_data[0]

  displayCookingData(cooking_data)

}
function displayCookingData(cooking_data) {

  getMealOptimalOrder(cooking_data.meal_levels)

}


function getMealOptimalOrder(meal_levels) {

  content = ""

  cooking_speed = Number(document.querySelector("#total_cooking_speed").value)


  temp_meal_lvls = [...meal_levels]

  meal_costs = getMealCurrentCosts(temp_meal_lvls);

  var cumulative_ladles = 0
  var days_NMLB = 0
  ladles_per_day = 10000
  while (temp_meal_lvls.reduce((a, b) => a + b) < (meal_count * meal_max_lvl)) {


    best_meal = meal_costs.reduce((acc, currentVal, currentId) => (currentId < meal_count && currentVal < acc.val) ? { "val": currentVal, "id": currentId } : acc, { "val": Infinity, "id": 0 }).id;


    new_lvl = temp_meal_lvls[best_meal] + 1
    temp_meal_lvls[best_meal] = new_lvl


    meal_time = meal_costs[best_meal] / cooking_speed
    ladles = getLadlesNeeded(meal_time)

    if (ladles < ladles_per_day) {
      cumulative_ladles += ladles
      content += addMealUpgradeDisplay(best_meal, temp_meal_lvls[best_meal], ladles, cumulative_ladles)
    } else {
      days_NMLB += 1
      content += addMealUpgradeDisplay(best_meal, temp_meal_lvls[best_meal], 0, cumulative_ladles)
    }







    updateMealCost(meal_costs, best_meal, new_lvl + 1)
    cooking_speed *= (1 + 1.18 / 100);
  }

  document.getElementById("meal_upgrade_order").innerHTML = content;
  document.getElementById("ladles_needed").innerHTML = cumulative_ladles;
  document.getElementById("NMLB_needed").innerHTML = days_NMLB;


}

function addMealUpgradeDisplay(meal_id, new_meal_lvl, ladles, cumulative_ladles) {
  const mdata = meal_info[meal_id];
  // display_time = FormatCookingTime(meal_time)
  // display_cumulative_time = FormatCookingTime(cumulative_time)

  content = `<tr>`
  content += `<td><img src="${mdata.img}"></td>`
  content += `<td> ${mdata.name} </td>`
  content += `<td>to lvl ${new_meal_lvl}</td>`
  content += `<td>Amount: ${getMealCost(new_meal_lvl, 0).toExponential(3)}</td>`
  // content += `<td>Time: ${display_time}</td>`
  content += `<td>Ladles: ${ladles}</td>`
  // content += `<td>Cumulative Time: ${display_cumulative_time}</td>`
  content += `<td>Cumulative Ladles: ${cumulative_ladles}</td>`
  content += `</tr>`

  return content;

}

function getLadlesNeeded(meal_time_in_hours) {

  return Math.ceil(meal_time_in_hours)
}

function getMealCurrentCosts(meal_levels) {
  meal_costs = [...meal_levels]
  for (let i = 0; i < meal_count; i++) {
    lvl = meal_levels[i]
    updateMealCost(meal_costs, i, lvl + 1)
  }
  return meal_costs;
}

function updateMealCost(meal_costs, meal_id, lvl) {
  mdata = meal_info[meal_id]
  meal_costs[meal_id] = getMealCost(lvl, 0) * mdata.cookReq;
}
function getMealCost(level_after_upgrade, equinox_event_count) {
  if (level_after_upgrade > meal_max_lvl) {
    return Infinity
  }
  else {
    level = level_after_upgrade - 1
    // achiev 4-24 "best plate" gives 10% lower cost, actually cost efficiency 
    // like most other badly worded cost reductions in this game
    //const achievBonus = 1 / Math.max(1, 1 + (10 * getAchievementStatus(achievements, 233))
    const achiev_cost_reduction = 1 / 1.1

    // equinox gives reduced cost per daily event done, up to 14 (depends on equinox upgrade level actually
    const equinox = Math.max(0.01, Math.pow(0.8, Math.min(equinox_event_count, 14)))

    const base_mult1 = (10 + (level + Math.pow(level, 2)));
    const base_mult2 = Math.pow(1.2 + 0.05 * level, level);
    return achiev_cost_reduction * base_mult1 * base_mult2 * equinox;
  }


}


function createMealTable() {
  let content = "<tr>"
  for (let i = 0; i < meal_count; i++) {

    mdata = meal_info[i]

    if (i % 5 == 0) {
      content += "</tr><tr>"
    }
    content += `<td><img src="${mdata.img}"></td>`
    content += `<td>Meal ${i}:${mdata.name}</td>`
    content += `<td><input type="text" id="meal${i}_level"/></td>`
  }
  content += "</tr>"
  document.getElementById("meal_levels").innerHTML = content;

}
function createKitchenTable() {
  let content = "<tr>"
  content += "<th>Kitchen</th>"
  content += "<th>Speed LVL</th>"
  content += "<th>Fire LVL</th>"
  content += "<th>Luck LVL</th>"
  content += "<th>Richelin?</th>"
  content += "</tr>"
  content += "<tr>"
  for (let i = 0; i < 10; i++) {

    if (i % 1 == 0) {
      content += "</tr><tr>"
    }
    // content += `<td><img src="${mdata.img}"></td>`
    content += `<td>Kitchen n°${i}</td>`
    content += `<td><input type="text" id="kitchen${i}_speed_level"/></td>`
    content += `<td><input type="text" id="kitchen${i}_fire_level"/></td>`
    content += `<td><input type="text" id="kitchen${i}_luck_level"/></td>`
    content += `<td><input type="checkbox" id="kitchen${i}_is_richelin"/></td>`
  }
  content += "</tr>"
  document.getElementById("kitchen_levels").innerHTML = content;
}

const meal_max_lvl = 90;
const meal_count = 67;
const meal_info =
  [
    { "img": "https://idleon.wiki/wiki/images/b/b9/Turkey_a_la_Thank.png", "name": "Turkey a la Thank", "cookReq": 10 },
    { "img": "https://idleon.wiki/wiki/images/2/26/Egg.png", "name": "Egg", "cookReq": 15 },
    { "img": "https://idleon.wiki/wiki/images/7/7e/Salad.png", "name": "Salad", "cookReq": 25 },
    { "img": "https://idleon.wiki/wiki/images/d/d0/Pie.png", "name": "Pie", "cookReq": 40 },
    { "img": "https://idleon.wiki/wiki/images/d/d9/Frenk_Fries.png", "name": "Frenk Fries", "cookReq": 60 },
    { "img": "https://idleon.wiki/wiki/images/0/08/Spaghetti.png", "name": "Spaghetti", "cookReq": 90 },
    { "img": "https://idleon.wiki/wiki/images/f/f8/Corn.png", "name": "Corn", "cookReq": 125 },
    { "img": "https://idleon.wiki/wiki/images/7/7f/Garlic_Bread.png", "name": "Garlic Bread", "cookReq": 175 },
    { "img": "https://idleon.wiki/wiki/images/c/cd/Garlicless_Bread.png", "name": "Garlicless Bread", "cookReq": 250 },
    { "img": "https://idleon.wiki/wiki/images/f/f4/Pizza.png", "name": "Pizza", "cookReq": 350 },
    { "img": "https://idleon.wiki/wiki/images/7/7d/Apple.png", "name": "Apple", "cookReq": 500 },
    { "img": "https://idleon.wiki/wiki/images/6/6b/Pancakes.png", "name": "Pancakes", "cookReq": 700 },
    { "img": "https://idleon.wiki/wiki/images/c/c1/Corndog.png", "name": "Corndog", "cookReq": 1000 },
    { "img": "https://idleon.wiki/wiki/images/c/cc/Cabbage.png", "name": "Cabbage", "cookReq": 1400 },
    { "img": "https://idleon.wiki/wiki/images/7/72/Potato_Pea_Pastry.png", "name": "Potato Pea Pastry", "cookReq": 2000 },
    { "img": "https://idleon.wiki/wiki/images/c/c0/Dango.png", "name": "Dango", "cookReq": 3000 },
    { "img": "https://idleon.wiki/wiki/images/0/04/Sourish_Fish.png", "name": "Sourish Fish", "cookReq": 4000 },
    { "img": "https://idleon.wiki/wiki/images/e/ee/Octoplop.png", "name": "Octoplop", "cookReq": 5000 },
    { "img": "https://idleon.wiki/wiki/images/a/a0/Croissant.png", "name": "Croissant", "cookReq": 8000 },
    { "img": "https://idleon.wiki/wiki/images/8/80/Canopy.png", "name": "Canopy", "cookReq": 12500 },
    { "img": "https://idleon.wiki/wiki/images/f/fe/Cannoli.png", "name": "Cannoli", "cookReq": 20000 },
    { "img": "https://idleon.wiki/wiki/images/a/a5/Cheese.png", "name": "Cheese", "cookReq": 35000 },
    { "img": "https://idleon.wiki/wiki/images/8/88/Sawdust.png", "name": "Sawdust", "cookReq": 50000 },
    { "img": "https://idleon.wiki/wiki/images/8/8f/Eggplant.png", "name": "Eggplant", "cookReq": 75000 },
    { "img": "https://idleon.wiki/wiki/images/d/d6/Cheesy_Bread.png", "name": "Cheesy Bread", "cookReq": 110000 },
    { "img": "https://idleon.wiki/wiki/images/9/9e/Wild_Boar.png", "name": "Wild Boar", "cookReq": 200000 },
    { "img": "https://idleon.wiki/wiki/images/9/9b/Donut.png", "name": "Donut", "cookReq": 300000 },
    { "img": "https://idleon.wiki/wiki/images/c/c0/Riceball.png", "name": "Riceball", "cookReq": 500000 },
    { "img": "https://idleon.wiki/wiki/images/a/aa/Cauliflower.png", "name": "Cauliflower", "cookReq": 750000 },
    { "img": "https://idleon.wiki/wiki/images/0/0f/Durian_Fruit.png", "name": "Durian Fruit", "cookReq": 1e6 },
    { "img": "https://idleon.wiki/wiki/images/4/43/Orange.png", "name": "Orange", "cookReq": 1.5e6 },
    { "img": "https://idleon.wiki/wiki/images/9/91/Bunt_Cake.png", "name": "Bunt Cake", "cookReq": 3e6 },
    { "img": "https://idleon.wiki/wiki/images/f/fa/Chocolate_Truffle.png", "name": "Chocolate Truffle", "cookReq": 5e6 },
    { "img": "https://idleon.wiki/wiki/images/5/57/Leek.png", "name": "Leek", "cookReq": 8e6 },
    { "img": "https://idleon.wiki/wiki/images/a/ac/Fortune_Cookie.png", "name": "Fortune Cookie", "cookReq": 12e6 },
    { "img": "https://idleon.wiki/wiki/images/1/12/Pretzel.png", "name": "Pretzel", "cookReq": 20e6 },
    { "img": "https://idleon.wiki/wiki/images/e/e7/Sea_Urchin.png", "name": "Sea Urchin", "cookReq": 30e6 },
    { "img": "https://idleon.wiki/wiki/images/e/eb/Mashed_Potato.png", "name": "Mashed Potato", "cookReq": 40e6 },
    { "img": "https://idleon.wiki/wiki/images/5/57/Mutton.png", "name": "Mutton", "cookReq": 90e6 },
    { "img": "https://idleon.wiki/wiki/images/6/6f/Wedding_Cake.png", "name": "Wedding Cake", "cookReq": 135e6 },
    { "img": "https://idleon.wiki/wiki/images/9/91/Eel.png", "name": "Eel", "cookReq": 200e6 },
    { "img": "https://idleon.wiki/wiki/images/3/3f/Whipped_Cocoa.png", "name": "Whipped Cocoa", "cookReq": 300e6 },
    { "img": "https://idleon.wiki/wiki/images/5/51/Onion.png", "name": "Onion", "cookReq": 500e6 },
    { "img": "https://idleon.wiki/wiki/images/c/c4/Soda.png", "name": "Soda", "cookReq": 700e6 },
    { "img": "https://idleon.wiki/wiki/images/c/cf/Sushi_Roll.png", "name": "Sushi Roll", "cookReq": 900e6 },
    { "img": "https://idleon.wiki/wiki/images/9/98/Buncha_Banana.png", "name": "Buncha Banana", "cookReq": 1250e6 },
    { "img": "https://idleon.wiki/wiki/images/6/64/Pumpkin.png", "name": "Pumpkin", "cookReq": 1700e6 },
    { "img": "https://idleon.wiki/wiki/images/thumb/6/67/Cotton_Candy.png/54px-Cotton_Candy.png", "name": "Cotton Candy", "cookReq": 4000e6 },
    { "img": "https://idleon.wiki/wiki/images/thumb/b/be/Massive_Fig.png/54px-Massive_Fig.png", "name": "Massive Fig", "cookReq": 7000e6 },
    { "img": "https://idleon.wiki/wiki/images/thumb/9/94/Head_Chef_Bread.png/54px-Head_Chef_Bread.png", "name": "Head Chef Bread", "cookReq": 10e9 },
    { "img": "https://idleon.wiki/wiki/images/thumb/6/6e/Kiwi_Fruit.png/54px-Kiwi_Fruit.png", "name": "Kiwi Fruit", "cookReq": 14e9 },
    { "img": "https://idleon.wiki/wiki/images/1/10/Popped_Corn.png", "name": "Popped Corn", "cookReq": 20e9 },
    { "img": "https://idleon.wiki/wiki/images/thumb/7/7b/Double_Cherry.png/54px-Double_Cherry.png", "name": "Double Cherry", "cookReq": 32e9 },
    { "img": "https://idleon.wiki/wiki/images/thumb/5/5a/Ratatouey.png/54px-Ratatouey.png", "name": "Ratatouey", "cookReq": 52e9 },
    { "img": "https://idleon.wiki/wiki/images/thumb/c/c9/Giant_Tomato.png/54px-Giant_Tomato.png", "name": "Giant Tomato", "cookReq": 90e9 },
    { "img": "https://idleon.wiki/wiki/images/thumb/5/5e/Wrath_Grapes.png/54px-Wrath_Grapes.png", "name": "Wrath Grapes", "cookReq": 130e9 },
    { "img": "https://idleon.wiki/wiki/images/thumb/7/73/Sausy_Sausage.png/54px-Sausy_Sausage.png", "name": "Sausy Sausage", "cookReq": 225e9 },
    { "img": "https://idleon.wiki/wiki/images/5/5b/Seasoned_Marrow.png", "name": "Seasoned Marrow", "cookReq": 350e9 },
    { "img": "https://idleon.wiki/wiki/images/4/46/Sticky_Bun.png", "name": "Sticky Bun", "cookReq": 700e9 },
    { "img": "https://idleon.wiki/wiki/images/7/71/Frazzleberry.png", "name": "Frazzleberry", "cookReq": 1000e9 },
    { "img": "https://idleon.wiki/wiki/images/5/55/Misterloin_Steak.png", "name": "Misterloin Steak", "cookReq": 1700e9 },
    { "img": "https://idleon.wiki/wiki/images/f/f1/Large_Pohayoh.png", "name": "Large Pohayoh", "cookReq": 6000e9 },
    { "img": "https://idleon.wiki/wiki/images/8/8e/Bill_Jack_Pepper.png", "name": "Bill Jack Pepper", "cookReq": 35e12 },
    { "img": "https://idleon.wiki/wiki/images/b/b4/Burned_Marshmallow.png", "name": "Burned Marshmallow", "cookReq": 90e12 },
    { "img": "https://idleon.wiki/wiki/images/b/b8/Yumi_Peachring.png", "name": "Yumi Peachring", "cookReq": 800e12 },
    { "img": "https://idleon.wiki/wiki/images/7/70/Plumpcakes.png", "name": "Plumpcakes", "cookReq": 6000e12 },
    { "img": "https://idleon.wiki/wiki/images/d/df/Nyanborgir.png", "name": "Nyanborgir", "cookReq": 50e15 },



  ]


function FormatCookingTime(time_in_hours) {

  time = time_in_hours * 3600
  let s = 1
  let m = 60 * s
  let h = 60 * m
  let d = 24 * h
  let y = 365 * 24

  let accounted = 0

  let years = Math.floor(time / y);
  accounted += y * years
  let days = Math.floor((time - accounted) / d);
  accounted += d * days
  let hour = Math.floor((time - accounted) / h);
  accounted += h * hour
  let minutes = Math.floor((time - accounted) / m);
  accounted += m * minutes
  let seconds = Math.floor((time - accounted) / s);
  accounted += s * seconds

  let milliseconds = (time * 1000) % 1000

  let hourTxt = hour;
  let minutesTxt = minutes
  let secondsTxt = seconds
  if (hour < 10) {
    hourTxt = `0${hour}`
  }
  if (minutes < 10) {
    minutesTxt = `0${minutes}`
  }
  if (seconds < 10) {
    secondsTxt = `0${seconds}`
  }
  if (years > 10000) {
    return `${years.toExponential()}y${days}d`
  } else if (years > 0) {
    return `${years}y${days}d`
  } else if (days > 10) {
    return `${days}d${hourTxt}h`
  } else if (days > 0) {
    return `${days}d${hourTxt}h${minutesTxt}m`
  } else if (hour > 0) {
    return `${hourTxt}h${minutesTxt}m${secondsTxt}s`
  } else if (minutes > 0) {
    return `${minutesTxt}m${secondsTxt}s`
  } else if (seconds > 0) {
    return `${secondsTxt}s`
  } else {
    return `${milliseconds.toFixed(2)}ms`
  }
}



KILL_REQ = Array(300).fill(0);
KILL_REQ[262] = 100e6;
KILL_REQ[263] = 150e6;



function getTimeForShinyLevel(goal) {
  let time = 0;

  return Math.floor((1 + Math.pow(goal, 1.6)) * Math.pow(1.7, goal));
}
function getShinyLevel(time) {
  let lvl = 1;
  while (getTimeForShinyLevel(lvl) < time) {
    lvl += 1;
  }
  return lvl;
}

const DAYS_FOR_SHINY_LEVELS = [
  3, // for lvl 1
  3, // for lvl 2
  3, // for lvl 3
  3, // for lvl 4
  85, // for lvl 5
  200, // for lvl 6
  448, // for lvl 7
  964, // for lvl 8
  2020, // for lvl 9



]