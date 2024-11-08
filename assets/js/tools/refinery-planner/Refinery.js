class Refinery {
  constructor(save_data) {
    this.save_data = save_data

    this.refinerySpeed = new RefinerySpeed(save_data)
    this.refinery_data = JSON.parse(save_data["Refinery"])

    this.calculators = []
  }

  processRefineryRanks() {


    this.salts = Array(6).fill().map((_, i) => ({}));
    this.resources = []
    this.resource_generation = {} // per hour
    for (let salt_index = 0; salt_index < 6; salt_index++) {
      let salt = this.salts[salt_index]
      const rank = this.refinery_data[salt_index + 3][1]
      salt.progress = this.refinery_data[salt_index + 3][0]
      salt.rank = rank

      salt.data = JSON.parse(JSON.stringify(SALT_DATA[salt_index]));
      salt.powerPerCycle = this.getPowerPerCycle(rank)
      salt.powerToRankUp = this.getPowerToRankUp(rank)
      salt.cyclesPerRank = Math.ceil(salt.powerToRankUp / salt.powerPerCycle)
      salt.NextCycleBreakpoint = this.calcNextCycleBreakpoint(rank)

      salt.timePerCycle = CYCLE_BASE_TIMES[salt.data.category] / this.refinerySpeed.getMult()
      for (let material of salt.data.material_costs) {
        this.resources.push(JSON.parse(JSON.stringify(material)))
        const isSalt = material.name.includes("Salts")
        material.costPerCycle = material.baseValue * Math.floor(Math.pow(
          rank,
          (isSalt)
            ? 1.3
            : 1.5
        ))
        material.costPerRank = material.costPerCycle * salt.cyclesPerRank
        material.costPerHour = material.costPerCycle * 3600 / salt.timePerCycle

      }
      this.resource_generation[salt.data.name] = salt.powerPerCycle * 3600 / salt.timePerCycle
    }

    for (let material of this.resources) {
      if (!this.resource_generation[material.name]) {
        this.resource_generation[material.name] = 0
      }
    }

    this.showRefinery()
    this.showResources()

    for (let calc of this.calculators) {
      calc("a");
    }

  }




  calcNextCycleBreakpoint(rank) {
    let initialRank = rank
    let powerPerCycle = this.getPowerPerCycle(rank)
    let powerToRankUp = this.getPowerToRankUp(rank)

    let cyclesPerRank = Math.ceil(powerToRankUp / powerPerCycle)
    let nextBreakpoint = cyclesPerRank
    while (nextBreakpoint == cyclesPerRank) {
      rank += 1
      powerPerCycle = this.getPowerPerCycle(rank)
      powerToRankUp = this.getPowerToRankUp(rank)
      nextBreakpoint = Math.ceil(powerToRankUp / powerPerCycle)
    }
    return {
      rank: rank,
      cyclesPerRank: nextBreakpoint,
      inc: (rank - initialRank)
    }
  }
  getPowerPerCycle(rank) {
    return Math.floor(Math.pow(rank, 1.3));
  }
  getPowerToRankUp(rank) {
    return (rank < POWER_COSTS.length)
      ? POWER_COSTS[rank]
      : POWER_COSTS.at(-1);
  }
  showRefinery() {
    let content = "<table>"
    content += "<tr>"
    content += `<th></th>`
    content += `<th>Rank</th>`
    content += `<th>Progress</th>`
    content += `<th>Power per cycle<br>(next rank|increase)</th>`
    content += `<th>Cycles per rank<br>(next breakpoint)</th>`
    content += `<th>Time per rank</th>`
    content += `<th>Costs</th>`
    content += "</tr>"

    for (const salt of this.salts) {


      content += "<tr>"
      content += `<td><img src="${salt.data.icon_url}"></td>`
      content += `<td>${salt.rank}</td>`
      content += `<td class="progress">${salt.progress.toLocaleString().padStart(9, " ")}/${salt.powerToRankUp.toLocaleString().padEnd(9, " ")}<br>(${formatPercentPad(salt.progress / salt.powerToRankUp)})</td>`

      let nextRankPowerPerCycle = this.getPowerPerCycle(salt.rank + 1)
      content += `<td>${salt.powerPerCycle
        }<br>(${nextRankPowerPerCycle}|+${nextRankPowerPerCycle - salt.powerPerCycle
        })</td>`
      content += `<td>${salt.cyclesPerRank
        }<br>(${salt.NextCycleBreakpoint.cyclesPerRank
        } at r${salt.NextCycleBreakpoint.rank
        }|+${salt.NextCycleBreakpoint.inc
        })</td>`
      content += `<td>${formatTime(salt.cyclesPerRank * salt.timePerCycle)}</td>`
      ///////////////////////////////
      // display costs
      content += `<td><table class="costs"><tr>`
      let i = 0
      for (let material of salt.data.material_costs) {
        i++

        let material_cost_class = (this.resource_generation[material.name] >= material.costPerHour) ? "enough" : "not_enough"
        let cost_tooltip = `Prod: ${formatIdleonNumbers(this.resource_generation[material.name])}/h\nLeftover: ${formatIdleonNumbers(this.resource_generation[material.name] - material.costPerHour)}/h`
        // content += `<td><img src="${material.icon}"></td>`
        content += `<td>${material.name}</td>`
        content += `<td class="${material_cost_class}" title="${cost_tooltip}">${formatIdleonNumbers(material.costPerHour)}/h<br>${formatIdleonNumbers(material.costPerRank)}/r</td>`
        if (i % 3 == 0)
          content += "</tr><tr>"





      }
      content += `</tr></table></td>`
      // end display costs
      ///////////////////////////////

      content += "</tr>"
    }

    content += "</table>"
    document.getElementById("refinery").innerHTML = content;
  }
  createCalculatorTimeToMakeAmounts() {
    let choiceElem = document.getElementById("salt_select")
    let inputValueElem = document.getElementById("production_needed")

    const doTheCalc = (event) => {
      let salt = this.salts[choiceElem.selectedIndex]
      let needed = inputValueElem.value
      // console.log(salt)
      // console.log(needed)


      let prepared = 0
      let cycles = 0
      let rank = salt.rank

      let cycles_without = Math.ceil(needed / this.getPowerPerCycle(rank))
      while (prepared < needed) {
        let cc = this.getPowerPerCycle(rank)
        let pp = this.getPowerToRankUp(rank)
        prepared += pp
        cycles += Math.ceil(pp / cc)
        rank++
      }

      let rankups = rank - salt.rank
      let time = cycles * salt.timePerCycle
      let time_without = cycles_without * salt.timePerCycle

      document.getElementById("cycles_with_rank_ups").innerHTML = formatTime(time) + `<br>(${cycles.toLocaleString() + `|+${rankups}`})`
      document.getElementById("cycles_without_rank_ups").innerHTML = formatTime(time_without) + `<br>(${cycles_without.toLocaleString()})`

    }
    choiceElem.addEventListener("input", doTheCalc);
    inputValueElem.addEventListener("input", doTheCalc);
    doTheCalc();
    this.calculators.push(doTheCalc);
  }
  createCalculatorBreakPoint() {
    let choiceElem = document.getElementById("salt_select_breakpoints")
    let inputValueElem = document.getElementById("breakpoint_goal")
    // let i = 0
    // for (let child of choiceElem) {
    // console.log(child.value)
    // child.value = this.salts[i]
    // i++
    // }
    const doTheCalc = (event) => {
      let salt = this.salts[choiceElem.selectedIndex]
      let goal = inputValueElem.value
      // console.log(salt)
      // console.log(needed)


      let cycles = 0
      let rank = salt.rank

      let cc = this.getPowerPerCycle(rank)
      let pp = this.getPowerToRankUp(rank)

      let cycles_per_rank = Math.ceil(pp / cc)
      let init_bp = cycles_per_rank
      while (goal < cycles_per_rank) {
        cycles += cycles_per_rank
        rank++
        cc = this.getPowerPerCycle(rank)
        pp = this.getPowerToRankUp(rank)
        cycles_per_rank = Math.ceil(pp / cc)


      }

      let rankups = rank - salt.rank
      let time = cycles * salt.timePerCycle

      document.getElementById("bpcalc_current_breakpoint").innerHTML = `${init_bp}<br>(${salt.rank})`
      document.getElementById("rank_ups_to_breakpoint").innerHTML = `${rank}<br>(+${rankups})`
      document.getElementById("bpcalc_cycles_to_breakpoint").innerHTML = formatTime(time) + `<br>(${cycles.toLocaleString()})`

    }
    choiceElem.addEventListener("input", doTheCalc);
    inputValueElem.addEventListener("input", doTheCalc);
    doTheCalc();
    this.calculators.push(doTheCalc);
  }



  showResources() {
    let content = ""
    for (let material of this.resources) {
      content += "<div><table>"
      content += "<tr>"
      // content += `<td><img src="${material.icon}"></td>`
      content += `<td>${material.name}</td>`
      content += `<td>${formatIdleonNumbers(this.resource_generation[material.name])}/h</td>`
      content += "</tr>"
      content += "</table>"
      content += "</div>"
    }


    document.getElementById("resources").innerHTML = content;
  }
}
const formatPercentPad = (percent) => `${(percent * 100).toFixed(2)}%`.padStart(6, "0");
