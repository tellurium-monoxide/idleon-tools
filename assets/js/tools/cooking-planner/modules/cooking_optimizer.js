

function computeMealOptimalOrder(cooking_data) {

    content = ""
    content += addTableHeader()
    content += "<tbody>"
    document.getElementById(`total_cooking_speed`).innerHTML = cooking_data.getCookingSpeed().toExponential(2)
    let cumulative_ladles = 0
    let days_NMLB = 0
    let lvls_NMLB = 0

    let missing_levels = (meal_count * meal_max_lvl) - cooking_data.meal_levels.reduce((a, b) => a + b)
    while (cooking_data.meal_levels.reduce((a, b) => a + b) < (meal_count * meal_max_lvl)) {
        const cooking_speed = cooking_data.getCookingSpeed()


        // best_meal = cooking_data.meal_costs.reduce((acc, currentVal, currentId) => (currentId < meal_count && currentVal < acc.val) ? { "val": currentVal, "id": currentId } : acc, { "val": Infinity, "id": 0 }).id;
        const [best_meal, cooking_req] = cooking_data.getClosestMealUpgrade()


        const new_lvl = cooking_data.meal_levels[best_meal] + 1



        const meal_time = cooking_req / cooking_speed
        let ladles = 0
        if (meal_time > 0) {
            ladles = Math.max(cooking_data.getLadlesNeeded(meal_time), cooking_data.min_ladles_per_meal)
        }
        if (ladles <= cooking_data.max_ladles_per_meal && ladles < cooking_data.ladles_owned) {

            cooking_data.cookMealWithLadles(best_meal, ladles)

            if (!cooking_data.upgradeMeal(best_meal)) {
                console.log(`failed to upgrade meal ${meal_info[best_meal].name} to level ${new_lvl}`)
            }

            cumulative_ladles += ladles
            cooking_data.ladles_owned -= ladles
            content += addMealUpgradeDisplay(cooking_data, best_meal, new_lvl, ladles, cumulative_ladles, days_NMLB, false)

        } else {
            let NMLB_upgrades = cooking_data.triggerNMLB()

            days_NMLB += 1
            for (let [NMLB_meal, new_lvl] of NMLB_upgrades) {
                content += addMealUpgradeDisplay(cooking_data, NMLB_meal, new_lvl, 0, cumulative_ladles, days_NMLB, true)
                lvls_NMLB += 1
            }
        }



    }

    content += "</tbody>"

    document.getElementById("meal_upgrade_order").innerHTML = content;
    document.getElementById("ladles_needed").innerHTML = cumulative_ladles.toLocaleString();
    document.getElementById("missing_levels").innerHTML = missing_levels.toLocaleString();
    document.getElementById("days_needed").innerHTML = days_NMLB.toLocaleString();
    document.getElementById("NMLB_needed").innerHTML = days_NMLB * cooking_data.NMLB_count;
    document.getElementById("NMLB_needed_percent").innerHTML = (lvls_NMLB / missing_levels * 100).toFixed(2);


}



function addMealUpgradeDisplay(cooking_data, meal_id, new_meal_lvl, ladles, cumulative_ladles, days_NMLB, isNMLB) {
    const mdata = meal_info[meal_id];
    const mdata_NMLB = meal_info[cooking_data.getNMLBtarget()];
    // display_time = FormatCookingTime(meal_time)
    // display_cumulative_time = FormatCookingTime(cumulative_time)

    let trclass = ""
    let NMLBclass = ""
    if (isNMLB) {
        NMLBclass = "NMLB"
    }
    let lvlclass = ""
    if (new_meal_lvl == 90) {
        lvlclass = "completed_meal"
    } else if (new_meal_lvl % 3 == 0) {
        lvlclass = "multiple_of_3"
    }
    content = `<tr class=${trclass}>`
    content += `<td><img src="${mdata.img}"></td>`
    content += `<td> ${mdata.name} </td>`
    content += `<td class="${lvlclass}">${new_meal_lvl}</td>`
    // content += `<td>Amount: ${getMealCost(new_meal_lvl, 0).toExponential(3)}</td>`
    // content += `<td>Time: ${display_time}</td>`
    content += `<td>${ladles}</td>`
    // content += `<td>Cumulative Time: ${display_cumulative_time}</td>`
    // content += `<td>Cumulative Ladles: ${cumulative_ladles}</td>`
    content += `<td class="${NMLBclass}">${days_NMLB}</td>`
    content += `<td>${cooking_data.ladles_owned}</td>`
    content += `<td> ${cooking_data.equinox_event_count}</td>`
    let NMLB_targets = cooking_data.getNMLBtargetList()
    let imgs = ""
    for (let i = 0; i < Math.min(7, NMLB_targets.length); i++) {
        imgs += `<img src="${meal_info[NMLB_targets[i]].img}">`
    }
    content += `<td>${imgs}</td>`
    content += `<td hidden>${JSON.stringify(cooking_data)}</td>`
    // content += `<td>speed: ${cooking_data.getCookingSpeed().toExponential(3)}</td>`
    content += `</tr>`

    return content;

}
function addTableHeader() {
    content = `<thead><tr>`
    content += `<th></th>`
    content += `<th>Meal</th>`
    content += `<th>Lv after<br>upgrade</th>`
    // content += `<td>Amount: ${getMealCost(new_meal_lvl, 0).toExponential(3)}</td>`
    // content += `<td>Time: ${display_time}</td>`
    content += `<th>Ladles<br>to use</th>`
    // content += `<td>Cumulative Time: ${display_cumulative_time}</td>`
    // content += `<td>Cumulative Ladles: ${cumulative_ladles}</td>`
    content += `<th>Day</th>`
    content += `<th>Ladle<br>storage</th>`
    content += `<th>Equinox</th>`
    content += `<th>Next NMLB targets</th>`
    content += `<td hidden></td>`
    // content += `<td>speed: ${cooking_data.getCookingSpeed().toExponential(3)}</td>`
    content += `</tr></thead>`

    return content

}