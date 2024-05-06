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
        "name": "Globals",
        "purpose": "Global and very useful bonuses",
        "list": {
            "PRINTER_GO_BRRR": { purpose: "prints" },
            "KING_OF_THE_REMEMBERED": { purpose: "prints", global: true },
            "ARCHLORD_OF_THE_PIRATES": { purpose: "DR multi", global: true },
            "EXTRA_BAGS": { purpose: "stamp upgrading" },
            "THE_FAMILY_GUY": { purpose: "Potential talent levels for everyone (only highest lvl ES)", class_restrict: "Elemental_Sorcerer" },
            "VOODOO_STATUFICATION": { purpose: "boosts about everything", global: true },
        }

    },
    {
        "name": "DK",
        "purpose": "Maximize DK active farm.",
        "list": {
            "ORB_OF_REMEMBRANCE": { purpose: "Active DK farm" },
            "KNIGHTLY_DISCIPLE": { purpose: "Active DK farm" },
            "SYMBOLS_OF_BEYOND_~R": { purpose: "Active DK farm", class_restrict: "Divine_Knight" },
            "SHOCKWAVE_SLASH": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "IMBUED_SHOCKWAVES": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "DAGGERANG": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "MEGA_MONGORANG": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "ENHANCEMENT_ECLIPSE": { purpose: "global efficiency", global: true, goal_lvl: 225 },
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
            "FLOOR_IS_LAVA": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "SPEEDY_BOOK": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "CHAOTIC_FORCE": { purpose: "Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
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
        "name": "construct",
        "purpose": "boost construction as soon as possible",
        "list": {
            "REFINERY_THROTTLE": { purpose: "Refinery ticks", class_restrict: "Squire" },
            "REDOX_RATES": { purpose: "Construction speed", class_restrict: "Squire" },
            "SHARPER_SAWS": { purpose: "Construction exp", class_restrict: "Squire" },
            "TEMPESTUOUS_EMOTIONS": { purpose: "Construction exp", class_restrict: "Squire" },
        }

    },
    {
        "name": "Trap",
        "purpose": "Trapping can be useful quickly because no need to resample",
        "list": {
            "EAGLE_EYE": { purpose: "Trapping gains, effective immediately, very good", class_restrict: "Hunter" },
            "INVASIVE_SPECIES": { purpose: "Trapping eff", class_restrict: "Hunter" },
            "SKILL_AMBIDEXTERITY": { purpose: "Trapping eff", class_restrict: "Hunter" },
            "SHROOM_BAIT": { purpose: "Trapping exp, low priority", class_restrict: "Hunter" },
            "REFLECTIVE_EYESIGHT": { purpose: "Shiny chance, low priority", class_restrict: "Hunter" },
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
        }
    },



    {
        "name": "Chop",
        "purpose": "Maximize wood samples, not needed until you want to resample",
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
            "MANA_OVERDRIVE": { purpose: "mana boosts chopping eff" },
            "STAR_PLAYER": { purpose: "Star talent points, generally useful", class_restrict: "Mage" },
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
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
        "purpose": "Maximize mining samples, not needed until you want to resample",
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
            "HEALTH_OVERDRIVE": { purpose: "Health boost mining eff" },
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
        }
    },
    {
        "name": "Fishing",
        "purpose": "Maximize fishing samples, not needed until you want to resample",
        "list": {
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
            "BRUTE_EFFICIENCY": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "SKILL_STRENGTHEN": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "BOBBIN'_BOBBERS": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "WORMING_UNDERCOVER": { purpose: "Fishing AFK gains ", class_restrict: "Barbarian" },
            "CATCHING_SOME_ZZZ'S": { purpose: "Fishing AFK gains ", class_restrict: "Barbarian" },
            "ALL_FISH_DIET": { purpose: "Fishing exp, low priority ", class_restrict: "Barbarian" },

        }
    },
    {
        "name": "Catching",
        "purpose": "Maximize catching samples, not needed until you want to resample",
        "list": {
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
            "ELUSIVE_EFFICIENCY": { purpose: "Catching eff", class_restrict: "Bowman" },
            "SKILL_AMBIDEXTERITY": { purpose: "Catching eff", class_restrict: "Bowman" },
            "TELEKI'NET'IC_LOGS": { purpose: "Catching eff", class_restrict: "Bowman" },
            "BRIAR_PATCH_RUNNER": { purpose: "Catching eff", class_restrict: "Bowman" },
            "SUNSET_ON_THE_HIVES": { purpose: "Catching eff", class_restrict: "Bowman" },
            "BUG_ENTHUSIAST": { purpose: "Catching exp, low priority", class_restrict: "Bowman" },

        }
    },
    {
        "name": "Chows",
        "purpose": "blood berserker chowing (ignore if you have finished superchows) (comes before cooking because it makes it more efficient)",
        "list": {
            "MASTER_OF_THE_SYSTEM": { purpose: "Multikill per tier", global: true },
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
        "name": "KpH",
        "purpose": "Maximize KpH for eclipse skulls and Gmush kills (improve money gains). Improve SB in priority.",
        "list": {
            "MASTER_OF_THE_SYSTEM": { purpose: "Multikill per tier", global: true },
            "IDLE_BRAWLING": { purpose: "Fight AFK" },
            "IDLE_CASTING": { purpose: "Fight AFK" },
            "IDLE_SHOOTING": { purpose: "Fight AFK" },
            "CHARRED_SKULLS": { purpose: "KpK, minor" },
            "MEMORIAL_SKULLS": { purpose: "KpK, minor" },
            "STACKED_SKULLS": { purpose: "KpK, minor" },
            "SPEEDNA": { purpose: "SB damage" },
            "MANA_IS_LIFE": { purpose: "MK per tier" },
        }

    },
    {
        "name": "CCD",
        "purpose": "Maximize vman Crystal countdown to help stay highest lvl + trap/worship gains.",
        "list": {
            "CMON_OUT_CRYSTALS": { purpose: "crystal spawn chance" },
            "CRYSTAL_COUNTDOWN": { purpose: "higher exp cap" },
            "VOID_RADIUS": { purpose: "better mob clearing" },
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
        "name": "SB",
        "purpose": "Maximize plunder kill farming, to get the 1 million achieve (farm this at W5 citringe, when you have nothing else to do)",
        "list": {
            "PIRATE_FLAG": { purpose: "plunder kills" },
            "PLUNDER_YE_DECEASED": { purpose: "plunder kills" },
            "SUPPRESSING_FIRE": { purpose: "plunder kills" },
            "PIERCING_ARROW": { purpose: "plunder kills", class_restrict: "Siege_Breaker" },
            "SYMBOLS_OF_BEYOND_~G": { purpose: "plunder kills", class_restrict: "Siege_Breaker" },
        }

    },

    {
        "name": "BM",
        "purpose": "Maximize Beast Master active farm for shiny lvls. This only happens if you have truly nothing else to farm.",
        "list": {
            "WHALE_WALLOP": { purpose: "shiny lvl farming" },
            "UWU_RAWRRR": { purpose: "Active DK farm" },
            "ENHANCEMENT_ECLIPSE": { purpose: "global efficiency", global: true, goal_lvl: 150 },
        }

    },

    {
        "name": "DMG",
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
            "POWER_STRIKE": { purpose: "" },
            "WHIRL": { purpose: "" },
            "FREE_MEAL": { purpose: "" },
            "MINI_FIREBALL": { purpose: "" },
            "ENERGY_BOLT": { purpose: "" },
        }

    },


]
