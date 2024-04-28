const TALENT_TIERS = [
    // tier 1
    {
        "purpose": "Mostly boosts to active farming. Choose depending of your current activity.",
        "list": {
            "CRANIUM_COOKING": { purpose: "Liquid production" },
            "TENTEYECLE": { purpose: "Liquid production" },
            "AUSPICIOUS_AURA": { purpose: "Liquid production" },
            "ORB_OF_REMEMBRANCE": { purpose: "Active DK farm", max_count_needed: 1 },
            "PRINTER_GO_BRRR": { purpose: "prints" },
            "KING_OF_THE_REMEMBERED": { purpose: "prints", max_count_needed: 1 },
            "DIMENSIONAL_WORMHOLE": { purpose: "Active rare drop farm. See also all ES damage bonus" },
            "ARCHLORD_OF_THE_PIRATES": { purpose: "DR multi", max_count_needed: 1 },
            "VOID_TRIAL_RERUN": { purpose: "vman speedrun / sampling" },
            "VOID_RADIUS": { purpose: "vman speedrun / sampling" },
            "BOSSING_VAIN": { purpose: "vman speedrun / sampling" },
            "EXTRA_BAGS": { purpose: "stamps" },
        }

    },
    // tier 2
    {
        "purpose": "Vman account wide boosts, supplements to last tier",
        "list": {
            "BLOOD_MARROW": { purpose: "Cooking speed", max_count_needed: 1 },
            "MASTER_OF_THE_SYSTEM": { purpose: "Multikill per tier", max_count_needed: 1 },
            "SPECIES_EPOCH": { purpose: "Trap/worship gains", max_count_needed: 1 },
            "VOODOO_STATUFICATION": { purpose: "boosts about everything", max_count_needed: 1 },
            "ONE_STEP_AHEAD": { purpose: "Helps level vman talents" },
            "SYMBOLS_OF_BEYOND_~P": { purpose: "Everything for mage (wormhole/cranium mostly)" },
            "SYMBOLS_OF_BEYOND_~R": { purpose: "Everything for warriors (DK orb mostly)" },

        }

    },
    // tier 3
    {
        "purpose": "Skilling bonus effective immediately",
        "list": {

            "EAGLE_EYE": { purpose: "Trapping gains" },
            "REDOX_RATES": { purpose: "Construction speed" },
            "SHARPER_SAWS": { purpose: "Construction exp" },
        }

    },
    // tier 4
    {
        "purpose": "Wood samples mostly, not max_count_needed until you need to resample",
        "list": {
            "SMART_EFFICIENCY": { purpose: "Wood samples" },
            "LOG_ON_LOGS": { purpose: "Wood samples" },
            "DEFORESTING_ALL_DOUBT": { purpose: "Wood samples" },
            "CHOPPIN_IT_UP_EZ": { purpose: "Wood samples" },
            "LEAF_THIEF": { purpose: "Wood samples" },
            "UNT'WIS'TED_ROBES": { purpose: "Wood samples / damage for ES / wisdom for bubo money gains" },
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", max_count_needed: 1 },
            "ACTIVE_AFK'ER": { purpose: "Wood samples" },
            "ETERNAL_WIS": { purpose: "Wood samples" },
            "UTMOST_INTELLECT": { purpose: "Wood samples" },
            "SKILL_WIZ": { purpose: "Wood samples" },
            "WIS_WUMBO": { purpose: "Wood samples" },
            "STOP_RIGHT_THERE": { purpose: "Worship minigame" },
        }

    },
    // tier 5
    {
        "purpose": "Mining samples mostly, not max_count_needed until you need to resample",
        "list": {
            "BRUTE_EFFICIENCY": { purpose: "Mining samples" },
            "BIG_PICK": { purpose: "Mining samples" },
            "COPPER_COLLECTOR": { purpose: "Mining samples" },
            "TOOL_PROFICIENCY": { purpose: "Mining samples" },
            "'STR'ESS_TESTED_GARB": { purpose: "Mining samples" },
        }

    },
    // tier 6
    {
        "purpose": "Damage boosts, will be sent to higher tiers later",
        "list": {
            "SHARPENED_AXE": { purpose: "damage" },
            "GILDED_SWORD": { purpose: "damage" },
            "WORMHOLE_EMPEROR": { purpose: "damage" },
        }

    },


]