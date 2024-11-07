class StampPlanner {
    constructor(save_data) {
        this.save_data = save_data

        let stamp_lvls = save_data["StampLv"]
        let stamp_maxlvls = save_data["StampLvM"]

        let process_stamp_save_data = (cat) => {
            let result = {}
            Object.entries(stamp_lvls[cat]).map((entry, i) => {
                let [key, val] = entry
                result[key] = { "lvl": val, "maxlvl": stamp_maxlvls[cat][key] }
            })
            return result;
        }

        this.stamp_states = {
            "combat": process_stamp_save_data(0),
            "skill": process_stamp_save_data(1),
            "misc": process_stamp_save_data(2),
        }
        // console.log(stamp_lvls)

        // get stamp cost reduction bonuses

        // world 2
        // alchemy
        let vial_info = save_data["CauldronInfo"][4]
        let vial_levels = []
        for (let i = 0; i < vial_info.length; i++) {
            vial_levels.push(vial_info[i])
        }

        let max_level_vials = [...vial_levels].filter(x => x >= 13).length
        let vial_level_blue_flav = vial_levels[19]
        let vial_bonus_blue_flav = 0.3 * vial_level_blue_flav / (7 + vial_level_blue_flav) * (1 + 0.02 * max_level_vials) * 2
        let vial_level_venison_malt = vial_levels[59]
        let vial_bonus_venison_malt = 0.02 * vial_level_venison_malt * (1 + 0.02 * max_level_vials) * 2

        let vial_total_bonus = (vial_bonus_blue_flav + vial_bonus_venison_malt)
        // sigils
        let sigil_info = JSON.parse(save_data["CauldronP2W"])
        let sigil_enveloppe_pile_time = sigil_info[4][2 * (7 - 1)]
        let sigil_enveloppe_pile_reduction = ((sigil_enveloppe_pile_time >= 60) * 0.12
            + (sigil_enveloppe_pile_time >= 2500) * 0.13
            + (sigil_enveloppe_pile_time >= 160000) * 0.15)


        // world 5
        // sailing
        let sailing_info = JSON.parse(save_data["Sailing"])
        let artifact_chilled_yarn_lvl = sailing_info[3][16]

        let sigil_stamp_cost_red = sigil_enveloppe_pile_reduction * (1 + artifact_chilled_yarn_lvl)

        this.base_stamp_cost_multiplier = 1 / (1 + sigil_stamp_cost_red) * Math.max(0.1, 1 - vial_total_bonus) * 0.05 * 0.1




        let summoning_lvl = save_data["Lv0_0"][18]

        let shrine_pantheon_lvl = JSON.parse(save_data["Shrine"])[4][3]

        let shrine_bonus = (0.1 + 0.02 * shrine_pantheon_lvl) * 1.3

        let base_cap = 30000 // base carry cap of max bag
            * 80 // inventory slots
            * 3.5 // Gem Shop Carry Capacity
            * 1.05 // Bribe	Bottomless Bags
            * 2.77 // Prayer Ruck Sack
            * (1 + 0.3 * 50 / (60 + 50)) //Star Talent Telekinetic Storage
            * (1 + shrine_bonus) // Shrine Pantheon
            * (1
                + this.stamp_states["misc"][1].lvl * 0.01 // Stamp Mason Jar
                + (0.1 + 0.5 + 0.3) * 2 * Math.pow(1.1, Math.ceil((summoning_lvl + 1) / 20)) // Star signs: Pack Mule, The OG Skiller, Mr No Sleep. Doubled by chip
            )


        // missing bonuses:  guild, pantheon shrine


        let stamp_multi = 2.5 // lab and pristine liqorice rolle

        let max_talent_level = 350
        let beginner_talent_extra_bags = 2 * max_talent_level / (100 + max_talent_level)

        this.carry_caps = {
            "Material": base_cap * (1 + this.stamp_states["skill"][7].lvl * 0.01 * stamp_multi) * (1 + beginner_talent_extra_bags),
            "Food": base_cap,
            "Chopping": base_cap * (1 + this.stamp_states["skill"][5].lvl * 0.01 * stamp_multi),
            "Mining": base_cap * (1 + this.stamp_states["skill"][3].lvl * 0.01 * stamp_multi),
            "Fishing": base_cap * (1 + this.stamp_states["skill"][20].lvl * 0.01 * stamp_multi),
            "Catching": base_cap * (1 + this.stamp_states["skill"][22].lvl * 0.01 * stamp_multi),
            "Trapping": base_cap,
            "Worship": base_cap,
            "Equipment": 100, // by holding down with craft from inventory, you can reach more than inventory slots. I could reach more than 105, I leave this at 100 until further testing
        }


        console.log(this.carry_caps)


        for (let [catName, catStamps] of Object.entries(this.stamp_states)) {
            for (let [stampId, stamp_state] of Object.entries(catStamps)) {
                // let cell_id = `stamp_${catName}_${stampId}`
                let stampData = DATA_STAMPS[catName][stampId]
                if (stampData) {


                    let cell = document.getElementById(stampData.rawName)

                    cell.innerHTML = `lvl ${stamp_state.lvl}(${stamp_state.maxlvl})`

                    if (stamp_state.lvl > 0) {
                        let mat_cost = this.getMaterialCost(stampData, stamp_state.maxlvl)

                        cell.innerHTML += `<br>${formatIdleonNumbers(mat_cost)} ${stampData.itemReq[0].name}`

                        let max_reach = this.getMaxReachableLevel(stampData, stamp_state.maxlvl)

                        cell.innerHTML += `<br>${max_reach}`
                    }
                }
            }
        }
    }


    getMaterialCost(stampData, max_level) {
        let tier = Math.round(max_level / stampData.reqItemMultiplicationLevel) - 1
        let mat_cost = Math.max(1, stampData.baseMatCost * Math.pow(stampData.powMatBase, Math.pow(tier, 0.8)) * this.base_stamp_cost_multiplier)

        return mat_cost
    }


    getMaxReachableLevel(stampData, max_level) {
        let mat_cost = this.getMaterialCost(stampData, max_level)
        let cap = this.carry_caps[stampData.itemReq[0].category]
        while (mat_cost < cap) {
            max_level += stampData.reqItemMultiplicationLevel
            mat_cost = this.getMaterialCost(stampData, max_level)
        }

        return max_level
    }
}