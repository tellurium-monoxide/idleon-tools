import { Account } from "../../game/Account.js"

export class RefineryTool {
  constructor(save_data) {

    this.account = new Account(save_data)

    this.calculators = []

    this.showRefinery()

    for (let calc of this.calculators) {
      calc("a");
    }


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

    for (const salt of this.account.world3.refinery.salts) {


      content += "<tr>"
      content += `<td><img src="${SALT_ICONS[salt.data[0]]}"></td>`
      content += `<td>${salt.rank}</td>`
      content += `<td class="progress">${salt.progress.toLocaleString().padStart(9, " ")}/${salt.powerToRankUp.toLocaleString().padEnd(9, " ")}<br>(${formatPercentPad(salt.progress / salt.powerToRankUp)})</td>`

      let nextRankPowerPerCycle = this.account.world3.refinery.getPowerPerCycle(salt.rank + 1)
      content += `<td>${salt.powerPerCycle}<br>(${nextRankPowerPerCycle}|+${nextRankPowerPerCycle - salt.powerPerCycle})</td>`
      content += `<td>${salt.cyclesPerRank}
      <br>(${salt.NextCycleBreakpoint.cyclesPerRank}
       at r${salt.NextCycleBreakpoint.rank}
      |+${salt.NextCycleBreakpoint.inc})
      </td>`
      content += `<td>${formatTime(salt.cyclesPerRank * salt.timePerCycle)}</td>`
      ///////////////////////////////
      // display costs
      content += `<td><table class="costs"><tr>`
      let i = 0
      for (let material of salt.data[2]) {
        i++


        let cost_tooltip = `${formatIdleonNumbers(material.costPerHour)}/h`
        // content += `<td><img src="${material.icon}"></td>`
        content += `<td>${material[0]}</td>`
        content += `<td title="${cost_tooltip}">${formatIdleonNumbers(material.costPerHour)}/h<br>${formatIdleonNumbers(material.costPerRank)}/r</td>`
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

    document.getElementById("speed_combustion").innerHTML = `${formatTime(this.account.world3.refinery.getTimePerCycle("Combustion"))}`
    document.getElementById("speed_synthesis").innerHTML = `${formatTime(this.account.world3.refinery.getTimePerCycle("Synthesis"))}`

    let bonusBreakdown = this.account.world3.refinery.getRefinerySpeed(true)
    for (let bonus of bonusBreakdown) {
      document.getElementById(bonus.name).children[1].innerHTML = formatPercent(bonus.value)
      document.getElementById(bonus.name).children[2].innerHTML = formatPercent(bonus.max)
      // document.getElementById(bonus.name).children[4].innerHTML = formatPercent(bonus.completion)
    }
    document.getElementById("Total").children[1].innerHTML = formatPercent(bonusBreakdown.reduce((a, b) => { return (a + b.value) }, 0))
    document.getElementById("Total").children[2].innerHTML = formatPercent(bonusBreakdown.reduce((a, b) => { return (a + b.max) }, 0))

  }
  createCalculatorTimeToMakeAmounts() {
    let choiceElem = document.getElementById("salt_select")
    let inputValueElem = document.getElementById("production_needed")

    const doTheCalc = (event) => {
      let salt = this.account.world3.refinery.salts[choiceElem.selectedIndex]
      let needed = inputValueElem.value
      // console.log(salt)
      // console.log(needed)


      let prepared = 0
      let cycles = 0
      let rank = salt.rank

      let cycles_without = Math.ceil(needed / this.account.world3.refinery.getPowerPerCycle(rank))
      while (prepared < needed) {
        let cc = this.account.world3.refinery.getPowerPerCycle(rank)
        let pp = this.account.world3.refinery.getPowerToRankUp(rank)
        prepared += pp
        cycles += Math.floor(pp / cc)
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
      let salt = this.account.world3.refinery.salts[choiceElem.selectedIndex]
      let goal = inputValueElem.value
      // console.log(salt)
      // console.log(needed)


      let cycles = 0
      let rank = salt.rank

      let cc = this.account.world3.refinery.getPowerPerCycle(rank)
      let pp = this.account.world3.refinery.getPowerToRankUp(rank)

      let cycles_per_rank = Math.floor(pp / cc)
      let init_bp = cycles_per_rank
      while (goal < cycles_per_rank) {
        cycles += cycles_per_rank
        rank++
        cc = this.account.world3.refinery.getPowerPerCycle(rank)
        pp = this.account.world3.refinery.getPowerToRankUp(rank)
        cycles_per_rank = Math.floor(pp / cc)


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



}
const formatPercentPad = (percent) => `${(percent * 100).toFixed(2)}%`.padStart(6, "0");
