class StampPlanner {
    constructor(save_data) {
        this.save_data = save_data

        let stamp_lvls = save_data["StampLv"]
        let stamp_maxlvls = save_data["StampLvM"]

        let process_stamp_save_data = (cat) => {
            let result = {}
            Object.entries(stamp_lvls[cat]).map((entry, i) => {
                let [key, val] = entry
                result[key] = { "lvl": val, "max_lvl": stamp_maxlvls[cat][key] }
            })
            return result;
        }

        this.stamp_states = {
            "combat": process_stamp_save_data(0),
            "skill": process_stamp_save_data(1),
            "misc": process_stamp_save_data(2),
        }

        let chestOrder = save_data["ChestOrder"]
        let chestQuantity = save_data["ChestQuantity"]

        this.chestState = {}

        for (let i = 0; i < chestOrder.length; i++) {
            let itemName = chestOrder[i]
            let itemQtt = chestQuantity[i]
            this.chestState[itemName] = this.chestState[itemName] ?? 0
            this.chestState[itemName] += itemQtt
        }

        // console.log(this.chestState)

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

        this.base_stamp_cost_multiplier = 1 / (1 + sigil_stamp_cost_red) * Math.max(0.1, 1 - vial_total_bonus)




        let summoning_lvl = save_data["Lv0_0"][18]

        let shrine_pantheon_lvl = JSON.parse(save_data["Shrine"])[4][3]

        let shrine_bonus = (0.1 + 0.02 * (shrine_pantheon_lvl - 1)) * 1.3


        let guild_rucksack_lvl = JSON.parse(save_data["Guild"])[0][2]
        console.log(guild_rucksack_lvl)
        let guild_bonus = 0.7 * guild_rucksack_lvl / (50 + guild_rucksack_lvl)

        let base_cap = 30000 // base carry cap of max bag
            * 80 // inventory slots
            * 3.5 // Gem Shop Carry Capacity
            * (1 + 1.77 + 0.05) // Prayer Ruck Sack + Bribe	Bottomless Bags
            * (1 + 0.3 * 50 / (60 + 50) + guild_bonus) //Star Talent Telekinetic Storage + Guild Rucksack
            * (1 + shrine_bonus) // Shrine Pantheon
            * (1
                + this.stamp_states["misc"][1].lvl * 0.01 // Stamp Mason Jar
                + (0.1 + 0.05 + 0.3) * 2 * Math.pow(1.1, Math.ceil((summoning_lvl + 1) / 20)) // Star signs: Pack Mule, The OG Skiller, Mr No Sleep. Doubled by chip
            )

        console.log(shrine_bonus)
        console.log(this.stamp_states["misc"][1].lvl * 0.01)
        console.log((0.1 + 0.5 + 0.3) * 2 * Math.pow(1.1, Math.ceil((summoning_lvl + 1) / 20)))





        let stamp_multi = 2.5 // lab and pristine liqorice rolle

        let max_talent_level = 361
        let beginner_talent_extra_bags = 2 * max_talent_level / (100 + max_talent_level)
        console.log(this.stamp_states["skill"][20].lvl * 0.01 * stamp_multi)
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
            "Quest": 80 * 1000000,
        }


        console.log(this.carry_caps)

        let possible_upgrades = {
            "g0d0": [],
            "g1d0": [],
            "g1d1": [],
            "g1d2": [],
            "g1d3": [],
        }

        let max_stamps = 0
        let unlocked_stamps = 0
        let max_total_level = 0
        let current_total_level = 0


        for (let [catName, catStamps] of Object.entries(this.stamp_states)) {
            for (let [stampId, stampState] of Object.entries(catStamps)) {
                // let cell_id = `stamp_${catName}_${stampId}`
                let stampData = DATA_STAMPS[catName][stampId]
                if (stampData) {


                    let cell = document.getElementById(stampData.rawName)
                    let infos = ""
                    infos += `Lvl :${stampState.lvl}/${stampState.max_lvl}\n`

                    current_total_level += stampState.lvl

                    if (stampState.lvl > 0) {

                        unlocked_stamps += 1
                        let mat_cost = this.getMaterialCost(stampData, stampState.max_lvl)

                        let mat_avail = this.chestState[stampData.itemReq[0].rawName] ?? 0
                        // cell.innerHTML += `<br>Material cost for next upgrade with max reduction:`
                        // cell.innerHTML += `<br>${formatIdleonNumbers(mat_cost)} ${stampData.itemReq[0].name}`
                        // cell.innerHTML += ` (${formatPercent(mat_cost / this.carry_caps[stampData.itemReq[0].category])} of carry cap)`
                        // cell.innerHTML += `<br>${mat_avail >= mat_cost ? "Can" : "Cannot"} afford (${formatIdleonNumbers(mat_avail)} in chest)`

                        let max_reach = this.getMaxReachableLevel(stampData, stampState.max_lvl)
                        max_total_level += max_reach.max_lvl

                        infos += `Max reachable : ${max_reach.max_lvl}\n`

                        if (max_reach.max_lvl == stampState.max_lvl) {
                            cell.classList.add("complete")
                            max_stamps += 1
                        } else {
                            infos += `Total cost : ${formatIdleonNumbers(max_reach.cost_to_cap)} ${stampData.itemReq[0].name}\n`
                            let mat_avail = this.chestState[stampData.itemReq[0].rawName] ?? 0
                            infos += `Mats available : ${formatIdleonNumbers(mat_avail)} (${formatPercent(mat_avail / max_reach.cost_to_cap)})\n`

                            if (mat_avail > max_reach.cost_to_cap) {
                                cell.classList.add("affordable")
                            }
                            let setup = this.getMinSetupForUpgrade(stampData, stampState.max_lvl)
                            if (setup) {
                                // cell.innerHTML += `<br>Needs for next upgrade:`
                                // cell.innerHTML += `<br>Gilded: ${setup.gilded ? "yes" : "no"}`
                                // cell.innerHTML += `<br>Daily: ${setup.daily}`

                                let tag = `g${setup.gilded ? "1" : "0"}d${setup.daily}`
                                if (stampState.max_lvl == stampState.lvl) {
                                    possible_upgrades[tag].push({ stampData: stampData, stampState: stampState, setup: setup })
                                }
                            }
                        }
                    } else {
                        cell.classList.add("locked")
                        infos = "Not unlocked"
                    }

                    cell.title = infos
                }
            }
        }


        let general = document.getElementById("general")
        let general_info = ""
        general_info += `Maxed stamps: ${max_stamps}/${unlocked_stamps}<br>`
        general_info += `Current total level: ${current_total_level}<br>`
        general_info += `Max total level: ${max_total_level}<br>`

        general.innerHTML = general_info

        console.log(possible_upgrades)
        for (let [catName, catUpgrades] of Object.entries(possible_upgrades)) {

            let tab = document.getElementById(`tab-stamps-${catName}`)
            tab.replaceChildren();
            let tbl = document.createElement('tbl');
            tab.classList.add("stamp-upgrade-table")
            tab.appendChild(tbl)

            let tr = document.createElement('tr');
            tbl.appendChild(tr)

            let i = 0
            for (let upgrade of catUpgrades) {
                i++


                let td1 = document.createElement('td');
                let td2 = document.createElement('td');

                let img = document.createElement('img');
                img.src = `${GET_STAMP_ICON(upgrade.stampData.displayName)}`
                td1.appendChild(img)

                let cost = this.getMaterialCost(upgrade.stampData, upgrade.stampState.max_lvl, upgrade.setup.gilded, upgrade.setup.daily)
                let mat_avail = this.chestState[upgrade.stampData.itemReq[0].rawName] ?? 0

                td2.appendChild(document.createTextNode(`${upgrade.stampData.displayName}`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${upgrade.stampState.max_lvl}->${upgrade.stampState.max_lvl + upgrade.stampData.reqItemMultiplicationLevel}`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${formatIdleonNumbers(cost)} ${upgrade.stampData.itemReq[0].name}`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${formatPercent(cost / this.carry_caps[upgrade.stampData.itemReq[0].category])} of cap`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${mat_avail >= cost ? "Can" : "Cannot"} afford (${formatIdleonNumbers(mat_avail)} in chest)`))

                if (mat_avail >= cost) {
                    td1.classList.add("available")
                    td2.classList.add("available")
                }

                if (upgrade.stampData.itemReq[0].category == "Equipment") {
                    td1.classList.add("equip")
                    td2.classList.add("equip")
                }

                tr.appendChild(td1)
                tr.appendChild(td2)


                if (i % 4 == 0) {
                    tr = document.createElement('tr');
                    tbl.appendChild(tr)
                }
            }
        }


    }


    getMaterialCost(stampData, max_lvl, gilded = true, daily_reduction = 3) {
        let tier = Math.round(max_lvl / stampData.reqItemMultiplicationLevel) - 1
        let mat_cost = Math.max(1, stampData.baseMatCost * Math.pow(stampData.powMatBase, Math.pow(tier, 0.8)) * this.base_stamp_cost_multiplier * (1 - 0.95 * gilded) * Math.max(0.1, 1 - 0.3 * daily_reduction))

        return mat_cost
    }


    getMaxReachableLevel(stampData, max_lvl) {
        let setup = this.getMinSetupForUpgrade(stampData, max_lvl)
        let mat_cost = this.getMaterialCost(stampData, max_lvl)
        let cap = this.carry_caps[stampData.itemReq[0].category]
        let cost_to_cap = 0
        while (setup) {

            cost_to_cap += setup.cost
            max_lvl += stampData.reqItemMultiplicationLevel
            setup = this.getMinSetupForUpgrade(stampData, max_lvl)
            // mat_cost = this.getMaterialCost(stampData, max_lvl)
        }
        // cost_to_cap -= mat_cost
        return { max_lvl: max_lvl, cost_to_cap: Math.max(0, cost_to_cap) }
    }

    getMinSetupForUpgrade(stampData, max_lvl) {
        let cap = this.carry_caps[stampData.itemReq[0].category]

        let item = stampData.itemReq[0].name

        if (DATA_LIMITED_ITEMS.includes(item)) {
            let cost = this.getMaterialCost(stampData, max_lvl)
            if (cost < cap) {
                return { gilded: true, daily: 3, cost: cost }
            }
            return null

        }



        for (let setup of setups) {
            let cost = this.getMaterialCost(stampData, max_lvl, setup.gilded, setup.daily)

            if (cost < cap) {
                setup.cost = cost
                return setup
            }
        }

        return null


    }
}

const setups = [
    { gilded: false, daily: 0 },
    { gilded: true, daily: 0 },
    { gilded: true, daily: 1 },
    { gilded: true, daily: 2 },
    { gilded: true, daily: 3 },
]