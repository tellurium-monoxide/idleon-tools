


function parseSaveData() {

  raw_data = document.querySelector("#raw_data").value

  save_data = JSON.parse(raw_data)

  parseCooking(save_data);

  //console.log(raw_data);

}



function parseCooking(save_data) {

  meal_data = JSON.parse(save_data["Meals"])
  console.log("meal_data:");
  console.log(meal_data);

  meal_levels = meal_data[0]

  console.log("meal_levels:");
  console.log(meal_levels);
  showCurrentLevels(meal_levels)
  getMealOptimalOrder(meal_levels)
}


function getMealOptimalOrder(meal_levels) {

  content = ""

  cooking_speed = Number(document.querySelector("#total_cooking_speed").value)


  temp_meal_lvls = [...meal_levels]

  meal_costs = getMealCurrentCosts(temp_meal_lvls);

  while (temp_meal_lvls.reduce((a, b) => a + b) < (meal_count * meal_max_lvl)) {


    best_meal = meal_costs.reduce((acc, currentVal, currentId) => (currentId < meal_count && currentVal < acc.val) ? { "val": currentVal, "id": currentId } : acc, { "val": Infinity, "id": 0 }).id;


    new_lvl = temp_meal_lvls[best_meal] + 1
    temp_meal_lvls[best_meal] = new_lvl


    meal_time = meal_costs[best_meal] / cooking_speed

    updateMealCost(meal_costs, best_meal, new_lvl + 1)



    content += addMealUpgradeDisplay(best_meal, temp_meal_lvls[best_meal], meal_time)

    cooking_speed *= (1 + 1.16 / 100);
  }

  document.getElementById("meal_upgrade_order").innerHTML = content;


}

function addMealUpgradeDisplay(meal_id, new_meal_lvl, meal_time) {
  const mdata = meal_info[meal_id];

  display_time = FormatShortTime(meal_time)

  content = `<tr><td><img src="${mdata.img}"></td><td> ${mdata.name} </td><td>to lvl ${new_meal_lvl}</td><td>Time: ${display_time}</td></tr>`

  return content;

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
function getMealCost(level, equinox_event_count) {
  if (level > meal_max_lvl) {
    return Infinity
  }
  else {
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
function showCurrentLevels(meal_levels) {


  for (let i = 0; i < meal_count; i++) {
    lvl = meal_levels[i]

    document.getElementById(`meal${i}_level`).value = lvl


  }


}

function createMealTable() {
  content = "<tr>"
  for (let i = 0; i < meal_count; i++) {
    lvl = meal_levels[i]

    mdata = meal_info[i]

    if (i % 5 == 0) {
      content += "</tr><tr>"
    }
    content += `<td><img src="${mdata.img}"></td>`
    content += `<td>${mdata.name}</td>`
    content += `<td><input type="text" id="meal${i}_level"/></td>`
  }
  content += "</tr>"
  document.getElementById("meal_levels").innerHTML = content;
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


function FormatShortTime(time) {
  let d = 1000 * 60 * 60 * 24
  let h = 1000 * 60 * 60
  let m = 1000 * 60
  let s = 1000
  let days = Math.floor(time / d);
  let hour = Math.floor((time - d * days) / h);
  let minutes = Math.floor((time - h * hour) / m);
  let seconds = Math.floor((time - h * hour - m * minutes) / s);
  let milliseconds = time % 1000
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
  if (days > 0) {
    return `${days}d${hourTxt}h${minutesTxt}m${secondsTxt}s`
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