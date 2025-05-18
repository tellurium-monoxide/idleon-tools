import { BaseFeature } from "../BaseFeature.js";

export class Equinox extends BaseFeature {

    constructor(account) {
        super(account);
        let equinox_data = account.save_data["Dream"]
        let equinox_challenge_data = account.save_data["WeeklyBoss"]

        this.equinox_levels = []
        this.map_name_to_index = {}
        this.clouds = []

        for (const [ind, upg] of DATA_EQUINOX_UPGRADES.entries()) {
            this.equinox_levels.push(equinox_data[ind + 2])
            this.map_name_to_index[upg[0]] = ind
        }

        for (const [ind, upg] of DATA_EQUINOX_CHALLENGES.entries()) {
            this.clouds.push(equinox_challenge_data[`d_${ind}`] == -1)
        }
    }

    getLevel(name) {
        return this.equinox_levels[this.map_name_to_index[name]]
    }
    getTotalClouds() {
        return this.clouds.reduce((acc, v) => (acc + v), 0)
    }

    test() {
        console.log(this.clouds)
        console.log(this.equinox_levels)
    }
}
export const DATA_EQUINOX_UPGRADES = [
    ["EQUINOX_DREAMS", 5],
    ["EQUINOX_RESOURCES", 4],
    ["SHADES_OF_K", 3],
    ["LIQUIDVESTMENT", 4],
    ["MATCHING_SCIMS", 8],
    ["SLOW_ROAST_WIZ", 5],
    ["LABORATORY_FUSE", 10],
    ["METAL_DETECTOR", 6],
    ["FAUX_JEWELS", 6],
    ["FOOD_LUST", 10],
    ["EQUINOX_SYMBOLS", 5],
    ["VOTER_RIGHTS", 15],
    ["HMM...", 2],
    ["HMM...", 2]
]

export const DATA_EQUINOX_CHALLENGES = [
    ["Greenstack_20_different_items_in_your_Storage_Chest", 20],
    ["Get_400_kills_in_a_single_Killroy_run._Why_do_they_keep_respawning_anyway,_are_they_stupid?", 400],
    ["Reach_Lv_100_on_all_of_your_characters._Single_character_accounts,_it's_your_time_to_shine!", 1],
    ["Reach_a_total_Refinery_Rank_of_30_across_all_cycles", 30],
    ["Get_a_single_sample_of_1_million_or_more_of_any_item._7_digit_sample_club,_you_in?", 1],
    ["Reach_wave_50_on_first_6_Tower_Defence_Worship_Summons", 6],
    ["Defeat_all_5_difficulties_of_a_Weekly_BATTLE_boss._RIP!", 1],
    ["Max_out_5_stat_upgrades_within_the_Flurbo_Shop_of_the_Dungeon", 5],
    ["Defeat_the_Vengeful_Grandfrogger,_4th_difficulty,_in_a_party_with_others_or_alone.", 1],
    ["Reach_Lv_300_Construction_on_any_character", 300],
    ["Reach_Lv_250_on_all_of_your_characters,_every_one_of_them._Yes,_even_the_bad_ones_you_neglect", 1],
    ["Greenstack_75_different_items_in_your_Storage_Chest", 75],
    ["Get_100,000_sec_of_instant_progress_from_a_single_use_of_Cranium_Cooking_talent", 100000],
    ["Reach_a_total_shrine_lv_of_140_across_all_shrines", 140],
    ["Defeat_the_Inevitable_Snakenhotep_in_a_party_with_others_or_alone._That's_the_3rd_and_final_W2_Dungeon_boss", 1],
    ["Fill_half_of_your_cog_board,_at_least_48_slots,_with_Ulti_Double_Cogs.", 48],
    ["Get_a_Lucky_Lad_trophy_drop_on_a_beginner_type_character", 1],
    ["Reach_a_total_Refinery_Rank_of_60_across_all_cycles", 60],
    ["Use_a_stack_of_100,000_cooking_Ladles_in_a_single_usage", 1],
    ["Defeat_the_Caustic_Glaciaxus_in_a_party_with_others_or_alone._That's_the_3rd_and_final_W3_Dungeon_boss", 1],
    ["Reach_round_115_in_the_Pet_Arena,_but_only_using_a_team_of_4_Pets_or_less", 115],
    ["Upgrade_the_Bobjoepickle_vial_to_Lv_2._It_will_still_do_nothing,_but_one_can_dream!", 2],
    ["Reach_Lv_500_on_all_of_your_characters._That's_over_half_way_to_the_fabled_9999!", 1],
    ["Have_15_chemical_plants_just_chillin'_in_your_Gaming_Garden_all_at_once", 15],
    ["Get_2000_kills_in_a_single_Killroy_run._Seems_like_a_lot,_but_compared_to_your_deathnote,_it_really_isn't_huh...", 2000],
    ["Get_a_total_of_100_BILLION_Green_Mushroom_deathnote_kills.", 1],
    ["Get_a_single_sample_of_1_billion_or_more_of_any_item._10_digit_sample_club,_you_in?", 1],
    ["Reach_wave_121_on_first_6_Tower_Defence_Worship_Summons", 6],
    ["Greenstack_200_different_items_in_your_Storage_Chest", 200],
    ["Successfully_take_a_Red_Frisbee_sample_at_Wood_Mushrooms._Yeah,_it's_possible", 1],
    ["Get_100_5_star_ruby_cards._Or,_get_1_500_star_card._The_latter_does_not_exist._Sadly", 100],
    ["Acquire_all_10_Megafeathers_from_Orion_the_Great_Owl,_and_all_12_Megafish_from_Poppy_the_Kangaroo_Mouse", 22],
    ["Unlock_75_or_more_Portals_on_a_single_Voidwalker_Speedrun", 75],
    ["Reach_a_total_Cooking_Meal_Upgrade_Lv_of_4242_across_all_meals", 4242],
    ["Find_every_type_of_hat_in_Sneaking,_including_the_Funky_Hat,_which_is_a_SUPER_rare_drop_from_the_lobby_floor...", 15],
    ["Get_at_least_100_Killroy_kills_on_all_monsters_in_World_1,_2,_3,_4,_5_and_6,_as_shown_in_Killroy_Prime_in_Rift", 80]
]
