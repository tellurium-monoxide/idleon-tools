


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
}


function getMealOptimalOrder(meal_levels) {



}

function getMealCurrentCosts(meal_levels) {
  meal_costs = meal_levels


}

function getMealCost(level, equinox_event_count) {
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
function showCurrentLevels(meal_levels) {

  content = "<tr>"
  for (let i = 0; i < meal_count; i++) {
    lvl = meal_levels[i]

    mdata = meal_info[i]

    if (i % 5 == 0) {
      content += "</tr><tr>"
    }
    content += "<td>"
    content += "<img src="
    //content+='"'
    content += mdata.img
    //content+='"'
    content += ">"
    content += mdata.name
    content += ":"
    content += lvl
    content += "</td>"


  }

  content += "</tr>"

  document.getElementById("meal_levels").innerHTML = content
  //console.log(content)
}
const meal_count = 67;
const meal_info =
  [
    { "img": "https://idleon.wiki/wiki/images/b/b9/Turkey_a_la_Thank.png", "name": "Turkey a la Thank", "time": 1 },
    { "img": "https://idleon.wiki/wiki/images/2/26/Egg.png", "name": "Egg", "time": 80 },
    { "img": "", "name": "Salad", "time": 80 },
    { "img": "", "name": "Pie", "time": 80 },
    { "img": "", "name": "Frenk Fries", "time": 80 },
    { "img": "", "name": "Spaghetti", "time": 80 },
    { "img": "", "name": "Corn", "time": 80 },
    { "img": "", "name": "Garlic Bread", "time": 80 },
    { "img": "", "name": "Garlicless Bread", "time": 80 },
    { "img": "", "name": "Pizza", "time": 80 },
    { "img": "", "name": "Apple", "time": 80 },
    { "img": "", "name": "Pancakes", "time": 80 },
    { "img": "", "name": "Corndog", "time": 80 },
    { "img": "", "name": "Cabbage", "time": 80 },
    { "img": "", "name": "Potato Pea Pastry", "time": 80 },
    { "img": "", "name": "Dango", "time": 80 },
    { "img": "", "name": "Sourish Fish", "time": 80 },
    { "img": "", "name": "Octoplop", "time": 80 },
    { "img": "", "name": "Croissant", "time": 80 },
    { "img": "", "name": "Canopy", "time": 80 },
    { "img": "", "name": "Cannoli", "time": 80 },
    { "img": "", "name": "Cheese", "time": 80 },
    { "img": "", "name": "Sawdust", "time": 80 },
    { "img": "", "name": "Eggplant", "time": 80 },
    { "img": "", "name": "Cheesy Bread", "time": 80 },
    { "img": "", "name": "Wild Boar", "time": 80 },
    { "img": "", "name": "Donut", "time": 80 },
    { "img": "", "name": "Riceball", "time": 80 },
    { "img": "", "name": "Cauliflower", "time": 80 },
    { "img": "", "name": "Durian Fruit", "time": 80 },
    { "img": "", "name": "Orange", "time": 80 },
    { "img": "", "name": "Bunt Cake", "time": 80 },
    { "img": "", "name": "Chocolate Truffle", "time": 80 },
    { "img": "", "name": "Leek", "time": 80 },
    { "img": "", "name": "Fortune Cookie", "time": 80 },
    { "img": "", "name": "Pretzel", "time": 80 },
    { "img": "", "name": "Sea Urchin", "time": 80 },
    { "img": "", "name": "Mashed Potato", "time": 80 },
    { "img": "", "name": "Mutton", "time": 80 },
    { "img": "", "name": "Wedding Cake", "time": 80 },
    { "img": "", "name": "Eel", "time": 80 },
    { "img": "", "name": "Whipped Cocoa", "time": 80 },
    { "img": "", "name": "Onion", "time": 80 },
    { "img": "", "name": "Soda", "time": 80 },
    { "img": "", "name": "Sushi Roll", "time": 80 },
    { "img": "", "name": "Buncha Banana", "time": 80 },
    { "img": "", "name": "Pumpkin", "time": 80 },
    { "img": "", "name": "Cotton Candy", "time": 80 },
    { "img": "", "name": "Massive Fig", "time": 80 },
    { "img": "", "name": "Head Chef Bread", "time": 80 },
    { "img": "", "name": "Kiwi Fruit", "time": 80 },
    { "img": "", "name": "Popped Corn", "time": 80 },
    { "img": "", "name": "Double Cherry", "time": 80 },
    { "img": "", "name": "Ratatouey", "time": 80 },
    { "img": "", "name": "Giant Tomato", "time": 80 },
    { "img": "", "name": "Wrath Grapes", "time": 80 },
    { "img": "", "name": "Sausy Sausage", "time": 80 },
    { "img": "", "name": "Seasoned Marrow", "time": 80 },
    { "img": "", "name": "Sticky Bun", "time": 80 },
    { "img": "", "name": "Frazzleberry", "time": 80 },
    { "img": "", "name": "Misterloin Steak", "time": 80 },
    { "img": "", "name": "Large Pohayoh", "time": 80 },
    { "img": "", "name": "Bill Jack Pepper", "time": 80 },
    { "img": "", "name": "Burned Marshmallow", "time": 80 },
    { "img": "", "name": "Yumi Peachring", "time": 80 },
    { "img": "", "name": "Plumpcakes", "time": 80 },
    { "img": "", "name": "Nyanborgir", "time": 80 },
    { "img": "", "name": "Eel", "time": 80 },



  ]
