


function parseSaveData() {
  
  raw_data = document.querySelector("#raw_data").value
  
  save_data=JSON.parse(raw_data)
  
  parseCooking(save_data);
  
  //console.log(raw_data);
  
}



function parseCooking(save_data) {
  
  meal_data=JSON.parse(save_data["Meals"])
  console.log("meal_data:");
  console.log(meal_data);
  
  meal_levels=meal_data[0]
  
  console.log("meal_levels:");
  console.log(meal_levels);
  showCurrentLevels(meal_levels)
}


function getMealOptimalOrder(meal_levels) {
  
  
  
}

function getMealCurrentCosts(meal_levels) {
  meal_costs=meal_levels
  
  
}

function getMealCost(level, equinox_event_count) {
  // achiev 4-24 "best plate" gives 10% lower cost, actually cost efficiency 
  // like most other badly worded cost reductions in this game
  //const achievBonus = 1 / Math.max(1, 1 + (10 * getAchievementStatus(achievements, 233))
  const achiev_cost_reduction = 1 / 1.1 
  
  // equinox gives reduced cost per daily event done, up to 14 (depends on equinox upgrade level actually
  const equinox = Math.max(0.01, Math.pow(0.8, Math.min(equinox_event_count,14)))
  
  const base_mult1 = (10 + (level + Math.pow(level, 2)));
  const base_mult2 = Math.pow(1.2 + 0.05 * level, level);
  return achiev_cost_reduction * base_mult1 * base_mult2 * equinox;
  
  
}
function showCurrentLevels(meal_levels) {

content=""
for (let i = 0; i < meal_count; i++) {
  lvl=meal_levels[i]
  
  mdata=meal_info[i]
  
  content+="<box>"
  content+="<img src="
  //content+='"'
  content+=mdata.img
  //content+='"'
  content+=">"
  content+= mdata.name
  content+= ":"
  content+= lvl
  content+= "</box>"
  
  
}



document.getElementById("meal_levels").innerHTML=content
//console.log(content)
}
const meal_count=67;
const meal_info=
[
{"img":"https://idleon.wiki/wiki/images/b/b9/Turkey_a_la_Thank.png", "name":"Turkey a la Thank", "time":1},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Egg", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Salad", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Pie", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Frenk Fries", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Spaghetti", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Corn", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Garlic Bread", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Garlicless Bread", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Pizza", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Apple", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Pancakes", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Corndog", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Cabbage", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Potato Pea Pastry", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Dango", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Sourish Fish", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Octoplop", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Croissant", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Canopy", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Cannoli", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Cheese", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Sawdust", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Eggplant", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Cheesy Bread", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Wild Boar", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Donut", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Riceball", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Cauliflower", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Durian Fruit", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Orange", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Bunt Cake", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Chocolate Truffle", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Leek", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Fortune Cookie", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Pretzel", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Sea Urchin", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Mashed Potato", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Mutton", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Wedding Cake", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Eel", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Whipped Cocoa", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Onion", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Soda", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Sushi Roll", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Buncha Banana", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Pumpkin", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Cotton Candy", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Massive Fig", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Head Chef Bread", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Kiwi Fruit", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Popped Corn", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Double Cherry", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Ratatouey", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Giant Tomato", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Wrath Grapes", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Sausy Sausage", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Seasoned Marrow", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Sticky Bun", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Frazzleberry", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Misterloin Steak", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Large Pohayoh", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Bill Jack Pepper", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Burned Marshmallow", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Yumi Peachring", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Plumpcakes", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Nyanborgir", "time":80},
{"img":"https://idleon.wiki/wiki/images/2/26/Egg.png", "name":"Eel", "time":80},



]
