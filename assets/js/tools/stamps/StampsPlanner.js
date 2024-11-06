class StampPlanner {
    constructor(save_data) {
        this.save_data = save_data

        let stamp_lvls = save_data["StampLv"]

        this.stamp_lvls = {
            "combat": stamp_lvls[0],
            "skill": stamp_lvls[1],
            "misc": stamp_lvls[2],
        }
        let stamp_maxlvls = save_data["StampLvM"]
        this.stamp_maxlvls = {
            "combat": stamp_maxlvls[0],
            "skill": stamp_maxlvls[1],
            "misc": stamp_maxlvls[2],
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

        this.max_level_vials = [...vial_levels].filter(x => x >= 13).length
        this.vial_level_red_malt = vial_levels[25]
        // sigils
        let sigil_info = JSON.parse(save_data["CauldronP2W"])
        let sigil_pipe_gauge_time = sigil_info[4][2 * (11 - 1)]
        this.sigil_pipe_gauge_level = ((sigil_pipe_gauge_time >= 700)
            + (sigil_pipe_gauge_time >= 12000)
            + (sigil_pipe_gauge_time >= 320000))


        // world 5
        // sailing
        let sailing_info = JSON.parse(save_data["Sailing"])
        this.artifact_chilled_yarn_lvl = sailing_info[3][16]




        for (let [catName, catStamps] of Object.entries(this.stamp_lvls)) {
            for (let [stampId, stampLV] of Object.entries(catStamps)) {
                // let cell_id = `stamp_${catName}_${stampId}`
                let stampData = DATA_STAMPS[catName][stampId]
                if (stampData) {

                    let lvl_to_mat_upgrade = Math.ceil(stampLV / stampData.reqItemMultiplicationLevel) * stampData.reqItemMultiplicationLevel

                    let cell = document.getElementById(stampData.rawName)

                    cell.innerHTML = `lvl ${stampLV}(${lvl_to_mat_upgrade})`
                }
            }
        }
    }
}