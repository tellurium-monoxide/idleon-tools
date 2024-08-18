const STARTALENTS = {
    "Special Talent 1": {
        "BORED_TO_DEATH": {
            "name": "BORED_TO_DEATH",
            "description": "Reduces_the_Respawn_Timer_to_{_sec._This_will_boost_AFK_Survival_Percent!",
            "x1": 600, "x2": 2, "funcX": "reduce",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "{_sec_Respawn",
            "skillIndex": 615
        },
        "BEGINNER_BEST_CLASS": {
            "name": "BEGINNER_BEST_CLASS",
            "description": "+1_Base_Weapon_Power_every_10_Lvs_of_your_best_Beginner._Caps_at_+{.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Weapon_Pow_Cap",
            "skillIndex": 616
        },
        "STUDIOUS_QUESTER": {
            "name": "STUDIOUS_QUESTER",
            "description": "Each_Completed_Quest_gives_+0.10%_All_Skill_efficiency._Total_bonus_caps_at_+{%",
            "x1": 0.4, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Skill_Eff",
            "skillIndex": 617
        },
        "QUEST_CHUNGUS": {
            "name": "QUEST_CHUNGUS",
            "description": "Each_Completed_Quest_gives_+1_LUK._Total_bonus_caps_at_+{_LUK",
            "x1": 4, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_LUK_Cap",
            "skillIndex": 618
        },
        "CRYSTALS_4_DAYYS": {
            "name": "CRYSTALS_4_DAYYS",
            "description": "Crystal_Monsters_have_a_+{%_chance_to_spawn",
            "x1": 174, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Spawn_Rate",
            "skillIndex": 619
        },
        "WILL_OF_THE_ELDEST": {
            "name": "WILL_OF_THE_ELDEST",
            "description": "+1_All_Stats_for_every_10_Levels_of_your_highest_leveled_character._Caps_at_+{.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_All_Stat_Cap",
            "skillIndex": 620
        },
        "TICK_TOCK": {
            "name": "TICK_TOCK",
            "description": "+{%_AFK_Gains_Rate_for_both_Fighting_and_Skills",
            "x1": 8, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Away_Gain_Rate",
            "skillIndex": 621
        },
        "STONKS!": {
            "name": "STONKS!",
            "description": "Gives_{_Special_Talent_Points.",
            "x1": 130, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "Even_Stonkier!",
            "skillIndex": 622
        },
        "ROLL_DA_DICE": {
            "name": "ROLL_DA_DICE",
            "description": "Rolls_a_{_sided_dice._If_it_lands_on_a_1,_you_win_a_special_Trophy!",
            "x1": 10000, "x2": 25, "funcX": "reduce",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "Dice_only_has_{_sides",
            "skillIndex": 623, "K": 1, "D": 1, "s": 1, "cooldown": 200, "castTime": 0.5, "manaCost": 1, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -1
        },
        "ATTACKS_ON_SIMMER": {
            "name": "ATTACKS_ON_SIMMER",
            "description": "Attack_moves_boost_your_AFK_gains_+{%_more_than_they_normally_do",
            "x1": 40, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_attack_AFK_effect",
            "skillIndex": 624
        },
        "TOILET_PAPER_POSTAGE": {
            "name": "TOILET_PAPER_POSTAGE",
            "description": "Stamps_giving_Skill_Efficiency_will_give_{x_higher_bonuses.",
            "x1": 0.7, "x2": 100, "funcX": "decayMulti",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{x_higher_bonus",
            "skillIndex": 625
        },
        "EXP_CONVERTER": {
            "name": "EXP_CONVERTER",
            "description": "{%_of_EXP_earned_in_chosen_Skill_is_turned_to_Class_EXP._Assign_to_Attack_to_choose.",
            "x1": 150, "x2": 200, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Exp_Converted",
            "skillIndex": 626, "K": 1, "D": 1, "s": 1, "cooldown": 3, "castTime": 0.1, "manaCost": 1, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "GOBLET_OF_HEMOGLOBIN": {
            "name": "GOBLET_OF_HEMOGLOBIN",
            "description": "Killing_a_monster_heals_you_by_{%._This_also_counts_for_AFK,_helping_Survivability!",
            "x1": 6, "x2": 66, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_HP_regen_per_kill",
            "skillIndex": 627
        }
    },
    "Special Talent 2": {
        "JUST_EXP": {
            "name": "JUST_EXP",
            "description": "+{%_Class_EXP",
            "x1": 10, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Class_Exp",
            "skillIndex": 632
        },
        "FROTHY_MALK": {
            "name": "FROTHY_MALK",
            "description": "Boost_foods,_like_potions,_give_+{%_higher_bonuses_than_normal.",
            "x1": 50, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Boost_Food_Effect",
            "skillIndex": 631
        },
        "CONVERT_BETTER,_DARNIT!": {
            "name": "CONVERT_BETTER,_DARNIT!",
            "description": "EXP_Converter_Talent_gives_{x_more_Class_EXP_every_5_LV_of_chosen_skill",
            "x1": 1.7, "x2": 100, "funcX": "decayMulti",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{x_more_Class_Exp",
            "skillIndex": 630
        },
        "PULSATION": {
            "name": "PULSATION",
            "description": "The_rate_at_which_you_gain_mana_used_to_cast_Attacks_is_boosted_by_+{%",
            "x1": 75, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Mana_Regen_rate",
            "skillIndex": 629
        },
        "CARDIOVASCULAR!": {
            "name": "CARDIOVASCULAR!",
            "description": "+{%_additional_card_drop_chance._It's_multiplicative,_so_it_always_helps!",
            "x1": 60, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_card_drop_chance",
            "skillIndex": 628
        },
        "MILKYWAY_CANDIES": {
            "name": "MILKYWAY_CANDIES",
            "description": "{%_chance_to_get_a_Time_Candy_if_AFK_30+_hrs._Longer_AFK_boosts_candy_quality",
            "x1": 200, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Candy_drop",
            "skillIndex": 633
        },
        "TELEKINETIC_STORAGE": {
            "name": "TELEKINETIC_STORAGE",
            "description": "Deposits_your_items_to_storage,_and_destroys_items_on_ground._PASSIVE:_+{%_Carry_Cap",
            "x1": 30, "x2": 60, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Carry_Cap",
            "skillIndex": 634, "K": 1, "D": 1, "s": 1, "cooldown": 1800, "castTime": 0.1, "manaCost": 1, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "PRINTER_SAMPLING": {
            "name": "PRINTER_SAMPLING",
            "description": "Cast_to_sample_{%_of_your_current_AFK_gains_rate,_which_is_used_by_the_3d_Printer.",
            "x1": 10, "x2": 0.075, "funcX": "bigBase",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_gains_sampled",
            "skillIndex": 635, "K": 1, "D": 1, "s": 1, "cooldown": 2, "castTime": 0.1, "manaCost": 1, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "SUPERSOURCE": {
            "name": "SUPERSOURCE",
            "description": "+{_Base_Efficiency_for_all_Skills._Mining,_Choppin,_Fishing,_everything!",
            "x1": 250, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Base_Efficiency",
            "skillIndex": 636
        },
        "ACTION_FRENZY": {
            "name": "ACTION_FRENZY",
            "description": "+{%_Speed_for_all_Skills._Zoom_zoom!_Isn't_that_what_you_zoomers_are_all_about?",
            "x1": 60, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Skilling_Speed",
            "skillIndex": 637
        },
        "DUNGEONIC_DAMAGE": {
            "name": "DUNGEONIC_DAMAGE",
            "description": "+{%_damage_for_every_power_of_10_Dungeon_Credits_you've_earned",
            "x1": 15, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_dmg_per_POW_10_Creds",
            "skillIndex": 638
        },
        "SHRINE_ARCHITECT": {
            "name": "SHRINE_ARCHITECT",
            "description": "Cast_this_talent_to_place_shrines._You_also_charge_them_+{%_faster",
            "x1": 50, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Charge_Rate",
            "skillIndex": 639, "K": 1, "D": 1, "s": 1, "cooldown": 6, "castTime": 0.1, "manaCost": 1, "inputReq": 0, "AFKrange": 1, "AFKtype": "buff",
            "AFKactivity": -2
        },
        "MEGA_CRIT": {
            "name": "MEGA_CRIT",
            "description": "+{%_Crit_chance._If_over_100%_crit_chance,_can_Mega_Crit_for_+}%_more_dmg.",
            "x1": 20, "x2": 100, "funcX": "decay",
            "y1": 200, "y2": 2, "funcY": "bigBase",
            "lvlUpText": "+{%_chance_&+}%_Dmg",
            "skillIndex": 640
        }
    },
    "Special Talent 3": {
        "TIPTOE_QUICKNESS": {
            "name": "TIPTOE_QUICKNESS",
            "description": "+{%_Movement_Speed,_if_you're_under_200%_Speed._Otherwise,_+}%_Accuracy.",
            "x1": 25, "x2": 100, "funcX": "decay",
            "y1": 30, "y2": 100, "funcY": "decay",
            "lvlUpText": "+{%_Spd_or_+}%_Acc",
            "skillIndex": 641
        },
        "UBERCHARGED_HEALTH": {
            "name": "UBERCHARGED_HEALTH",
            "description": "Increases_base_HP_by_+{._Cardiovascularly_impressive!",
            "x1": 2, "x2": 0.2, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_Base_HP",
            "skillIndex": 642
        },
        "COINS_FOR_CHARON": {
            "name": "COINS_FOR_CHARON",
            "description": "+{%_cash_per_Multikill_Damage_Tier,_as_shown_by_the_purple_multiplier_in_AFK_Info",
            "x1": 25, "x2": 75, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Cash_per_tier",
            "skillIndex": 643
        },
        "AMERICAN_TIPPER": {
            "name": "AMERICAN_TIPPER",
            "description": "+{%_Cash_per_10_Levels_of_your_Cooking_Skill.",
            "x1": 80, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Cash",
            "skillIndex": 644
        },
        "OVERACCURATE_CRIT": {
            "name": "OVERACCURATE_CRIT",
            "description": "+{%_Crit_Chance_for_every_Power_of_10_accuracy_above_100%_Hit_Chance.",
            "x1": 8, "x2": 70, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Crit_Chance",
            "skillIndex": 645
        },
        "FILTHY_DAMAGE": {
            "name": "FILTHY_DAMAGE",
            "description": "+{%_damage_for_every_power_of_10_Garbage_you_have",
            "x1": 20, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_dmg_per_POW_10_Garbo",
            "skillIndex": 649
        },
        "RANDO_EVENT_LOOTY": {
            "name": "RANDO_EVENT_LOOTY",
            "description": "+{%_AFK_Gains_Rate_per_Random_Event_Rare_Item_found",
            "x1": 0.75, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_AFK_per_rare",
            "skillIndex": 650
        },
        "SPICE_SPILLAGE": {
            "name": "SPICE_SPILLAGE",
            "description": "+{%_chance_to_claim_all_pet_spices_when_claiming_1hr+_AFK_gains.",
            "x1": 200, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Chance",
            "skillIndex": 651
        },
        "STAT_OVERLOAD": {
            "name": "STAT_OVERLOAD",
            "description": "+{_total_STR,_AGI,_WIS,_and_LUK._Total_means_this_bonus_is_not_affected_by_+%_ALL_STAT.",
            "x1": 1, "x2": 0, "funcX": "add",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{_All_Stat",
            "skillIndex": 652
        },
        "DUMMY_THICC_STATS": {
            "name": "DUMMY_THICC_STATS",
            "description": "+{%_All_Stat_per_POW_10_best_DPS_ever_on_the_Target_Dummy",
            "x1": 0.35, "x2": 50, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_All_Stat",
            "skillIndex": 653
        }
    },
    "Special Talent 4": {
        "MONOLITHIALISM": {
            "name": "MONOLITHIALISM",
            "description": "+{%_MultiKill_per_unique_Onyx_Statue_you_have",
            "x1": 30, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Multikill_per_Onyx",
            "skillIndex": 654
        },
        "BOSS_BATTLE_SPILLOVER": {
            "name": "BOSS_BATTLE_SPILLOVER",
            "description": "+{%_Drop_Rate_for_each_difficulty_of_weekly_boss_battle_defeated_this_week.",
            "x1": 25, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_Drop_Rate_per_diff",
            "skillIndex": 655
        },
        "DREAMER_DAMAGE": {
            "name": "DREAMER_DAMAGE",
            "description": "+{%_Damage_per_Equinox_Dream_cloud_completed",
            "x1": 5, "x2": 100, "funcX": "decay",
            "y1": null, "y2": null, "funcY": "txt",
            "lvlUpText": "+{%_DMG_per_dream_complete",
            "skillIndex": 656
        }
    }
};