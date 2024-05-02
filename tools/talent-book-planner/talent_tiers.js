// list if tiers in order
// a tier contains:
//  - name: short name for the tab
//  - purpose: explains the general boosts given by that tier
//  - list: list of talent in that tier
// these talents can contain:
//  - purpose: explains why this is useful
//  - global: boolean indicating global talents (need book on only one char)
//  - class_restrict: if only a certain class is concerned by that tier. This is looked up in all subclasses
const TALENT_TIERS = [
    {
        "purpose": "Global and very useful bonuses",
        "list": {
            "PRINTER_GO_BRRR": { purpose: "prints" },
            "KING_OF_THE_REMEMBERED": { purpose: "prints", global: true },
            "ARCHLORD_OF_THE_PIRATES": { purpose: "DR multi", global: true },
            "EXTRA_BAGS": { purpose: "stamp upgrading" },
            "THE_FAMILY_GUY": { purpose: "Potential talent levels for everyone (only highest lvl ES)", class_restrict: "Elemental_Sorcerer" },
        }

    },
    {
        "name": "DK",
        "purpose": "Maximize DK active farm.",
        "list": {
            "ORB_OF_REMEMBRANCE": { purpose: "Active DK farm" },
            "KNIGHTLY_DISCIPLE": { purpose: "Active DK farm" },
            "SYMBOLS_OF_BEYOND_~R": { purpose: "Active DK farm", class_restrict: "Divine_Knight" },
        }

    },
    {
        "name": "Bubo",
        "purpose": "Maximize Bubo active farm (liquid and money).",
        "list": {
            "CRANIUM_COOKING": { purpose: "Liquid production" },
            "TENTEYECLE": { purpose: "Liquid production" },
            "AUSPICIOUS_AURA": { purpose: "Liquid production" },
            "SYMBOLS_OF_BEYOND_~P": { purpose: "Liquid production", class_restrict: "Bubonic_Conjuror" },
        }

    },
    {
        "name": "ES",
        "purpose": "Maximize ES active farm.",
        "list": {
            "DIMENSIONAL_WORMHOLE": { purpose: "Active rare drop farm. See also all ES damage bonus", class_restrict: "Elemental_Sorcerer" },
            "LIGHTNING_BARRAGE": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "RADIANT_CHAINBOLT": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "METEOR_SHOWER": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "TORNADO": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "METEOR_SHOWER": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "SYMBOLS_OF_BEYOND_~P": { purpose: "Wormhole lvl and damage", class_restrict: "Elemental_Sorcerer" },
        }

    },
    {
        "name": "Vman",
        "purpose": "Maximize vman speedruns.",
        "list": {
            "ONE_STEP_AHEAD": { purpose: "Helps level vman talents" },
            "VOID_TRIAL_RERUN": { purpose: "vman speedrun / sampling" },
            "VOID_RADIUS": { purpose: "vman speedrun / sampling" },
            "BOSSING_VAIN": { purpose: "vman speedrun / sampling" },
        }

    },
    {
        "purpose": "Vman account wide boosts",
        "list": {

            "MASTER_OF_THE_SYSTEM": { purpose: "Multikill per tier", global: true },
            "VOODOO_STATUFICATION": { purpose: "boosts about everything", global: true },
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
            "ENHANCEMENT_ECLIPSE": { purpose: "global efficiency", global: true },
        }

    },

    {
        "name": "construct",
        "purpose": "boost construction as soon as possible",
        "list": {
            "REFINERY_THROTTLE": { purpose: "Construction ticks" },
            "REDOX_RATES": { purpose: "Construction speed" },
            "SHARPER_SAWS": { purpose: "Construction exp" },
            "TEMPESTUOUS_EMOTIONS": { purpose: "Construction exp", class_restrict: "Squire" },
        }

    },
    {
        "name": "Trap",
        "purpose": "Trapping can be useful quickly because no need to resample",
        "list": {
            "EAGLE_EYE": { purpose: "Trapping gains, effective immediately, very good" },
        }

    },



    {
        "name": "Wood",
        "purpose": "Wood samples mostly, not needed until you need to resample",
        "list": {
            "SMART_EFFICIENCY": { purpose: "Wood samples" },
            "LOG_ON_LOGS": { purpose: "Wood samples" },
            "DEFORESTING_ALL_DOUBT": { purpose: "Wood samples" },
            "LEAF_THIEF": { purpose: "Wood samples" },
            "UNT'WIS'TED_ROBES": { purpose: "Wood samples / damage for ES / wisdom for bubo money gains" },
            "ACTIVE_AFK'ER": { purpose: "Wood samples" },
            "ETERNAL_WIS": { purpose: "Wood samples" },
            "UTMOST_INTELLECT": { purpose: "Wood samples" },
            "SKILL_WIZ": { purpose: "Wood samples" },
            "WIS_WUMBO": { purpose: "Wood samples" },
            "STAR_PLAYER": { purpose: "Star talent points, generally useful", class_restrict: "Mage" },
        }

    },
    {
        "name": "Worship",
        "purpose": "Maximize worship gains",
        "list": {
            "SPECIES_EPOCH": { purpose: "Trap/worship gains", global: true },
            "STOP_RIGHT_THERE": { purpose: "worship TD", class_restrict: "Hunter" },
            "KUNG_FU_KICK": { purpose: "worship TD", class_restrict: "Hunter" },
            "NEARBY_OUTLET": { purpose: "worship charge", class_restrict: "Wizard" },
            "CHARGE_SYPHON": { purpose: "worship charge", class_restrict: "Wizard" },
            "BLESS_UP": { purpose: "worship eff", class_restrict: "Wizard" },
            "SOOOULS": { purpose: "worship eff", class_restrict: "Wizard" },
        }

    },
    {
        "name": "Mining",
        "purpose": "Mining samples mostly, not needed until you need to resample",
        "list": {
            "BRUTE_EFFICIENCY": { purpose: "Mining samples" },
            "BIG_PICK": { purpose: "Mining samples" },
            "COPPER_COLLECTOR": { purpose: "Mining samples" },
            "TOOL_PROFICIENCY": { purpose: "Mining samples" },
            "'STR'ESS_TESTED_GARB": { purpose: "STR for mining samples" },
            "HAUNGRY_FOR_GOLD": { purpose: "Mining samples" },
            "IDLE_SKILLING": { purpose: "Mining samples" },
            "OVERBLOWN_TESTOSTERONE": { purpose: "Mining samples" },
            "SKILL_STRENGTHEN": { purpose: "Mining samples" },
            "FIRMLY_GRASP_IT": { purpose: "STR for mining samples" },
            "ABSOLUTE_UNIT": { purpose: "STR for mining samples" },
            "STAR_PLAYER": { purpose: "Star talent points, generally useful", class_restrict: "Warrior" },
        }

    },

    {
        "name": "Chows",
        "purpose": "blood berserker chowing (ignore if you have finished superchows) (comes before cooking because it makes it more efficient)",
        "list": {
            "MONSTER_DECIMATOR": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
            "APOCALYPSE_ZOW": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
            "STRENGTH_IN_NUMBERS": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
            "CARRY_A_BIG_STICK": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
            "NO_PAIN_NO_GAIN": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
            "TOUGH_STEAKS": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
            "IDLE_BRAWLING": { purpose: "Chowing", class_restrict: "Blood_Berserker" },
        }
    },

    {
        "name": "Cooking",
        "purpose": "Cooking (less useful if you have sacred methods bundle)",
        "list": {

            "BLOOD_MARROW": { purpose: "Cooking speed", global: true },
            "APOCALYPSE_CHOW": { purpose: "Cooking" },
            "OVERFLOWING_LADLE": { purpose: "Cooking" },
            "WAITING_TO_COOL": { purpose: "Cooking" },
        }
    },

    {
        "name": "BM",
        "purpose": "Maximize Beast Master active farm for shiny lvls. This only happens if you have truly nothing else to farm.",
        "list": {
            "WHALE_WALLOP": { purpose: "shiny lvl farming" },
            "UWU_RAWRRR": { purpose: "Active DK farm" },
        }

    },

    {
        "purpose": "Good damage boosts",
        "list": {
            "SHARPENED_AXE": { purpose: "damage" },
            "GILDED_SWORD": { purpose: "damage" },
            "WORMHOLE_EMPEROR": { purpose: "damage" },
            "STRENGTH_IN_NUMBERS": { purpose: "damage" },
            "CARRY_A_BIG_STICK": { purpose: "damage" },
            "BELIEVER_STRENGTH": { purpose: "damage" },
        }

    },

    {
        "name": "Bad",
        "purpose": "Waste of time, for true completionnists",
        "list": {
            "TASTE_TEST": { purpose: "" },
            "MOTHERLODE_MINER": { purpose: "" },
            "MOTHERLODE_MINER": { purpose: "" },
            "POWER_STRIKE": { purpose: "" },
            "WHIRL": { purpose: "" },
        }

    },


]

function isTiered(talent_name, class_name) {
    for (let TIER of TALENT_TIERS) {
        for (let talent_in_tier of Object.entries(TIER.list)) {
            if (talent_name == talent_in_tier[0] || TALENT_UNBOOKABLE.includes(talent_name)) {
                let subclasses = getClassList(class_name)
                let restrict = talent_in_tier[1].class_restrict
                if (!restrict || subclasses.includes(restrict)) {
                    return true;
                }
            }
        }
    }
    return false;

}


function displayTiers() {
    let max_tier = TALENT_TIERS.length

    let tabs = $("#tabs-all-tiers").tabs();
    tabs.find("div").remove();
    tabs.find("li").remove();
    for (let tier = 0; tier < max_tier; tier++) {


        // add tier tab
        let tier_name = `Tier ${tier + 1}` + (TALENT_TIERS[tier].name ? " : " : "") + (TALENT_TIERS[tier].name || "")
        let li = `<li><a href='#tab_tier_display${tier}'>${tier_name}</a> </li>`

        let content = ""
        content += `<p style="text-align:center;">`
        if (tier < max_tier) {
            content += `${TALENT_TIERS[tier].purpose}`

        } else {
            content += `Bad or not yet added to a tier or not needed because maxed on another char`
        }
        content += `</p>`
        content += `<table class="tiered_talents">`
        content += `<tr>`
        content += `<th>Talent</th>`
        content += `<th>Purpose</th>`
        content += `<th>Is global?</th>`
        content += `<th>Class</th>`
        content += `</tr>`

        for (let tiered_talent of Object.entries(TALENT_TIERS[tier].list)) {

            let global = tiered_talent[1].global ? "yes" : "no"
            let class_restrict = tiered_talent[1].class_restrict || ""
            content += `<tr>`
            content += `<td>${FormatWords(tiered_talent[0])}</td>`
            content += `<td>${tiered_talent[1].purpose}</td>`
            content += `<td>${global}</td>`
            content += `<td>${FormatWords(class_restrict)}</td>`
            content += `</tr>`
        }

        content += `</table>`



        tabs.find("#tabs-all-tiers-nav").append(li);
        tabs.append(`<div id="tab_tier_display${tier}">` + content + "</div>");
        tabs.tabs("refresh");
        tabs.tabs("option", "heightStyle", "auto");
        tabs.tabs("option", "active", 0);


    }


}