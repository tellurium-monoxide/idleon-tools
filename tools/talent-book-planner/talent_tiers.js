// list if tiers in order
// a tier contains:
//  - purpose: explains the general boosts given by that tier
//  - list: list of talent in that tier
// these talents can contain:
//  - purpose: explains why this is useful
//  - global: boolean indicating global talents (need book on only one char)
//  - class_restrict: if only a certain class is concerned by that tier. This is looked up in all subclasses
const TALENT_TIERS = [
    {
        "purpose": "Mostly boosts to active farming. Choose depending of your current activity.",
        "list": {
            "CRANIUM_COOKING": { purpose: "Liquid production" },
            "TENTEYECLE": { purpose: "Liquid production" },
            "AUSPICIOUS_AURA": { purpose: "Liquid production" },
            "ORB_OF_REMEMBRANCE": { purpose: "Active DK farm" },
            "PRINTER_GO_BRRR": { purpose: "prints" },
            "KING_OF_THE_REMEMBERED": { purpose: "prints", global: true },
            "DIMENSIONAL_WORMHOLE": { purpose: "Active rare drop farm. See also all ES damage bonus" },
            "ARCHLORD_OF_THE_PIRATES": { purpose: "DR multi", global: true },
            "VOID_TRIAL_RERUN": { purpose: "vman speedrun / sampling" },
            "VOID_RADIUS": { purpose: "vman speedrun / sampling" },
            "BOSSING_VAIN": { purpose: "vman speedrun / sampling" },
            "EXTRA_BAGS": { purpose: "stamps" },
        }

    },

    {
        "purpose": "Vman account wide boosts",
        "list": {
            "BLOOD_MARROW": { purpose: "Cooking speed", global: true },
            "MASTER_OF_THE_SYSTEM": { purpose: "Multikill per tier", global: true },
            "SPECIES_EPOCH": { purpose: "Trap/worship gains", global: true },
            "VOODOO_STATUFICATION": { purpose: "boosts about everything", global: true },
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
        }

    },
    {
        "purpose": "Generally useful buffs",
        "list": {
            "ONE_STEP_AHEAD": { purpose: "Helps level vman talents" },
            "SYMBOLS_OF_BEYOND_~P": { purpose: "Everything for mage (wormhole/cranium mostly)" },
            "SYMBOLS_OF_BEYOND_~R": { purpose: "Everything for warriors (DK orb mostly)", class_restrict: "Divine_Knight" },

        }

    },

    {
        "purpose": "Skilling bonus effective immediately",
        "list": {

            "EAGLE_EYE": { purpose: "Trapping gains" },
            "REDOX_RATES": { purpose: "Construction speed" },
            "SHARPER_SAWS": { purpose: "Construction exp" },
            "TEMPESTUOUS_EMOTIONS": { purpose: "Construction exp", class_restrict: "Squire" },
        }

    },

    {
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
            "STOP_RIGHT_THERE": { purpose: "Worship minigame" },
            "STAR_PLAYER": { purpose: "Star talent points, generally useful", class_restrict: "Mage" },
        }

    },

    {
        "purpose": "Mining samples mostly, not needed until you need to resample",
        "list": {
            "BRUTE_EFFICIENCY": { purpose: "Mining samples" },
            "BIG_PICK": { purpose: "Mining samples" },
            "COPPER_COLLECTOR": { purpose: "Mining samples" },
            "TOOL_PROFICIENCY": { purpose: "Mining samples" },
            "'STR'ESS_TESTED_GARB": { purpose: "Mining samples" },
            "HAUNGRY_FOR_GOLD": { purpose: "Mining samples" },
            "STAR_PLAYER": { purpose: "Star talent points, generally useful", class_restrict: "Warrior" },
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
            "ABSOLUTE_UNIT": { purpose: "damage" },
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
        let tier_name = `Tier ${tier + 1}`
        let li = `<li><a href='#tab_tier_display${tier}'>${tier_name}</a> </li>`

        let content = ""
        if (tier < max_tier) {
            content += `${TALENT_TIERS[tier].purpose}`

        } else {
            content += `Bad or not yet added to a tier or not needed because maxed on another char`
        }
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