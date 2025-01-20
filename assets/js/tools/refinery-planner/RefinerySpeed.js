class RefinerySpeed {
    constructor(save_data) {

        this.save_data = save_data




        this.parseSaveData()

    }
    parseSaveData() {

        let save_data = this.save_data
        // find ref speed sources in save_data
        // world 1
        // stamps
        let stamp_info = save_data["StampLv"]
        this.stamp_refinery_level = stamp_info[2][21]
        // world 2
        // alchemy
        let vial_info = save_data["CauldronInfo"][4]
        let vial_levels = []
        for (let i = 0; i < vial_info.length; i++) {
            vial_levels.push(vial_info[i])
        }

        this.max_level_vials = [...vial_levels].filter(x => x >= 13).length
        this.vial_level_red_malt = vial_levels[25]

        // sigils
        let sigil_info = JSON.parse(save_data["CauldronP2W"])
        let sigil_pipe_gauge_time = sigil_info[4][2 * (11 - 1)]
        this.sigil_pipe_gauge_level = ((sigil_pipe_gauge_time >= 700)
            + (sigil_pipe_gauge_time >= 12000)
            + (sigil_pipe_gauge_time >= 320000))

        // arcade
        let arcade_levels = JSON.parse(save_data["ArcadeUpg"])
        this.arcade_refinery_lvl = arcade_levels[25]
        // world 3
        // construction
        let building_data = JSON.parse(save_data["Tower"])
        let building_current_levels = building_data.slice(0, 27)
        this.total_building_levels = building_current_levels.reduce((a, b) => (a + b))

        let salt_lick_data = JSON.parse(save_data["SaltLick"])
        this.salt_lick_refinery_speed = salt_lick_data[2]
        // world 4
        // breeding
        let breeding_info = JSON.parse(save_data["Breeding"])
        // console.log(breeding_info)
        let shiny_time_bored_bean = breeding_info[22][3]
        let shiny_time_whale = breeding_info[23][9]
        let shiny_time_Demon_Genie = breeding_info[25][3]
        // let shiny_time_sheepie = breeding_info[24][0]
        this.shiny_lvl_bored_bean = getShinyLevel(shiny_time_bored_bean)
        this.shiny_lvl_whale = getShinyLevel(shiny_time_whale)
        this.shiny_lvl_Demon_Genie = getShinyLevel(shiny_time_Demon_Genie)


        // lab

        // world 5
        // sailing
        let sailing_info = JSON.parse(save_data["Sailing"])
        this.artifact_chilled_yarn_lvl = sailing_info[3][16]


        // general
        // classes
        let player_names = save_data[`playerNames`]
        let players = Array.from({ length: player_names.length }, () => ({}));

        for (let i = 0; i < player_names.length; i++) {
            players[i]["name"] = player_names[i]
            players[i]["class"] = save_data[`CharacterClass_${i}`]
            players[i]["class_name"] = CLASSES[save_data[`CharacterClass_${i}`]]
            players[i]["subclasses"] = getClassList(CLASSES[save_data[`CharacterClass_${i}`]])


            players[i]["skill_max_levels"] = JSON.parse(save_data[`SM_${i}`]); // SM for max; SL and SLpre for currents
            players[i]["skill_current_levels"] = JSON.parse(save_data[`SL_${i}`]); // SM for max; SL and SLpre for currents
            players[i]["level"] = save_data[`Lv0_${i}`][0];

            let talent_family_guy = TALENTS["Divine_Knight"]["THE_FAMILY_GUY"]
            let level_fg = players[i]["skill_current_levels"][talent_family_guy.skillIndex]
            players[i]["family_guy_lvl"] = level_fg
            players[i].family_guy_bonus = talent_family_guy.x1 / 100 * level_fg / (talent_family_guy.x2 + level_fg)

        }
        // console.log(this.players)

        let highest_level_DK = players.filter((p) => (p.subclasses.includes("Divine_Knight"))).reduce(
            (acc, val) => {
                return acc.level > val.level ? acc : val;
            })
        // console.log(highest_level_DK)
        this.highest_dk_level = highest_level_DK.level
        this.highest_dk_fg_level = highest_level_DK.family_guy_lvl

        this.computeRefinerySpeed()
        this.fillSpeedInputForm()

    }
    computeArcadeBonus(lvl) {
        return 0.3 * Math.min(lvl, 100) / (100 + Math.min(lvl, 100)) * (1 + ((lvl > 100) ? 1 : 0))
    }
    computeRefinerySpeed() {
        // calc total speed mult
        let talent_family_guy = TALENTS["Divine_Knight"]["THE_FAMILY_GUY"]
        let family_guy_bonus = talent_family_guy.x1 / 100 * this.highest_dk_fg_level / (talent_family_guy.x2 + this.highest_dk_fg_level)
        let shinyRefineryBonus = 0.02 * (this.shiny_lvl_bored_bean + this.shiny_lvl_whale + this.shiny_lvl_Demon_Genie)
        let family_refinery_bonus = 0.5 * this.highest_dk_level / (150 + this.highest_dk_level) * (1 + family_guy_bonus)
        this.bonusBreakdown = [
            { name: 'Base', value: 1, max: 1 },
            { name: 'Vials', value: this.vial_level_red_malt * 0.02 * (1 + 0.02 * this.max_level_vials), max: 0.6188 },
            { name: 'Salt_lick', value: this.salt_lick_refinery_speed * 0.02, max: 0.2 },
            { name: 'Family', value: family_refinery_bonus, max: 0.7 },
            { name: 'Sigils', value: 0.1 * this.sigil_pipe_gauge_level * (1 + this.artifact_chilled_yarn_lvl), max: 1.5 },
            { name: 'Stamps', value: this.stamp_refinery_level / 100, max: 1 },
            { name: 'Shinies', value: shinyRefineryBonus, max: 1.2 },
            { name: 'Const_mastery', value: Math.floor(this.total_building_levels / 10) / 100, max: 3.67 },
            { name: 'Arcade', value: this.computeArcadeBonus(this.arcade_refinery_lvl), max: 0.3 },
            // { name: 'Vote', value: 0 }, // not taken into account as not very useful for the long term planning
        ]


        this.refinery_speed_mult = this.bonusBreakdown.reduce((a, b) => { return (a + b.value) }, 0) * (3) // lab bonus always on
        this.max_refinery_speed_mult = this.bonusBreakdown.reduce((a, b) => { return (a + b.max) }, 0) * (3) // lab bonus always on
        let sum = this.bonusBreakdown.reduce((a, b) => { return (a + b.value) }, 0)
        for (let bonus of this.bonusBreakdown) {
            bonus.weight = bonus.value / sum
            bonus.completion = bonus.value / bonus.max
        }


        console.log(this.bonusBreakdown)
        console.log(this.refinery_speed_mult)
    }


    fillSpeedInputForm() {
        document.getElementById("speed_combustion").innerHTML = `${formatTime(CYCLE_BASE_TIMES["Combustion"] / this.refinery_speed_mult)}`
        document.getElementById("speed_synthesis").innerHTML = `${formatTime(CYCLE_BASE_TIMES["Synthesis"] / this.refinery_speed_mult)}`

        for (let bonus of this.bonusBreakdown) {
            document.getElementById(bonus.name).children[2].innerHTML = "+" + formatPercent(bonus.value)
            document.getElementById(bonus.name).children[3].innerHTML = formatPercent(bonus.max)
            document.getElementById(bonus.name).children[4].innerHTML = formatPercent(bonus.completion)
        }

        let sum = this.bonusBreakdown.reduce((a, b) => { return (a + b.value) }, 0)
        let sum_max = this.bonusBreakdown.reduce((a, b) => { return (a + b.max) }, 0)
        document.getElementById("Total").children[2].innerHTML = "+" + formatPercent(sum)
        document.getElementById("Total").children[3].innerHTML = formatPercent(sum_max)
        document.getElementById("Total").children[4].innerHTML = formatPercent(sum / sum_max)

        document.getElementById("refinery_speed_max_lvl_vials").setValue(this.max_level_vials)
        document.getElementById("refinery_speed_red_malt_vial").setValue(this.vial_level_red_malt)
        document.getElementById("refinery_speed_salt_lick_lvl").setValue(this.salt_lick_refinery_speed)
        document.getElementById("refinery_speed_dk_level").setValue(this.highest_dk_level)
        document.getElementById("refinery_speed_fg_talent_lvl").setValue(this.highest_dk_fg_level)
        document.getElementById("refinery_speed_sigil_lvl").setValue(this.sigil_pipe_gauge_level)
        document.getElementById("refinery_speed_arti_lvl").setValue(this.artifact_chilled_yarn_lvl)
        document.getElementById("refinery_speed_stamp_level").setValue(this.stamp_refinery_level)
        document.getElementById("refinery_speed_shiny_bored_bean_lvl").setValue(this.shiny_lvl_bored_bean)
        document.getElementById("refinery_speed_shiny_whale_lvl").setValue(this.shiny_lvl_whale)
        document.getElementById("refinery_speed_shiny_demon_genie_lvl").setValue(this.shiny_lvl_Demon_Genie)
        document.getElementById("refinery_speed_building_lvls").setValue(this.total_building_levels)
        document.getElementById("refinery_speed_arcade_lvl").setValue(this.arcade_refinery_lvl)

    }

    readFromSpeedInputForm() {
        this.max_level_vials = Number(document.getElementById("refinery_speed_max_lvl_vials").value)
        this.vial_level_red_malt = Number(document.getElementById("refinery_speed_red_malt_vial").value)
        this.salt_lick_refinery_speed = Number(document.getElementById("refinery_speed_salt_lick_lvl").value)
        this.highest_dk_level = Number(document.getElementById("refinery_speed_dk_level").value)
        this.highest_dk_fg_level = Number(document.getElementById("refinery_speed_fg_talent_lvl").value)
        this.sigil_pipe_gauge_level = Number(document.getElementById("refinery_speed_sigil_lvl").value)
        this.artifact_chilled_yarn_lvl = Number(document.getElementById("refinery_speed_arti_lvl").value)
        this.stamp_refinery_level = Number(document.getElementById("refinery_speed_stamp_level").value)
        this.shiny_lvl_bored_bean = Number(document.getElementById("refinery_speed_shiny_bored_bean_lvl").value)
        this.shiny_lvl_whale = Number(document.getElementById("refinery_speed_shiny_whale_lvl").value)
        this.shiny_lvl_Demon_Genie = Number(document.getElementById("refinery_speed_shiny_demon_genie_lvl").value)
        this.total_building_levels = Number(document.getElementById("refinery_speed_building_lvls").value)
        this.arcade_refinery_lvl = Number(document.getElementById("refinery_speed_arcade_lvl").value)

        // console.log(this.artifact_chilled_yarn_lvl)
        // console.log(this.sigil_pipe_gauge_level)

        this.computeRefinerySpeed()
        this.fillSpeedInputForm()

    }

    getMult() {
        return this.refinery_speed_mult
    }
}