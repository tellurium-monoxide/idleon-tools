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
            "PRINTER_GO_BRRR": { purpose: "R1: prints" },
            "KING_OF_THE_REMEMBERED": { purpose: "R1: prints", global: true },
            "ARCHLORD_OF_THE_PIRATES": { purpose: "R1: DR multi", global: true },
            "VOODOO_STATUFICATION": { purpose: "R1: boosts about everything", global: true },
            "EXTRA_BAGS": { purpose: "R2: stamp upgrading" },
            "THE_FAMILY_GUY": { purpose: "R2: Potential talent levels for everyone (only highest lvl ES)", class_restrict: "Elemental_Sorcerer" },
            "ITS_YOUR_BIRTHDAY!": { purpose: "R3: some candies" },
            "RIBBON_WINNING": { purpose: "R4: better ribbons, big boost" },
            "DANK_RANKS": { purpose: "R4: better land rank boosts" },
            "APOCALYPSE_WOW": { purpose: "R4: gold food effect" },
        }

    },
    {
        "name": "DK",
        "purpose": "Maximize DK active farm (crystal drops and money).",
        "list": {
            "ORB_OF_REMEMBRANCE": { purpose: "Active DK farm" },
            "KNIGHTLY_DISCIPLE": { purpose: "Active DK farm" },
            "SYMBOLS_OF_BEYOND_~R": { purpose: "Active DK farm", class_restrict: "Divine_Knight" },
            "SHOCKWAVE_SLASH": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "IMBUED_SHOCKWAVES": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "DAGGERANG": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "MEGA_MONGORANG": { purpose: "Clear mobs faster", class_restrict: "Divine_Knight" },
            "HAUNGRY_FOR_GOLD": { purpose: "DR from golden food", class_restrict: "Divine_Knight" },
            "ENHANCEMENT_ECLIPSE": { purpose: "global efficiency", global: true, goal_lvl: 225 },
        }

    },
    {
        "name": "Bubo",
        "purpose": "Maximize Bubo active farm (liquid and money) (DK in w6 is better for money now). You may also need to take some damage talents for this in early game",
        "list": {
            "CRANIUM_COOKING": { purpose: "R1: Liquid production" },
            "TENTEYECLE": { purpose: "R1: Liquid production" },
            "AUSPICIOUS_AURA": { purpose: "R2: Liquid production" },
            "FLATULENT_SPIRIT": { purpose: "R2: Liquid production" },
            "RAISE_DEAD": { purpose: "Liquid production" },
            "BUSY_BREWIN": { purpose: "R4: brew speed" },
            "BUBBLE_BREAKTHROUGH": { purpose: "R3: alch exp & new bubble chance" },
            "SHARING_SOME_SMARTS": { purpose: "R3: alch exp" },
            "INNER_PEACE": { purpose: "R3: alch exp", class_restrict: "Bubonic_Conjuror" },
            "SYMBOLS_OF_BEYOND_~P": { purpose: "R1: Liquid production", class_restrict: "Bubonic_Conjuror" },
        }
    },
    {
        "name": "DB",
        "purpose": "Maximize Death Bringer active farm (for bones)",
        "list": {
            "GRIMOIRE": { purpose: "R1: Bone gains", class_restrict: "Death_Bringer" },
            "GRAVEYARD_SHIFT": { purpose: "R1: Mob respawn for bone gain and samples", class_restrict: "Death_Bringer" },
            "MARAUDER_STYLE": { purpose: "R1: Accuracy very important", class_restrict: "Death_Bringer" },
            "DETONATION": { purpose: "R1: need lvl 300", class_restrict: "Death_Bringer" },
            "SENTINEL_AXES": { purpose: "R1: better clear", class_restrict: "Death_Bringer" },
            "FIRED_UP": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "COMBUSTION": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "SERRATED_SWIPE": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "EMBER_BEAR": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "BEAR_SWIPE": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "AXE_HURL": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "MOCKING_SHOUT": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "POWER_STRIKE": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "WHIRL": { purpose: "R2: active skills for clear", class_restrict: "Death_Bringer" },
            "WRAITH_FORM": { purpose: "R3: more damage as wraith, but limited talent points", class_restrict: "Death_Bringer" },
            "FAMINE_O'FISH": { purpose: "R3: more damage as wraith, but limited talent points", class_restrict: "Death_Bringer" },
            "BULWARK_STYLE": { purpose: "R4: survival as wraith, maybe needed at later worlds", class_restrict: "Death_Bringer" },
        }
    },
    {
        "name": "ES",
        "purpose": "Maximize ES active farm.",
        "list": {
            "DIMENSIONAL_WORMHOLE": { purpose: "R1: Active rare drop farm. See also all ES damage bonus", class_restrict: "Elemental_Sorcerer" },
            "SYMBOLS_OF_BEYOND_~P": { purpose: "R1: Wormhole lvl and damage", class_restrict: "Elemental_Sorcerer" },
            "LIGHTNING_BARRAGE": { purpose: "R2: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "RADIANT_CHAINBOLT": { purpose: "R2: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "METEOR_SHOWER": { purpose: "R2: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "TORNADO": { purpose: "R2: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "METEOR_SHOWER": { purpose: "R2: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "FLOOR_IS_LAVA": { purpose: "R3: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "SPEEDY_BOOK": { purpose: "R3: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "CHAOTIC_FORCE": { purpose: "R2: Useful for portal kills", class_restrict: "Elemental_Sorcerer" },
            "SHARPENED_AXE": { purpose: "R4: damage", class_restrict: "Elemental_Sorcerer" },
            "GILDED_SWORD": { purpose: "R4: damage", class_restrict: "Elemental_Sorcerer" },
            "FUSCIA_FLASKS": { purpose: "R4: damage", class_restrict: "Elemental_Sorcerer" },
            "YOU'RE_NEXT": { purpose: "R4: damage", class_restrict: "Elemental_Sorcerer" },
            "CHOPPIN_IT_UP_EZ": { purpose: "R5: damage", class_restrict: "Elemental_Sorcerer" },
        }

    },
    {
        "name": "Vman",
        "purpose": "Maximize vman speedruns.",
        "list": {
            "ONE_STEP_AHEAD": { purpose: "R1: Helps level vman talents" },
            "VOID_TRIAL_RERUN": { purpose: "R1: vman speedrun / sampling" },
            "VOID_RADIUS": { purpose: "vman speedrun / sampling" },
            "BOSSING_VAIN": { purpose: "vman speedrun / sampling" },
            "COLLOQUIAL_CONTAINERS": { purpose: "R3: some afk gains for sampling" },
            "LUCKY_HIT": { purpose: "R3: vman damage" },
            "ETERNAL_LUK": { purpose: "R3: vman damage" },
            "F'LUK'EY_FABRICS": { purpose: "R3: vman damage" },
            "SKILLAGE_DAMAGE": { purpose: "R3: vman damage" },
            "BLISS_N_CHIPS": { purpose: "R3: vman damage" },
            "CLEVER_CLOVER_OBOLS": { purpose: "R4: vman damage" },
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
        "name": "Chop",
        "purpose": "Maximize wood samples, not needed until you want to resample",
        "list": {
            "SMART_EFFICIENCY": { purpose: "R1: Wood samples" },
            "LOG_ON_LOGS": { purpose: "R1: Wood samples" },
            "DEFORESTING_ALL_DOUBT": { purpose: "R1: Wood samples" },
            "LEAF_THIEF": { purpose: "R1: Wood samples" },
            "UNT'WIS'TED_ROBES": { purpose: "R1: Wood samples / damage for ES / wisdom for bubo money gains" },
            "ACTIVE_AFK'ER": { purpose: "R3: Wood samples" },
            "STARING_STATUES": { purpose: "R3: Wood samples" },
            "STUPENDOUS_STATUES": { purpose: "R3: Wood samples" },
            "ETERNAL_WIS": { purpose: "R2: Wood samples" },
            "UTMOST_INTELLECT": { purpose: "R2: Wood samples" },
            "SKILL_WIZ": { purpose: "R2: Wood samples" },
            "WIS_WUMBO": { purpose: "R2: Wood samples" },
            "INDIVIDUAL_INSIGHT": { purpose: "R2: WIS for efficiency" },
            "MANA_OVERDRIVE": { purpose: "R5: mana boosts chopping eff" },
            "OCCULT_OBOLS": { purpose: "R6: very little WIS" },
            "INNER_PEACE": { purpose: "R6: chopping exp" },
            "MANA_BOOSTER": { purpose: "R5: mana boosts chopping eff", class_restrict: "Savvy_Basics" },
            "STAR_PLAYER": { purpose: "R4: Star talent points, for efficiency and stats star talents", class_restrict: "Mage" },
            "RIGHT_HAND_OF_ACTION": { purpose: "R1: global efficiency", global: true },
        }
    },
    {
        "name": "Mining",
        "purpose": "Maximize mining samples, not needed until you want to resample",
        "list": {
            "RIGHT_HAND_OF_ACTION": { purpose: "R1: global efficiency", global: true },
            "BRUTE_EFFICIENCY": { purpose: "R1: good mining eff" },
            "SHIELDIEST_STATUES": { purpose: "R1: good mining eff" },
            "BIG_PICK": { purpose: "R1: big boost for mining samples" },
            "COPPER_COLLECTOR": { purpose: "R1: good mining eff" },
            "TOOL_PROFICIENCY": { purpose: "R1: good mining eff" },
            "SKILL_STRENGTHEN": { purpose: "R1: good mining eff" },
            "OVERBLOWN_TESTOSTERONE": { purpose: "R1: STR for mining samples" },
            "ABSOLUTE_UNIT": { purpose: "R1: STR for mining samples" },
            "STR_SUMMORE": { purpose: "R1: STR for mining samples" },
            "'STR'ESS_TESTED_GARB": { purpose: "R1: STR for mining samples" },
            "FIRMLY_GRASP_IT": { purpose: "R1: STR for mining samples" },
            "ETERNAL_STR": { purpose: "R1: STR for mining samples", global: true },
            "HAUNGRY_FOR_GOLD": { purpose: "R2: Mining samples" },
            "IDLE_SKILLING": { purpose: "R2: Mining samples" },
            "HEALTH_BOOSTER": { purpose: "R3: Health boost mining eff", class_restrict: "Warrior" },
            "HEALTH_OVERDRIVE": { purpose: "R3: Health boost mining eff" },
            "FISTFUL_OF_OBOL": { purpose: "R4: little STR for mining samples" },
            "STAR_PLAYER": { purpose: "R4: Star talent points, maybe useful", class_restrict: "Warrior" },
        }
    },
    {
        "name": "Trap",
        "purpose": "Maximize trapping gains. This comes before the other harvesting skills (fishing, catching) because you don't need to resample to make use of it. Ignore this tier if you finished trapping.",
        "list": {
            "EAGLE_EYE": { purpose: "R1: Trapping gains, effective immediately, very good", class_restrict: "Hunter" },
            "INVASIVE_SPECIES": { purpose: "R1: Trapping eff", class_restrict: "Hunter" },
            "ELUSIVE_EFFICIENCY": { purpose: "R1: Trapping eff", class_restrict: "Hunter" },
            "SKILL_AMBIDEXTERITY": { purpose: "R2: Trapping eff", class_restrict: "Hunter" },
            "SANIC_SPEED": { purpose: "R2: AGI for trapping eff", class_restrict: "Hunter" },
            "AGI_AGAIN": { purpose: "R2: AGI for trapping eff", class_restrict: "Hunter" },
            "ADAPTATION_REVELATION": { purpose: "R2: AGI for trapping eff", class_restrict: "Hunter" },
            "SHOEFUL_OF_OBOL": { purpose: "R3: little AGI for trapping eff", class_restrict: "Hunter" },
            "GARB_OF_UN'AGI'NG_QUALITY": { purpose: "R2: AGI for trapping eff", class_restrict: "Hunter" },
            "SHROOM_BAIT": { purpose: "R3: Trapping exp, low priority", class_restrict: "Hunter" },
            "REFLECTIVE_EYESIGHT": { purpose: "R3: Shiny chance, low priority", class_restrict: "Hunter" },
            "RIGHT_HAND_OF_ACTION": { purpose: "R1: global efficiency", global: true },
            "SPECIES_EPOCH": { purpose: "R1: Trap/worship gains", global: true },
        }
    },
    {
        "name": "Worship",
        "purpose": "Maximize worship gains. This comes before the other harvesting skills (fishing, catching) because you don't need to resample to make use of it.",
        "list": {
            "SPECIES_EPOCH": { purpose: "R1: Trap/worship gains", global: true },
            "STOP_RIGHT_THERE": { purpose: "R2: Helps for TD minigame", class_restrict: "Hunter" },
            "KUNG_FU_KICK": { purpose: "R2: Helps for TD minigame", class_restrict: "Hunter" },
            "SYMBOLS_OF_BEYOND_~G": { purpose: "R2: Helps for TD minigame", class_restrict: "Hunter" },
            "NEARBY_OUTLET": { purpose: "R1: more worship charge", class_restrict: "Wizard" },
            "CHARGE_SYPHON": { purpose: "R1: more worship charge", class_restrict: "Wizard" },
            "BLESS_UP": { purpose: "R1: worship eff", class_restrict: "Wizard" },
            "SOOOULS": { purpose: "R1: worship eff", class_restrict: "Wizard" },
        }

    },
    {
        "name": "Fishing",
        "purpose": "Maximize fishing samples, not needed until you want to resample",
        "list": {
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
            "BRUTE_EFFICIENCY": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "SKILL_STRENGTHEN": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "STR_SUMMORE": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "BUILT_DIFFERENT": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "STRONGEST_STATUES": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "FISTFUL_OF_OBOL": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "BOBBIN'_BOBBERS": { purpose: "Fishing eff", class_restrict: "Barbarian" },
            "WORMING_UNDERCOVER": { purpose: "Fishing AFK gains ", class_restrict: "Barbarian" },
            "CATCHING_SOME_ZZZ'S": { purpose: "Fishing AFK gains ", class_restrict: "Barbarian" },
            "ALL_FISH_DIET": { purpose: "Fishing exp, low priority ", class_restrict: "Barbarian" },
            "TEMPESTUOUS_EMOTIONS": { purpose: "Fishing exp, low priority ", class_restrict: "Barbarian" },

        }
    },
    {
        "name": "Catching",
        "purpose": "Maximize catching samples, not needed until you want to resample",
        "list": {
            "RIGHT_HAND_OF_ACTION": { purpose: "global efficiency", global: true },
            "ETERNAL_AGI": { purpose: "R2: AGI for catching eff", global: true },
            "GARB_OF_UN'AGI'NG_QUALITY": { purpose: "Catching eff", class_restrict: "Bowman" },
            "ADAPTATION_REVELATION": { purpose: "Catching eff", class_restrict: "Bowman" },
            "ELUSIVE_EFFICIENCY": { purpose: "Catching eff", class_restrict: "Bowman" },
            "SKILL_AMBIDEXTERITY": { purpose: "Catching eff", class_restrict: "Bowman" },
            "SHWIFTY_STATUES": { purpose: "Catching eff", class_restrict: "Bowman" },
            "TELEKI'NET'IC_LOGS": { purpose: "Catching eff", class_restrict: "Bowman" },
            "BRIAR_PATCH_RUNNER": { purpose: "Catching eff", class_restrict: "Bowman" },
            "AGI_AGAIN": { purpose: "R2: AGI for catching eff", class_restrict: "Bowman" },
            "SANIC_SPEED": { purpose: "R2: AGI for catching eff", class_restrict: "Bowman" },
            "SHOEFUL_OF_OBOL": { purpose: "R4: little AGI for catching eff", class_restrict: "Bowman" },
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
        "name": "Div",
        "purpose": "increase div gains",
        "list": {
            "POLYTHEISM": { purpose: "div points" },
            "SHARED_BELIEFS": { purpose: "Global div exp", global: true },
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
        "name": "Lab",
        "purpose": "Lab progress",
        "list": {
            "PURPLE_TUBE": { purpose: "Lab" },
            "GREEN_TUBE": { purpose: "Lab" },
            "ESSENCE_TRANSFERRAL": { purpose: "Lab" },
            "UPLOAD_SQUARED": { purpose: "Lab" },
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
            "SYMBOLS_OF_BEYOND_~R": { purpose: "Cooking", class_restrict: "Blood_Berserker" },
        }
    },
    {
        "name": "Breeding",
        "purpose": "",
        "list": {
            "ARENA_SPIRIT": { purpose: "R2: arena entry and pet power during fights", global: true },
            "SHINING_BEACON_OF_EGG": { purpose: "R1: breeding exp", global: true },
            "CURVITURE_OF_THE_PAW": { purpose: "R1: pet power", global: true },
            "I_DREAM_OF_PEACE_AND_EGG": { purpose: "R3: Eggs while AFK" },
        }
    },

    {
        "name": "Gaming",
        "purpose": "Gaming boosts",
        "list": {
            "1000_HOURS_PLAYED": { purpose: "Gaming exp", global: true },
            "BITTY_LITTY": { purpose: "Bit gain", global: true },
            "UNDYING_PASSION": { purpose: "Gaming progress on afk" },
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
        "name": "Anvil",
        "purpose": "Increase anvil production from archers",
        "list": {
            "BROKEN_TIME": { purpose: "R1: anvil production speed" },
            "SMELTIN'_ERRYDAY": { purpose: "R3: anvil production on afk kills" },
            "ACME_ANVIL": { purpose: "R1: anvil points" },
            "FOCUSED_SOUL": { purpose: "R2: smithing exp" },
            "SHWIFTY_STATUES": { purpose: "R2: production speed" },
            "YEA_I_ALREADY_KNOW": { purpose: "R2: smithing exp" },
        }

    },

    {
        "name": "DMG",
        "purpose": "Good damage boosts",
        "list": {
            "SHARPENED_AXE": { purpose: "R1: good damage" },
            "GILDED_SWORD": { purpose: "R1: good damage" },
            "BLOCKY_BOTTLES": { purpose: "R1: good damage" },
            "DIVINE_INTERVENTION": { purpose: "R1: crit damage" },
            "WORMHOLE_EMPEROR": { purpose: "R1: Global damage", global: true },
            "GODS_CHOSEN_CHILDREN": { purpose: "R1: Global damage", global: true },
            "WRAITH_OVERLORD": { purpose: "R1: Global damage", global: true },
            "POWER_ORB": { purpose: "R2: Global damage", global: true },
            "STRENGTH_IN_NUMBERS": { purpose: "damage" },
            "WIRED_IN_POWER": { purpose: "damage" },
            "CARRY_A_BIG_STICK": { purpose: "damage" },
            "BELIEVER_STRENGTH": { purpose: "damage" },
            "GAMER_STRENGTH": { purpose: "damage" },
            "CREW_ROWING_STRENGTH": { purpose: "damage" },
            "ANIMALISTIC_FEROCITY": { purpose: "damage" },
            "KNOWLEDGE_IS_POWER": { purpose: "damage" },
            "POWER_OVERWHELMING": { purpose: "damage" },
            "VEINS_OF_THE_INFERNAL": { purpose: "damage" },
            "HIGH_POLYMER_LIMBS": { purpose: "damage" },
            "VIRILE_VIALS": { purpose: "damage" },
            "PRECISION_POWER": { purpose: "damage" },
            "PAPERWORK,_GREAT...": { purpose: "damage" },
            "LOOTY_MC_SHOOTY": { purpose: "damage" },
            "APOCALYPSE_ZOW": { purpose: "damage" },
            "SPEEDNA": { purpose: "damage" },
            "DOUBLE_STRIKE": { purpose: "R3: active damage" },
            "FEROCITY_STRIKE": { purpose: "R3: active damage" },
            "FIRED_UP": { purpose: "R3: active damage" },
            "PLAGUE_STRICKEN": { purpose: "R3: active damage" },
            "QUAD_JAB": { purpose: "R2: active dps" },
            "TRIPLE_JAB": { purpose: "R2: active dps" },
            "TWO_PUNCH_MAN": { purpose: "R2: active dps" },
            "BEEFY_BOTTLES": { purpose: "R2: active damage" },
            "MASTERY_UP": { purpose: "R2: active damage" },
            "KNUCKLEBUSTER": { purpose: "R3: active damage" },
        }
    },
    {
        "name": "Misc",
        "purpose": "various useful bonus that might not be in an earlier tier",
        "list": {
            "LUCKY_CLOVER": { purpose: "some luck" },
            "ETERNAL_LUK": { purpose: "some luck" },
            "LUCKY_CHARMS": { purpose: "some class exp for vman" },
            "EXP_CULTIVATION": { purpose: "some class exp for everyone" },
            "STAR_PLAYER": { purpose: "some star talent points" },
            "SUPERNOVA_PLAYER": { purpose: "some star talent points" },
            "THE_FAMILY_GUY": { purpose: "various bonus depending on class" },
            "YEA_I_ALREADY_KNOW": { purpose: "exp advantage for archers" },
            "GODLY_CREATION": { purpose: "small boost to crafting equips if you bother to change character" },
            "TELEPORT": { purpose: "kinda fun to use" },
        }
    },

    {
        "name": "Bad",
        "purpose": "Waste of time, only for true completionnists",
        "list": {
            "TASTE_TEST": { purpose: "" },
            "MOTHERLODE_MINER": { purpose: "" },
            "FREE_MEAL": { purpose: "" },
            "MINI_FIREBALL": { purpose: "" },
            "ENERGY_BOLT": { purpose: "" },
            "BUCKLERED_UP": { purpose: "" },
            "MANA_BOOSTER": { purpose: "" },
            "MOCKING_SHOUT": { purpose: "" },
            "HEALTH_BOOSTER": { purpose: "" },
            "BACK_TO_BASICS": { purpose: "" },
            "PREVIOUS_POINTS": { purpose: "" },
            "EARLIER_EDUCATION": { purpose: "" },
            "ICE_SHARDS": { purpose: "" },
            "SIZZLING_SKULL": { purpose: "" },
            "TAMPERED_INJECTION": { purpose: "" },
            "JMAN_WAS_BETTER": { purpose: "" },
            "BALANCED_SPIRIT": { purpose: "" },
            "SUPER_SAMPLES": { purpose: "sample rate caps at 90%, easy to reach nowadays" },
        }

    },


]
