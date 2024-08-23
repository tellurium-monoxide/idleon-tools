class Refinery {
  constructor() { } initFromSaveData(save_data) {

    let refinery_data = JSON.parse(save_data["Refinery"])
    console.log(refinery_data)

    this.salts = Array(6).fill().map((_, i) => ({}));
    this.resources = []
    this.resource_generation = {} // per hour
    for (let salt_index = 0; salt_index < 6; salt_index++) {
      let salt = this.salts[salt_index]
      const rank = refinery_data[salt_index + 3][1]
      salt.rank = rank
      salt.progress = refinery_data[salt_index + 3][0]
      salt.data = JSON.parse(JSON.stringify(SALT_DATA[salt_index]));
      salt.powerPerCycle = this.getPowerPerCycle(rank)
      salt.powerToRankUp = this.getPowerToRankUp(rank)
      salt.cyclesPerRank = Math.ceil(salt.powerToRankUp / salt.powerPerCycle)
      salt.NextCycleBreakpoint = this.calcNextCycleBreakpoint(rank)
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

      }
      this.resource_generation[salt.data.name] = salt.powerPerCycle
    }

    for (let material of this.resources) {
      if (!this.resource_generation[material.name]) {
        this.resource_generation[material.name] = 0
      }
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
    content += `<th>Cost per rank</th>`
    content += "</tr>"

    for (const salt of this.salts) {


      content += "<tr>"
      content += `<td><img src="${salt.data.icon_url
        }"></td>`
      content += `<td>${salt.rank
        }</td>`
      content += `<td class="progress">${salt.progress.toLocaleString().padStart(9, " ")
        }/${salt.powerToRankUp.toLocaleString().padEnd(9, " ")
        }<br>(${formatPercent(salt.progress / salt.powerToRankUp)
        })</td>`

      let nextRankPowerPerCycle = this.getPowerPerCycle(salt.rank + 1)
      content += `<td>${salt.powerPerCycle
        }<br>(${nextRankPowerPerCycle}|+${nextRankPowerPerCycle - salt.powerPerCycle
        })</td>`
      content += `<td>${salt.cyclesPerRank
        }<br>(${salt.NextCycleBreakpoint.cyclesPerRank
        } at r${salt.NextCycleBreakpoint.rank
        }|+${salt.NextCycleBreakpoint.inc
        })</td>`
      content += `<td><table class="costs"><tr>`
      let i = 0
      for (let material of salt.data.material_costs) {
        i++
        content += `<td><img src="${material.icon
          }"></td>`
        content += `<td>${formatIdleonNumbers(material.costPerRank)
          }</td>`
        if (i % 3 == 0)
          content += "</tr><tr>"





      }
      content += `</tr></table></td>`
      content += "</tr>"
    }

    content += "</table>"
    document.getElementById("refinery").innerHTML = content;
  }
  createCalculatorTimeToMakeAmounts() {
    let choiceElem = document.getElementById("salt_select")
    let inputValueElem = document.getElementById("production_needed")
    // let i = 0
    // for (let child of choiceElem) {
    // console.log(child.value)
    // child.value = this.salts[i]
    // i++
    // }
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


      document.getElementById("cycles_with_rank_ups").innerHTML = cycles.toLocaleString() + `<br>(+${rankups})`
      document.getElementById("cycles_without_rank_ups").innerText = cycles_without.toLocaleString()

    }
    choiceElem.addEventListener("input", doTheCalc);
    inputValueElem.addEventListener("input", doTheCalc);
    doTheCalc();
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


      document.getElementById("bpcalc_current_breakpoint").innerHTML = init_bp
      document.getElementById("rank_ups_to_breakpoint").innerHTML = rankups
      document.getElementById("bpcalc_cycles_to_breakpoint").innerHTML = cycles.toLocaleString()

    }
    choiceElem.addEventListener("input", doTheCalc);
    inputValueElem.addEventListener("input", doTheCalc);
    doTheCalc();
  }
  showResources() {
    let content = ""
    for (let material of this.resources) {
      content += "<div><table>"
      content += "<tr>"
      content += `<td><img src="${material.icon
        }"></td>`
      content += `<td>${this.resource_generation[material.name]
        }/h</td>`
      content += "</tr>"
      content += "</table>"
      content += "</div>"
    }


    document.getElementById("resources").innerHTML = content;
  }
}
const formatPercent = (percent) => `${(percent * 100).toFixed(2)
  }%`.padStart(6, "0");
const SALT_DATA = [
  {
    name: "Redox_Salts",
    icon_url: "https://idleon.wiki/wiki/images/thumb/c/cb/Redox_Salts.png/36px-Redox_Salts.png",
    material_costs: [
      {
        name: "Spore_Cap",
        icon: "https://idleon.wiki/wiki/images/thumb/7/7c/Spore_Cap.png/50px-Spore_Cap.png",
        baseValue: 10
      }, {
        name: "Copper_ore",
        icon: "https://idleon.wiki/wiki/images/thumb/7/78/Copper_Ore.png/50px-Copper_Ore.png",
        baseValue: 5
      }
    ]
  },
  {
    name: "Explosive_Salts",
    icon_url: "https://idleon.wiki/wiki/images/thumb/2/2f/Explosive_Salts.png/36px-Explosive_Salts.png",
    material_costs: [
      {
        name: "Bullforg_Horn",
        icon: "https://idleon.wiki/wiki/images/thumb/5/56/Bullfrog_Horn.png/50px-Bullfrog_Horn.png",
        baseValue: 10
      }, {
        name: "Foret_Fibres",
        icon: "https://idleon.wiki/wiki/images/thumb/b/b2/Forest_Fibres.png/50px-Forest_Fibres.png",
        baseValue: 5
      }, {
        name: "Redox_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/c/cb/Redox_Salts.png/50px-Redox_Salts.png",
        baseValue: 2
      }
    ]
  },
  {
    name: "Spontaneity_Salts",
    icon_url: "https://idleon.wiki/wiki/images/thumb/3/3e/Spontaneity_Salts.png/36px-Spontaneity_Salts.png",
    material_costs: [
      {
        name: "Pocket_Sand",
        icon: "https://idleon.wiki/wiki/images/thumb/8/8c/Pocket_Sand.png/50px-Pocket_Sand.png",
        baseValue: 50
      }, {
        name: "Goldfish",
        icon: "https://idleon.wiki/wiki/images/thumb/0/02/Goldfish.png/50px-Goldfish.png",
        baseValue: 30
      }, {
        name: "Fly",
        icon: "https://idleon.wiki/wiki/images/thumb/0/0c/Fly.png/50px-Fly.png",
        baseValue: 40
      }, {
        name: "Explosive_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/2/2f/Explosive_Salts.png/50px-Explosive_Salts.png",
        baseValue: 2
      }
    ]
  },
  {
    name: "Dioxide_Salts",
    icon_url: "https://idleon.wiki/wiki/images/thumb/9/96/Dioxide_Synthesis.png/36px-Dioxide_Synthesis.png",
    material_costs: [
      {
        name: "Floof_Ploof",
        icon: "https://idleon.wiki/wiki/images/thumb/0/08/Floof_Ploof.png/50px-Floof_Ploof.png",
        baseValue: 10
      }, {
        name: "Dune_Soul",
        icon: "https://idleon.wiki/wiki/images/thumb/2/2e/Dune_Soul.png/50px-Dune_Soul.png",
        baseValue: 2
      }, {
        name: "Scorpie",
        icon: "https://idleon.wiki/wiki/images/thumb/2/2e/Scorpie.png/50px-Scorpie.png",
        baseValue: 1
      }, {
        name: "Spontaneity_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/3/3e/Spontaneity_Salts.png/50px-Spontaneity_Salts.png",
        baseValue: 1
      }
    ]
  }, {
    name: "Purple_Salts",
    icon_url: "https://idleon.wiki/wiki/images/thumb/f/fb/Purple_Salt.png/36px-Purple_Salt.png",
    material_costs: [
      {
        name: "Cracked_Glass",
        icon: "https://idleon.wiki/wiki/images/thumb/2/20/Cracked_Glass.png/50px-Cracked_Glass.png",
        baseValue: 25
      },
      {
        name: "Bloach",
        icon: "https://idleon.wiki/wiki/images/thumb/c/c8/Bloach.png/50px-Bloach.png",
        baseValue: 5
      },
      {
        name: "Sentient_Cereal",
        icon: "https://idleon.wiki/wiki/images/thumb/0/04/Sentient_Cereal.png/50px-Sentient_Cereal.png",
        baseValue: 5
      },
      {
        name: "Mousey",
        icon: "https://idleon.wiki/wiki/images/thumb/d/db/Mousey.png/50px-Mousey.png",
        baseValue: 5
      }, {
        name: "Dioxide_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/9/96/Dioxide_Synthesis.png/50px-Dioxide_Synthesis.png",
        baseValue: 2
      }
    ]
  }, {
    name: "Nullo_Salts",
    icon_url: "https://idleon.wiki/wiki/images/thumb/a/a1/Nullo_Salt.png/36px-Nullo_Salt.png",
    material_costs: [
      {
        name: "Contact_Lense",
        icon: "https://idleon.wiki/wiki/images/thumb/4/48/Contact_Lense.png/50px-Contact_Lense.png",
        baseValue: 50
      },
      {
        name: "Void_Bar",
        icon: "https://idleon.wiki/wiki/images/thumb/4/4d/Void_Bar.png/50px-Void_Bar.png",
        baseValue: 5
      },
      {
        name: "Wispy_Lumber",
        icon: "https://idleon.wiki/wiki/images/thumb/0/01/Wispy_Lumber.png/50px-Wispy_Lumber.png",
        baseValue: 5
      },
      {
        name: "Flycicle",
        icon: "https://idleon.wiki/wiki/images/thumb/a/ab/Flycicle.png/50px-Flycicle.png",
        baseValue: 5
      }, {
        name: "Frigid_Soul",
        icon: "https://idleon.wiki/wiki/images/thumb/3/30/Frigid_Soul.png/50px-Frigid_Soul.png",
        baseValue: 5
      }, {
        name: "Purple_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/f/fb/Purple_Salt.png/50px-Purple_Salt.png",
        baseValue: 2
      }
    ]
  }
]

// const POWER_COSTS = "50 50 200 800 3000 8000 14000 20000 30000 40000 50000 65000 80000 100000 200000 300000 400000 500000 600000 700000 800000 900000 1000000 1000000 1000000 1000000"
const POWER_COSTS = [50, 50, 200, 800, 3000, 8000, 14000, 20000, 30000, 40000, 50000, 65000, 80000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1000000, 1000000, 1000000]