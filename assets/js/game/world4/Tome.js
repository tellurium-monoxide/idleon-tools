import { BaseFeature } from "../BaseFeature.js";

export class Tome extends BaseFeature {
    quantities = [];
    scores = [];
    score_percents = []
    map_to_ind = {};
    constructor(account) {
        super(account);
    }

    calcScores() {
        this.quantities = []
        this.score_percents = []
        this.scores = []
        for (let [ind, obj] of DATA_TOME.entries()) {
            let [name, coefs, getter] = obj
            let qtt = 0
            if (getter) {
                qtt = getter(this.account)
            }
            let score_percent = this.calcScorePercent(coefs, qtt)
            this.quantities.push(qtt)
            this.score_percents.push(score_percent)
            this.scores.push(Math.ceil(score_percent * coefs[2]))

            this.map_to_ind[name] = ind

        }

    }

    calcScorePercent(coefs, qtt) {
        let [x1, x2, x3] = coefs
        if (x2 == 0) {
            return Math.pow((1.7 * qtt) / (qtt + x1), 0.7);
        } else if (x2 == 1) {
            return (2.4 * lavaLog(qtt) / (2 * lavaLog(qtt) + x1))
        } else if (x2 == 2) {
            return Math.min(1, qtt / x1);
        } else if (x2 == 3) {
            if (qtt > (5 * x1)) {
                return 0;
            } else {
                return Math.pow((1.2 * (6 * (x1) - qtt)) / (7 * (x1) - qtt), 5);
            }
        }

        return 0
    }
    calcTrueMaxPercent(coefs) {
        let [x1, x2, x3] = coefs
        if (x2 == 0) {
            return Math.pow((1.7), 0.7);
        } else if (x2 == 1) {
            return (1.2)
        } else if (x2 == 2) {
            return 1;
        } else if (x2 == 3) {

            return Math.pow((1.2 * (6 * (x1))) / (7 * (x1)), 5);

        }

        return 0
    }

    getTotalScore() {
        this.calcScores()
        return this.scores.reduce((a, b) => a + b, 0)
    }
    getTotalMaxScore() {
        return DATA_TOME.reduce((a, b) => a + b[1][2], 0)
    }
    getTotalTrueMaxScore() {
        return DATA_TOME.reduce((a, b) => a + Math.ceil(this.calcTrueMaxPercent(b[1]) * b[1][2]), 0)
    }

    getDisplay() {
        this.calcScores()


        let display = document.createElement("table")
        display.classList.add("outlined")
        let totals = document.createElement("tr")
        display.appendChild(totals)
        let total_score = this.getTotalScore()
        let total_max_score = this.getTotalMaxScore()
        let total_true_max_score = this.getTotalTrueMaxScore()
        totals.appendChild(document.createElement("td")).innerText = "Totals"
        totals.appendChild(document.createElement("td"))
        totals.appendChild(document.createElement("td")).innerText = `${total_score}`
        totals.appendChild(document.createElement("td")).innerText = `${formatPercent(total_score / total_max_score)}`
        totals.appendChild(document.createElement("td")).innerText = `${total_max_score}`
        totals.appendChild(document.createElement("td")).innerText = `${total_true_max_score}`
        totals.appendChild(document.createElement("td")).innerText = `${formatPercent(total_score / total_true_max_score)}`


        let head = document.createElement("tr")
        display.appendChild(head)
        let titles = ["Objective", "Quantity", "Score", "Percent to max", "Max", "True Max", "Percent to True max"]
        for (let title of titles) {
            head.appendChild(document.createElement("th")).innerText = title
        }

        for (let [ind, tome_obj] of DATA_TOME.entries()) {
            let [name, coefs, getter] = tome_obj
            let qtt = this.quantities[ind]
            let score = this.scores[ind]
            let max = coefs[2]
            let true_max = Math.ceil(this.calcTrueMaxPercent(coefs) * max)

            let row = display.appendChild(document.createElement("tr"))

            row.appendChild(document.createElement("td")).innerText = `${name}`
            row.appendChild(document.createElement("td")).innerText = `${formatIdleonNumbers(qtt)}`
            row.appendChild(document.createElement("td")).innerText = `${score}`
            row.appendChild(document.createElement("td")).innerText = `${formatPercent(score / max)}`
            row.appendChild(document.createElement("td")).innerText = `${max}`
            row.appendChild(document.createElement("td")).innerText = `${true_max}`
            row.appendChild(document.createElement("td")).innerText = `${formatPercent(score / true_max)}`

        }

        return display

    }


}
// values are: name, coefs, getter
// for coefs, we have parameter, type, max score I think
export const DATA_TOME = [
    ["Stamp_Total_LV", [10000, 0, 800], (account) => { return account.world1.stamps.getTotalLevels() }],
    ["Statue_Total_LV", [2300, 0, 350], (account) => { return account.world1.statues.getTotalLevels() }],
    ["Cards_Total_LV", [1344, 2, 350]],
    ["Total_Talent_Max_LV", [12000, 0, 400], (account) => { return account.characters.getTotalUniqueTalentMaxLvl() }],
    ["Unique_Quests_Completed", [323, 2, 300]],
    ["Account_LV", [5500, 0, 900], (account) => { return account.characters.getTotalClassLevels() }],
    ["Total_Tasks_Completed", [470, 2, 470], (account) => { return account.general.taskboard.tasks.getTotal() }],
    ["Total_Achievements_Completed", [266, 2, 750], (account) => { return account.general.taskboard.achievements.getTotalAchievements() }],
    ["Most_Money_held_in_Storage", [25, 1, 300], (account) => { return account.options.get(198) }],
    ["Most_Spore_Caps_held_in_Inventory_at_once", [9, 1, 200], (account) => { return account.options.get(208) }],
    ["Trophies_Found", [21, 2, 660]],
    ["Account_Skills_LV", [15000, 0, 750], (account) => { return account.characters.reduceOnChars((acc, char) => (acc + char.skill_levels.getTotalSkillLevels()), 0) }],
    ["Best_Spiketrap_Surprise_round", [13, 2, 100], (account) => { return account.options.get(201) }],
    ["Total_AFK_Hours_claimed", [2000000, 0, 350], (account) => { return account.general.taskboard.tasks.getTaskStat("SUPER_EXPLOSIVE_GAMEPLAY") }],
    ["DPS_Record_on_Shimmer_Island", [20, 1, 350], (account) => { return account.options.get(172) }],
    ["Star_Talent_Points_Owned", [2500, 0, 200]],
    ["Average_kills_for_a_Crystal_Spawn", [30, 3, 350], (account) => { return 1 / account.options.get(202) }],
    ["Dungeon_Rank", [30, 0, 250]],
    ["Highest_Drop_Rarity_Multi", [40, 0, 350], (account) => { return account.options.get(200) }],
    ["Constellations_Completed", [49, 2, 300]],
    ["Most_DMG_Dealt_to_Gravestone_in_a_Weekly_Battle", [300000, 0, 200], (account) => { return account.options.get(203) }],
    ["Unique_Obols_Found", [107, 2, 250]],
    ["Total_Bubble_LV", [200000, 0, 1000], (account) => { return account.world2.alchemy.cauldrons.getTotalLevels() }],
    ["Total_Vial_LV", [962, 2, 500], (account) => { return account.world2.alchemy.vials.getTotalLevels() }],
    ["Total_Sigil_LV", [72, 2, 250], (account) => { return account.world2.alchemy.sigils.getTotalLevels() }],
    ["Jackpots_Hit_in_Arcade", [1, 0, 50], (account) => { return account.options.get(199) }],
    ["Post_Office_PO_Boxes_Earned", [20000, 0, 300], (account) => { return account.general.currencies.get("PO_Box") }],
    ["Highest_Killroy_Score_on_a_Warrior", [3000, 0, 200], (account) => { return account.options.get(204) }],
    ["Highest_Killroy_Score_on_an_Archer", [3000, 0, 200], (account) => { return account.options.get(205) }],
    ["Highest_Killroy_Score_on_a_Mage", [3000, 0, 200], (account) => { return account.options.get(206) }],
    ["Fastest_Time_to_kill_Chaotic_Efaunt_(in_Seconds)", [10, 3, 200], (account) => { return 1000 - account.options.get(207) }],
    ["Largest_Oak_Log_Printer_Sample", [9, 1, 400], (account) => { return account.options.get(211) }],
    ["Largest_Copper_Ore_Printer_Sample", [9, 1, 400], (account) => { return account.options.get(212) }],
    ["Largest_Spore_Cap_Printer_Sample", [9, 1, 300], (account) => { return account.options.get(213) }],
    ["Largest_Goldfish_Printer_Sample", [9, 1, 300], (account) => { return account.options.get(214) }],
    ["Largest_Fly_Printer_Sample", [9, 1, 300], (account) => { return account.options.get(215) }],
    ["Best_Non_Duplicate_Goblin_Gorefest_Wave", [120, 0, 200], (account) => { return account.options.get(209) }],
    ["Total_Best_Wave_in_Worship", [1000, 0, 300], (account) => { return account.world3.worship.getTotalTDWaves() }],
    ["Total_Digits_of_all_Deathnote_Kills", [700, 0, 600]],
    ["Equinox_Clouds_Completed", [31, 2, 750], (account) => { return account.world3.equinox.getTotalClouds() }],
    ["Total_Refinery_Rank", [120, 0, 450], (account) => { return account.world3.refinery.getTotalRanks() }],
    ["Total_Atom_Upgrade_LV", [150, 0, 400], (account) => { return account.world3.atoms.getTotalLevels() }],
    ["Total_Construct_Buildings_LV", [3000, 0, 600], (account) => { return account.world3.construction.getTotalBuildingLevels() }],
    ["Most_Tottoise_in_Storage", [7, 1, 150]],
    ["Most_Greenstacks_in_Storage", [150, 0, 600], (account) => { return account.options.get(224) }],
    ["Rift_Levels_Completed", [49, 2, 500], (account) => { return account.world4.rift.getLevel() }],
    ["Highest_Power_Pet", [8, 1, 150]],
    ["Fastest_Time_reaching_Round_100_Arena_(in_Seconds)", [50, 3, 180], (account) => { return 1000 - account.options.get(220) }],
    ["Total_Kitchen_Upgrade_LV", [8000, 0, 200], (account) => { return account.world4.cooking.kitchens.getTotalLevels() }],
    ["Total_Shiny_Pet_LV", [750, 0, 250], (account) => { return account.world4.breeding.shiny_pets.getTotalShinyLevels() }],
    ["Total_Cooking_Meals_LV", [5400, 0, 750], (account) => { return account.world4.cooking.meals.getTotalLevels() }],
    ["Total_Pet_Breedability_LV", [500, 2, 200]],
    ["Total_Lab_Chips_Owned", [100, 0, 150]],
    ["Total_Colosseum_Score", [10, 1, 200]],
    ["Most_Giants_Killed_in_a_Single_Week", [25, 0, 250], (account) => { return account.options.get(217) }],
    ["Total_Onyx_Statues", [28, 2, 450], (account) => { return account.world1.statues.getTotalOnyx() }],
    ["Fastest_Time_to_Kill_200_Tremor_Wurms_(in_Seconds)", [30, 3, 150], (account) => { return 1000 - account.options.get(218) }],
    ["Total_Boat_Upgrade_LV", [10000, 0, 200]],
    ["God_Rank_in_Divinity", [10, 0, 200]],
    ["Total_Gaming_Plants_Evolved", [100000, 0, 200]],
    ["Total_Artifacts_Found", [132, 2, 800], (account) => { return account.world5.artifacts.getTotal() }],
    ["Gold_Bar_Sailing_Treasure_Owned", [14, 1, 200]],
    ["Highest_Captain_LV", [25, 0, 150]],
    ["Highest_Immortal_Snail_LV", [25, 2, 150], (account) => { return Math.max(account.options.get(210), 0) }],
    ["Best_Gold_Nugget", [9, 1, 200]],
    ["Items_Found", [1590, 2, 1000]],
    ["Most_Gaming_Bits_Owned", [45, 1, 250]],
    ["Highest_Crop_OG", [6, 1, 200], (account) => { return Math.pow(2, account.options.get(219)) }],
    ["Total_Crops_Discovered", [120, 2, 350]],
    ["Total_Golden_Food_Beanstacks", [28, 2, 400]],
    ["Total_Summoning_Upgrades_LV", [10000, 0, 200]],
    ["Total_Career_Summoning_Wins", [160, 0, 500], (account) => { return account.world6.summoning.battles.getTotalWins() }],
    ["Ninja_Floors_Unlocked", [12, 2, 250]],
    ["Familiars_Owned_in_Summoning", [600, 0, 150]],
    ["Jade_Emporium_Upgrades_Purchased", [38, 2, 500]],
    ["Total_Minigame_Highscore", [450, 2, 100]],
    ["Total_Prayer_Upgrade_LV", [673, 2, 200]],
    ["Total_Land_Rank", [5000, 0, 200]],
    ["Largest_Magic_Bean_Trade", [1000, 0, 200], (account) => { return account.options.get(221) }],
    ["Most_Balls_earned_from_LBoFaF", [1000, 0, 150], (account) => { return account.options.get(222) }],
    ["Total_Arcade_Gold_Ball_Shop_Upgrade_LV", [3800, 2, 300], (account) => { return account.world2.arcade.getTotalGoldBallsLevels() }],
    ["Vault_Upgrade_bonus_LV", [500, 2, 500], (account) => { return account.general.vault.getBonusByName("Teh_TOM") }],
    ["Total_Gambit_Time", [3600, 0, 400]],
    ["Total_Digits_of_all_Cavern_Resources", [500, 0, 750]],
    ["Total_LV_of_Cavern_Villagers", [200, 0, 350]],
    ["Megafeathers_Earned_from_Orion", [12, 0, 100], (account) => { return account.options.get(262) }],
    ["Megafish_Earned_from_Poppy", [12, 0, 100], (account) => { return account.options.get(279) }],
    ["Best_Bravery_Monument_Round", [50, 0, 250], (account) => { return account.world5.hole.getExtraCalc(73) }],
    ["Best_Justice_Monument_Round", [200, 0, 250], (account) => { return account.world5.hole.getExtraCalc(74) }],
    ["Best_Wisdom_Monument_Round", [18, 0, 250], (account) => { return account.world5.hole.getExtraCalc(75) }],
    ["Best_Deathbringer_Max_Damage_in_Wraith_Mode", [9, 1, 400], (account) => { return account.options.get(356) }],
    ["Best_Dawg_Den_score", [7, 1, 250], (account) => { return account.world5.hole.getExtraCalc(8) }],
    ["Total_Resource_Layers_Destroyed", [150, 0, 350]],
    ["Total_Opals_Found", [500, 0, 400], (account) => { return account.world5.hole.caverns.getTotalOpals() }],
    ["Best_Pure_Memory_Round_Reached", [13, 2, 50], (account) => { return Math.round(account.options.get(353) + 1) }],


]


