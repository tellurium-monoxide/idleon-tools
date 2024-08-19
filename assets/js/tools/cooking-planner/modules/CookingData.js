
class CookingData {
    constructor() {

        // init order is organized like this:

        // world 1
        // stamps

        // world 2
        // alchemy

        // world 3
        // construction
        // worship

        // world 4
        // cooking
        // breeding
        // lab

        // world 5
        // sailing
        // gaming

        // world 6
        // farming
        // sneaking
        // summoning

        // general
        // classes
        // cards
        // star sign
        // merit shop
        // achieve
        // arcade


    }
    initFromSaveData(save_data) {

        this.min_ladles_per_meal = 1
        this.max_ladles_per_meal = 1000000
        this.ladles_per_day = 10000

        // world 1
        // stamps
        let stamp_info = save_data["StampLv"]
        this.stamp_cooked_meal_lvl = stamp_info[1][36]

        // world 2
        // alchemy
        this.diamond_chef_lvl = save_data["CauldronInfo"][3]["17"]

        let vial_levels = []
        for (let i = 0; i < save_data["CauldronInfo"][4].length; i++) {
            vial_levels.push(save_data["CauldronInfo"][4][i])
        }

        this.max_level_vials = [...vial_levels].filter(x => x >= 13).length
        this.vial_level_turtle = vial_levels[74]
        this.vial_level_firefly = vial_levels[68]
        this.vial_level_sand_shark = vial_levels[44]
        this.vial_level_dreadlo = vial_levels[55]


        // world 3
        // construction
        let atom_data = save_data["Atoms"]
        this.void_plate_chef_lvl = atom_data[8]
        // worship
        let totem_info = JSON.parse(save_data["TotemInfo"])
        this.total_waves = totem_info[0].reduce((a, b) => a + b)
        // world 4
        // cooking
        let meal_data = JSON.parse(save_data["Meals"])

        this.meal_levels = meal_data[0].map(Number).slice(0, meal_count)
        this.meal_quantities = meal_data[2].map(Number).slice(0, meal_count)

        this.kitchen_stats = []
        let kitchen_data = JSON.parse(save_data["Cooking"])
        for (let i = 0; i < 10; i++) {
            this.kitchen_stats.push({
                "isRichelin": kitchen_data[i][0] == 2,
                "speedLv": kitchen_data[i][6],
                "fireLv": kitchen_data[i][7],
                "luckLv": kitchen_data[i][8]
            })
        }

        // breeding
        let breeding_info = JSON.parse(save_data["Breeding"])
        let shiny_time_red_mush = breeding_info[22][4]
        let shiny_time_sheepie = breeding_info[24][0]
        this.shiny_lvl_red_mush = getShinyLevel(shiny_time_red_mush)
        this.shiny_lvl_sheepie = getShinyLevel(shiny_time_sheepie)

        // lab
        let lab_info = JSON.parse(save_data["Lab"])
        // console.log(lab_info)
        let lab_jewels_info = Object.fromEntries(LAB_JEWELS.map(function (jewel_name, index) { return [jewel_name, lab_info[14][index]] }))
        // console.log(lab_jewels_info)

        this.lab_amethyst_rhinestone = lab_jewels_info["amethyst_rhinestone"]
        this.lab_purple_rhombol = lab_jewels_info["purple_rhombol"]
        this.lab_purple_navette = lab_jewels_info["purple_navette"]

        this.lab_emerald_pyramite = lab_jewels_info["emerald_pyramite"]

        this.lab_black_diamond_rhinestone_active = lab_jewels_info["black_diamond_rhinestone"]

        this.lab_pure_opal_navette_active = lab_jewels_info["pure_opal_navette"]
        this.lab_pure_opal_rhombol_active = lab_jewels_info["pure_opal_rhombol"]

        this.lab_certified_stamp_book = 1
        this.lab_spelunkerobol_active = 1
        this.lab_depot_studies_phd = 1
        this.lab_vial_doubling = 1

        // world 5
        // sailing
        let sailing_info = JSON.parse(save_data["Sailing"])
        this.artifact_triangulon_lvl = sailing_info[3][13]
        this.artifact_winz_lantern_lvl = sailing_info[3][32]

        // gaming
        let gaming_info = save_data[`Gaming`]
        let superbits = gaming_info[12]
        this.MSA_mealing_unlocked = (superbits.includes("m"))

        // world 6
        // farming
        let farming_crop_data = JSON.parse(save_data["FarmCrop"])
        this.crop_acquired = Object.keys(farming_crop_data).length
        this.farming_lvl = save_data["Lv0_0"][16]

        // sneaking
        let sneaking_data = JSON.parse(save_data["Ninja"])
        this.pristine_crystal_comb_obtained = sneaking_data[107][8]
        this.pristine_liquorice_rolle_obtained = sneaking_data[107][17]

        // summoning
        this.summoning_lvl = save_data["Lv0_0"][18]
        let summoning_data = JSON.parse(save_data["Summon"])
        this.summon_battle_mushP = (summoning_data[1].includes("mushP"))
        this.summon_battle_troll = (summoning_data[1].includes("w6b3"))
        // console.log(summoning_data[1])

        // general

        // p2w
        console.log(save_data)
        let bundle_info = JSON.parse(save_data["BundlesReceived"])
        this.p2w_pack_sacred_methods = bundle_info.hasOwnProperty("bun_s")

        // find voidWalker blood marrow and eclipse lvl
        this.voidwalker_blood_marrow_lvl = 0;
        this.voidwalker_eclipse_lvl = 0;
        for (let i = 0; i < 10; i++) {
            if (save_data[`CharacterClass_${i}`] == 4) {
                // console.log(`char ${i} is void walker`);
                let skill_max_levels = JSON.parse(save_data[`SM_${i}`]); // SM for max; SL and SLpre for currents

                this.voidwalker_blood_marrow_lvl = Math.max(skill_max_levels[59], this.voidwalker_blood_marrow_lvl);
                this.voidwalker_eclipse_lvl = Math.max(skill_max_levels[49], this.voidwalker_eclipse_lvl);


            }
        }

        // find apocalypse count on BB
        this.blood_berserker_super_chow_count = 0
        this.blood_berserker_overflowing_ladles_lvl = 0
        for (let i = 0; i < 10; i++) {
            if (save_data[`CharacterClass_${i}`] == 10) {
                // console.log(`char ${i} is blood berserker`)


                let skill_max_levels = JSON.parse(save_data[`SM_${i}`]) // SM for max; SL and SLpre for currents

                this.blood_berserker_overflowing_ladles_lvl = Math.max(skill_max_levels[148], this.blood_berserker_overflowing_ladles_lvl)
                this.blood_berserker_super_chow_count = 0
                let KLA = JSON.parse(save_data[`KLA_${i}`])
                let KillCounts = Array(300).fill(0)
                for (let k = 0; k < KLA.length; k++) {
                    KillCounts[k] = KILL_REQ[k] - KLA[k][0]
                }
                for (let k = 0; k < KLA.length; k++) {
                    if ((KillCounts[k]) > 100e6) {
                        this.blood_berserker_super_chow_count += 1
                    }
                }
            }
        }

        // cards
        let card0 = JSON.parse(save_data["Cards0"])
        let card_troll1 = card0["Boss4A"] //req: 2/6/10/32/918 
        let card_ceramic_spirit = card0["w6c1"] //req: 400/1200/2000/6400/183600
        this.card_troll1_level = getCardLevel("Boss4A", card_troll1)
        this.card_ceramic_spirit_level = getCardLevel("w6c1", card_ceramic_spirit)

        // star sign
        this.star_sign_gordonius_major = 1
        this.star_sign_seraph_cosmos = 1
        this.star_sign_chip_doubler_active = 0

        // merit shop
        let merit_levels = JSON.parse(save_data["TaskZZ2"])
        this.merit_world6_summoning_bonus_lvl = merit_levels[5][4]

        // achieve
        let achieve_data = JSON.parse(save_data["AchieveReg"])
        this.achiev_cabbage_patch = - achieve_data[224]
        this.achiev_pretzel_bleu = -achieve_data[225]
        this.achiev_best_plate = -achieve_data[233]
        this.achiev_spectre_stars = -achieve_data[379]
        this.achiev_regalis_my_beloved = -achieve_data[373]

        // arcade
        let arcade_levels = JSON.parse(save_data["ArcadeUpg"])
        this.arcade_cooking_bonus_lvl = arcade_levels[28]

        // storage
        let chest_order = save_data["ChestOrder"]
        let chest_quantities = save_data["ChestQuantity"]
        let ladle_chest_pos = chest_order.findIndex((item) => (item == "Ladle"))
        if (ladle_chest_pos) {
            this.ladles_owned = chest_quantities[ladle_chest_pos]
        } else {
            this.ladles_owned = 0
        }
        // console.log(this.ladles_owned)

        this.initCalculatedBonus()


        this.getCookingSpeed(true)
    }

    initFromInputForm() {



        // world 1 
        // stamps
        this.stamp_cooked_meal_lvl = Number(document.getElementById(`stamp_cooked_meal_lvl`).value)

        // world 2
        // alchemy
        this.diamond_chef_lvl = Number(document.getElementById(`diamond_chef_lvl`).value)
        this.max_level_vials = Number(document.getElementById(`max_level_vials`).value)
        this.vial_level_turtle = Number(document.getElementById(`vial_level_turtle`).value)
        this.vial_level_firefly = Number(document.getElementById(`vial_level_firefly`).value)
        this.vial_level_sand_shark = Number(document.getElementById(`vial_level_sand_shark`).value)
        this.vial_level_dreadlo = Number(document.getElementById(`vial_level_dreadlo`).value)

        // world 3
        // construction
        this.void_plate_chef_lvl = Number(document.getElementById(`void_plate_chef_lvl`).value)
        // worship
        this.total_waves = Number(document.getElementById(`total_waves`).value)

        // world 4
        // cooking
        this.min_ladles_per_meal = Number(document.getElementById(`min_ladles_per_meal`).value)
        this.max_ladles_per_meal = Number(document.getElementById(`max_ladles_per_meal`).value)
        this.ladles_owned = Number(document.getElementById(`ladles_owned`).value)
        this.ladles_per_day = Number(document.getElementById(`ladles_per_day`).value)

        this.meal_levels = Array(meal_count).fill(0)
        this.meal_quantities = Array(meal_count).fill(0)
        for (let i = 0; i < meal_count; i++) {
            this.meal_levels[i] = Number(document.getElementById(`meal${i}_level`).value)
            this.meal_quantities[i] = Number(document.getElementById(`meal${i}_qtt`).value)
        }
        this.kitchen_stats = Array(10).fill(0)
        for (let i = 0; i < 10; i++) {
            let kitchen = {}
            kitchen.speedLv = Number(document.getElementById(`kitchen${i}_speed_level`).value)
            kitchen.fireLv = Number(document.getElementById(`kitchen${i}_fire_level`).value)
            kitchen.luckLv = Number(document.getElementById(`kitchen${i}_luck_level`).value)
            kitchen.isRichelin = document.getElementById(`kitchen${i}_is_richelin`).checked

            this.kitchen_stats[i] = kitchen
        }

        // breeding
        this.shiny_lvl_red_mush = Number(document.getElementById(`shiny_lvl_red_mush`).value)
        this.shiny_lvl_sheepie = Number(document.getElementById(`shiny_lvl_sheepie`).value)
        // lab
        this.lab_amethyst_rhinestone = document.getElementById(`lab_amethyst_rhinestone`).checked
        this.lab_purple_rhombol = document.getElementById(`lab_purple_rhombol`).checked
        this.lab_purple_navette = document.getElementById(`lab_purple_navette`).checked
        this.lab_emerald_pyramite = document.getElementById(`lab_emerald_pyramite`).checked
        this.lab_black_diamond_rhinestone_active = document.getElementById(`lab_black_diamond_rhinestone_active`).checked
        this.lab_pure_opal_navette_active = document.getElementById(`lab_pure_opal_navette_active`).checked
        this.lab_pure_opal_rhombol_active = document.getElementById(`lab_pure_opal_rhombol_active`).checked
        this.lab_certified_stamp_book = document.getElementById(`lab_certified_stamp_book`).checked
        this.lab_spelunkerobol_active = document.getElementById(`lab_spelunkerobol_active`).checked
        this.lab_depot_studies_phd = document.getElementById(`lab_depot_studies_phd`).checked
        this.lab_vial_doubling = document.getElementById(`lab_vial_doubling`).checked

        // world 5
        // sailing
        this.artifact_triangulon_lvl = Number(document.getElementById(`artifact_triangulon_lvl`).value)
        this.artifact_winz_lantern_lvl = Number(document.getElementById(`artifact_winz_lantern_lvl`).value)
        // gaming
        this.MSA_mealing_unlocked = document.getElementById(`MSA_mealing_unlocked`).checked
        // world 6
        // farming
        this.farming_lvl = Number(document.getElementById(`farming_lvl`).value)
        this.crop_acquired = Number(document.getElementById(`crop_acquired`).value)
        // sneaking
        this.pristine_liquorice_rolle_obtained = document.getElementById(`pristine_liquorice_rolle_obtained`).checked
        this.pristine_crystal_comb_obtained = document.getElementById(`pristine_crystal_comb_obtained`).checked
        // summoning
        this.summon_battle_mushP = document.getElementById(`summon_battle_mushP`).checked
        this.summon_battle_troll = document.getElementById(`summon_battle_troll`).checked
        this.summoning_lvl = Number(document.getElementById(`summoning_lvl`).value)

        // general
        // p2w
        this.p2w_pack_sacred_methods = document.getElementById(`p2w_pack_sacred_methods`).checked

        // classes
        this.voidwalker_blood_marrow_lvl = Number(document.getElementById(`voidwalker_blood_marrow_lvl`).value)
        this.voidwalker_eclipse_lvl = Number(document.getElementById(`voidwalker_eclipse_lvl`).value)
        this.blood_berserker_super_chow_count = Number(document.getElementById(`blood_berserker_super_chow_count`).value)
        this.blood_berserker_overflowing_ladles_lvl = Number(document.getElementById(`blood_berserker_overflowing_ladles_lvl`).value)
        // cards
        this.card_troll1_level = Number(document.getElementById(`card_troll1_level`).value)
        this.card_ceramic_spirit_level = Number(document.getElementById(`card_ceramic_spirit_level`).value)
        // star sign
        this.star_sign_gordonius_major = document.getElementById(`star_sign_gordonius_major`).checked
        this.star_sign_seraph_cosmos = document.getElementById(`star_sign_seraph_cosmos`).checked
        this.star_sign_chip_doubler_active = document.getElementById(`star_sign_chip_doubler_active`).checked

        // merit shop
        this.merit_world6_summoning_bonus_lvl = Number(document.getElementById(`merit_world6_summoning_bonus`).value)

        // achieve
        this.achiev_cabbage_patch = document.getElementById(`achiev_cabbage_patch`).checked
        this.achiev_pretzel_bleu = document.getElementById(`achiev_pretzel_bleu`).checked
        this.achiev_best_plate = document.getElementById(`achiev_best_plate`).checked
        this.achiev_spectre_stars = document.getElementById(`achiev_spectre_stars`).checked
        this.achiev_regalis_my_beloved = document.getElementById(`achiev_regalis_my_beloved`).checked
        // arcade
        this.arcade_cooking_bonus_lvl = Number(document.getElementById(`arcade_cooking_bonus_lvl`).value)

        this.initCalculatedBonus()

        this.getCookingSpeed(true)
    }


    // calculates bonuses that do not evolve with meal progression
    initCalculatedBonus() {

        if (!this.equinox_event_count) {
            this.equinox_event_count = 0
        }

        this.computeMealCookingReq()

        // this needs to be computed first as lab affects nearly everything
        // TODO: pure opal navette seems to apply to itself... unsure about that, but it at least applies visually in lab
        this.lab_jewel_effect = 1
            + 0.5 * this.lab_spelunkerobol_active
            + 0.1 * this.lab_pure_opal_navette_active * (1 + 0.5 * this.lab_spelunkerobol_active)


        // TODO : take active bonus effect into account. actually doesn't seem to apply in game, or is not shown
        this.lab_bonus_effect = (1 + 0.1 * this.lab_pure_opal_navette_active * (1 + 0.5 * this.lab_spelunkerobol_active))

        // world 1
        // stamps
        this.stamp_cooked_meal_bonus = 0.01
            * this.stamp_cooked_meal_lvl
            * (1 + this.lab_certified_stamp_book)
            * (1 + 0.25 * this.pristine_liquorice_rolle_obtained)


        // world 2
        // alchemy
        this.diamond_chef_bonus = (this.diamond_chef_lvl * 0.3) / (this.diamond_chef_lvl + 13)


        // TODO : lab active bonus should impact this
        this.vial_effect = (1 + this.lab_vial_doubling) * (1 + 0.02 * this.max_level_vials)

        this.vial_turtle_bonus = this.vial_level_turtle * 0.04 * this.vial_effect
        this.vial_firefly_bonus = this.vial_level_firefly * 0.05 * this.vial_effect
        this.vial_cooking_bonus = this.vial_effect * (
            this.vial_level_sand_shark * 0.06 +
            this.vial_level_dreadlo * 0.02
        )

        // world 3
        // construction
        // worship

        // world 4

        this.meal_efficiency = 1
            + 0.16 * this.lab_black_diamond_rhinestone_active * this.lab_jewel_effect
            + 0.01 * (this.shiny_lvl_red_mush + this.shiny_lvl_sheepie)


        // cooking

        this.NMLB_count = 1 + 2 * this.p2w_pack_sacred_methods // TODO: consider unlocking jade empo nmlb

        // breeding
        // lab
        this.lab_amethyst_rhinestone_mult = Math.max(1,
            (1.5 * this.lab_amethyst_rhinestone) // amethystRhinestone   
            * (this.lab_jewel_effect)
            * (1 + (this.lab_purple_rhombol && this.lab_purple_navette))
        )

        let kitchen_total_levels = this.kitchen_stats.reduce((acc, kitchen) => acc + kitchen.speedLv + kitchen.fireLv + kitchen.luckLv, 0)
        this.emerald_pyramite_bonus = this.lab_emerald_pyramite
            * 0.01
            * (this.lab_jewel_effect)
            * (kitchen_total_levels / 25)

        this.depot_studies_phd_bonus = (1 + this.lab_depot_studies_phd * (0.3 + 0.1 * this.lab_pure_opal_rhombol_active * this.lab_jewel_effect))
        // world 5
        // sailing
        // gaming
        this.MAS_mealing_bonus = this.MSA_mealing_unlocked * 0.1 * this.total_waves / 10

        // world 6
        // farming
        this.crop_depot_bonus = Math.pow(1.1, this.crop_acquired) * this.depot_studies_phd_bonus


        console.log(this.crop_depot_bonus)

        // sneaking
        // summoning
        this.summon_bonus_mult = (1 + 0.3 * this.pristine_crystal_comb_obtained)
            * (1
                + 0.25 * this.artifact_winz_lantern_lvl
                + 0.01 * this.merit_world6_summoning_bonus_lvl
                + 0.01 * this.achiev_spectre_stars
                + 0.01 * this.achiev_regalis_my_beloved
            )


        this.summon_cooking_bonus = 1
            + this.summon_battle_mushP * 1.75
            * this.summon_battle_troll * 5.2
            * this.summon_bonus_mult
        console.log(this.summon_cooking_bonus)
        document.getElementById(`summon_cooking_mult`).innerText = (this.summon_cooking_bonus.toFixed(3))
        // general
        // classes
        this.blood_marrow_bonus = (this.voidwalker_blood_marrow_lvl * 2.1 / 100) / (this.voidwalker_blood_marrow_lvl + 220);

        this.apocalypse_active = this.voidwalker_eclipse_lvl >= 125 ? 1 : 0;
        this.apocalypse_bonus = Math.pow(1.1, this.apocalypse_active * this.blood_berserker_super_chow_count)

        this.overflowing_ladles_mult = 1 + (this.blood_berserker_overflowing_ladles_lvl) / (this.blood_berserker_overflowing_ladles_lvl + 80);
        // cards
        // star sign
        this.star_sign_cooking_bonus = 0.15
            * Math.pow(1.1, Math.ceil((this.summoning_lvl + 1) / 20))
            * (1 + this.star_sign_chip_doubler_active)

        // achieve
        // arcade
        this.arcade_cooking_bonus = (this.arcade_cooking_bonus_lvl * 0.4) / (this.arcade_cooking_bonus_lvl + 100)

    }

    fillDocumentInputForm() {




        // world 1 
        // stamps
        document.getElementById(`stamp_cooked_meal_lvl`).setValue(this.stamp_cooked_meal_lvl)


        // world 2
        // alchemy
        document.getElementById(`diamond_chef_lvl`).setValue(this.diamond_chef_lvl)
        document.getElementById(`max_level_vials`).setValue(this.max_level_vials)
        document.getElementById(`vial_level_turtle`).setValue(this.vial_level_turtle)
        document.getElementById(`vial_level_firefly`).setValue(this.vial_level_firefly)
        document.getElementById(`vial_level_sand_shark`).setValue(this.vial_level_sand_shark)
        document.getElementById(`vial_level_dreadlo`).setValue(this.vial_level_dreadlo)


        // world 3
        // construction
        document.getElementById(`void_plate_chef_lvl`).setValue(this.void_plate_chef_lvl)
        // worship
        document.getElementById(`total_waves`).setValue(this.total_waves)

        // world 4
        // cooking
        document.getElementById(`min_ladles_per_meal`).setValue(this.min_ladles_per_meal)
        document.getElementById(`max_ladles_per_meal`).setValue(this.max_ladles_per_meal)
        document.getElementById(`ladles_owned`).setValue(this.ladles_owned)
        document.getElementById(`ladles_per_day`).setValue(this.ladles_per_day)

        for (let i = 0; i < meal_count; i++) {
            document.getElementById(`meal${i}_level`).setValue(this.meal_levels[i])
            document.getElementById(`meal${i}_qtt`).value = (this.meal_quantities[i].toExponential(2))
        }

        for (let i = 0; i < 10; i++) {
            let kitchen = this.kitchen_stats[i]
            document.getElementById(`kitchen${i}_speed_level`).setValue(kitchen.speedLv)
            document.getElementById(`kitchen${i}_fire_level`).setValue(kitchen.fireLv)
            document.getElementById(`kitchen${i}_luck_level`).setValue(kitchen.luckLv)
            document.getElementById(`kitchen${i}_is_richelin`).checked = (kitchen.isRichelin)
        }

        // breeding
        document.getElementById(`shiny_lvl_red_mush`).setValue(this.shiny_lvl_red_mush)
        document.getElementById(`shiny_lvl_sheepie`).setValue(this.shiny_lvl_sheepie)
        // lab
        document.getElementById(`lab_amethyst_rhinestone`).checked = this.lab_amethyst_rhinestone
        document.getElementById(`lab_purple_rhombol`).checked = this.lab_purple_rhombol
        document.getElementById(`lab_purple_navette`).checked = this.lab_purple_navette
        document.getElementById(`lab_emerald_pyramite`).checked = this.lab_emerald_pyramite
        document.getElementById(`lab_black_diamond_rhinestone_active`).checked = this.lab_black_diamond_rhinestone_active
        document.getElementById(`lab_pure_opal_navette_active`).checked = this.lab_pure_opal_navette_active
        document.getElementById(`lab_pure_opal_rhombol_active`).checked = this.lab_pure_opal_rhombol_active
        document.getElementById(`lab_pure_opal_rhombol_bonus`).innerText = `+${(10 * this.lab_jewel_effect).toFixed(0)}% to Depot Studies PhD bonus`

        document.getElementById(`lab_certified_stamp_book`).checked = this.lab_certified_stamp_book
        document.getElementById(`lab_spelunkerobol_active`).checked = this.lab_spelunkerobol_active
        document.getElementById(`lab_depot_studies_phd`).checked = this.lab_depot_studies_phd
        document.getElementById(`lab_depot_studies_phd_bonus`).innerText = `x${(this.depot_studies_phd_bonus).toFixed(2)} to crop depot bonuses`
        document.getElementById(`lab_vial_doubling`).checked = this.lab_vial_doubling

        // world 5
        // sailing
        document.getElementById(`artifact_triangulon_lvl`).setValue(this.artifact_triangulon_lvl)
        document.getElementById(`artifact_winz_lantern_lvl`).setValue(this.artifact_winz_lantern_lvl)
        // gaming
        document.getElementById(`MSA_mealing_unlocked`).checked = this.MSA_mealing_unlocked
        // world 6
        // farming
        document.getElementById(`farming_lvl`).setValue(this.farming_lvl)
        document.getElementById(`crop_acquired`).setValue(this.crop_acquired)
        // sneaking
        document.getElementById(`pristine_crystal_comb_obtained`).checked = this.pristine_crystal_comb_obtained
        document.getElementById(`pristine_liquorice_rolle_obtained`).checked = this.pristine_liquorice_rolle_obtained
        // summoning
        document.getElementById(`summon_battle_mushP`).checked = this.summon_battle_mushP
        document.getElementById(`summon_battle_troll`).checked = this.summon_battle_troll
        document.getElementById(`summoning_lvl`).setValue(this.summoning_lvl)

        // general
        document.getElementById(`p2w_pack_sacred_methods`).checked = this.p2w_pack_sacred_methods
        // classes
        document.getElementById(`voidwalker_blood_marrow_lvl`).setValue(this.voidwalker_blood_marrow_lvl)
        document.getElementById(`voidwalker_eclipse_lvl`).setValue(this.voidwalker_eclipse_lvl)
        document.getElementById(`blood_berserker_super_chow_count`).setValue(this.blood_berserker_super_chow_count)
        document.getElementById(`blood_berserker_overflowing_ladles_lvl`).setValue(this.blood_berserker_overflowing_ladles_lvl)
        // cards
        document.getElementById(`card_troll1_level`).setValue(this.card_troll1_level)
        document.getElementById(`card_ceramic_spirit_level`).setValue(this.card_ceramic_spirit_level)
        // star sign
        document.getElementById(`star_sign_gordonius_major`).checked = this.star_sign_gordonius_major
        document.getElementById(`star_sign_seraph_cosmos`).checked = this.star_sign_seraph_cosmos
        document.getElementById(`star_sign_chip_doubler_active`).checked = this.star_sign_chip_doubler_active
        // merit shop
        document.getElementById(`merit_world6_summoning_bonus`).setValue(this.merit_world6_summoning_bonus_lvl)
        // achieve
        document.getElementById(`achiev_cabbage_patch`).checked = this.achiev_cabbage_patch
        document.getElementById(`achiev_pretzel_bleu`).checked = this.achiev_pretzel_bleu
        document.getElementById(`achiev_best_plate`).checked = this.achiev_best_plate
        document.getElementById(`achiev_spectre_stars`).checked = this.achiev_spectre_stars
        document.getElementById(`achiev_regalis_my_beloved`).checked = this.achiev_regalis_my_beloved
        // arcade
        document.getElementById(`arcade_cooking_bonus_lvl`).setValue(this.arcade_cooking_bonus_lvl)







    }


    getCookingSpeed(debug = false) {

        const total_meal_levels = (this.meal_levels.reduce((a, b) => a + b))


        const diamond_plate_meals = [...this.meal_levels].filter(x => x >= 10).length
        const void_plate_meals = [...this.meal_levels].filter(x => x >= 30).length

        const triangulon_bonus = 0.15
            * this.artifact_triangulon_lvl
            * Math.log10(Math.max(1, this.meal_quantities[0]))


        const cooking_speed_meals_bonus = this.meal_efficiency * (
            this.meal_levels[1] * 0.05 //egg
            + this.meal_levels[12] * 0.12 //corndog
            + this.meal_levels[43] * 0.2 //soda
            + this.meal_levels[52] * 0.3 // cherry
        )

        const marshmallow_meal_bonus = 0.4
            * this.meal_efficiency
            * this.meal_levels[63]
            * Math.ceil((this.farming_lvl + 1) / 50)


        const global_meal_speed_bonuses = ([
            ["base", 10],
            ["correction", 1 / 75], // correction because my cooking speed appears to be exactly 75 times higher than it should
            ["blood_marrow", Math.pow(1 + this.blood_marrow_bonus, total_meal_levels)],
            ["crop_depot", (this.crop_depot_bonus)],
            ["apocalypse", (this.apocalypse_bonus)],
            ["marshmallow", (1 + marshmallow_meal_bonus)],
            ["diamond_chef", (Math.pow(1 + this.diamond_chef_bonus, diamond_plate_meals))],
            ["void_plate_chef", (Math.pow(1 + 0.01 * this.void_plate_chef_lvl, void_plate_meals))],
            ["MSA", (1 + this.MAS_mealing_bonus)],
            ["triangulon", (1 + triangulon_bonus)],
            ["arcade", (1 + this.arcade_cooking_bonus)],
            ["vial_turtle", (1 + this.vial_turtle_bonus)],
            ["vial_other", (1 + this.vial_cooking_bonus)],
            ["stamp_and_emerald_pyramite", (1 + this.stamp_cooked_meal_bonus + this.emerald_pyramite_bonus)],
            ["meals", (1 + cooking_speed_meals_bonus)],
            ["star_sign", (1 + this.star_sign_cooking_bonus)],
            ["summoning", (this.summon_cooking_bonus)],
            ["card_ceramic", (1 + this.card_ceramic_spirit_level * 0.05)],
            ["vial_firefly", (1 + this.vial_firefly_bonus)],
            ["amethyst_rhinestone", (this.lab_amethyst_rhinestone_mult)],
            ["trollcard+achievs", (1 + this.card_troll1_level * 0.06 + this.achiev_cabbage_patch * 0.1 + this.achiev_pretzel_bleu * 0.2)]
        ])

        // const global_meal_speed_mult = global_meal_speed_bonuses.values().reduce((res, val) => { return res * val }, 1) // use for map or object but not yet avail in firefox
        const global_meal_speed_mult = global_meal_speed_bonuses.reduce((res, val) => { return res * val[1] }, 1)

        let total_cooking_speed = 0

        const cabbage_bonus = this.meal_efficiency * this.meal_levels[13] * 0.05

        let kitchen_speeds = []
        for (let i = 0; i < 10; i++) {
            const kitchen = this.kitchen_stats[i]
            const kitchen_total_lvl = kitchen.speedLv + kitchen.fireLv + kitchen.luckLv

            const kitchen_speed = global_meal_speed_mult
                * (1 + kitchen.speedLv / 10)
                * (1 + 2 * kitchen.isRichelin)
                * (1 + cabbage_bonus * Math.floor(kitchen_total_lvl / 10))
            total_cooking_speed += kitchen_speed
            kitchen_speeds.push({
                "speed": kitchen_speed,
                "baseSpeed": (1 + kitchen.speedLv / 10),
                "cabbageBonus": (1 + cabbage_bonus * Math.floor(kitchen_total_lvl / 10)),
            })
        }

        if (debug) {
            console.log(`debug info for cooking speed calc:`)
            console.log(`global mults:`)
            console.log(global_meal_speed_bonuses)
            console.log(`kitchen info:`)
            console.log(kitchen_speeds)
            console.log(`cooking speed: ${total_cooking_speed.toExponential(2)}`)

        }
        return total_cooking_speed
    }



    computeMealCookingReq() {
        if (!this.meal_cooking_req_to_next_lvl) {
            this.meal_cooking_req_to_next_lvl = Array(meal_count).fill(0)
        }
        for (let meal_id = 0; meal_id < meal_count; meal_id++) {
            const mdata = meal_info[meal_id]
            const current_lvl = this.meal_levels[meal_id]
            const cost = this.getMealCost(current_lvl)
            this.meal_cooking_req_to_next_lvl[meal_id] = (cost - this.meal_quantities[meal_id]) * mdata.cookReq;
        }
    }


    getClosestMealUpgrade() {
        const closest_meal = indexOfMin(this.meal_cooking_req_to_next_lvl)
        const cook_req = this.meal_cooking_req_to_next_lvl[closest_meal]
        return [closest_meal, cook_req]
    }



    getMealCost(current_lvl,) {
        if (current_lvl >= meal_max_lvl) {
            return Infinity
        }
        else {
            let level = current_lvl
            // achiev 4-24 "best plate" gives 10% lower cost, actually cost efficiency 
            // like most other badly worded cost reductions in this game
            const achiev_cost_reduction = 1 / (1 + 0.1 * this.achiev_best_plate)

            // equinox gives reduced cost per daily event done, up to 14 (depends on equinox upgrade level actually)
            const equinox = Math.max(0.01, Math.pow(0.8, Math.min(this.equinox_event_count, 14)))

            const base_mult1 = (10 + (level + Math.pow(level, 2)));
            const base_mult2 = Math.pow(1.2 + 0.05 * level, level);
            return achiev_cost_reduction * base_mult1 * base_mult2 * equinox;
        }


    }



    cookMeal(meal_id, time_in_hours) {
        let speed = this.getCookingSpeed()
        let cook_req = meal_info[meal_id].cookReq
        let cooked_amount = time_in_hours * speed / cook_req
        this.meal_quantities[meal_id] += cooked_amount
    }
    cookMealWithLadles(meal_id, ladles) {
        let speed = this.getCookingSpeed()
        let cook_req = meal_info[meal_id].cookReq
        let cooked_amount = ladles * (this.overflowing_ladles_mult) * speed / cook_req
        this.meal_quantities[meal_id] += cooked_amount
    }

    upgradeMeal(meal_id) {
        let meal_cost = this.getMealCost(this.meal_levels[meal_id])
        if (meal_cost > this.meal_quantities[meal_id]) {
            console.log(meal_cost)
            console.log(this.meal_quantities[meal_id])
            return false;
        } else {
            this.meal_quantities[meal_id] -= meal_cost
            this.meal_levels[meal_id] += 1
            this.equinox_event_count = 0
            this.computeMealCookingReq()
            return true
        }
    }

    triggerNMLB() {

        // NMLB upgrades lowest level meal starting with last ones
        let NMLB_upgrades = []
        let NMLB_meal = indexOfMin(this.meal_levels)
        for (let i = 0; i < this.NMLB_count; i++) {

            let new_lvl = this.meal_levels[NMLB_meal] + 1
            if (new_lvl <= meal_max_lvl) {
                this.meal_levels[NMLB_meal] += 1
                NMLB_upgrades.push([NMLB_meal, new_lvl])
            }
        }

        this.ladles_owned += this.ladles_per_day



        this.equinox_event_count += 1

        this.computeMealCookingReq()

        return NMLB_upgrades
    }

    getLadlesNeeded(meal_time_in_hours) {
        return Math.max(Math.ceil(meal_time_in_hours / this.overflowing_ladles_mult), 0)
    }



}
