class ConstructionState {
    constructor() {

    }


    initFromSaveData(save_data) {


        let player_names = save_data[`playerNames`]
        this.players = Array.from({ length: player_names.length }, () => ({}));

        for (let i = 0; i < player_names.length; i++) {
            // this.players[i]["name"] = player_names[i]
            // this.players[i]["class"] = save_data[`CharacterClass_${i}`]
            // this.players[i]["class_name"] = CLASSES[save_data[`CharacterClass_${i}`]]
            // this.players[i]["subclasses"] = getClassList(CLASSES[save_data[`CharacterClass_${i}`]])


            // this.players[i]["skill_max_levels"] = JSON.parse(save_data[`SM_${i}`]); // SM for max; SL and SLpre for currents
            // this.players[i]["skill_current_levels"] = JSON.parse(save_data[`SL_${i}`]); // SM for max; SL and SLpre for currents

        }



        // world 1
        // stamps
        let stamp_info = save_data["StampLv"]
        this.stamp_biblio = stamp_info[2][19]

        // world 2
        // alchemy
        this.bubble_ignore_overdues = save_data["CauldronInfo"][3]["13"]

        let vial_levels = []
        for (let i = 0; i < save_data["CauldronInfo"][4].length; i++) {
            vial_levels.push(save_data["CauldronInfo"][4][i])
        }

        this.max_level_vials = [...vial_levels].filter(x => x >= 13).length
        this.vial_chonker_chug = vial_levels[30]



        // world 3
        let building_data = JSON.parse(save_data["Tower"])
        this.building_library_lvl = building_data[1]
        console.log(building_data)

        this.building_current_levels = building_data.slice(0, 27)
        this.building_built_levels = building_data.slice(27, 54)
        this.building_current_build_progress = building_data.slice(66, 93)

        let atom_data = save_data["Atoms"]
        this.atom_oxygen = atom_data[7]

        let salt_lick_data = JSON.parse(save_data["SaltLick"])
        this.salt_lick_spontaneity_salts = salt_lick_data[4] //TODO


        // world 4
        // cooking
        let meal_data = JSON.parse(save_data["Meals"])
        this.meal_lvl_fortune_cookies = meal_data[0][34]

        // breeding
        let breeding_info = JSON.parse(save_data["Breeding"])
        let shiny_time_red_mush = breeding_info[22][4]
        let shiny_time_sheepie = breeding_info[24][0]
        // this.shiny_lvl_red_mush = getShinyLevel(shiny_time_red_mush)
        // this.shiny_lvl_sheepie = getShinyLevel(shiny_time_sheepie)

        // lab
        let lab_info = JSON.parse(save_data["Lab"])
        // let lab_jewels_info = Object.fromEntries(LAB_JEWELS.map(function (jewel_name, index) { return [jewel_name, lab_info[14][index]] }))


        // this.lab_black_diamond_rhinestone_active = lab_jewels_info["black_diamond_rhinestone"]

        // this.lab_pure_opal_navette_active = lab_jewels_info["pure_opal_navette"]


        this.lab_spelunkerobol_active = 1
        this.lab_vial_doubling = 1

        // world 5
        // sailing
        let sailing_info = JSON.parse(save_data["Sailing"])
        this.artifact_fury_relic_lvl = sailing_info[3][21]
        this.artifact_winz_lantern_lvl = sailing_info[3][32]

        // gaming
        let gaming_info = save_data[`Gaming`]
        let superbits = gaming_info[12]
        this.superbit_library_checkouts = (superbits.includes("l"))
        this.gaming_lvl = save_data["Lv0_0"][15]

        // world 6
        // sneaking
        let sneaking_data = JSON.parse(save_data["Ninja"])
        this.pristine_crystal_comb_obtained = sneaking_data[107][8]

        // summoning
        let summoning_data = JSON.parse(save_data["Summon"])
        console.log(summoning_data)
        this.summon_battle_cyan14 = (summoning_data[1].includes("w6d3"))

        // general

        // merit shop
        let merit_levels = JSON.parse(save_data["TaskZZ2"])
        this.merit_world3_max_book_lvl = merit_levels[2][2]
        this.merit_world6_summoning_bonus_lvl = merit_levels[5][4]

        // achieve
        let achieve_data = JSON.parse(save_data["AchieveReg"])
        this.achiev_checkout_takeout = - achieve_data[145]
        this.achiev_spectre_stars = - achieve_data[379]
        this.achiev_regalis_my_beloved = - achieve_data[373]


        this.initCalculatedBonus()



    }

    initCalculatedBonus() {
    }

    showBuildings() {

        let content = "<table>"
        content += "<tr>"
        content += `<th>Icon</th>`
        content += `<th>Name</th>`
        content += `<th>level</th>`
        content += `<th>Cost</th>`
        content += `<th>Progress</th>`
        content += `<th>Cost to max</th>`
        content += "</tr>"

        for (let building_index = 0; building_index < 27; building_index++) {
            const building_data = BUILDINGS[building_index]
            const current_lvl = this.building_current_levels[building_index]
            const current_lvl_built = this.building_built_levels[building_index]
            const current_prog = this.building_current_build_progress[building_index]
            const cost_to_next = this.getBuildCost(building_data, current_lvl)
            const cost_to_max = this.getBuildCostToMax(building_data, current_lvl)

            let progress = 0
            if (current_lvl_built != current_lvl) {
                progress = 1
            } else if (current_lvl < building_data.max_level) {
                progress = current_prog / cost_to_next
            }

            content += "<tr>"
            content += `<td><img src="${building_data.icon_url}"></td>`
            content += `<td>${building_data.name}</td>`
            content += `<td>${current_lvl}</td>`

            if (current_lvl < building_data.max_level) {
                content += `<td>${formatIdleonNumbers(cost_to_next)}</td>`
                content += `<td>${formatPercent(progress)}</td>`
                content += `<td>${formatIdleonNumbers(cost_to_max)}</td>`
            } else {
                content += `<td></td>`
                content += `<td></td>`
                content += `<td></td>`
            }
            content += "</tr>"
        }

        content += "</table>"
        document.getElementById("results").innerHTML = content;


    }


    getBuildCostToMax(building_data, current_level) {
        let level = current_level
        let cost = 0
        while (level < building_data.max_level) {
            cost += this.getBuildCost(building_data, level)
            level += 1
        }
        return cost

    }

    getBuildCost(building_data, level) {
        if (level >= building_data.max_level) {
            return 0
        } else {
            let buildInc = building_data.buildInc
            let buildMultiplier = building_data.buildMultiplier
            if (buildInc == 1) { // special case for 3d printer
                return 20 * Math.pow(level + 1, 2) * Math.pow(1.6, level + 1);
            } else {
                return buildMultiplier * Math.pow(buildInc, level);
            }
        }

    }

}



const formatPercent = (percent) => `${(percent * 100).toFixed(2)}%`;