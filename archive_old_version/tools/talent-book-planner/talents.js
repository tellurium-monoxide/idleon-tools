const TALENTS = {
    "Beginner": {
        "HEALTH_BOOSTER": {
            "name": "HEALTH_BOOSTER",
            "description": "Increases_Max_HP_by_{",
            "x1": 1, "x2": 0.15, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_HP",
            "skillIndex": 0
        },

        "MANA_BOOSTER": {
            "name": "MANA_BOOSTER",
            "description": "Increases_Max_MP_by_{",
            "x1": 1, "x2": 0.1, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_MP",
            "skillIndex": 1
        },

        "STAR_PLAYER": {
            "name": "STAR_PLAYER",
            "description": "Gives_{_Star_Talent_Points._Star_Talents_are_found_throughout_the_game!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Star_Talent_Point",
            "skillIndex": 8
        },

        "BUCKLERED_UP": {
            "name": "BUCKLERED_UP",
            "description": "Increases_Total_Defense_by_+{%",
            "x1": 40, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Total_DEF",
            "skillIndex": 9
        },

        "SHARPENED_AXE": {
            "name": "SHARPENED_AXE",
            "description": "Increases_Base_Weapon_Power_by_{._This_increases_damage!!",
            "x1": 0.25, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{_Base_Weapon_Power",
            "skillIndex": 5
        },
        "FIST_OF_RAGE": {
            "name": "FIST_OF_RAGE",
            "description": "Increases_your_Base_STR_by_{_(STR_boosts_Max_HP_and_Crit_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_STR",
            "skillIndex": 10
        },
        "QUICKNESS_BOOTS": {
            "name": "QUICKNESS_BOOTS",
            "description": "Increases_your_Base_AGI_by_{_(AGI_boosts_Movement_Speed_and_Crit_Chance)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_AGI",
            "skillIndex": 11
        },
        "BOOK_OF_THE_WISE": {
            "name": "BOOK_OF_THE_WISE",
            "description": "Increases_your_Base_WIS_by_{_(WIS_boosts_Mana_and_Boss_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_WIS",
            "skillIndex": 12
        },
        "LUCKY_CLOVER": {
            "name": "LUCKY_CLOVER",
            "description": "Increases_your_Base_LUK_by_{_(LUK_boosts_drop_rate,_EXP_Gain,_and_other_RNG)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_LUK",
            "skillIndex": 13
        },
        "GILDED_SWORD": {
            "name": "GILDED_SWORD",
            "description": "Boosts_Damage_dealt|to_all_monsters_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 6
        },
        "HAPPY_DUDE": {
            "name": "HAPPY_DUDE",
            "description": "Increases_Exp_Gain_for_all_Skills_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Exp_Gain",
            "skillIndex": 75
        },
        "KNUCKLEBUSTER": {
            "name": "KNUCKLEBUSTER",
            "description": "Increases_Critical_Hit_Damage_by_{%",
            "x1": 30, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Critical_Damage",
            "skillIndex": 76
        },
        "FEATHER_FLIGHT": {
            "name": "FEATHER_FLIGHT",
            "description": "Increases_Movement_Speed_by_{%",
            "x1": 20, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Move_Speed",
            "skillIndex": 77
        },
        "EXTRA_BAGS": {
            "name": "EXTRA_BAGS",
            "description": "Carry_Capacity_for_materials_is_increased_by_{%",
            "x1": 200, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Mat_Carry_Cap",
            "skillIndex": 78
        },
        "SLEEPIN'_ON_THE_JOB": {
            "name": "SLEEPIN'_ON_THE_JOB",
            "description": "AFK_Gains_Rate_for_Fighting_is_increased_by_{%",
            "x1": 21, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_Rate",
            "skillIndex": 79
        }
    },
    "Journeyman": {
        "INDIANA_ATTACK": {
            "name": "INDIANA_ATTACK",
            "description": "Whip_forward,_dealing_{%_dmg_and_pulling_in_up_to_}_monsters.",
            "x1": 50, "x2": 1, "funcX": "bigBase",
            "y1": 3, "y2": 30, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Dmg_&_+}_Mobs",
            "skillIndex": 15, "K": 1.15, "D": 1.35, "s": 1.3, "cooldown": 12, "castTime": 1.4, "manaCost": 5, "inputReq": 0, "AFKrange": 90, "AFKtype": "line",
            "AFKactivity": 0
        },
        "BREAKIN'_THE_BANK": {
            "name": "BREAKIN'_THE_BANK",
            "description": "Multiplies_value_of_all_coins_on_ground_by_{x.",
            "x1": 0.6, "x2": 100, "funcX": "decayMulti",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{x_Multi",
            "skillIndex": 16, "K": 1, "D": 1, "s": 1, "cooldown": 2000, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "SUPERNOVA_PLAYER": {
            "name": "SUPERNOVA_PLAYER",
            "description": "Gives_{_Star_Talent_Points.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Star_Talent_Point",
            "skillIndex": 17
        },
        "TWO_PUNCH_MAN": {
            "name": "TWO_PUNCH_MAN",
            "description": "Regular_punches_do_+{%_more_damage_and_also_hit_a_2nd_time_for_}%_damage",
            "x1": 0.6, "x2": 0, "funcX": "add",
            "y1": 25, "y2": 3, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Dmg_&_+}%_2nd_Dmg",
            "skillIndex": 18
        },
        "GIMME_GIMME": {
            "name": "GIMME_GIMME",
            "description": "Monsters_have_a_{%_chance_to_drop_2x_loot_for_}_Minutes",
            "x1": 80, "x2": 60, "funcX": "decay",
            "y1": 3, "y2": 20, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Chance_&_+}_Minutes",
            "skillIndex": 19, "K": 1, "D": 1, "s": 1, "cooldown": 120, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "LUCKY_HIT": {
            "name": "LUCKY_HIT",
            "description": "LUK's_effect_on_Damage_is_increased_by_{%",
            "x1": 0.4, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Effect",
            "skillIndex": 20
        },
        "F'LUK'EY_FABRICS": {
            "name": "F'LUK'EY_FABRICS",
            "description": "All_Equipment_gives_{%_more_LUK_than_what's_listed",
            "x1": 220, "x2": 250, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_LUK_from_equips",
            "skillIndex": 21
        },
        "CHACHING!": {
            "name": "CHACHING!",
            "description": "Straight_up_cash,_yo._+{%_more_to_be_exact.",
            "x1": 50, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Mo_Money",
            "skillIndex": 22
        },
        "LUCKY_HORSESHOE": {
            "name": "LUCKY_HORSESHOE",
            "description": "+{_base_LUK",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_LUK",
            "skillIndex": 23
        },
        "CURSE_OF_MR_LOOTY_BOOTY": {
            "name": "CURSE_OF_MR_LOOTY_BOOTY",
            "description": "+{%_Drop_rate,_and_-}%_Total_Damage._Cmon,_do_it!_Or_are_u_too_scared?",
            "x1": 70, "x2": 100, "funcX": "decay",
            "y1": 120, "y2": 100, "funcY": "decay",
            "lvlUpText": "+{%_Drop_&_-}%_Dmg",
            "skillIndex": 24
        },
        "ITS_YOUR_BIRTHDAY!": {
            "name": "ITS_YOUR_BIRTHDAY!",
            "description": "Drops_some_random_reward._Has_a_{%_chance_to_have_no_cooldown!",
            "x1": 35, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_chance",
            "skillIndex": 25, "K": 1, "D": 1, "s": 1, "cooldown": 86000, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "CMON_OUT_CRYSTALS": {
            "name": "CMON_OUT_CRYSTALS",
            "description": "+{%_Crystal_Mob_spawn_chance",
            "x1": 300, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Spawn_Chance",
            "skillIndex": 26
        },
        "REROLL_PLS": {
            "name": "REROLL_PLS",
            "description": "{%_Chance_to_get_a_reroll_on_AFK_rewards._Can_trigger_multiple_times!",
            "x1": 36, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 27
        },
        "CARDS_GALORE": {
            "name": "CARDS_GALORE",
            "description": "+{%_Card_Drop_Chance._As_with_all_card_drop_bonuses,_this_affects_AFK_too.",
            "x1": 50, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Card_Drop_Chance",
            "skillIndex": 28
        },
        "RARES_EVERYWHERE!": {
            "name": "RARES_EVERYWHERE!",
            "description": "Items_in_all_Rare_Drop_Tables_are_{%_more_likely_to_drop!",
            "x1": 30, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Rare_Drop_Table_Items",
            "skillIndex": 29
        }
    },
    "Maestro": {
        "COIN_TOSS": {
            "name": "COIN_TOSS",
            "description": "Throws_a_coin_which_deals_{%_Dmg._Damage_also_increases_the_more_money_you_have",
            "x1": 100, "x2": 1, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Dmg",
            "skillIndex": 30, "K": 1.2, "D": 1.3, "s": 1.3, "cooldown": 20, "castTime": 0.45, "manaCost": 5, "inputReq": 1, "AFKrange": 125, "AFKtype": "projectile",
            "AFKactivity": 0
        },
        "SKILLAGE_DAMAGE": {
            "name": "SKILLAGE_DAMAGE",
            "description": "+{%_DMG_for_every_5_levels_of_your_lowest_LV_Skill",
            "x1": 50, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_DMG",
            "skillIndex": 31
        },
        "PRINTER_GO_BRRR": {
            "name": "PRINTER_GO_BRRR",
            "description": "Print_{_Hours_of_printer_samples_instantly._}%_chance_to_have_no_cooldown!",
            "x1": 1, "x2": 40, "funcX": "intervalAdd",
            "y1": 95, "y2": 60, "funcY": "decay",
            "lvlUpText": "{_Hours_&_+}%_No_CD_chance",
            "skillIndex": 32, "K": 1, "D": 1, "s": 1, "cooldown": 82000, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "TRIPLE_JAB": {
            "name": "TRIPLE_JAB",
            "description": "Punches_now_hit_a_3rd_time_for_{%_dmg._The_other_hits_do_+}%_more_Dmg",
            "x1": 20, "x2": 4, "funcX": "intervalAdd",
            "y1": 0.5, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_3rd_Dmg_&_+}_other_Dmg",
            "skillIndex": 33
        },
        "ONE_STEP_AHEAD": {
            "name": "ONE_STEP_AHEAD",
            "description": "Check-Mate!_+{_Points_for_the_Vee_Man!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "Pawn_to_B{",
            "skillIndex": 34
        },
        "LUCKY_CHARMS": {
            "name": "LUCKY_CHARMS",
            "description": "LUK's_effect_on_Class_EXP_Gain_is_increased_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Effect",
            "skillIndex": 35
        },
        "CLEVER_CLOVER_OBOLS": {
            "name": "CLEVER_CLOVER_OBOLS",
            "description": "Obols_give_+{%_more_LUK_than_what's_listed",
            "x1": 60, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_LUK_from_Obols",
            "skillIndex": 36
        },
        "SKILLIEST_STATUE": {
            "name": "SKILLIEST_STATUE",
            "description": "'EhExPee',_'Kapow',_and_'Feasty'_statues_give_{%_higher_bonuses",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 37
        },
        "BLISS_N_CHIPS": {
            "name": "BLISS_N_CHIPS",
            "description": "+{_Max_LV_to_'Happy_Dude',_and_+}_Max_LV_to_Lucky_Horseshoe",
            "x1": 2, "x2": 0, "funcX": "add",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{_Max_LV_&_+}_Max_LV",
            "skillIndex": 38
        },
        "COLLOQUIAL_CONTAINERS": {
            "name": "COLLOQUIAL_CONTAINERS",
            "description": "Each_Lv_of_'Lotto_Skills'_Bubble_raises_max_Lv_of_'Sleepin_On_The_Job'_Talent,_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_for_Sleep_On_Job",
            "skillIndex": 39
        },
        "MAESTRO_TRANSFUSION": {
            "name": "MAESTRO_TRANSFUSION",
            "description": "+{%_Skill_EXP_Gain,_and_-}%_Skill_Efficiency._Affects_all_Skills.",
            "x1": 2.5, "x2": 0, "funcX": "add",
            "y1": 120, "y2": 100, "funcY": "decay",
            "lvlUpText": "+{%_EXP_gain_&_-}%_Efficiency",
            "skillIndex": 40, "K": 1, "D": 1, "s": 1, "cooldown": 120, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "CRYSTAL_COUNTDOWN": {
            "name": "CRYSTAL_COUNTDOWN",
            "description": "Killing_a_Crystal_or_Giant_lowers_REQ_Exp_of_a_random_skill_by_2%._Stacks_up_to_{%.",
            "x1": 99, "x2": 72, "funcX": "decay",
            "y1": 10, "y2": 1, "funcY": "add",
            "lvlUpText": "+{%_max_exp_reduction",
            "skillIndex": 41
        },
        "LEFT_HAND_OF_LEARNING": {
            "name": "LEFT_HAND_OF_LEARNING",
            "description": "+{%_Skill_EXP_Gain_for_your_other_characters,_if_their_Skill_LV_is_lower_than_Maestro's.",
            "x1": 200, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Skill_EXP_to_family",
            "skillIndex": 42
        },
        "RIGHT_HAND_OF_ACTION": {
            "name": "RIGHT_HAND_OF_ACTION",
            "description": "+{%_Skill_Efficiency_for_your_other_characters,_if_their_Skill_LV_is_lower_than_Maestro's.",
            "x1": 150, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Skill_Eff_to_family",
            "skillIndex": 43
        },
        "JMAN_WAS_BETTER": {
            "name": "JMAN_WAS_BETTER",
            "description": "+{_Talent_Points_for_the_'Journeyman'_tab._Maestro_not_worth_the_wait,_eh?",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Journeyman_Point",
            "skillIndex": 44
        }
    },
    "Voidwalker": {
        "VOID_TRIAL_RERUN": {
            "name": "VOID_TRIAL_RERUN",
            "description": "Begin_a_Speedrun,_lasts_for_{s._Gives_}_Void_Talent_Pts_per_portal_unlocked_from_kills.",
            "x1": 150, "x2": 1.5, "funcX": "bigBase",
            "y1": 30, "y2": 0, "funcY": "bigBase",
            "lvlUpText": "+{s_Speedrun_Total_Time",
            "skillIndex": 45, "K": 1, "D": 1, "s": 1, "cooldown": 70010, "castTime": 1, "manaCost": 5, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "VOID_RADIUS": {
            "name": "VOID_RADIUS",
            "description": "Hits_every_mob_within_{px._Also_gives_+}%_Multikill_Per_Tier_for_20_sec_if_speedrunning.",
            "x1": 250, "x2": 2, "funcX": "bigBase",
            "y1": 400, "y2": 5, "funcY": "bigBase",
            "lvlUpText": "+{px_hit_range",
            "skillIndex": 46, "K": 1.15, "D": 1.35, "s": 1.3, "cooldown": 40, "castTime": 1, "manaCost": 5, "inputReq": 0, "AFKrange": 400, "AFKtype": "line",
            "AFKactivity": 0
        },
        "BOSSING_VAIN": {
            "name": "BOSSING_VAIN",
            "description": "Boss_kills_count_as_portals._Also,_each_unique_boss_kill_during_the_speedrun_makes_mobs_respawn_+}%_faster",
            "x1": 100, "x2": 0, "funcX": "add",
            "y1": 80, "y2": 200, "funcY": "decay",
            "lvlUpText": "+}%_Bonus_per_Boss_Kill",
            "skillIndex": 47
        },
        "QUAD_JAB": {
            "name": "QUAD_JAB",
            "description": "Punches_now_hit_a_4th_time_for_{%_dmg._The_other_hits_do_+}%_more_Dmg",
            "x1": 15, "x2": 3, "funcX": "intervalAdd",
            "y1": 0.5, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_4th_Dmg_&_+}_other_Dmg",
            "skillIndex": 48
        },
        "ENHANCEMENT_ECLIPSE": {
            "name": "ENHANCEMENT_ECLIPSE",
            "description": "Enhances_a_new_Talent_for_another_class_every_25_points_invested,_up_to_250.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "New_Enhancement_every_25_Pts",
            "skillIndex": 49
        },
        "POWER_ORB": {
            "name": "POWER_ORB",
            "description": "+{%_DMG_for_all_characters,_for_every_50_Class_LV_they_are_over_200.",
            "x1": 25, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_DMG_per_50_Class_LV",
            "skillIndex": 50
        },
        "ETERNAL_STR": {
            "name": "ETERNAL_STR",
            "description": "+{_base_STR_for_all_characters._Also_+}_max_LV_to_'Fist_of_Rage'",
            "x1": 2, "x2": 0, "funcX": "add",
            "y1": 2, "y2": 0, "funcY": "add",
            "lvlUpText": "+{_base_STR_and_Max_LV",
            "skillIndex": 51
        },
        "ETERNAL_AGI": {
            "name": "ETERNAL_AGI",
            "description": "+{_base_AGI_for_all_characters._Also_+}_max_LV_to_'Quickness_Boots'",
            "x1": 2, "x2": 0, "funcX": "add",
            "y1": 2, "y2": 0, "funcY": "add",
            "lvlUpText": "+{_base_AGI_and_Max_LV",
            "skillIndex": 52
        },
        "ETERNAL_WIS": {
            "name": "ETERNAL_WIS",
            "description": "+{_base_WIS_for_all_characters._Also_+}_max_LV_to_'Book_of_the_Wise'",
            "x1": 2, "x2": 0, "funcX": "add",
            "y1": 2, "y2": 0, "funcY": "add",
            "lvlUpText": "+{_base_WIS_and_Max_LV",
            "skillIndex": 53
        },
        "ETERNAL_LUK": {
            "name": "ETERNAL_LUK",
            "description": "+{_base_LUK_for_all_characters._Also_+}_max_LV_to_'Lucky_Horseshoe'",
            "x1": 2, "x2": 0, "funcX": "add",
            "y1": 2, "y2": 0, "funcY": "add",
            "lvlUpText": "+{_base_LUK_and_Max_LV",
            "skillIndex": 54
        },
        "EXP_CULTIVATION": {
            "name": "EXP_CULTIVATION",
            "description": "+{%_Class_EXP_for_all_characters.",
            "x1": 400, "x2": 250, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Class_EXP",
            "skillIndex": 55
        },
        "VOODOO_STATUFICATION": {
            "name": "VOODOO_STATUFICATION",
            "description": "All_statues_give_{%_higher_Bonuses_to_all_characters",
            "x1": 200, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 56
        },
        "SPECIES_EPOCH": {
            "name": "SPECIES_EPOCH",
            "description": "+{%_Critters_and_Souls_per_combined_Trapping_and_Worship_LV_above_100",
            "x1": 10, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Critters_and_Souls",
            "skillIndex": 57
        },
        "MASTER_OF_THE_SYSTEM": {
            "name": "MASTER_OF_THE_SYSTEM",
            "description": "+{%_Multikill_per_tier_per_5_maps_of_Speedrun_highscore._Applies_to_all_characters.",
            "x1": 20, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Multikill_per_Tier",
            "skillIndex": 58
        },
        "BLOOD_MARROW": {
            "name": "BLOOD_MARROW",
            "description": "+{%_Multiplicative_Meal_Cooking_Spd_per_total_LV_of_all_Meals_upgraded_on_the_Dinner_Table_Menu",
            "x1": 2.1, "x2": 220, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Meal_Spd_per_Upg_LV",
            "skillIndex": 59
        }
    },
    "Rage_Basics": {
        "HEALTH_BOOSTER": {
            "name": "HEALTH_BOOSTER",
            "description": "Increases_Max_HP_by_{",
            "x1": 1, "x2": 0.15, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_HP",
            "skillIndex": 0
        },
        "MANA_BOOSTER": {
            "name": "MANA_BOOSTER",
            "description": "Increases_Max_MP_by_{",
            "x1": 1, "x2": 0.1, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_MP",
            "skillIndex": 1
        },
        "STAR_PLAYER": {
            "name": "STAR_PLAYER",
            "description": "Gives_{_Star_Talent_Points._Star_Talents_are_found_throughout_the_game!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Star_Talent_Point",
            "skillIndex": 8
        },
        "BUCKLERED_UP": {
            "name": "BUCKLERED_UP",
            "description": "Increases_Total_Defense_by_+{%",
            "x1": 40, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Total_DEF",
            "skillIndex": 9
        },
        "SHARPENED_AXE": {
            "name": "SHARPENED_AXE",
            "description": "Increases_Base_Weapon_Power_by_{._This_increases_damage!!",
            "x1": 0.25, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{_Base_Weapon_Power",
            "skillIndex": 5
        },
        "FIST_OF_RAGE": {
            "name": "FIST_OF_RAGE",
            "description": "Increases_your_Base_STR_by_{_(STR_boosts_Max_HP_and_Crit_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_STR",
            "skillIndex": 10
        },
        "QUICKNESS_BOOTS": {
            "name": "QUICKNESS_BOOTS",
            "description": "Increases_your_Base_AGI_by_{_(AGI_boosts_Movement_Speed_and_Crit_Chance)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_AGI",
            "skillIndex": 11
        },
        "BOOK_OF_THE_WISE": {
            "name": "BOOK_OF_THE_WISE",
            "description": "Increases_your_Base_WIS_by_{_(WIS_boosts_Mana_and_Boss_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_WIS",
            "skillIndex": 12
        },
        "LUCKY_CLOVER": {
            "name": "LUCKY_CLOVER",
            "description": "Increases_your_Base_LUK_by_{_(LUK_boosts_drop_rate,_EXP_Gain,_and_other_RNG)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_LUK",
            "skillIndex": 13
        },
        "GILDED_SWORD": {
            "name": "GILDED_SWORD",
            "description": "Boosts_Damage_dealt|to_all_monsters_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 6
        },
        "BRUTE_EFFICIENCY": {
            "name": "BRUTE_EFFICIENCY",
            "description": "Increases_the_total_efficiency_of_all_specialized_skills_by_{%",
            "x1": 1, "x2": 0.02, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Efficiency",
            "skillIndex": 85
        },
        "MEAT_SHANK": {
            "name": "MEAT_SHANK",
            "description": "Damage_dealt_is_increased_by_{%_for_every_power_of_10_Max_HP_you_have",
            "x1": 100, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 86
        },
        "CRITIKILL": {
            "name": "CRITIKILL",
            "description": "Increases_Critical_Hit_Damage_by_{%",
            "x1": 52, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Critical_Damage",
            "skillIndex": 87
        },
        "IDLE_BRAWLING": {
            "name": "IDLE_BRAWLING",
            "description": "AFK_Gains_Rate_for_Fighting_is_increased_by_{%",
            "x1": 20, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_Rate",
            "skillIndex": 88
        },
        "IDLE_SKILLING": {
            "name": "IDLE_SKILLING",
            "description": "AFK_Gains_Rate_for_all_Specialized_Skills_is_increased_by_{%",
            "x1": 20, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_Rate",
            "skillIndex": 89
        }
    },
    "Warrior": {
        "POWER_STRIKE": {
            "name": "POWER_STRIKE",
            "description": "Slash_forward_dealing_{%|damage_to_up_to|2_monsters",
            "x1": 130, "x2": 3, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 90, "K": 1.1, "D": 1.17, "s": 1.1, "cooldown": 4, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 80, "AFKtype": "line",
            "AFKactivity": 0
        },
        "WHIRL": {
            "name": "WHIRL",
            "description": "Swing_your_weapon_around_you|dealing_{%_damage_to_up_to|}_monsters",
            "x1": 60, "x2": 1.5, "funcX": "bigBase",
            "y1": 3, "y2": 24, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Damage_&_+}_Mobs_Hit",
            "skillIndex": 91, "K": 1.1, "D": 1.18, "s": 1.2, "cooldown": 6, "castTime": 0.45, "manaCost": 9, "inputReq": 0, "AFKrange": 45, "AFKtype": "line",
            "AFKactivity": 0
        },
        "HEALTH_OVERDRIVE": {
            "name": "HEALTH_OVERDRIVE",
            "description": "Increase_max_HP_by_{%",
            "x1": 0.5, "x2": 0.02, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_HP",
            "skillIndex": 92
        },
        "DOUBLE_STRIKE": {
            "name": "DOUBLE_STRIKE",
            "description": "Basic_Attacks_with_Warrior_Weapons_have_a_{%_chance_to_hit_twice",
            "x1": 110, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "{%_Double_Hit_Chance",
            "skillIndex": 93
        },
        "FIRMLY_GRASP_IT": {
            "name": "FIRMLY_GRASP_IT",
            "description": "Temporarily_boosts_base_STR_by_{_for_}_minutes",
            "x1": 15, "x2": 1, "funcX": "bigBase",
            "y1": 2, "y2": 4, "funcY": "intervalAdd",
            "lvlUpText": "+{_STR_&_+}_Mins",
            "skillIndex": 94, "K": 1, "D": 1, "s": 1, "cooldown": 30, "castTime": 1.5, "manaCost": 5, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -1
        },
        "STRENGTH_IN_NUMBERS": {
            "name": "STRENGTH_IN_NUMBERS",
            "description": "STR's_effect_on_both_Damage_and_HP_is_increased_by_{%",
            "x1": 0.75, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Effect",
            "skillIndex": 95
        },
        "'STR'ESS_TESTED_GARB": {
            "name": "'STR'ESS_TESTED_GARB",
            "description": "All_Equipment_gives_{%_more_STR_than_what's_listed",
            "x1": 1.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_STR_from_equips",
            "skillIndex": 96
        },
        "CARRY_A_BIG_STICK": {
            "name": "CARRY_A_BIG_STICK",
            "description": "The_effect_Weapon_Power_has_on_Damage_Dealt_is_increased_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Weapon_Power_Effect",
            "skillIndex": 97
        },
        "ABSOLUTE_UNIT": {
            "name": "ABSOLUTE_UNIT",
            "description": "+{_base_STR",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_STR",
            "skillIndex": 98
        },
        "HAUNGRY_FOR_GOLD": {
            "name": "HAUNGRY_FOR_GOLD",
            "description": "Golden_Food_bonuses_are_increased_by_{%",
            "x1": 55, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 99
        },
        "BIG_PICK": {
            "name": "BIG_PICK",
            "description": "Swings_forward_and_mines_the_rock_with_+{%_bonus_Mining_Efficiency",
            "x1": 150, "x2": 15, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Efficiency",
            "skillIndex": 100, "K": 1.05, "D": 1.4, "s": 1, "cooldown": 12, "castTime": 1.5, "manaCost": 10, "inputReq": 0, "AFKrange": 0, "AFKtype": "buff",
            "AFKactivity": 1
        },
        "COPPER_COLLECTOR": {
            "name": "COPPER_COLLECTOR",
            "description": "Mining_Efficiency_is_increased_by_+{%_for_every_power_of_10_Copper_Ore_in_Storage_Chest.",
            "x1": 20, "x2": 70, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_efficiency",
            "skillIndex": 101
        },
        "MOTHERLODE_MINER": {
            "name": "MOTHERLODE_MINER",
            "description": "+{%_base_multi-ore_drop_chance._This_can_trigger_up_to_4_times_in_a_row_per_swing.",
            "x1": 20, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Multi-Ore_Base_Chance",
            "skillIndex": 102
        },
        "TOOL_PROFICIENCY": {
            "name": "TOOL_PROFICIENCY",
            "description": "Pickaxes_give_+{%_more_Mining_Power_than_whats_listed_for_every_10_Mining_Lv_you_have",
            "x1": 16, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_POW_per_10_Mining_Lv",
            "skillIndex": 103
        },
        "TEMPESTUOUS_EMOTIONS": {
            "name": "TEMPESTUOUS_EMOTIONS",
            "description": "Increases_Exp_Gain_for_all_Specialized_Skills_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Exp_Gain",
            "skillIndex": 104
        }
    },
    "Barbarian": {
        "BEAR_SWIPE": {
            "name": "BEAR_SWIPE",
            "description": "A_big_ol'_bear_claw_swipes_up_to_5_monsters_in_front_of_you,_dealing_}%_damage",
            "x1": 3, "x2": 30, "funcX": "intervalAdd",
            "y1": 108, "y2": 2, "funcY": "bigBase",
            "lvlUpText": "+}%_dmg",
            "skillIndex": 105, "K": 1.1, "D": 1.25, "s": 1.2, "cooldown": 12, "castTime": 0.8, "manaCost": 15, "inputReq": 0, "AFKrange": 125, "AFKtype": "line",
            "AFKactivity": 0
        },
        "AXE_HURL": {
            "name": "AXE_HURL",
            "description": "Throws_axe_in_a_downward_arc,_which_deals_{%_dmg_to_up_to_}_monsters.",
            "x1": 200, "x2": 3, "funcX": "bigBase",
            "y1": 2, "y2": 50, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_mobs",
            "skillIndex": 106, "K": 1, "D": 1.25, "s": 1.1, "cooldown": 17, "castTime": 0.8, "manaCost": 15, "inputReq": 0, "AFKrange": 200, "AFKtype": "line",
            "AFKactivity": 0
        },
        "MOCKING_SHOUT": {
            "name": "MOCKING_SHOUT",
            "description": "Every_0.5_sec,_monsters_move_toward_you_and_heal_for_{%_HP._Lasts_for_}_seconds",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": 20, "y2": 0.2, "funcY": "bigBase",
            "lvlUpText": "+1%_heal,_+}_sec",
            "skillIndex": 107, "K": 1, "D": 1, "s": 1.1, "cooldown": 600, "castTime": 1.5, "manaCost": 15, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "NO_PAIN_NO_GAIN": {
            "name": "NO_PAIN_NO_GAIN",
            "description": "Reduces_max_HP_by_{%,_increases_damage_by_}%._Also,_you_take_double_damage.",
            "x1": 100, "x2": 30, "funcX": "decay",
            "y1": 100, "y2": 50, "funcY": "decay",
            "lvlUpText": "-{%_HP_&_+}%_damage",
            "skillIndex": 108, "K": 1, "D": 1, "s": 1, "cooldown": 30, "castTime": 1.5, "manaCost": 20, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "MONSTER_DECIMATOR": {
            "name": "MONSTER_DECIMATOR",
            "description": "There_is_a_{%_chance_for_a_monster_kill_to_be_counted_for_double.",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_double_count_chance",
            "skillIndex": 109
        },
        "APOCALYPSE_ZOW": {
            "name": "APOCALYPSE_ZOW",
            "description": "+{%_Dmg_for_every_monster_you_kill_over_100,000_times._Counts_}_monster_types",
            "x1": 2, "x2": 33, "funcX": "intervalAdd",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_Dmg_&_+1_mob_type",
            "skillIndex": 110
        },
        "FISTFUL_OF_OBOL": {
            "name": "FISTFUL_OF_OBOL",
            "description": "Obols_give_+{%_more_STR_than_what's_listed",
            "x1": 60, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_STR_from_Obols",
            "skillIndex": 111
        },
        "STRONGEST_STATUES": {
            "name": "STRONGEST_STATUES",
            "description": "'Power',_'Mining',_and_'Oceanman'_statues_give_{%_higher_bonuses",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 112
        },
        "STR_SUMMORE": {
            "name": "STR_SUMMORE",
            "description": "+{_Max_Talent_Level_for_'Fist_of_Rage'",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_Lv",
            "skillIndex": 81
        },
        "BEEFY_BOTTLES": {
            "name": "BEEFY_BOTTLES",
            "description": "Each_Lv_of_'Warriors_Rule'_Bubble_raises_max_Lv_of_'CritiKill'_Talent,_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_for_Critikill_Talent",
            "skillIndex": 114
        },
        "WORMING_UNDERCOVER": {
            "name": "WORMING_UNDERCOVER",
            "description": "{%_chance to wake_the_sleeper_agent_worm_within_the_fish,_letting_you_instantly_catch",
            "x1": 9.3, "x2": 0.7, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1%_Chance",
            "skillIndex": 115, "K": 1, "D": 1.4, "s": 1, "cooldown": 15, "castTime": 1.5, "manaCost": 15, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": 4
        },
        "BOBBIN'_BOBBERS": {
            "name": "BOBBIN'_BOBBERS",
            "description": "+{%_Minigame_reward,_and_+1_Fishing_Power_per_pt_of_your_Highscore,_up_to_+}",
            "x1": 12, "x2": 3, "funcX": "bigBase",
            "y1": 5, "y2": 3, "funcY": "intervalAdd",
            "lvlUpText": "+{%_reward_&_+}_Cap",
            "skillIndex": 116
        },
        "ALL_FISH_DIET": {
            "name": "ALL_FISH_DIET",
            "description": "+{%_Fishing_EXP,_since_like,_fish_is_brain_food_and_so_it_makes_sense_that..._eh_forget_it.",
            "x1": 1.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1.5%_Fishing_EXP",
            "skillIndex": 117
        },
        "CATCHING_SOME_ZZZ'S": {
            "name": "CATCHING_SOME_ZZZ'S",
            "description": "+{%_Away_Gains_for_Fishing_only._Just_fishing._It_totally_doesn't_boost_anything_else!",
            "x1": 20, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Fishing_Away_Gains",
            "skillIndex": 118
        },
        "BACK_TO_BASICS": {
            "name": "BACK_TO_BASICS",
            "description": "+{_Talent_Points_for_the_'Warrior'_talent_tab,_and_+10_dmg_to_these_Talents'_feelings!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Talent_Pt",
            "skillIndex": 119
        }
    },
    "Squire": {
        "SHOCKWAVE_SLASH": {
            "name": "SHOCKWAVE_SLASH",
            "description": "Slash_forward,_causing_a_shockwave_which_deals_{%_dmg_to_up_to_}_enemies",
            "x1": 175, "x2": 2, "funcX": "bigBase",
            "y1": 3, "y2": 30, "funcY": "intervalAdd",
            "lvlUpText": "+{%_DMG_&_+}_Mobs_hit",
            "skillIndex": 120, "K": 1.2, "D": 1.4, "s": 1, "cooldown": 14, "castTime": 1.8, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "line",
            "AFKactivity": 0
        },
        "DAGGERANG": {
            "name": "DAGGERANG",
            "description": "Throw_a_dagger_which_comes_right_back_to_you,_dealing_{%_Dmg_to_up_to_}_mobs",
            "x1": 200, "x2": 1.5, "funcX": "bigBase",
            "y1": 4, "y2": 30, "funcY": "intervalAdd",
            "lvlUpText": "+{%_DMG_&_+}_Mobs_hit",
            "skillIndex": 121, "K": 1, "D": 1.4, "s": 1, "cooldown": 16, "castTime": 0.8, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "line",
            "AFKactivity": 0
        },
        "BRICKY_SKIN": {
            "name": "BRICKY_SKIN",
            "description": "Block_{%_of_all_damage._Also,_passively_gives_+}_base_DEF_at_all_times,_even_when_not_in_use!",
            "x1": 20, "x2": 0.4, "funcX": "bigBase",
            "y1": 1, "y2": 3, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Block,_+}_Base_DEF",
            "skillIndex": 122, "K": 1, "D": 1, "s": 1, "cooldown": 30, "castTime": 1, "manaCost": 20, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "MASTERY_UP": {
            "name": "MASTERY_UP",
            "description": "+{%_Mastery._This_affects_how_big_your_minimum_damage_is_compared_to_max_damage!",
            "x1": 18, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Mastery",
            "skillIndex": 123
        },
        "BALANCED_SPIRIT": {
            "name": "BALANCED_SPIRIT",
            "description": "Boosts_Accuracy_and_DEF_by_+{%,_but_lowers_damage_by_-}%",
            "x1": 25, "x2": 50, "funcX": "decay",
            "y1": 39, "y2": 40, "funcY": "decay",
            "lvlUpText": "+{%_Acc/DEF,_-}%_Dmg",
            "skillIndex": 124, "K": 1, "D": 1, "s": 1, "cooldown": 30, "castTime": 1, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "PRECISION_POWER": {
            "name": "PRECISION_POWER",
            "description": "+{%_Dmg_per_Refinery_Rank_if_accuracy_is_1.5x_higher_than_needed_for_100%_hit_chance",
            "x1": 11, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Dmg_if_ACC_big",
            "skillIndex": 125
        },
        "FISTFUL_OF_OBOL": {
            "name": "FISTFUL_OF_OBOL",
            "description": "Obols_give_+{%_more_STR_than_what's_listed",
            "x1": 60, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_STR_from_Obols",
            "skillIndex": 111
        },
        "SHIELDIEST_STATUES": {
            "name": "SHIELDIEST_STATUES",
            "description": "'Power',_'Mining',_and_'Defence'_statues_give_{%_higher_bonuses",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 127
        },
        "STR_SUMMORE": {
            "name": "STR_SUMMORE",
            "description": "+{_Max_Talent_Level_for_'Fist_of_Rage'",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_Lv",
            "skillIndex": 81
        },
        "BLOCKY_BOTTLES": {
            "name": "BLOCKY_BOTTLES",
            "description": "Each_Lv_of_'Warriors_Rule'_Bubble_raises_max_Lv_of_'Meat_Shank'_Talent,_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_for_Meat_Shank",
            "skillIndex": 129
        },
        "REFINERY_THROTTLE": {
            "name": "REFINERY_THROTTLE",
            "description": "Automatically_trigger_{_Refinery_Cycles._Still_costs_materials,_though.",
            "x1": 3, "x2": 8, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Cycle_Every_8_Lvs",
            "skillIndex": 130, "K": 1, "D": 1, "s": 1, "cooldown": 72000, "castTime": 0.95, "manaCost": 10, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "REDOX_RATES": {
            "name": "REDOX_RATES",
            "description": "+{%_Build_Speed_per_power_of_10_Redox_Salts_in_your_Storage_Chest",
            "x1": 40, "x2": 70, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Build_Spd",
            "skillIndex": 131
        },
        "SHARPER_SAWS": {
            "name": "SHARPER_SAWS",
            "description": "+{%_Construction_EXP_gain._More_like_Cogstruction_am_I_right_fellas?",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Construction_EXP",
            "skillIndex": 132
        },
        "SUPER_SAMPLES": {
            "name": "SUPER_SAMPLES",
            "description": "+{%_Sample_Size_when_taking_Samples_for_the_3d_printer.",
            "x1": 9, "x2": 75, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Sample_Size",
            "skillIndex": 133
        },
        "BACK_TO_BASICS": {
            "name": "BACK_TO_BASICS",
            "description": "+{_Talent_Points_for_the_'Warrior'_talent_tab,_and_+10_dmg_to_these_Talents'_feelings!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Talent_Pt",
            "skillIndex": 119
        }
    },
    "Blood_Berserker": {
        "FIRED_UP": {
            "name": "FIRED_UP",
            "description": "Inflame_yourself,_boosting_attack_spd._Basic_attacks_refresh_time_you_are_inflamed.",
            "x1": 5, "x2": 25, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{s_Inflame_Timer",
            "skillIndex": 135, "K": 1, "D": 1.4, "s": 1, "cooldown": 60, "castTime": 1.5, "manaCost": 15, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "COMBUSTION": {
            "name": "COMBUSTION",
            "description": "If_inflamed,_releases_your_fire_and_deals_{%_dmg_to_up_to_}_mobs_near_you",
            "x1": 300, "x2": 1.5, "funcX": "bigBase",
            "y1": 13, "y2": 20, "funcY": "intervalAdd",
            "lvlUpText": "+{%_DMG_&_+}_Mobs_hit",
            "skillIndex": 136, "K": 1.1, "D": 1.25, "s": 1.2, "cooldown": 20, "castTime": 0.8, "manaCost": 20, "inputReq": 0, "AFKrange": 125, "AFKtype": "line",
            "AFKactivity": 0
        },
        "SERRATED_SWIPE": {
            "name": "SERRATED_SWIPE",
            "description": "Slashes_repeatedly_if_you're_inflamed,_dealing_{%_dmg_to_a_max_of_}_mobs",
            "x1": 40, "x2": 0.4, "funcX": "bigBase",
            "y1": 2, "y2": 50, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_Mob",
            "skillIndex": 137, "K": 1.1, "D": 1.25, "s": 1.2, "cooldown": 15, "castTime": 0.8, "manaCost": 15, "inputReq": 0, "AFKrange": 125, "AFKtype": "line",
            "AFKactivity": 0
        },
        "EMBER_BEAR": {
            "name": "EMBER_BEAR",
            "description": "Ignites_the_bear_claw,_boosting_max_mobs_hit_to_10_and_multihit_by_{%",
            "x1": 250, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Claw_Multihit_chance",
            "skillIndex": 138
        },
        "FEROCITY_STRIKE": {
            "name": "FEROCITY_STRIKE",
            "description": "Basic_Attacks_with_Warrior_Weapons_have_a_{%_chance_to_hit_again",
            "x1": 100, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "{%_Chance",
            "skillIndex": 139
        },
        "TOUGH_STEAKS": {
            "name": "TOUGH_STEAKS",
            "description": "+{_Weapon_Power_for_every_10_Cooking_Lvs_of_this_character.",
            "x1": 10, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Wep_Power_per_10_Lv",
            "skillIndex": 140
        },
        "CHARRED_SKULLS": {
            "name": "CHARRED_SKULLS",
            "description": "+{%_Kill_per_Kill_per_1000_STR._Each_kill_is_worth_more_kills!",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Kill_Per_Kill_Per_1000",
            "skillIndex": 141
        },
        "SKILL_STRENGTHEN": {
            "name": "SKILL_STRENGTHEN",
            "description": "STR_has_a_{%_larger_impact_on_Skill_Efficiency._Also,_+}_STR.",
            "x1": 60, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{%_impact_&_}_STR",
            "skillIndex": 142
        },
        "OVERBLOWN_TESTOSTERONE": {
            "name": "OVERBLOWN_TESTOSTERONE",
            "description": "+{%_STR,_and_+}_Max_Talent_Lv_for_'Fist_of_Rage'",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_STR_&_+}_Max_LV",
            "skillIndex": 143
        },
        "THE_FAMILY_GUY": {
            "name": "THE_FAMILY_GUY",
            "description": "+{%_larger_Family_Bonuses_than_what_is_displayed_from_bonuses_given_by_this_player",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 144
        },
        "TASTE_TEST": {
            "name": "TASTE_TEST",
            "description": "Finishes_all_recipes,_but_the_kitchens_keep_{%_of_the_fire.",
            "x1": 100, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_of_the_Fire_Kept",
            "skillIndex": 145, "K": 1.1, "D": 1.25, "s": 1.2, "cooldown": 200000, "castTime": 0.8, "manaCost": 15, "inputReq": 0, "AFKrange": 125, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "APOCALYPSE_CHOW": {
            "name": "APOCALYPSE_CHOW",
            "description": "+{%_Cooking_EXP_and_Eff_for_every_mob_you_kill_over_1m_times_up_to_}_mobs",
            "x1": 20, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_Bonus_&_+}_Mob",
            "skillIndex": 146
        },
        "WAITING_TO_COOL": {
            "name": "WAITING_TO_COOL",
            "description": "+{%_Cooking_AFK_Gains_rate._Gotta_wait_for_things_to_cool_by_the_window_sill!",
            "x1": 20, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_rate",
            "skillIndex": 147
        },
        "OVERFLOWING_LADLE": {
            "name": "OVERFLOWING_LADLE",
            "description": "Ladles_used_on_this_character_give_+{%_more_AFK_time_than_normal",
            "x1": 100, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Better_Ladles",
            "skillIndex": 148
        },
        "SYMBOLS_OF_BEYOND_~R": {
            "name": "SYMBOLS_OF_BEYOND_~R",
            "description": "+{_Lv_for_all_talents_higher_than_Lv_1._This_bonus_goes_up_every_20_lvs",
            "x1": 1, "x2": 20, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_all_LVs_every_20_LVs",
            "skillIndex": 149
        }
    },
    "Divine_Knight": {
        "KNIGHTLY_DISCIPLE": {
            "name": "KNIGHTLY_DISCIPLE",
            "description": "Spawn_a_knight_disciple_who_generates_shockwaves_for_{_sec.",
            "x1": 10, "x2": 0.15, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+0.15_sec_duration",
            "skillIndex": 165, "K": 1.2, "D": 1.4, "s": 1.2, "cooldown": 40, "castTime": 1, "manaCost": 15, "inputReq": 0, "AFKrange": 230, "AFKtype": "line",
            "AFKactivity": 0
        },
        "MEGA_MONGORANG": {
            "name": "MEGA_MONGORANG",
            "description": "Your_daggerang_is_now_+{%_larger_in_size,_and_hits_up_to_}_more_mobs.",
            "x1": 100, "x2": 2, "funcX": "bigBase",
            "y1": 2, "y2": 25, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Size_&_+}_Mobs",
            "skillIndex": 166
        },
        "DIVINE_INTERVENTION": {
            "name": "DIVINE_INTERVENTION",
            "description": "While_active_if_all_mobs_on_screen_are_dead,_instantly_revive_all._Also_+{%_crit_dmg",
            "x1": 200, "x2": 300, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_crit_dmg",
            "skillIndex": 167, "K": 1.2, "D": 1.2, "s": 1, "cooldown": 40, "castTime": 0.5, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "ORB_OF_REMEMBRANCE": {
            "name": "ORB_OF_REMEMBRANCE",
            "description": "+1%_active_EXP_and_Drop_Rate_per_mob_kill_shown_above_Orb._Orb_lasts_for_{_sec",
            "x1": 30, "x2": 0.4, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+0.4_sec_Duration",
            "skillIndex": 168, "K": 1, "D": 1, "s": 1, "cooldown": 150, "castTime": 0.5, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "IMBUED_SHOCKWAVES": {
            "name": "IMBUED_SHOCKWAVES",
            "description": "Every_basic_attack_with_a_spear_has_a_{%_chance_of_sending_out_a_shockwave.",
            "x1": 100, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_shockwave_chance",
            "skillIndex": 169
        },
        "GAMER_STRENGTH": {
            "name": "GAMER_STRENGTH",
            "description": "+{_Weapon_Power_for_every_10_Gaming_Lvs_of_this_character.",
            "x1": 7, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Wep_Power_per_10_Lv",
            "skillIndex": 170
        },
        "CHARRED_SKULLS": {
            "name": "CHARRED_SKULLS",
            "description": "+{%_Kill_per_Kill_per_1000_STR._Each_kill_is_worth_more_kills!",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Kill_Per_Kill_Per_1000",
            "skillIndex": 141
        },
        "SKILL_STRENGTHEN": {
            "name": "SKILL_STRENGTHEN",
            "description": "STR_has_a_{%_larger_impact_on_Skill_Efficiency._Also,_+}_STR.",
            "x1": 60, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{%_impact_&_}_STR",
            "skillIndex": 142
        },
        "OVERBLOWN_TESTOSTERONE": {
            "name": "OVERBLOWN_TESTOSTERONE",
            "description": "+{%_STR,_and_+}_Max_Talent_Lv_for_'Fist_of_Rage'",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_STR_&_+}_Max_LV",
            "skillIndex": 143
        },
        "THE_FAMILY_GUY": {
            "name": "THE_FAMILY_GUY",
            "description": "+{%_larger_Family_Bonuses_than_what_is_displayed_from_bonuses_given_by_this_player",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 144
        },
        "UNDYING_PASSION": {
            "name": "UNDYING_PASSION",
            "description": "+{%_Chance_to_get_Gaming_AFK_progress_when_claiming_AFK_gains,_but_not_from_candy.",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_chance",
            "skillIndex": 175
        },
        "1000_HOURS_PLAYED": {
            "name": "1000_HOURS_PLAYED",
            "description": "+{%_Gaming_EXP_gain_for_all_characters!",
            "x1": 60, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Gaming_EXP",
            "skillIndex": 176
        },
        "BITTY_LITTY": {
            "name": "BITTY_LITTY",
            "description": "+{%_Bits_gained_per_Gaming_LV,_no_matter_which_character_you're_on!",
            "x1": 20, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_bits_per_gaming_lv",
            "skillIndex": 177
        },
        "KING_OF_THE_REMEMBERED": {
            "name": "KING_OF_THE_REMEMBERED",
            "description": "+{%_printer_output_for_every_POW_10_kills_ever_done_with_the_rememberance_orb.",
            "x1": 5, "x2": 150, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_printer_output",
            "skillIndex": 178
        },
        "SYMBOLS_OF_BEYOND_~R": {
            "name": "SYMBOLS_OF_BEYOND_~R",
            "description": "+{_Lv_for_all_talents_higher_than_Lv_1._This_bonus_goes_up_every_20_lvs",
            "x1": 1, "x2": 20, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_all_LVs_every_20_LVs",
            "skillIndex": 149
        }
    },
    "Calm_Basics": {
        "HEALTH_BOOSTER": {
            "name": "HEALTH_BOOSTER",
            "description": "Increases_Max_HP_by_{",
            "x1": 1, "x2": 0.15, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_HP",
            "skillIndex": 0
        },
        "MANA_BOOSTER": {
            "name": "MANA_BOOSTER",
            "description": "Increases_Max_MP_by_{",
            "x1": 1, "x2": 0.1, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_MP",
            "skillIndex": 1
        },
        "STAR_PLAYER": {
            "name": "STAR_PLAYER",
            "description": "Gives_{_Star_Talent_Points._Star_Talents_are_found_throughout_the_game!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Star_Talent_Point",
            "skillIndex": 8
        },
        "BUCKLERED_UP": {
            "name": "BUCKLERED_UP",
            "description": "Increases_Total_Defense_by_+{%",
            "x1": 40, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Total_DEF",
            "skillIndex": 9
        },
        "SHARPENED_AXE": {
            "name": "SHARPENED_AXE",
            "description": "Increases_Base_Weapon_Power_by_{._This_increases_damage!!",
            "x1": 0.25, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{_Base_Weapon_Power",
            "skillIndex": 5
        },
        "FIST_OF_RAGE": {
            "name": "FIST_OF_RAGE",
            "description": "Increases_your_Base_STR_by_{_(STR_boosts_Max_HP_and_Crit_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_STR",
            "skillIndex": 10
        },
        "QUICKNESS_BOOTS": {
            "name": "QUICKNESS_BOOTS",
            "description": "Increases_your_Base_AGI_by_{_(AGI_boosts_Movement_Speed_and_Crit_Chance)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_AGI",
            "skillIndex": 11
        },
        "BOOK_OF_THE_WISE": {
            "name": "BOOK_OF_THE_WISE",
            "description": "Increases_your_Base_WIS_by_{_(WIS_boosts_Mana_and_Boss_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_WIS",
            "skillIndex": 12
        },
        "LUCKY_CLOVER": {
            "name": "LUCKY_CLOVER",
            "description": "Increases_your_Base_LUK_by_{_(LUK_boosts_drop_rate,_EXP_Gain,_and_other_RNG)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_LUK",
            "skillIndex": 13
        },
        "GILDED_SWORD": {
            "name": "GILDED_SWORD",
            "description": "Boosts_Damage_dealt|to_all_monsters_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 6
        },
        "ELUSIVE_EFFICIENCY": {
            "name": "ELUSIVE_EFFICIENCY",
            "description": "Increases_the_total_efficiency_of_all_specialized_skills_by_{%",
            "x1": 1, "x2": 0.02, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Efficiency",
            "skillIndex": 263
        },
        "FEATHERWEIGHT": {
            "name": "FEATHERWEIGHT",
            "description": "Increases_Movement_Speed_by_{%_so_you_can_outrun_those_slowpoke_Warriors_and_Mages",
            "x1": 25, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Move_Speed",
            "skillIndex": 266
        },
        "I_SEE_YOU": {
            "name": "I_SEE_YOU",
            "description": "Increases_Critical_Hit_Chance_by_{%",
            "x1": 27, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Crit_Chance",
            "skillIndex": 267
        },
        "IDLE_SHOOTING": {
            "name": "IDLE_SHOOTING",
            "description": "AFK_Gains_Rate_for_Fighting_is_increased_by_{%",
            "x1": 20, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_Rate",
            "skillIndex": 268
        },
        "BROKEN_TIME": {
            "name": "BROKEN_TIME",
            "description": "Production_Speed_in_all_Town_Skills_is_increased_by_{%",
            "x1": 100, "x2": 75, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Production_Speed",
            "skillIndex": 269
        }
    },
    "Archer": {
        "PIERCING_ARROW": {
            "name": "PIERCING_ARROW",
            "description": "Shoots_an_arrow_that_deals_{%_damage_to_up_to_}_monsters",
            "x1": 110, "x2": 2, "funcX": "bigBase",
            "y1": 2, "y2": 40, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Damage_&_+}_Mobs_Hit",
            "skillIndex": 270, "K": 1.15, "D": 1.19, "s": 1.15, "cooldown": 15, "castTime": 0.45, "manaCost": 8, "inputReq": 0, "AFKrange": 300, "AFKtype": "line",
            "AFKactivity": 0
        },
        "KUNG_FU_KICK": {
            "name": "KUNG_FU_KICK",
            "description": "Pushes_back_nearby_monsters_by_{_pixels_while_dealing_}%_damage",
            "x1": 25, "x2": 1, "funcX": "bigBase",
            "y1": 60, "y2": 2, "funcY": "bigBase",
            "lvlUpText": "+{_pixels_&_+}%_DMG",
            "skillIndex": 271, "K": 1, "D": 1.15, "s": 1, "cooldown": 7, "castTime": 0.45, "manaCost": 4, "inputReq": 0, "AFKrange": 80, "AFKtype": "line",
            "AFKactivity": 0
        },
        "HEMA_OVERDRIVE": {
            "name": "HEMA_OVERDRIVE",
            "description": "Increase_max_HP_and_max_MP_by_{%",
            "x1": 0.4, "x2": 0.01, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_HP_and_MP",
            "skillIndex": 272
        },
        "STRAFE": {
            "name": "STRAFE",
            "description": "Temporarily_boosts_Movement_Speed_by_{%_for_}_minutes",
            "x1": 5, "x2": 0.3, "funcX": "bigBase",
            "y1": 2, "y2": 15, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Speed_&_+}_Mins",
            "skillIndex": 273, "K": 1, "D": 1, "s": 1.2, "cooldown": 30, "castTime": 0.45, "manaCost": 5, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -1
        },
        "HAVE_ANOTHER!": {
            "name": "HAVE_ANOTHER!",
            "description": "Basic_Attacks_have_a_{%_chance_to_fire_1_additional_arrow",
            "x1": 120, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 274
        },
        "VEINS_OF_THE_INFERNAL": {
            "name": "VEINS_OF_THE_INFERNAL",
            "description": "Increases_Damage_Dealt_by_{%_every_10_Smithing_Levels",
            "x1": 50, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 284
        },
        "GARB_OF_UN'AGI'NG_QUALITY": {
            "name": "GARB_OF_UN'AGI'NG_QUALITY",
            "description": "All_Equipment_gives_{%_more_AGI_than_what's_listed",
            "x1": 1.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_AGI_from_equips",
            "skillIndex": 276
        },
        "HIGH_POLYMER_LIMBS": {
            "name": "HIGH_POLYMER_LIMBS",
            "description": "The_effect_Weapon_Power_has_on_Damage_Dealt_is_increased_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Weapon_Power_Effect",
            "skillIndex": 277
        },
        "SANIC_SPEED": {
            "name": "SANIC_SPEED",
            "description": "+{_base_AGI",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_AGI",
            "skillIndex": 278
        },
        "ROBBINGHOOD": {
            "name": "ROBBINGHOOD",
            "description": "Monster_drop_rarity_increased_by_{%",
            "x1": 40, "x2": 65, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_rarity",
            "skillIndex": 279
        },
        "SMELTIN'_ERRYDAY": {
            "name": "SMELTIN'_ERRYDAY",
            "description": "Every_kill_has_a_{%_chance_to_give_}_seconds_of_instant_forge_progress",
            "x1": 50, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 60, "funcY": "intervalAdd",
            "lvlUpText": "+{%_for_}_forge_secs",
            "skillIndex": 280
        },
        "ACME_ANVIL": {
            "name": "ACME_ANVIL",
            "description": "Get_1_Anvil_Production_Point,_and_also_gain_+{_extra_pts_every_10_Smithing_Lvs",
            "x1": 1, "x2": 15, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_extra_pts",
            "skillIndex": 281
        },
        "YEA_I_ALREADY_KNOW": {
            "name": "YEA_I_ALREADY_KNOW",
            "description": "Start_with_{%_exp_per_250_AGI_when_you_lv_up_any_Specialized_Skill._Caps_at_}%.",
            "x1": 5, "x2": 90, "funcX": "decay",
            "y1": 5, "y2": 10, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Exp,_and_+}%_Cap",
            "skillIndex": 282
        },
        "GODLY_CREATION": {
            "name": "GODLY_CREATION",
            "description": "{%_chance_to_apply_a_special_bonus_to_any_equip_crafted_at_the_anvil._",
            "x1": 50, "x2": 75, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 283
        },
        "FOCUSED_SOUL": {
            "name": "FOCUSED_SOUL",
            "description": "EXP_Gain_for_all_Specialized_Skills_is_increased_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_EXP_gain_in_Spec_Skills",
            "skillIndex": 265
        }
    },
    "Bowman": {
        "HOMING_ARROWS": {
            "name": "HOMING_ARROWS",
            "description": "Fires_{_arrows_into_the_air,_which_seek_out_nearby_monsters_and_deal_}%_damage",
            "x1": 2, "x2": 15, "funcX": "intervalAdd",
            "y1": 27, "y2": 3, "funcY": "bigBase",
            "lvlUpText": "+{_arrow_&_+}%_damage",
            "skillIndex": 285, "K": 1, "D": 1.25, "s": 1.1, "cooldown": 20, "castTime": 0.45, "manaCost": 18, "inputReq": 0, "AFKrange": 300, "AFKtype": "circle",
            "AFKactivity": 0
        },
        "MAGIC_SHORTBOW": {
            "name": "MAGIC_SHORTBOW",
            "description": "Magic_shortbows_fire_at_your_target,_and_up_to_{_nearby_monsters,_for_}%_damage",
            "x1": 2, "x2": 20, "funcX": "intervalAdd",
            "y1": 47, "y2": 3, "funcY": "bigBase",
            "lvlUpText": "+{_monsters_&_+}%_dmg",
            "skillIndex": 286, "K": 1.1, "D": 1.2, "s": 1.05, "cooldown": 7, "castTime": 0.45, "manaCost": 13, "inputReq": 0, "AFKrange": 100, "AFKtype": "target",
            "AFKactivity": 0
        },
        "FLAX_INSTASTRING": {
            "name": "FLAX_INSTASTRING",
            "description": "Basic_attacks_have_a_{%_chance_to_spawn_a_Magic_Shortbow.",
            "x1": 40, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_trigger_chance",
            "skillIndex": 287
        },
        "EXTENDO_RANGEO": {
            "name": "EXTENDO_RANGEO",
            "description": "Attack_range_is_increased_by_+{_Pixels,_and_+}%_accuracy,_for_a_few_minutes",
            "x1": 19.5, "x2": 0.5, "funcX": "bigBase",
            "y1": 40, "y2": 60, "funcY": "decay",
            "lvlUpText": "+{px_Range_&_+}_mins",
            "skillIndex": 288, "K": 1, "D": 1, "s": 1, "cooldown": 30, "castTime": 0.45, "manaCost": 8, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "WOAH,_THAT_WAS_FAST!": {
            "name": "WOAH,_THAT_WAS_FAST!",
            "description": "All_attack_talent_cooldowns_are_{%_lower._No,_not_regular_attacks_lol",
            "x1": 30, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_lower_cooldowns",
            "skillIndex": 289
        },
        "SPEEDNA": {
            "name": "SPEEDNA",
            "description": "+{%_Damage_for_every_15%_movement_spd_you_have_above_100%",
            "x1": 60, "x2": 77, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_damage",
            "skillIndex": 290
        },
        "SHOEFUL_OF_OBOL": {
            "name": "SHOEFUL_OF_OBOL",
            "description": "Obols_give_+{%_more_AGI_than_what_is_listed",
            "x1": 135, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_AGI",
            "skillIndex": 291
        },
        "SHWIFTY_STATUES": {
            "name": "SHWIFTY_STATUES",
            "description": "'Speed',_'Anvil',_and_'Ol_Reliable'_statues_give_+{%_more_bonus",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 292
        },
        "AGI_AGAIN": {
            "name": "AGI_AGAIN",
            "description": "+{_Max_Talent_Level_for_'Quickness_Boots'",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_Lv",
            "skillIndex": 293
        },
        "VELOCITY_VESSELS": {
            "name": "VELOCITY_VESSELS",
            "description": "Each_Lv_of_'Archer_or_Bust'_Bubble_raises_max_Lv_of_'Featherweight',_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_cap",
            "skillIndex": 294
        },
        "TELEKI'NET'IC_LOGS": {
            "name": "TELEKI'NET'IC_LOGS",
            "description": "+{%_Catching_Efficiency_for_every_power_of_10_Oak_Logs_in_the_storage_chest",
            "x1": 20, "x2": 70, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Efficiency",
            "skillIndex": 295
        },
        "BRIAR_PATCH_RUNNER": {
            "name": "BRIAR_PATCH_RUNNER",
            "description": "AGI_has_a_+{%_larger_effect_on_Catching_Efficiency_than_normal",
            "x1": 0.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_effect",
            "skillIndex": 296
        },
        "BUG_ENTHUSIAST": {
            "name": "BUG_ENTHUSIAST",
            "description": "+{%_Catching_EXP._You're_one_step_closer_to_figuring_out_how_butter_can_fly!",
            "x1": 1.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Catching_EXP",
            "skillIndex": 297
        },
        "SUNSET_ON_THE_HIVES": {
            "name": "SUNSET_ON_THE_HIVES",
            "description": "+{%_Away_Gain_for_Catching_Hint:Useful_for_when_you_idle_on_catching!",
            "x1": 20, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Away_Gains",
            "skillIndex": 298
        },
        "PREVIOUS_POINTS": {
            "name": "PREVIOUS_POINTS",
            "description": "+{_Talent_Points_for_the_'Archer'_talent_tab._But,what's_wrong_with_these_talents?",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Talent_Pt",
            "skillIndex": 299
        }
    },
    "Hunter": {
        "360_NOSCOPE": {
            "name": "360_NOSCOPE",
            "description": "Deal_{%_DMG_split_between_all_hit_monsters._The_more_mobs_hit,_the_less_dmg_done",
            "x1": 225, "x2": 3, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_damage",
            "skillIndex": 300, "K": 1.2, "D": 1.3, "s": 1, "cooldown": 30, "castTime": 1.1, "manaCost": 25, "inputReq": 2, "AFKrange": 200, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "BEAR_TRAP": {
            "name": "BEAR_TRAP",
            "description": "Lay_down_{_bear_traps_that_deal_}%_dmg_when_a_monster_triggers_it",
            "x1": 2, "x2": 30, "funcX": "intervalAdd",
            "y1": 150, "y2": 2, "funcY": "bigBase",
            "lvlUpText": "+{_Traps_&_+}%_Dmg",
            "skillIndex": 301, "K": 1.2, "D": 1.15, "s": 1, "cooldown": 9, "castTime": 1.5, "manaCost": 20, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "UWU_RAWRRR": {
            "name": "UWU_RAWRRR",
            "description": "When_mobs_die,_their_respawn_time_is_{_seconds_faster!",
            "x1": 55, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_seconds_faster",
            "skillIndex": 302, "K": 1, "D": 1, "s": 1.1, "cooldown": 120, "castTime": 1.5, "manaCost": 30, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "STOP_RIGHT_THERE": {
            "name": "STOP_RIGHT_THERE",
            "description": "Immobilizes_monsters_within_a_{_pixel_radius_of_you_for_}_seconds.",
            "x1": 150, "x2": 1.5, "funcX": "bigBase",
            "y1": 4, "y2": 20, "funcY": "intervalAdd",
            "lvlUpText": "+{_pixels_&_+}_sec",
            "skillIndex": 303, "K": 1, "D": 1, "s": 1.1, "cooldown": 60, "castTime": 1.5, "manaCost": 40, "inputReq": 0, "AFKrange": 150, "AFKtype": "line",
            "AFKactivity": 0
        },
        "HAVE_ANOTHER..._AGAIN!": {
            "name": "HAVE_ANOTHER..._AGAIN!",
            "description": "Basic_Attacks_have_a_{%_chance_to_fire_1_more_arrow._Stacks_with_'Have_Another!'",
            "x1": 120, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 304
        },
        "LOOTY_MC_SHOOTY": {
            "name": "LOOTY_MC_SHOOTY",
            "description": "+{%_Damage_for_every_50_items_you've_ever_found_on_any_of_your_players.",
            "x1": 36, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_damage",
            "skillIndex": 305
        },
        "SHOEFUL_OF_OBOL": {
            "name": "SHOEFUL_OF_OBOL",
            "description": "Obols_give_+{%_more_AGI_than_what_is_listed",
            "x1": 135, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_AGI",
            "skillIndex": 291
        },
        "STRAIGHTSHOT_STATUES": {
            "name": "STRAIGHTSHOT_STATUES",
            "description": "'Speed',_'Anvil',_and_'Bullseye'_statues_give_+{%_more_bonus",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 307
        },
        "AGI_AGAIN": {
            "name": "AGI_AGAIN",
            "description": "+{_Max_Talent_Level_for_'Quickness_Boots'",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_Lv",
            "skillIndex": 293
        },
        "VISIBILITY_VESSELS": {
            "name": "VISIBILITY_VESSELS",
            "description": "Each_Lv_of_'Archer_or_Bust'_Bubble_raises_max_Lv_of_'I_See_You',_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_for_ICU",
            "skillIndex": 309
        },
        "EAGLE_EYE": {
            "name": "EAGLE_EYE",
            "description": "Collect_&_set_all_traps,_but_only_get_{%_critters._}%_Exp_is_given_to_each_player.",
            "x1": 50, "x2": 0.25, "funcX": "bigBase",
            "y1": 40, "y2": 0.2, "funcY": "bigBase",
            "lvlUpText": "+{%_Critters_&_+}%_XP",
            "skillIndex": 310, "K": 1, "D": 1, "s": 1, "cooldown": 6, "castTime": 0.95, "manaCost": 2, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "INVASIVE_SPECIES": {
            "name": "INVASIVE_SPECIES",
            "description": "+{%_Trapping_Efficiency_per_power_of_10_Froge_Critters_in_Storage",
            "x1": 30, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Trap_Efficiency",
            "skillIndex": 311
        },
        "SHROOM_BAIT": {
            "name": "SHROOM_BAIT",
            "description": "+{%_Trapping_Exp_Gain._Doesn't_affect_EXP_given_to_other_players_when_in_Eagle_Eye.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Trapping_EXP",
            "skillIndex": 312
        },
        "REFLECTIVE_EYESIGHT": {
            "name": "REFLECTIVE_EYESIGHT",
            "description": "{x_Shiny_Critter_chance._Triggers_again_every_10_Trapping_LVs",
            "x1": 2, "x2": 100, "funcX": "decayMulti",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{x_Shiny_Chance",
            "skillIndex": 313
        },
        "PREVIOUS_POINTS": {
            "name": "PREVIOUS_POINTS",
            "description": "+{_Talent_Points_for_the_'Archer'_talent_tab._But,what's_wrong_with_these_talents?",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Talent_Pt",
            "skillIndex": 299
        }
    },
    "Siege_Breaker": {
        "CANNONBALL": {
            "name": "CANNONBALL",
            "description": "Fire_a_large_cannonball_forward,_dealing_{%_damage._It_also_explodes_for_100%_dmg",
            "x1": 600, "x2": 6, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 360, "K": 1, "D": 1.5, "s": 1, "cooldown": 4, "castTime": 0.45, "manaCost": 22, "inputReq": 0, "AFKrange": 350, "AFKtype": "line",
            "AFKactivity": 0
        },
        "SUPPRESSING_FIRE": {
            "name": "SUPPRESSING_FIRE",
            "description": "Fire_off_a_spread_of_}_mini_cannonballs_that_deal_{%_Damage_each.",
            "x1": 20, "x2": 1, "funcX": "bigBase",
            "y1": 4, "y2": 33, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_balls_fired",
            "skillIndex": 316, "K": 1.3, "D": 1.2, "s": 1.1, "cooldown": 6, "castTime": 0.45, "manaCost": 22, "inputReq": 0, "AFKrange": 400, "AFKtype": "line",
            "AFKactivity": 0
        },
        "FIREBOMB": {
            "name": "FIREBOMB",
            "description": "Recklessly_throw_bombs_around_you,_which_explode_and_hit_up_to_}_mobs_for_{%_dmg",
            "x1": 200, "x2": 2, "funcX": "bigBase",
            "y1": 5, "y2": 50, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_mobs_hit",
            "skillIndex": 317, "K": 1, "D": 1.4, "s": 1, "cooldown": 38, "castTime": 1.1, "manaCost": 16, "inputReq": 0, "AFKrange": 0, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "PIRATE_FLAG": {
            "name": "PIRATE_FLAG",
            "description": "Kills_can_spawn_Plunderous_mobs,_with_x{_HP_and_+}%_EXP_and_Drop_reward",
            "x1": 10, "x2": 5, "funcX": "intervalAdd",
            "y1": 800, "y2": 20, "funcY": "bigBase",
            "lvlUpText": "+{%_active_EXP_and_Drop_Rate",
            "skillIndex": 318, "K": 1, "D": 1, "s": 1, "cooldown": 490, "castTime": 0.5, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "PLUNDER_YE_DECEASED": {
            "name": "PLUNDER_YE_DECEASED",
            "description": "Kill_Plunderous_mob_to_enable_Coin_drops_for_{_sec,_which_respawn_mobs_and_auto_loot",
            "x1": 20, "x2": 7, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_sec_every_8_lvs",
            "skillIndex": 319
        },
        "CREW_ROWING_STRENGTH": {
            "name": "CREW_ROWING_STRENGTH",
            "description": "+{_Weapon_Power_for_every_10_Sailing_Lvs_of_this_character.",
            "x1": 7, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Wep_Power_per_10_Lv",
            "skillIndex": 320
        },
        "STACKED_SKULLS": {
            "name": "STACKED_SKULLS",
            "description": "+{%_Kill_per_Kill_per_1000_AGI._Each_kill_is_worth_more_kills!",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Kill_Per_Kill_Per_1000",
            "skillIndex": 366
        },
        "SKILL_AMBIDEXTERITY": {
            "name": "SKILL_AMBIDEXTERITY",
            "description": "AGI_has_a_{%_larger_impact_on_Skill_Efficiency._Also,_+}_AGI.",
            "x1": 60, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{%_impact_&_}_AGI",
            "skillIndex": 367
        },
        "ADAPTATION_REVELATION": {
            "name": "ADAPTATION_REVELATION",
            "description": "+{%_AGI,_and_+}_Max_Talent_Lv_for_'Quickness_Boots'",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_AGI_&_+}_Max_LV",
            "skillIndex": 368
        },
        "THE_FAMILY_GUY": {
            "name": "THE_FAMILY_GUY",
            "description": "+{%_larger_Family_Bonuses_than_what_is_displayed_from_bonuses_given_by_this_player",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 144
        },
        "UNENDING_LOOT_SEARCH": {
            "name": "UNENDING_LOOT_SEARCH",
            "description": "When_Loot_Pile_is_almost_full,_ships_can_upgrade_previous_chests_instead_of_filling_Pile.",
            "x1": 85, "x2": 150, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_chest_loot_(passive)",
            "skillIndex": 325
        },
        "EXPERTLY_SAILED": {
            "name": "EXPERTLY_SAILED",
            "description": "+{%_Sailing_EXP_gain_for_all_characters!",
            "x1": 60, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Sailing_EXP",
            "skillIndex": 326
        },
        "CAPTAIN_PEPTALK": {
            "name": "CAPTAIN_PEPTALK",
            "description": "All_captains_gain_+{%_more_exp_from_their_awesome_sailing_adventures!",
            "x1": 80, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Captain_EXP",
            "skillIndex": 327
        },
        "ARCHLORD_OF_THE_PIRATES": {
            "name": "ARCHLORD_OF_THE_PIRATES",
            "description": "+{%_EXP_and_Drop_Rate_per_POW_10_kills_of_Plunderous_Mobs._Applies_to_all_characters!",
            "x1": 6, "x2": 150, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_EXP_and_Drop_Rate",
            "skillIndex": 328
        },
        "SYMBOLS_OF_BEYOND_~G": {
            "name": "SYMBOLS_OF_BEYOND_~G",
            "description": "+{_Lv_for_all_talents_higher_than_Lv_1._This_bonus_goes_up_every_20_lvs",
            "x1": 1, "x2": 20, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_all_LVs_every_20_LVs",
            "skillIndex": 374
        }
    },
    "Beast_Master": {
        "BALLISTA": {
            "name": "BALLISTA",
            "description": "Summons_a_giant_ballista,_which_fires_arrows_dealing_{%_dmg_to_up_to_}_mobs",
            "x1": 75, "x2": 1.25, "funcX": "bigBase",
            "y1": 4, "y2": 30, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Dmg_&_+}_Mobs",
            "skillIndex": 315, "K": 1.1, "D": 1.3, "s": 1, "cooldown": 35, "castTime": 0.45, "manaCost": 22, "inputReq": 1, "AFKrange": 1, "AFKtype": "target",
            "AFKactivity": 0
        },
        "BOAR_RUSH": {
            "name": "BOAR_RUSH",
            "description": "Summons_a_boar_to_run_wildly_on_your_platform._Has_{_HP_and_deals_}%_DMG",
            "x1": 6, "x2": 20, "funcX": "intervalAdd",
            "y1": 75, "y2": 1.5, "funcY": "bigBase",
            "lvlUpText": "+{_HP_&_+}%_DMG",
            "skillIndex": 361, "K": 1.1, "D": 1.2, "s": 1.1, "cooldown": 35, "castTime": 0.95, "manaCost": 16, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "WHALE_WALLOP": {
            "name": "WHALE_WALLOP",
            "description": "Summon_up_to_{_whales_on_nearby_monsters,_who_mega_splash_for_}%_Dmg",
            "x1": 7, "x2": 17, "funcX": "intervalAdd",
            "y1": 30, "y2": 1, "funcY": "bigBase",
            "lvlUpText": "+{_Mobs_&_+}%_DMG",
            "skillIndex": 362, "K": 1.2, "D": 1.1, "s": 1.1, "cooldown": 60, "castTime": 0.95, "manaCost": 25, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "NACHO_PARTY": {
            "name": "NACHO_PARTY",
            "description": "Summon_a_nacho_box,_who_launches_{_cheesy_chips_per_minute,_dealing_}%_Dmg",
            "x1": 15, "x2": 13, "funcX": "intervalAdd",
            "y1": 50, "y2": 1, "funcY": "bigBase",
            "lvlUpText": "+{_CPM_&_+}%_Dmg",
            "skillIndex": 363, "K": 1.1, "D": 1.1, "s": 1.2, "cooldown": 55, "castTime": 0.7, "manaCost": 18, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "HAVE_YET_ANOTHA_ONE": {
            "name": "HAVE_YET_ANOTHA_ONE",
            "description": "Basic_Attacks_have_a_{%_chance_to_fire_1_more_arrow._Stacks_with_others.",
            "x1": 120, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 364
        },
        "ANIMALISTIC_FEROCITY": {
            "name": "ANIMALISTIC_FEROCITY",
            "description": "+{_Weapon_Power_per_power_of_10_Pet_Power_of_pet_in_1st_slot_of_Stored_Pets.",
            "x1": 8, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Wep_Pow_Based_on_Pet_Pow",
            "skillIndex": 365
        },
        "STACKED_SKULLS": {
            "name": "STACKED_SKULLS",
            "description": "+{%_Kill_per_Kill_per_1000_AGI._Each_kill_is_worth_more_kills!",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Kill_Per_Kill_Per_1000",
            "skillIndex": 366
        },
        "SKILL_AMBIDEXTERITY": {
            "name": "SKILL_AMBIDEXTERITY",
            "description": "AGI_has_a_{%_larger_impact_on_Skill_Efficiency._Also,_+}_AGI.",
            "x1": 60, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{%_impact_&_}_AGI",
            "skillIndex": 367
        },
        "ADAPTATION_REVELATION": {
            "name": "ADAPTATION_REVELATION",
            "description": "+{%_AGI,_and_+}_Max_Talent_Lv_for_'Quickness_Boots'",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_AGI_&_+}_Max_LV",
            "skillIndex": 368
        },
        "THE_FAMILY_GUY": {
            "name": "THE_FAMILY_GUY",
            "description": "+{%_larger_Family_Bonuses_than_what_is_displayed_from_bonuses_given_by_this_player",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 144
        },
        "ARENA_SPIRIT": {
            "name": "ARENA_SPIRIT",
            "description": "Get_unlimited_entries_to_the_Pet_Arena_for_{_mins._PASSIVE:_+}%_Pet_DMG",
            "x1": 5, "x2": 17, "funcX": "intervalAdd",
            "y1": 30, "y2": 100, "funcY": "decay",
            "lvlUpText": "+{_Min_&_+}%_Dmg",
            "skillIndex": 370, "K": 1.1, "D": 1.1, "s": 1.2, "cooldown": 86400, "castTime": 0.7, "manaCost": 20, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "I_DREAM_OF_PEACE_AND_EGG": {
            "name": "I_DREAM_OF_PEACE_AND_EGG",
            "description": "{%_Chance_to_get_1_egg_per_10_hrs_of_AFK_claims,_up_to_100_hrs._Candy_wont_work_here.",
            "x1": 100, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance_for_Egg",
            "skillIndex": 371
        },
        "SHINING_BEACON_OF_EGG": {
            "name": "SHINING_BEACON_OF_EGG",
            "description": "+{%_Breeding_EXP_gain,_no_matter_which_player_you_hatch_eggs_on!",
            "x1": 100, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Breeding_EXP",
            "skillIndex": 372
        },
        "CURVITURE_OF_THE_PAW": {
            "name": "CURVITURE_OF_THE_PAW",
            "description": "{x_Higher_Pet_Power,_no_matter_which_player_you_hatch_eggs_on!",
            "x1": 1.2, "x2": 100, "funcX": "decayMulti",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{x_Pet_Power_when_hatched",
            "skillIndex": 373
        },
        "SYMBOLS_OF_BEYOND_~G": {
            "name": "SYMBOLS_OF_BEYOND_~G",
            "description": "+{_Lv_for_all_talents_higher_than_Lv_1._This_bonus_goes_up_every_20_lvs",
            "x1": 1, "x2": 20, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_all_LVs_every_20_LVs",
            "skillIndex": 374
        }
    },
    "Savvy_Basics": {
        "HEALTH_BOOSTER": {
            "name": "HEALTH_BOOSTER",
            "description": "Increases_Max_HP_by_{",
            "x1": 1, "x2": 0.15, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_HP",
            "skillIndex": 0
        },
        "MANA_BOOSTER": {
            "name": "MANA_BOOSTER",
            "description": "Increases_Max_MP_by_{",
            "x1": 1, "x2": 0.1, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_MP",
            "skillIndex": 1
        },
        "STAR_PLAYER": {
            "name": "STAR_PLAYER",
            "description": "Gives_{_Star_Talent_Points._Star_Talents_are_found_throughout_the_game!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Star_Talent_Point",
            "skillIndex": 8
        },
        "BUCKLERED_UP": {
            "name": "BUCKLERED_UP",
            "description": "Increases_Total_Defense_by_+{%",
            "x1": 40, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Total_DEF",
            "skillIndex": 9
        },
        "SHARPENED_AXE": {
            "name": "SHARPENED_AXE",
            "description": "Increases_Base_Weapon_Power_by_{._This_increases_damage!!",
            "x1": 0.25, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{_Base_Weapon_Power",
            "skillIndex": 5
        },
        "FIST_OF_RAGE": {
            "name": "FIST_OF_RAGE",
            "description": "Increases_your_Base_STR_by_{_(STR_boosts_Max_HP_and_Crit_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_STR",
            "skillIndex": 10
        },
        "QUICKNESS_BOOTS": {
            "name": "QUICKNESS_BOOTS",
            "description": "Increases_your_Base_AGI_by_{_(AGI_boosts_Movement_Speed_and_Crit_Chance)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_AGI",
            "skillIndex": 11
        },
        "BOOK_OF_THE_WISE": {
            "name": "BOOK_OF_THE_WISE",
            "description": "Increases_your_Base_WIS_by_{_(WIS_boosts_Mana_and_Boss_Damage)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_WIS",
            "skillIndex": 12
        },
        "LUCKY_CLOVER": {
            "name": "LUCKY_CLOVER",
            "description": "Increases_your_Base_LUK_by_{_(LUK_boosts_drop_rate,_EXP_Gain,_and_other_RNG)",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_LUK",
            "skillIndex": 13
        },
        "GILDED_SWORD": {
            "name": "GILDED_SWORD",
            "description": "Boosts_Damage_dealt|to_all_monsters_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "_",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 6
        },
        "SMART_EFFICIENCY": {
            "name": "SMART_EFFICIENCY",
            "description": "Increases_the_total_efficiency_of_all_specialized_skills_by_{%",
            "x1": 1, "x2": 0.02, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Efficiency",
            "skillIndex": 445
        },
        "OVERCLOCKED_ENERGY": {
            "name": "OVERCLOCKED_ENERGY",
            "description": "Damage_dealt_is_increased_by_{%_for_every_power_of_10_Max_MP_you_have",
            "x1": 150, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 446
        },
        "FARSIGHT": {
            "name": "FARSIGHT",
            "description": "Increases_Crit_Chance_by_{%_and_Crit_Dmg_by_}%",
            "x1": 17, "x2": 45, "funcX": "decay",
            "y1": 33, "y2": 45, "funcY": "decay",
            "lvlUpText": "+{%_Chance,_+}%_DMG",
            "skillIndex": 447
        },
        "IDLE_CASTING": {
            "name": "IDLE_CASTING",
            "description": "AFK_Gains_Rate_for_Fighting_is_increased_by_{%",
            "x1": 20, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_Rate",
            "skillIndex": 448
        },
        "ACTIVE_AFK'ER": {
            "name": "ACTIVE_AFK'ER",
            "description": "AFK_Gains_Rate_for_all_Specialized_Skills_is_increased_by_{%",
            "x1": 20, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_Gains_Rate",
            "skillIndex": 449
        }
    },
    "Mage": {
        "ENERGY_BOLT": {
            "name": "ENERGY_BOLT",
            "description": "Your_next_basic_attack_strikes_the_Targeted_Enemy_for_{%_Damage._You_MUST_have_a_wand_equipped_to_cast.",
            "x1": 160, "x2": 2, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 450, "K": 1, "D": 1.21, "s": 1, "cooldown": 8, "castTime": 0.5, "manaCost": 9, "inputReq": 2, "AFKrange": 200, "AFKtype": "line",
            "AFKactivity": 0
        },
        "MINI_FIREBALL": {
            "name": "MINI_FIREBALL",
            "description": "Shoots_a_fireball_that_explodes_on_impact,_dealing_{%_damage",
            "x1": 120, "x2": 1, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 451, "K": 1.05, "D": 1.2, "s": 1.1, "cooldown": 10, "castTime": 0.85, "manaCost": 12, "inputReq": 0, "AFKrange": 270, "AFKtype": "line",
            "AFKactivity": 0
        },
        "MANA_OVERDRIVE": {
            "name": "MANA_OVERDRIVE",
            "description": "Increase_max_MP_by_{%",
            "x1": 0.5, "x2": 0.02, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_MP",
            "skillIndex": 452
        },
        "TELEPORT": {
            "name": "TELEPORT",
            "description": "Move_forward_instantly_by_a_distance_of_{_Pixels",
            "x1": 25, "x2": 1, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Pixel_Moved",
            "skillIndex": 453, "K": 1, "D": 1, "s": 1.3, "cooldown": 1, "castTime": 0.5, "manaCost": 5, "inputReq": 0, "AFKrange": 480, "AFKtype": "line",
            "AFKactivity": 0
        },
        "YOU'RE_NEXT": {
            "name": "YOU'RE_NEXT",
            "description": "Basic_attacks_have_a_{%_chance_to_Mark_enemies,_who_then_take_}%_more_damage",
            "x1": 110, "x2": 70, "funcX": "decay",
            "y1": 25, "y2": 0.5, "funcY": "bigBase",
            "lvlUpText": "+{%_chance_&_+}%_dmg",
            "skillIndex": 454
        },
        "KNOWLEDGE_IS_POWER": {
            "name": "KNOWLEDGE_IS_POWER",
            "description": "The_effect_your_WIS_stat_has_on_Damage_is_increased_by_{%",
            "x1": 1.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Effect",
            "skillIndex": 455
        },
        "UNT'WIS'TED_ROBES": {
            "name": "UNT'WIS'TED_ROBES",
            "description": "All_Equipment_gives_{%_more_WIS_than_what's_listed",
            "x1": 1.5, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_WIS_from_equips",
            "skillIndex": 456
        },
        "POWER_OVERWHELMING": {
            "name": "POWER_OVERWHELMING",
            "description": "The_effect_Weapon_Power_has_on_Damage_Dealt_is_increased_by_{%",
            "x1": 1.2, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Weapon_Power_Effect",
            "skillIndex": 457
        },
        "FREE_MEAL": {
            "name": "FREE_MEAL",
            "description": "{%_Chance_for_food_to_not_be_consumed_when_it_otherwise_would_be",
            "x1": 53, "x2": 40, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Non-Consume_Chance",
            "skillIndex": 458
        },
        "INDIVIDUAL_INSIGHT": {
            "name": "INDIVIDUAL_INSIGHT",
            "description": "+{_base_WIS",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_WIS",
            "skillIndex": 459
        },
        "LOG_ON_LOGS": {
            "name": "LOG_ON_LOGS",
            "description": "For_{_Minutes,_trees_drop_}%_more_Logs_than_normal",
            "x1": 2, "x2": 10, "funcX": "intervalAdd",
            "y1": 14, "y2": 1.86, "funcY": "bigBase",
            "lvlUpText": "+{_Mins_&_+}%_more_Logs",
            "skillIndex": 460, "K": 1, "D": 1, "s": 1, "cooldown": 30, "castTime": 0.95, "manaCost": 5, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": 3
        },
        "LEAF_THIEF": {
            "name": "LEAF_THIEF",
            "description": "{%_Choppin_Efficiency_per_power_of_10_Grass_Leaves_in_your_Storage_Chest.",
            "x1": 25, "x2": 70, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_efficiency",
            "skillIndex": 461
        },
        "DEFORESTING_ALL_DOUBT": {
            "name": "DEFORESTING_ALL_DOUBT",
            "description": "The_effect_your_WIS_stat_has_on_Choppin_Efficiency_is_increased_by_{%",
            "x1": 0.75, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Effect",
            "skillIndex": 462
        },
        "INNER_PEACE": {
            "name": "INNER_PEACE",
            "description": "Increases_Exp_Gain_for_all_Specialized_Skills_by_{%",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Exp_Gain",
            "skillIndex": 464
        },
        "CHOPPIN_IT_UP_EZ": {
            "name": "CHOPPIN_IT_UP_EZ",
            "description": "+{%_Minigame_Rewards,_and_+}%_Dmg_per_25_Pts_of_your_Minigame_Highscore",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": 5.7, "y2": 50, "funcY": "decay",
            "lvlUpText": "+{%_Rewards_&_+}%_Dmg",
            "skillIndex": 463
        }
    },
    "Wizard": {
        "ICE_SHARDS": {
            "name": "ICE_SHARDS",
            "description": "Your_next_basic_attack_deals_{%_dmg_3_times,_and_freezes_all_nearby_mobs",
            "x1": 70, "x2": 1, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 465, "K": 1.1, "D": 1.3, "s": 1, "cooldown": 10, "castTime": 1.2, "manaCost": 20, "inputReq": 2, "AFKrange": 200, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "FLOOR_IS_LAVA": {
            "name": "FLOOR_IS_LAVA",
            "description": "Summon_{x2_volcanos_which_erupt_around_you,_dealing_}%_dmg",
            "x1": 1, "x2": 40, "funcX": "intervalAdd",
            "y1": 120, "y2": 1, "funcY": "bigBase",
            "lvlUpText": "+{_Volcano_&_+}%_Dmg",
            "skillIndex": 466, "K": 1.1, "D": 1.3, "s": 1.02, "cooldown": 13, "castTime": 0.95, "manaCost": 17, "inputReq": 0, "AFKrange": 150, "AFKtype": "line",
            "AFKactivity": 0
        },
        "TORNADO": {
            "name": "TORNADO",
            "description": "Summon_a_tornado,_which_deals_{%_dmg_and_disappears_after_}_seconds",
            "x1": 20, "x2": 0.3, "funcX": "bigBase",
            "y1": 4, "y2": 20, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Dmg_&_+}_sec",
            "skillIndex": 467, "K": 1.1, "D": 1.3, "s": 1.02, "cooldown": 25, "castTime": 0.95, "manaCost": 15, "inputReq": 0, "AFKrange": 150, "AFKtype": "line",
            "AFKactivity": 0
        },
        "SPEEDY_BOOK": {
            "name": "SPEEDY_BOOK",
            "description": "Getting_4@kills_in_4@sec_activates_'Speedy_Book'_boosting_attack_rate_by_{%_for_}_sec",
            "x1": 10, "x2": 0.2, "funcX": "bigBase",
            "y1": 3, "y2": 15, "funcY": "intervalAdd",
            "lvlUpText": "+{%_rate_&_}_sec",
            "skillIndex": 468, "K": 1, "D": 1, "s": 1.05, "cooldown": 2, "castTime": 0.95, "manaCost": 10, "inputReq": 0, "AFKrange": 0, "AFKtype": "line",
            "AFKactivity": 0
        },
        "MANA_IS_LIFE": {
            "name": "MANA_IS_LIFE",
            "description": "{%_dmg_taken_is_dealt_to_MP._Also,_+}%_Multikill_per_Damage_Tier_(World_3_feature)",
            "x1": 25, "x2": 0.35, "funcX": "bigBase",
            "y1": 40, "y2": 100, "funcY": "decay",
            "lvlUpText": "+{%_dmg_&_}%_MK_per_Tier",
            "skillIndex": 469, "K": 1, "D": 1, "s": 1, "cooldown": 60, "castTime": 0.95, "manaCost": 12, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "PAPERWORK,_GREAT...": {
            "name": "PAPERWORK,_GREAT...",
            "description": "+{%_Damage_for_every_10_Stamps_in_your_collection._Oink_Oink!",
            "x1": 70, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_damage",
            "skillIndex": 470
        },
        "OCCULT_OBOLS": {
            "name": "OCCULT_OBOLS",
            "description": "Obols_give_+{%_more_WIS_than_what_is_listed",
            "x1": 135, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_WIS",
            "skillIndex": 486
        },
        "STARING_STATUES": {
            "name": "STARING_STATUES",
            "description": "'Exp',_'Lumberbob',_and_'Beholder'_statues_give_+{%_more_bonus",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 472
        },
        "WIS_WUMBO": {
            "name": "WIS_WUMBO",
            "description": "+{_Max_Talent_Level_for_'Book_of_the_Wise'",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_Lv",
            "skillIndex": 488
        },
        "FUSCIA_FLASKS": {
            "name": "FUSCIA_FLASKS",
            "description": "Each_Lv_of_'Mage_is_Best'_Bubble_raises_max_Lv_of_'Overclocked_Energy',_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_cap",
            "skillIndex": 474
        },
        "CHARGE_SYPHON": {
            "name": "CHARGE_SYPHON",
            "description": "Steal_charge_from_all_your_players,_giving_you_{%_of_it._+}%_Max_Charge_for_1_Min",
            "x1": 35, "x2": 0.3, "funcX": "bigBase",
            "y1": 100, "y2": 10, "funcY": "bigBase",
            "lvlUpText": "+{%_Steal,_+}%_Temp_Max",
            "skillIndex": 475, "K": 1, "D": 1, "s": 1, "cooldown": 3600, "castTime": 0.95, "manaCost": 10, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "SOOOULS": {
            "name": "SOOOULS",
            "description": "+{%_Worship_Efficiency_per_power_of_10_Forest_Souls_in_your_Storage_Chest",
            "x1": 25, "x2": 70, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Worship_Eff.",
            "skillIndex": 476
        },
        "BLESS_UP": {
            "name": "BLESS_UP",
            "description": "+{%_Worship_EXP_gain._Access_the_other_totems_faster!",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Worship_EXP",
            "skillIndex": 477
        },
        "NEARBY_OUTLET": {
            "name": "NEARBY_OUTLET",
            "description": "{x_Charge_rate._You_know,_for_Worship..._No,_not_for_your_phone.",
            "x1": 1, "x2": 100, "funcX": "decayMulti",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{x_Charge_Rate",
            "skillIndex": 478
        },
        "EARLIER_EDUCATION": {
            "name": "EARLIER_EDUCATION",
            "description": "+{_Talent_Points_for_the_'Mage'_talent_tab._What,_these_talent's_aint_good_'nuff_for_ya?",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Talent_Pt",
            "skillIndex": 494
        }
    },
    "Shaman": {
        "CRAZY_CONCOCTIONS": {
            "name": "CRAZY_CONCOCTIONS",
            "description": "Throws_1_of_4_potions,_with_a_potency_of_{%",
            "x1": 17, "x2": 3, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Potency",
            "skillIndex": 480, "K": 1.1, "D": 1.3, "s": 1.02, "cooldown": 25, "castTime": 0.95, "manaCost": 20, "inputReq": 1, "AFKrange": 50, "AFKtype": "line",
            "AFKactivity": 0
        },
        "AUSPICIOUS_AURA": {
            "name": "AUSPICIOUS_AURA",
            "description": "Casts_}_aura_which_heals_you_and_damages_monsters._The_strength_of_the_aura_is_{%",
            "x1": 10, "x2": 3, "funcX": "bigBase",
            "y1": 1, "y2": 35, "funcY": "intervalAdd",
            "lvlUpText": "+{%_Strength_&_+}_Auras",
            "skillIndex": 481, "K": 1.05, "D": 1.21, "s": 1.1, "cooldown": 40, "castTime": 0.95, "manaCost": 30, "inputReq": 0, "AFKrange": 80, "AFKtype": "line",
            "AFKactivity": 0
        },
        "SIZZLING_SKULL": {
            "name": "SIZZLING_SKULL",
            "description": "Fire_a_skull_which_bounces_around_dealing_{%_dmg_to_up_to_}_monsters",
            "x1": 125, "x2": 1, "funcX": "bigBase",
            "y1": 3, "y2": 20, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_more_mobs",
            "skillIndex": 482, "K": 1.05, "D": 1.21, "s": 1.1, "cooldown": 18, "castTime": 0.95, "manaCost": 17, "inputReq": 0, "AFKrange": 130, "AFKtype": "line",
            "AFKactivity": 0
        },
        "TENTEYECLE": {
            "name": "TENTEYECLE",
            "description": "Killing_a_monster_has_a_{%_chance_to_reduce_attack_cooldowns_by_}_seconds",
            "x1": 100, "x2": 100, "funcX": "decay",
            "y1": 2, "y2": 200, "funcY": "intervalAdd",
            "lvlUpText": "+{%_chance",
            "skillIndex": 483
        },
        "INSTANT_INVINCIBILITY": {
            "name": "INSTANT_INVINCIBILITY",
            "description": "When_damaged,_you_will_stay_invincible_for_an_additional_+{_more_seconds",
            "x1": 5, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_More_Seconds",
            "skillIndex": 484
        },
        "VIRILE_VIALS": {
            "name": "VIRILE_VIALS",
            "description": "+{%_damage_dealt_for_every_alchemy_vial_upgraded_to_at_least_Green_LV",
            "x1": 12, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Damage",
            "skillIndex": 485
        },
        "OCCULT_OBOLS": {
            "name": "OCCULT_OBOLS",
            "description": "Obols_give_+{%_more_WIS_than_what_is_listed",
            "x1": 135, "x2": 80, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_WIS",
            "skillIndex": 486
        },
        "STUPENDOUS_STATUES": {
            "name": "STUPENDOUS_STATUES",
            "description": "'Exp',_'Lumberbob',_and_'Cauldron'_statues_give_+{%_more_bonus",
            "x1": 100, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_higher_bonuses",
            "skillIndex": 487
        },
        "WIS_WUMBO": {
            "name": "WIS_WUMBO",
            "description": "+{_Max_Talent_Level_for_'Book_of_the_Wise'",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_Lv",
            "skillIndex": 488
        },
        "FANTASIA_FLASKS": {
            "name": "FANTASIA_FLASKS",
            "description": "Each_Lv_of_'Mage_is_Best'_Bubble_raises_max_Lv_of_'Farsight',_up_to_+{",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Max_LV_cap",
            "skillIndex": 489
        },
        "CRANIUM_COOKING": {
            "name": "CRANIUM_COOKING",
            "description": "Killing_a_monster_gives_{_seconds_of_instant_alchemy_progress._Lasts_for_}_seconds",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": 10, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{_progress_&_+}_time",
            "skillIndex": 490, "K": 1, "D": 1, "s": 1, "cooldown": 80000, "castTime": 0.95, "manaCost": 100, "inputReq": 0, "AFKrange": 50, "AFKtype": "buff",
            "AFKactivity": 0
        },
        "BUSY_BREWIN'": {
            "name": "BUSY_BREWIN'",
            "description": "Boosts_brew_speed_by_+{%_for_this_character.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_brew_effect",
            "skillIndex": 491
        },
        "BUBBLE_BREAKTHROUGH": {
            "name": "BUBBLE_BREAKTHROUGH",
            "description": "+{%_Alchemy_EXP._Also,_+}%_odds_of_New_Bubble_when_brewing_on_this_player",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": 1, "y2": 0.02, "funcY": "add",
            "lvlUpText": "+{%_EXP_&_+}%_chance",
            "skillIndex": 492
        },
        "SHARING_SOME_SMARTS": {
            "name": "SHARING_SOME_SMARTS",
            "description": "All_characters_in_the_same_cauldron_as_this_one_gain_+{%_more_Alch_EXP.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Alch_Exp",
            "skillIndex": 493
        },
        "EARLIER_EDUCATION": {
            "name": "EARLIER_EDUCATION",
            "description": "+{_Talent_Points_for_the_'Mage'_talent_tab._What,_these_talent's_aint_good_'nuff_for_ya?",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_Talent_Pt",
            "skillIndex": 494
        }
    },
    "Elemental_Sorcerer": {
        "METEOR_SHOWER": {
            "name": "METEOR_SHOWER",
            "description": "Rains_down_}_meteors_onto_nearby_platforms,_which_deal_{%_damage",
            "x1": 200, "x2": 2.5, "funcX": "bigBase",
            "y1": 10, "y2": 7, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_meteors",
            "skillIndex": 495, "K": 1.2, "D": 1.2, "s": 1, "cooldown": 12, "castTime": 0.8, "manaCost": 50, "inputReq": 0, "AFKrange": 50, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "LIGHTNING_BARRAGE": {
            "name": "LIGHTNING_BARRAGE",
            "description": "Your_next_attack_casts_a_lightning_strike,_dealing_{%_dmg_to_up_to_}_mobs._You_MUST_have_a_wand_equipped_to_cast.",
            "x1": 700, "x2": 8, "funcX": "bigBase",
            "y1": 2, "y2": 20, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg_&_+}_mobs",
            "skillIndex": 496, "K": 1, "D": 1.3, "s": 1, "cooldown": 4, "castTime": 0.55, "manaCost": 60, "inputReq": 2, "AFKrange": 200, "AFKtype": "line",
            "AFKactivity": 0
        },
        "RADIANT_CHAINBOLT": {
            "name": "RADIANT_CHAINBOLT",
            "description": "Cast_a_bolt_with_{%_dmg_and_bounces_up_to_}_times,_losing_dmg_each_time",
            "x1": 50, "x2": 4, "funcX": "bigBase",
            "y1": 3, "y2": 10, "funcY": "intervalAdd",
            "lvlUpText": "+{%_dmg",
            "skillIndex": 497, "K": 1.3, "D": 1, "s": 1, "cooldown": 8, "castTime": 0.95, "manaCost": 100, "inputReq": 0, "AFKrange": 50, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "DIMENSIONAL_WORMHOLE": {
            "name": "DIMENSIONAL_WORMHOLE",
            "description": "Spawns_Wormhole_Mobs_which_give_+{%_XP_&_Drop_per_Wormhole_kill_and_spawn_more.",
            "x1": 17, "x2": 70, "funcX": "decay",
            "y1": 43, "y2": 0.2, "funcY": "bigBase",
            "lvlUpText": "+{%_Reward_&_+}_sec",
            "skillIndex": 498, "K": 1, "D": 1, "s": 1.3, "cooldown": 120, "castTime": 0.95, "manaCost": 100, "inputReq": 0, "AFKrange": 50, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "CHAOTIC_FORCE": {
            "name": "CHAOTIC_FORCE",
            "description": "Basic_attacks_have_a_{%_chance_to_create_either_a_Fireball,_Tornado,_or_Volcano.",
            "x1": 75, "x2": 110, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 499
        },
        "BELIEVER_STRENGTH": {
            "name": "BELIEVER_STRENGTH",
            "description": "+{_Weapon_Power_for_every_10_Divinity_Lvs_of_this_character.",
            "x1": 7, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Wep_Power_per_10_Lv",
            "skillIndex": 500
        },
        "MEMORIAL_SKULLS": {
            "name": "MEMORIAL_SKULLS",
            "description": "+{%_Kill_per_Kill_per_1000_WIS._Each_kill_is_worth_more_kills!",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Kill_Per_Kill_Per_1000",
            "skillIndex": 531
        },
        "SKILL_WIZ": {
            "name": "SKILL_WIZ",
            "description": "WIS_has_a_{%_larger_impact_on_Skill_Efficiency._Also,_+}_WIS.",
            "x1": 60, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{%_impact_&_+}_WIS",
            "skillIndex": 532
        },
        "UTMOST_INTELLECT": {
            "name": "UTMOST_INTELLECT",
            "description": "+{%_WIS,_and_+}_Max_Talent_Lv_for_'Book_of_the_Wise'",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_WIS_&_+}_Max_LV",
            "skillIndex": 533
        },
        "THE_FAMILY_GUY": {
            "name": "THE_FAMILY_GUY",
            "description": "+{%_larger_Family_Bonuses_than_what_is_displayed_from_bonuses_given_by_this_player",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 144
        },
        "POLYTHEISM": {
            "name": "POLYTHEISM",
            "description": "Link_to_2nd_God_based_on_Talents_Lv._Stand_under_Omniphau_God_to_De-Level.",
            "x1": 70, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Div_Pts_Passive_Bonus",
            "skillIndex": 505
        },
        "SHARED_BELIEFS": {
            "name": "SHARED_BELIEFS",
            "description": "+{%_Divinity_EXP_Gain_for_all_characters._Multiplicative_too,_divinilicious!",
            "x1": 100, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Exp_Gain_for_all",
            "skillIndex": 506
        },
        "GODS_CHOSEN_CHILDREN": {
            "name": "GODS_CHOSEN_CHILDREN",
            "description": "+{%_DMG_for_all_chars_per_GOD_Rank._Reach_all_10_Gods_first...",
            "x1": 10, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_DMG_per_GOD_Rank",
            "skillIndex": 507
        },
        "WORMHOLE_EMPEROR": {
            "name": "WORMHOLE_EMPEROR",
            "description": "+{%_DMG_per_POW_10_kills_of_Wormhole_Mobs._Applies_to_all_characters!",
            "x1": 1.5, "x2": 150, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_DMG_per_Power_of_10_Kills",
            "skillIndex": 508
        },
        "SYMBOLS_OF_BEYOND_~P": {
            "name": "SYMBOLS_OF_BEYOND_~P",
            "description": "+{_Lv_for_all_talents_higher_than_Lv_1._This_bonus_goes_up_every_20_lvs",
            "x1": 1, "x2": 20, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_all_LVs_every_20_LVs",
            "skillIndex": 539
        }
    },
    "Bubonic_Conjuror": {
        "CHEMICAL_WARFARE": {
            "name": "CHEMICAL_WARFARE",
            "description": "Drop_poison_canisters_around_you_for_{_sec._Poison_does_}%_Dmg.",
            "x1": 8, "x2": 17, "funcX": "intervalAdd",
            "y1": 5, "y2": 0.05, "funcY": "bigBase",
            "lvlUpText": "+{_cans_&_+}%_DMG",
            "skillIndex": 525, "K": 1, "D": 1.21, "s": 1, "cooldown": 32, "castTime": 1.1, "manaCost": 16, "inputReq": 0, "AFKrange": 1, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "FLATULENT_SPIRIT": {
            "name": "FLATULENT_SPIRIT",
            "description": "Summons_a_fart_cloud_for_{_sec,_who_farts_and_does_}%_dmg_to_poisoned_mobs",
            "x1": 8, "x2": 5, "funcX": "intervalAdd",
            "y1": 200, "y2": 1, "funcY": "decay",
            "lvlUpText": "+{_sec_&_+}%_dmg",
            "skillIndex": 526, "K": 1, "D": 1.21, "s": 1, "cooldown": 38, "castTime": 1.1, "manaCost": 17, "inputReq": 0, "AFKrange": 1, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "TAMPERED_INJECTION": {
            "name": "TAMPERED_INJECTION",
            "description": "Deals_{%_Dmg_several_times,_the_number_of_times_increasing_from_poisoning_monsters.",
            "x1": 120, "x2": 1.8, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Dmg_per_Line",
            "skillIndex": 527, "K": 1, "D": 1.21, "s": 1, "cooldown": 28, "castTime": 1.1, "manaCost": 15, "inputReq": 2, "AFKrange": 1, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "PLAGUE_STRICKEN": {
            "name": "PLAGUE_STRICKEN",
            "description": "Basic_attacks_have_a_{%_chance_to_hit_multiple_times",
            "x1": 280, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_chance",
            "skillIndex": 528
        },
        "RAISE_DEAD": {
            "name": "RAISE_DEAD",
            "description": "Respawns_all_dead_'real'_monsters_within_a_{px_radius_of_you",
            "x1": 150, "x2": 3, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{px_radius",
            "skillIndex": 529, "K": 1, "D": 1.21, "s": 1, "cooldown": 37, "castTime": 1.1, "manaCost": 9, "inputReq": 0, "AFKrange": 1, "AFKtype": "auto",
            "AFKactivity": 0
        },
        "WIRED_IN_POWER": {
            "name": "WIRED_IN_POWER",
            "description": "+{_Weapon_Power_for_every_10_Lab_Lvs_of_this_character",
            "x1": 7, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Wep_Power_per_10_Lv",
            "skillIndex": 530
        },
        "MEMORIAL_SKULLS": {
            "name": "MEMORIAL_SKULLS",
            "description": "+{%_Kill_per_Kill_per_1000_WIS._Each_kill_is_worth_more_kills!",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Kill_Per_Kill_Per_1000",
            "skillIndex": 531
        },
        "SKILL_WIZ": {
            "name": "SKILL_WIZ",
            "description": "WIS_has_a_{%_larger_impact_on_Skill_Efficiency._Also,_+}_WIS.",
            "x1": 60, "x2": 80, "funcX": "decay",
            "y1": 1, "y2": 2, "funcY": "intervalAdd",
            "lvlUpText": "+{%_impact_&_+}_WIS",
            "skillIndex": 532
        },
        "UTMOST_INTELLECT": {
            "name": "UTMOST_INTELLECT",
            "description": "+{%_WIS,_and_+}_Max_Talent_Lv_for_'Book_of_the_Wise'",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": 1, "y2": 0, "funcY": "add",
            "lvlUpText": "+{%_WIS_&_+}_Max_LV",
            "skillIndex": 533
        },
        "THE_FAMILY_GUY": {
            "name": "THE_FAMILY_GUY",
            "description": "+{%_larger_Family_Bonuses_than_what_is_displayed_from_bonuses_given_by_this_player",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Bonus",
            "skillIndex": 144
        },
        "PURPLE_TUBE": {
            "name": "PURPLE_TUBE",
            "description": "Players_to_the_right_of_you_in_Lab_get_+{%_Line_Width,_including_you.",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Width_for_Righties",
            "skillIndex": 535
        },
        "GREEN_TUBE": {
            "name": "GREEN_TUBE",
            "description": "Players_to_the_left_of_you_in_Lab_get_+{%_Lab_EXP,_including_you.",
            "x1": 60, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_EXP_for_Lefties",
            "skillIndex": 536
        },
        "ESSENCE_TRANSFERRAL": {
            "name": "ESSENCE_TRANSFERRAL",
            "description": "{%_of_Lab_EXP_earned_by_this_character_is_also_given_to_your_lowest_Lab_Lv_player",
            "x1": 70, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_more_exp_funneled",
            "skillIndex": 537
        },
        "UPLOAD_SQUARED": {
            "name": "UPLOAD_SQUARED",
            "description": "+{%_Lab_EXP_and_Efficiency_for_this_character_only",
            "x1": 80, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_XP_and_Eff",
            "skillIndex": 538
        },
        "SYMBOLS_OF_BEYOND_~P": {
            "name": "SYMBOLS_OF_BEYOND_~P",
            "description": "+{_Lv_for_all_talents_higher_than_Lv_1._This_bonus_goes_up_every_20_lvs",
            "x1": 1, "x2": 20, "funcX": "intervalAdd",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+1_all_LVs_every_20_LVs",
            "skillIndex": 539
        }
    }
};