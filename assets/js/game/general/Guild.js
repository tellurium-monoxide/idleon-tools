import { BaseFeature } from "../BaseFeature.js";

export class Guild extends BaseFeature {

    constructor(account) {
        super(account);

        let guild_data = account.save_data["Guild"][0]
        delete account.save_data_pruned["Guild"]

        this.guild_levels = []
        this.map_name_to_index = {}


        for (let [ind, bonus] of DATA_GUILD.entries()) {
            this.guild_levels.push(guild_data[ind])
            this.map_name_to_index[bonus[0]] = ind
        }

        // let data = []
        // for (let [ind, bonus] of guildBonuses.entries()) {

        //     let { name, x1, x2, func, maxLevel, gpBaseCost, gpIncrease, reqLevel } = bonus
        //     data.push([name.toUpperCase(), { type: func, x1, x2 }, maxLevel, reqLevel, [gpBaseCost, gpIncrease]])
        // }

        // console.log(JSON.stringify(data))
    }


    getLevelByName(name) {
        return this.guild_levels[this.map_name_to_index[name]]
    }
    getBonusByName(name) {
        let lvl = this.guild_levels[this.map_name_to_index[name]]
        let grow = DATA_GUILD[this.map_name_to_index[name]][1]
        return calcGrowingValue(grow, lvl)
    }

    getDisplay() {
        let display = document.createElement("table")
        for (let [name, ind] of Object.entries(this.map_name_to_index)) {

            let level = this.guild_levels[ind]
            let upg = DATA_GUILD[ind]
            let [n, grow, max] = upg
            let row = display.appendChild(document.createElement("tr"))
            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = name

            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "number"
            input_base.min = 0
            input_base.max = max
            input_base.value = level

            new InputSpinner(input_base)
            input_base.addEventListener("input", (event) => {
                console.log("change guild upgrade", name, this.guild_levels[ind], "to", Number(input_base.value))
                this.guild_levels[ind] = Number(input_base.value)
                this.account.setModifiedFromSaveData()
            });
        }

        return display
    }
}
// data is:
// name, {grow}, maxlvl, reqlvl, [basecost, costIncrement]
const DATA_GUILD = [
    ["GUILD_GIFTS", { "type": "decay", "x1": 7, "x2": 100 }, 100, 0, [10, 40]],
    ["STAT_RUNES", { "type": "decay", "x1": 40, "x2": 50 }, 50, 2, [20, 60]],
    ["RUCKSACK", { "type": "decay", "x1": 0.7, "x2": 50 }, 50, 4, [20, 70]],
    ["POWER_OF_POW", { "type": "decay", "x1": 10, "x2": 50 }, 50, 5, [20, 80]],
    ["REM_FIGHTING", { "type": "decay", "x1": 0.1, "x2": 50 }, 50, 8, [30, 90]],
    ["MAKE_OR_BREAK", { "type": "decay", "x1": 0.3, "x2": 50 }, 50, 10, [30, 100]],
    ["MULTI_TOOL", { "type": "decay", "x1": 0.3, "x2": 50 }, 50, 5, [20, 80]],
    ["SLEEPY_SKILLER", { "type": "decay", "x1": 0.1, "x2": 50 }, 50, 8, [30, 90]],
    ["COIN_SUPERCHARGER", { "type": "decay", "x1": 0.2, "x2": 20 }, 100, 5, [30, 120]],
    ["BONUS_GP_FOR_SMALL_GUILDS", { "type": "decay", "x1": 200, "x2": 50 }, 50, 2, [10, 10]],
    ["GOLD_CHARM", { "type": "decay", "x1": 0.4, "x2": 50 }, 50, 2, [20, 60]],
    ["STAR_DAZZLE", { "type": "decay", "x1": 120, "x2": 50 }, 50, 4, [20, 70]],
    ["C2_CARD_SPOTTER", { "type": "decay", "x1": 0.6, "x2": 50 }, 50, 5, [20, 80]],
    ["BESTONE", { "type": "decay", "x1": 0.16, "x2": 50 }, 50, 8, [30, 90]],
    ["SKILLEY_SKILLET", { "type": "decay", "x1": 0.3, "x2": 120 }, 200, 5, [40, 150]],
    ["CRAPS", { "type": "decay", "x1": 0.28, "x2": 50 }, 50, 5, [20, 80]],
    ["ANOTHA_ONE", { "type": "decay", "x1": 0.26, "x2": 50 }, 50, 8, [30, 90]],
    ["WAIT_A_MINUTE", { "type": "add", "x1": 1, "x2": 0 }, 0, 5, [20, 80]]
]

