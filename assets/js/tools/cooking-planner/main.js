



function run_local_tool(raw_data) {

  save_data = JSON.parse(raw_data)

  localStorage.setItem("IEsaveData", raw_data);

  let cooking_data = new CookingData()
  cooking_data.initFromSaveData(save_data)
  cooking_data.fillDocumentInputForm()

  computeMealOptimalOrder(cooking_data)

}


function computeFromInputForm() {
  let cooking_data = new CookingData()
  cooking_data.initFromInputForm()

  computeMealOptimalOrder(cooking_data)
}




function remove_meal_upgrade() {

  let meal_row = document.getElementById("meal_upgrade_order").children[1].firstChild
  let meal_name = meal_row.children[1].innerText
  let meal_id = meal_info.findIndex((meal) => (meal.name == meal_name))
  console.log(meal_name)
  console.log(meal_id)

  // document.getElementById(`meal${meal_id}_level`).value = Number(document.getElementById(`meal${meal_id}_level`).value) + 1;

  let cooking_data_json = JSON.parse(meal_row.children[7].innerText)
  let cooking_data = Object.assign(new CookingData(), cooking_data_json);
  console.log(cooking_data)


  cooking_data.fillDocumentInputForm()
  computeFromInputForm()


}

function createMealTable() {
  let content = "<tr>"
  content += "<th></th>"
  content += "<th>Meal</th>"
  content += "<th>Current LVL</th>"
  content += "<th>Amount owned</th>"
  content += "<th>Ribbon tier</th>"
  content += "</tr>"
  content += "<tr>"
  for (let i = 0; i < meal_count; i++) {

    mdata = meal_info[i]

    if (i % 1 == 0) {
      content += "</tr><tr>"
    }
    content += `<td><div class="meal_icon"><img src="${GET_MEAL_ICON(i)}"></div></td>`
    content += `<td>${mdata.name}</td>`
    content += `<td><input type="number" id="meal${i}_level"/></td>`
    content += `<td><input type="text" id="meal${i}_qtt"/></td>`
    content += `<td><input type="number" id="meal${i}_ribbon_tier" min="0" max="20" value="0"/></td>`
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
    content += `<td><input type="number" id="kitchen${i}_speed_level"/></td>`
    content += `<td><input type="number" id="kitchen${i}_fire_level"/></td>`
    content += `<td><input type="number" id="kitchen${i}_luck_level"/></td>`
    content += `<td><input type="checkbox" id="kitchen${i}_is_richelin"/></td>`
  }
  content += "</tr>"
  document.getElementById("kitchen_levels").innerHTML = content;
}

const meal_max_lvl = 110;
const meal_count = 67;
const MEAL_COUNT = 67;
const RIBBON_MULTIPLIERS = {
  0: 1,
  1: 1.05,
  2: 1.14,
  3: 1.19,
  4: 1.28,
  5: 1.46,
  6: 1.61,
  7: 1.66,
  8: 1.82,
  9: 1.87,
  10: 2.35,
  11: 2.4,
  12: 2.62,
  13: 2.67,
  14: 2.89,
  15: 3.39,
  16: 3.68,
  17: 3.73,
  18: 4.01,
  19: 4.06,
  20: 5,
}
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
  let y = 365 * d

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
// world 6
KILL_REQ[251] = 25e3;
KILL_REQ[252] = 50e3;
KILL_REQ[253] = 100e3;
KILL_REQ[254] = 250e3;
KILL_REQ[255] = 400e3;
KILL_REQ[256] = 1.1e6;
KILL_REQ[257] = 3.2e6;
KILL_REQ[258] = 8e6;
KILL_REQ[259] = 12e6;
KILL_REQ[260] = 25e6;
KILL_REQ[261] = 70e6;
KILL_REQ[262] = 100e6;
KILL_REQ[263] = 150e6;


const LAB_JEWELS = [
  "amethyst_rhinestone",
  "purple_rhombol",
  "purple_navette",
  "sapphire_rhinestone",
  "sapphire_navette",
  "sapphire_pyramite",
  "sapphire_rhombol",
  "pyrite_rhinestone",
  "pyrite_navette",
  "pyrite_rhombol",
  "pyrite_pyramite",
  "emerald_rhinestone",
  "emerald_navette",
  "emerald_rhombol",
  "emerald_pyramite",
  "emerald_ulthurite",
  "black_diamond_ulthurite",
  "black_diamond_rhinestone",
  "pure_opal_rhinestone",
  "pure_opal_navette",
  "pure_opal_rhombol"
]

function getTimeForShinyLevel(goal) {
  return Math.floor((1 + Math.pow(goal, 1.6)) * Math.pow(1.7, goal));
}

function getShinyLevel(time) {
  let lvl = 1;
  while (getTimeForShinyLevel(lvl) < time) {
    lvl += 1;
  }
  return lvl;
}





const CARD_REQUIREMENTS = {
  "Boss4A": [2, 6, 10, 32, 918],
  "w6c1": [400, 1200, 2000, 6400, 183600],
}


function getCardLevel(card_id, card_count) {
  let card_req = CARD_REQUIREMENTS[card_id]

  let card_level = (card_count > 0) + card_req.filter((a) => (a < card_count)).length
  return card_level;
}



const ACHIEVEMENT_DATA = {
  "Cabbage Patch": { id: 224 },
  "Le Pretzel Bleu": { id: 225 },
  "Best Plate": { id: 233 },
  "Spectre Stars": { id: 379 },
  "Regalis My Beloved": { id: 373 },
}


