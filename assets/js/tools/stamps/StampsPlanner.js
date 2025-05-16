import { Account } from "../../game/Account.js"
import { DATA_ITEM_CATEGORIES } from "../../game/characters/CarryCap.js"
import { DATA_STAMPS, DATA_LIMITED_ITEMS } from "../../game/world1/Stamps.js"

export class StampPlanner {
    constructor(save_data) {


        this.account = new Account(save_data)

        this.save_data = save_data

        let stamp_lvls = save_data["StampLv"]
        let stamp_maxlvls = save_data["StampLvM"]


        let chestOrder = save_data["ChestOrder"]
        let chestQuantity = save_data["ChestQuantity"]

        this.chestState = {}

        for (let i = 0; i < chestOrder.length; i++) {
            let itemName = chestOrder[i]
            let itemQtt = chestQuantity[i]
            this.chestState[itemName] = this.chestState[itemName] ?? 0
            this.chestState[itemName] += itemQtt
        }


        this.carry_caps = {}
        for (let [cat, _] of Object.entries(DATA_ITEM_CATEGORIES)) {
            console.log(cat)
            this.carry_caps[cat] = this.account.characters.reduceOnChars((v, char) => { return Math.max(v, char.carry_cap.getTotalCapacity(cat)) }, 0)
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


        for (let [catId, catStamps] of DATA_STAMPS.entries()) {
            for (let [stampId, stampData] of catStamps.entries()) {
                // let cell_id = `stamp_${catName}_${stampId}`
                let name = stampData[0]
                let lvl = this.account.world1.stamps.getLevelByName(name)
                let max_lvl = this.account.world1.stamps.getMaxLevelByName(name)
                if (stampData) {

                    let cell = document.getElementById(name)
                    let infos = ""
                    infos += `Lvl :${lvl}/${max_lvl}\n`

                    current_total_level += lvl

                    if (lvl > 0) {

                        unlocked_stamps += 1
                        let mat_cost = this.account.world1.stamps.getMaterialCost(name)

                        let mat_avail = this.chestState[stampData[5][0]] ?? 0
                        // cell.innerHTML += `<br>Material cost for next upgrade with max reduction:`
                        // cell.innerHTML += `<br>${formatIdleonNumbers(mat_cost)} ${stampData.itemReq[0].name}`
                        // cell.innerHTML += ` (${formatPercent(mat_cost / this.carry_caps[stampData.itemReq[0].category])} of carry cap)`
                        // cell.innerHTML += `<br>${mat_avail >= mat_cost ? "Can" : "Cannot"} afford (${formatIdleonNumbers(mat_avail)} in chest)`

                        let max_reach = this.getMaxReachableLevel(stampData, max_lvl)
                        max_total_level += max_reach.max_lvl

                        infos += `Max reachable : ${max_reach.max_lvl}\n`

                        if (max_reach.max_lvl == max_lvl) {
                            cell.classList.add("complete")
                            max_stamps += 1
                        } else {
                            infos += `Total cost : ${formatIdleonNumbers(max_reach.cost_to_cap)} ${stampData[5][0]}\n`
                            let mat_avail = this.chestState[stampData[5][0]] ?? 0
                            infos += `Mats available : ${formatIdleonNumbers(mat_avail)} (${formatPercent(mat_avail / max_reach.cost_to_cap)})\n`

                            if (mat_avail > max_reach.cost_to_cap || stampData[5][1] == "Equipment") {
                                cell.classList.add("affordable")
                            }
                            let setup = this.getMinSetupForUpgrade(stampData, max_lvl)
                            if (setup) {
                                // cell.innerHTML += `<br>Needs for next upgrade:`
                                // cell.innerHTML += `<br>Gilded: ${setup.gilded ? "yes" : "no"}`
                                // cell.innerHTML += `<br>Daily: ${setup.daily}`

                                let tag = `g${setup.gilded ? "1" : "0"}d${setup.daily}`
                                if (max_lvl == lvl) {
                                    possible_upgrades[tag].push({ stampData, lvl, max_lvl, setup })
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

                let td1 = tr.appendChild(document.createElement('td'))
                let td2 = tr.appendChild(document.createElement('td'))

                let img = td1.appendChild(document.createElement('img'))
                img.src = `${GET_STAMP_ICON(upgrade.stampData[0])}`

                let cost = this.account.world1.stamps.getMaterialCost(upgrade.stampData[0], upgrade.max_lvl, upgrade.setup.gilded, upgrade.setup.daily)
                let mat_avail = this.chestState[upgrade.stampData[5][0]] ?? 0

                td2.appendChild(document.createTextNode(`${upgrade.stampData[0]}`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${upgrade.max_lvl}->${upgrade.max_lvl + upgrade.stampData[3].lvstep}`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${formatIdleonNumbers(cost)} ${upgrade.stampData[5][0]}`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${formatPercent(cost / this.carry_caps[upgrade.stampData[5][1]])} of cap`))
                td2.appendChild(document.createElement('br'))
                td2.appendChild(document.createTextNode(`${mat_avail >= cost ? "Can" : "Cannot"} afford (${formatIdleonNumbers(mat_avail)} in chest)`))

                if (mat_avail >= cost) {
                    td1.classList.add("available")
                    td2.classList.add("available")
                }

                if (upgrade.stampData[5][1] == "Equipment") {
                    td1.classList.add("equip")
                    td2.classList.add("equip")
                }


                if (i % 4 == 0) {
                    tr = document.createElement('tr');
                    tbl.appendChild(tr)
                }
            }
        }


    }




    getMaxReachableLevel(stampData, max_lvl) {
        let name = stampData[0]
        let setup = this.getMinSetupForUpgrade(stampData, max_lvl)
        let mat_cost = this.account.world1.stamps.getMaterialCost(name, max_lvl)
        let cap = this.carry_caps[stampData[5][1]]
        console.log(name, cap)
        let cost_to_cap = 0
        while (setup) {

            cost_to_cap += setup.cost
            max_lvl += stampData[3].lvstep
            setup = this.getMinSetupForUpgrade(stampData, max_lvl)
            // mat_cost = this.getMaterialCost(stampData, max_lvl)
        }
        // cost_to_cap -= mat_cost
        return { max_lvl: max_lvl, cost_to_cap: Math.max(0, cost_to_cap) }
    }

    getMinSetupForUpgrade(stampData, max_lvl) {
        let cap = this.carry_caps[stampData[5][1]]
        let name = stampData[0]

        let item = stampData[5][0]

        if (DATA_LIMITED_ITEMS.includes(item)) {
            let cost = this.account.world1.stamps.getMaterialCost(name, max_lvl)
            if (cost < cap) {
                return { gilded: true, daily: 3, cost: cost }
            }
            return null

        }



        for (let setup of setups) {
            let cost = this.account.world1.stamps.getMaterialCost(name, max_lvl, setup.gilded, setup.daily)

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