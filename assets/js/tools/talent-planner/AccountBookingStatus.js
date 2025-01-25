
class AccountBookingStatus {
    constructor() {

    }


    initFromSaveData(save_data) {


        let player_names = save_data[`playerNames`]
        this.players = Array.from({ length: player_names.length }, () => ({}));

        for (let i = 0; i < player_names.length; i++) {
            this.players[i]["name"] = player_names[i]
            this.players[i]["class"] = save_data[`CharacterClass_${i}`]
            this.players[i]["class_name"] = CLASSES[save_data[`CharacterClass_${i}`]]
            this.players[i]["subclasses"] = getClassList(CLASSES[save_data[`CharacterClass_${i}`]])


            this.players[i]["skill_max_levels"] = JSON.parse(save_data[`SM_${i}`]); // SM for max; SL and SLpre for currents
            this.players[i]["skill_current_levels"] = JSON.parse(save_data[`SL_${i}`]); // SM for max; SL and SLpre for currents

        }

        console.log(this.players)


        // init library bonuses

        // world 1
        // stamps
        let stamp_info = save_data["StampLv"]
        this.stamp_biblio = stamp_info[2][19]

        // world 2
        // alchemy
        this.bubble_ignore_overdues = save_data["CauldronInfo"][3]["13"]

        let vial_levels = []
        for (let i = 0; i < save_data["CauldronInfo"][4].length; i++) {
            vial_levels.push(save_data["CauldronInfo"][4][i])
        }

        this.max_level_vials = [...vial_levels].filter(x => x >= 13).length
        this.vial_chonker_chug = vial_levels[30]



        // world 3
        let building_data = JSON.parse(save_data["Tower"])
        this.building_library_lvl = building_data[1]

        let atom_data = save_data["Atoms"]
        this.atom_oxygen = atom_data[7]

        let salt_lick_data = JSON.parse(save_data["SaltLick"])
        this.salt_lick_spontaneity_salts = salt_lick_data[4] //TODO


        // world 4
        // cooking
        let meal_data = JSON.parse(save_data["Meals"])
        this.meal_lvl_fortune_cookies = meal_data[0][34]
        let meal_ribbons = (save_data["Ribbon"])
        this.ribbon_tier_fortune_cookies = meal_ribbons[34 + 28]
        console.log("ribbon")
        console.log(this.ribbon_tier_fortune_cookies)

        // breeding
        let breeding_info = JSON.parse(save_data["Breeding"])
        let shiny_time_red_mush = breeding_info[22][4]
        let shiny_time_sheepie = breeding_info[24][0]
        this.shiny_lvl_red_mush = getShinyLevel(shiny_time_red_mush)
        this.shiny_lvl_sheepie = getShinyLevel(shiny_time_sheepie)

        // lab
        let lab_info = JSON.parse(save_data["Lab"])
        let lab_jewels_info = Object.fromEntries(LAB_JEWELS.map(function (jewel_name, index) { return [jewel_name, lab_info[14][index]] }))


        this.lab_black_diamond_rhinestone_active = lab_jewels_info["black_diamond_rhinestone"]

        this.lab_pure_opal_navette_active = lab_jewels_info["pure_opal_navette"]


        this.lab_spelunkerobol_active = 1
        this.lab_vial_doubling = 1

        // world 5
        // sailing
        let sailing_info = JSON.parse(save_data["Sailing"])
        this.artifact_fury_relic_lvl = sailing_info[3][21]
        this.artifact_winz_lantern_lvl = sailing_info[3][32]

        // gaming
        let gaming_info = save_data[`Gaming`]
        let superbits = gaming_info[12]
        this.superbit_library_checkouts = (superbits.includes("l"))
        this.gaming_lvl = save_data["Lv0_0"][15]

        // world 6
        // sneaking
        let sneaking_data = JSON.parse(save_data["Ninja"])
        this.pristine_crystal_comb_obtained = sneaking_data[107][8]

        // summoning
        let summoning_data = JSON.parse(save_data["Summon"])
        console.log(summoning_data)
        this.summon_battle_cyan14 = (summoning_data[1].includes("w6d3"))

        // general

        // merit shop
        let merit_levels = JSON.parse(save_data["TaskZZ2"])
        this.merit_world3_max_book_lvl = merit_levels[2][2]
        this.merit_world6_summoning_bonus_lvl = merit_levels[5][4]

        // achieve
        let achieve_data = JSON.parse(save_data["AchieveReg"])
        this.achiev_checkout_takeout = - achieve_data[145]
        this.achiev_spectre_stars = - achieve_data[379]
        this.achiev_regalis_my_beloved = - achieve_data[373]


        this.initCalculatedBonus()
        this.fillDocumentInputForm()




        let tabs = $("#tabs-char-talents").tabs({});
        tabs.find("div").remove();
        tabs.find("li").remove();
        // document.getElementById("tabs-char-talents").tabs();
        // tabs.tabs("refresh");

        this.non_tiered_count = 0
        for (let i = 0; i < player_names.length; i++) {
            this.addPlayerDisplay(i)
        }
        console.log(`Number of talent without tier: ${this.non_tiered_count}`)
        this.makeTalentUpgradeList()


    }

    initCalculatedBonus() {



        // this needs to be computed first as lab affects nearly everything
        // TODO: pure opal navette seems to apply to itself... unsure about that, but it at least applies visually in lab
        this.lab_jewel_effect = 1
            + 0.5 * this.lab_spelunkerobol_active
            + 0.1 * this.lab_pure_opal_navette_active * (1 + 0.5 * this.lab_spelunkerobol_active)


        // TODO : take active bonus effect into account. actually doesn't seem to apply in game, or is not shown
        this.lab_bonus_effect = (1 + 0.1 * this.lab_pure_opal_navette_active * (1 + 0.5 * this.lab_spelunkerobol_active))

        // world 1
        // stamps
        this.stamp_biblio_bonus = 0.01 * this.stamp_biblio

        // world 2
        // alchemy
        this.bubble_ignore_overdues_bonus = (this.bubble_ignore_overdues * 1) / (this.bubble_ignore_overdues + 60)


        // TODO : lab active bonus should impact this
        this.vial_effect = (1 + this.lab_vial_doubling) * (1 + 0.02 * this.max_level_vials)

        this.vial_chonker_chug_bonus = this.vial_chonker_chug * 0.01 * this.vial_effect


        // world 3
        // construction
        // worship

        // world 4

        this.meal_efficiency = 1
            + 0.16 * this.lab_black_diamond_rhinestone_active * this.lab_jewel_effect
            + 0.01 * (this.shiny_lvl_red_mush + this.shiny_lvl_sheepie)

        let ribbon_mults = {
            0: 1,
            1: 1.05,
            2: 1.14,
            3: 1.19,
            4: 1.28,
            5: 1.46,
            6: 1.61,
            7: 1.66,
            8: 1.82,
            9: 1.87,
            10: 2.35,
            11: 2.4,
            12: 2.62,
            13: 2.67,
            14: 2.89,
            15: 3.39,
            16: 3.68,
            17: 3.73,
            18: 4.01,
            19: 4.06,
            20: 5,
        }
        this.ribbon_mult_fortune_cookies = ribbon_mults[this.ribbon_tier_fortune_cookies]
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
        this.summon_bonus_mult = (1 + 0.3 * this.pristine_crystal_comb_obtained)
            * (1
                + 0.25 * this.artifact_winz_lantern_lvl
                + 0.01 * this.merit_world6_summoning_bonus_lvl
                + 0.01 * this.achiev_spectre_stars
                + 0.01 * this.achiev_regalis_my_beloved
            )



        // general

        // merit


        this.max_book_level = 125
            + 2 * this.merit_world3_max_book_lvl
            + 2 * this.salt_lick_spontaneity_salts
            + 5 * this.achiev_checkout_takeout
            + 10 * (this.atom_oxygen >= 1)
            + 25 * this.artifact_fury_relic_lvl
            + Math.round(10.5 * this.summon_battle_cyan14 * this.summon_bonus_mult)


        this.lib_checkout_speed = 4 * 3600
            / (1 + 0.04 * this.meal_lvl_fortune_cookies * this.meal_efficiency * this.ribbon_mult_fortune_cookies)
            / (1 + this.atom_oxygen * 0.02)
            / (1
                + 0.05 * (this.building_library_lvl - 1)
                + this.bubble_ignore_overdues_bonus
                + this.vial_chonker_chug_bonus
                + this.stamp_biblio_bonus
                + this.superbit_library_checkouts * this.gaming_lvl * 0.01
                + 0.3 * this.achiev_checkout_takeout
            )

        // console.log(0.04 * this.meal_lvl_fortune_cookies * this.meal_efficiency)
        // console.log(this.atom_oxygen * 0.02)
        // console.log(0.05 * (this.building_library_lvl - 1))
        // console.log(this.bubble_ignore_overdues_bonus)
        // console.log(this.vial_chonker_chug_bonus)
        // console.log(this.stamp_biblio_bonus)
        // console.log(this.superbit_library_checkouts * this.gaming_lvl * 0.01)
        // console.log(0.3 * this.achiev_checkout_takeout)
    }

    fillDocumentInputForm() {


        // world 1 
        // stamps
        document.getElementById(`stamp_biblio`).value = this.stamp_biblio


        // world 2
        // alchemy
        document.getElementById(`bubble_ignore_overdues`).value = this.bubble_ignore_overdues
        document.getElementById(`max_level_vials`).value = this.max_level_vials
        document.getElementById(`vial_chonker_chug`).value = this.vial_chonker_chug

        // world 3
        // construction
        document.getElementById(`building_library_lvl`).value = this.building_library_lvl
        document.getElementById(`atom_oxygen`).value = this.atom_oxygen
        document.getElementById(`salt_lick_spontaneity_salts`).value = this.salt_lick_spontaneity_salts


        // world 4
        // cooking
        document.getElementById(`meal_lvl_fortune_cookies`).value = this.meal_lvl_fortune_cookies


        // breeding
        document.getElementById(`shiny_lvl_red_mush`).value = this.shiny_lvl_red_mush
        document.getElementById(`shiny_lvl_sheepie`).value = this.shiny_lvl_sheepie
        // lab

        document.getElementById(`lab_black_diamond_rhinestone_active`).checked = this.lab_black_diamond_rhinestone_active
        document.getElementById(`lab_pure_opal_navette_active`).checked = this.lab_pure_opal_navette_active



        document.getElementById(`lab_spelunkerobol_active`).checked = this.lab_spelunkerobol_active
        document.getElementById(`lab_vial_doubling`).checked = this.lab_vial_doubling

        // world 5
        // sailing
        document.getElementById(`artifact_fury_relic_lvl`).value = this.artifact_fury_relic_lvl
        document.getElementById(`artifact_winz_lantern_lvl`).value = this.artifact_winz_lantern_lvl
        // gaming
        document.getElementById(`superbit_library_checkouts`).checked = this.superbit_library_checkouts
        document.getElementById(`gaming_lvl`).value = this.gaming_lvl
        // world 6
        // sneaking
        document.getElementById(`pristine_crystal_comb_obtained`).checked = this.pristine_crystal_comb_obtained

        // summoning
        document.getElementById(`summon_battle_cyan14`).checked = this.summon_battle_cyan14
        // general

        // merit shop
        document.getElementById(`merit_world3_max_book_lvl`).value = this.merit_world3_max_book_lvl
        document.getElementById(`merit_world6_summoning_bonus_lvl`).value = this.merit_world6_summoning_bonus_lvl
        // achieve
        document.getElementById(`achiev_checkout_takeout`).checked = this.achiev_checkout_takeout
        document.getElementById(`achiev_spectre_stars`).checked = this.achiev_spectre_stars
        document.getElementById(`achiev_regalis_my_beloved`).checked = this.achiev_regalis_my_beloved




        document.getElementById(`max_book_level`).innerText = this.max_book_level
        document.getElementById(`time_to_5_books`).innerText = FormatCheckoutTime(this.getTimeTillCheckout(0, 5))
        document.getElementById(`time_to_20_books`).innerText = FormatCheckoutTime(this.getTimeTillCheckout(0, 20))
        document.getElementById(`time_to_40_books`).innerText = FormatCheckoutTime(this.getTimeTillCheckout(0, 40))




    }

    addPlayerDisplay(playerId) {
        let player = this.players[playerId]


        // add char tab
        let img = `<img src=${CLASS_ICONS[player.class_name]} class="collapsible_icon" />`
        let li = `<li><a href='#tab_char${playerId}'>${img}${player.name}</a> </li>`

        let subtabs_def = `<div id=tabs-subclass-char${playerId} class="jquerytabs"><ul></ul></div>`

        let tabs = $("#tabs-char-talents").tabs();
        tabs.find("#tabs-char-talents-nav").append(li);
        tabs.append(`<div id="tab_char${playerId}">` + subtabs_def + "</div>");
        tabs.tabs("refresh");
        tabs.tabs("option", "active", 0);




        for (let talent_page of player.subclasses) {
            let img = `<img src=${CLASS_ICONS[talent_page]} class="collapsible_icon" />`
            let nav = `<li><a href='#tab-char${playerId}-class-${talent_page}'>${img}${talent_page}</a> </li>`
            let content = ""
            content += `<div id="tab-char${playerId}-class-${talent_page}">`
            content += `<table>`
            content += `<tr>`
            let i = 0
            for (let talent of Object.entries(TALENTS[talent_page])) {

                if (i % 5 == 0) {
                    content += `</tr><tr>`
                }
                i++;
                // content += `${talent[0]} - ${player.skill_max_levels[talent[1].skillIndex]} `
                content += `<td>`
                content += this.getTalentDisplay(player, talent[1])
                content += `</td>`
            }
            content += `</tr>`
            content += `</table>`

            let subtabs = $(`#tabs-subclass-char${playerId}`).tabs();
            subtabs.find(".ui-tabs-nav").append(nav);
            subtabs.append(content);
            subtabs.tabs("refresh");
            subtabs.tabs("option", "active", 0);
        }



    }

    getTalentDisplay(player, talent) {
        let display = ""
        let icon = TALENT_ICONS[talent.name]
        let is_tiered = isTiered(talent.name, player.class_name) ? "" : ">>"
        let icon_display = icon ? `<img src=${icon}/>` : (talent.name)
        // let icon_display = icon ? `<img src=${icon}/>` : capEachWord(talent.name)
        let max_lvl = player.skill_max_levels[talent.skillIndex]
        let cur_lvl = player.skill_current_levels[talent.skillIndex]
        let display_class = isTiered(talent.name, player.class_name) ? "" : "notier"
        display_class = (max_lvl == this.max_book_level) ? "completed" : display_class
        display_class = (TALENT_UNBOOKABLE.includes(talent.name)) ? "unbookable" : display_class
        if (display_class == "notier") {
            this.non_tiered_count += 1
        }
        display += `<div class="talent_display ${display_class}" title="${talent.description}"> ${is_tiered} ${icon_display}<br> ${cur_lvl}/${max_lvl}</div>`
        return display
    }



    makeTalentUpgradeList() {
        let max_tier = TALENT_TIERS.length
        let tiered_talents = Array.from({ length: max_tier + 1 }, () => ([]));

        let talents_at_max_book = {}
        // iterate all players
        for (let playerId = 0; playerId < this.players.length; playerId++) {

            let player = this.players[playerId]

            // iterate all talents of the player
            for (let talent_page of player.subclasses) {
                for (let talent of Object.entries(TALENTS[talent_page])) {
                    talents_at_max_book[talent[1].name] = talents_at_max_book[talent[1].name] ? talents_at_max_book[talent[1].name] : 0
                    let current_max_level = player.skill_max_levels[talent[1].skillIndex]
                    if (current_max_level == this.max_book_level) {

                        talents_at_max_book[talent[1].name] += 1
                    }
                }
            }
        }

        console.log(talents_at_max_book)
        // iterate all players
        for (let playerId = 0; playerId < this.players.length; playerId++) {

            let player = this.players[playerId]

            // iterate all talents of the player
            for (let talent_page of player.subclasses) {
                for (let talent of Object.entries(TALENTS[talent_page])) {
                    let current_level = player.skill_max_levels[talent[1].skillIndex]
                    if (current_level < this.max_book_level && !TALENT_UNBOOKABLE.includes(talent[1].name)) {
                        // iterate tiers
                        let has_tier = false
                        for (let tier = 0; tier < max_tier; tier++) {
                            let talent_list = TALENT_TIERS[tier].list
                            // console.log(talent_list)
                            // console.log(talent[1].name)
                            if (talent_list.hasOwnProperty(talent[1].name)) {
                                let global = talent_list[talent[1].name].global
                                let not_covered_by_other_chars = !global || talents_at_max_book[talent[1].name] < 1

                                let class_restrict = talent_list[talent[1].name].class_restrict
                                let is_correct_class = !class_restrict || player.subclasses.includes(class_restrict)
                                if (not_covered_by_other_chars && is_correct_class) {
                                    has_tier = true
                                    tiered_talents[tier].push({
                                        "char": playerId,
                                        "charname": player.name,
                                        "class": talent_page,
                                        "talent": talent[1].name,
                                        "talentId": talent[1].skillIndex,
                                        "level": current_level,
                                        "purpose": talent_list[talent[1].name].purpose
                                    })
                                }
                            }

                        }
                        if (!has_tier) {
                            tiered_talents[max_tier].push({
                                "char": playerId,
                                "charname": player.name,
                                "class": talent_page,
                                "talent": talent[1].name,
                                "talentId": talent[1].skillIndex,
                                "level": current_level,
                                "purpose": ""
                            })
                        }
                    }

                }

            }

        }

        console.log(tiered_talents)


        // display results
        let tabs = $("#tabs-talents-by-tier").tabs();
        tabs.find("div").remove();
        tabs.find("li").remove();
        for (let tier = 0; tier < max_tier + 1; tier++) {
            tiered_talents[tier].sort((a, b) => a.purpose > b.purpose)
            tiered_talents[tier].sort((a, b) => a.charname > b.charname)

            if (tiered_talents[tier].length > 0) {
                // add tier tab
                let tier_name = tier < max_tier ? `Tier ${tier + 1}` + (TALENT_TIERS[tier].name ? " : " : "") + (TALENT_TIERS[tier].name || "") : "No Tier"
                let li = `<li><a href='#tab_tier${tier}'>${tier_name}</a> </li>`

                let content = ""
                content += `<p style="text-align:center;">`
                if (tier < max_tier) {
                    content += `${TALENT_TIERS[tier].purpose}`

                } else {
                    content += `Bad or not yet added to a tier or not needed because maxed on another char`
                }
                content += "</p>"

                // display checkout time
                let checkout_time = tiered_talents[tier].length * this.getTimeTillCheckout(0, 20)
                content += `<p style="text-align:center;">`
                content += `Time to checkout all ${tiered_talents[tier].length} talents in this tier : ${FormatCheckoutTime(checkout_time)}`
                content += "</p>"
                content += `<table class="tiered_talents">`
                content += `<tr>`
                // content += `<th>Icon</th>`
                content += `<th>Talent</th>`
                content += `<th>Character</th>`
                content += `<th>Talent tab</th>`
                content += `<th>Purpose</th>`
                content += `<th>Max Level</th>`
                content += `</tr>`

                for (let upgrade of tiered_talents[tier]) {
                    content += `<tr>`
                    // content += `<td>${(upgrade.talent)}</td>`
                    content += `<td>${FormatWords(upgrade.talent)}</td>`
                    content += `<td>${upgrade.charname} (n°${upgrade.char + 1})</td>`
                    content += `<td>${FormatWords(upgrade.class)}</td>`
                    content += `<td>${upgrade.purpose}</td>`
                    content += `<td>${upgrade.level}/${this.max_book_level}</td>`
                    content += `</tr>`
                }

                content += `</table>`



                tabs.find("#tabs-talents-by-tier-nav").append(li);
                tabs.append(`<div id="tab_tier${tier}">` + content + "</div>");
                tabs.tabs("refresh");
                tabs.tabs("option", "active", 0);
            }

        }


    }

    getTimeTillNextCheckout(current_books) {
        return Math.round(this.lib_checkout_speed * (1 + 0.1 * Math.pow(current_books, 1.4)));
    }

    getTimeTillCheckout(current_books, goal) {
        let time = 0
        for (let books = current_books; books < goal; books++) {
            time += this.getTimeTillNextCheckout(books)
        }
        return time
    }

}



function FormatWords(name) {
    let words = name.split(/[_ ]/)
    let result = ""
    for (let word of words) {
        result += capitalizeFirstLetter(word.toLowerCase()) + " "
    }
    return result.slice(0, -1);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTimeForShinyLevel(goal) {
    return Math.floor((1 + Math.pow(goal, 1.6)) * Math.pow(1.7, goal));
}

function getShinyLevel(time) {
    let lvl = 1;
    while (getTimeForShinyLevel(lvl) < time) {
        lvl += 1;
    }
    return lvl;
}

const LAB_JEWELS = [
    "amethyst_rhinestone",
    "purple_rhombol",
    "purple_navette",
    "sapphire_rhinestone",
    "sapphire_navette",
    "sapphire_pyramite",
    "sapphire_rhombol",
    "pyrite_rhinestone",
    "pyrite_navette",
    "pyrite_rhombol",
    "pyrite_pyramite",
    "emerald_rhinestone",
    "emerald_navette",
    "emerald_rhombol",
    "emerald_pyramite",
    "emerald_ulthurite",
    "black_diamond_ulthurite",
    "black_diamond_rhinestone",
    "pure_opal_rhinestone",
    "pure_opal_navette",
    "pure_opal_rhombol"
]



function FormatCheckoutTime(time_in_seconds) {

    let time = time_in_seconds
    let s = 1
    let m = 60 * s
    let h = 60 * m
    let d = 24 * h
    let y = 365 * d

    let accounted = 0

    let years = Math.floor(time / y);
    accounted += y * years
    let days = Math.floor((time - accounted) / d);
    accounted += d * days
    let hour = Math.floor((time - accounted) / h);
    accounted += h * hour
    let minutes = Math.floor((time - accounted) / m);
    accounted += m * minutes
    let seconds = Math.floor((time - accounted) / s);
    accounted += s * seconds

    let milliseconds = (time * 1000) % 1000

    let hourTxt = hour;
    let minutesTxt = minutes
    let secondsTxt = seconds
    if (hour < 10) {
        hourTxt = `0${hour}`
    }
    if (minutes < 10) {
        minutesTxt = `0${minutes}`
    }
    if (seconds < 10) {
        secondsTxt = `0${seconds}`
    }
    if (years > 10000) {
        return `${years.toExponential()}y${days}d`
    } else if (years > 0) {
        return `${years}y${days}d`
    } else if (days > 10) {
        return `${days}d${hourTxt}h`
    } else if (days > 0) {
        return `${days}d${hourTxt}h${minutesTxt}m`
    } else if (hour > 0) {
        return `${hourTxt}h${minutesTxt}m${secondsTxt}s`
    } else if (minutes > 0) {
        return `${minutesTxt}m${secondsTxt}s`
    } else if (seconds > 0) {
        return `${secondsTxt}s`
    } else {
        return `${milliseconds.toFixed(2)}ms`
    }
}