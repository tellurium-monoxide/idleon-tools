import { BaseFeature } from "../../BaseFeature.js";

export class Battles extends BaseFeature {


    constructor(account) {
        super(account);

        let summoning_data = account.save_data["Summon"]
        console.log(summoning_data)


        this.battles_won = Array(DATA_SUMMON_BATTLES.length).fill(false)

        for (let [ind, battle] of DATA_SUMMON_BATTLES.entries()) {
            let [enemy, name, bonus, category] = battle
            if (summoning_data[1].includes(enemy)) {
                this.battles_won[ind] = true
            }

        }


    }



    test() {
        console.log(this.getBonusByStat("Library_Max"))
    }

    getTotalWins() {
        let wins = this.battles_won.reduce((a, b) => (a + b), 0)

        return (wins + this.account.options.get(319))

    }

    getBonusByStat(stat_name) {
        let statIndex = this.findStatIndex(stat_name)
        let true_name = DATA_SUMMON_BONUSES[statIndex]
        let accBonus = 0
        for (let [ind, won] of this.battles_won.entries()) {
            let [enemy, name, bonus, category] = DATA_SUMMON_BATTLES[ind]
            if (won && bonus[0] == statIndex) {
                accBonus += bonus[1]
            }
        }

        let endless_battles_won = this.account.options.get(319)
        for (let i = 0; i < endless_battles_won; i++) {
            let bonus = DATA_ENDLESS[i % 40]
            if (bonus[0] == statIndex) {
                accBonus += bonus[1]
            }
        }

        // get winner bonus factors
        const charmBonus = this.account.world6.sneaking.charms.getBonusByName("CRYSTAL_COMB")
        const artifactBonus = this.account.world5.artifacts.getBonusByName("THE_WINZ_LANTERN")
        const meritBonus = this.account.general.merits.getMeritLevel(6, 5) / 100
        const achiev1 = this.account.general.achievements.getAchievByName("Spectre_Stars") / 100
        const achiev2 = this.account.general.achievements.getAchievByName("Regalis_My_Beloved") / 100
        // multiply by winner bonus multi
        if (["+{_STAMP_LV/DAY", "+{%_BALLOT_BONUS", "+{_EQUINOX_MAX_LV", "<X_WINNER_BONUSES"].includes(true_name)) {

        } else if (true_name == "+{_LIBRARY_MAX") {
            accBonus *= (1 + charmBonus)
            accBonus *= (1 + artifactBonus + meritBonus + achiev1 + achiev2);



        } else if (statIndex >= 20 && statIndex <= 33) {
            const summoningBonus = this.getBonusByStat("Winner_Bonuses")

            accBonus *= (1 + charmBonus)
            accBonus *= (1 + artifactBonus + meritBonus + achiev1 + achiev2 + summoningBonus);


        } else {
            const summoningBonus = this.getBonusByStat("Winner_Bonuses")
            accBonus *= (1 + charmBonus)
            accBonus *= (1 + artifactBonus + meritBonus + achiev1 + achiev2 + summoningBonus);


        }

        return accBonus;
    }

    findStatIndex(stat_name) {
        for (let [ind, stat] of DATA_SUMMON_BONUSES.entries()) {
            if (stat.includes(stat_name.toUpperCase())) {
                return ind
            }
        }

    }

    getDisplay() {

        let tab = document.createElement("div")
        tab.classList.add("jquery-tab")
        let header = tab.appendChild(document.createElement("ul"))

        for (let [indCat, battle_category] of DATA_BATTLE_CATEGORIES.entries()) {
            let li = header.appendChild(document.createElement("li"))
            let a = li.appendChild(document.createElement("a"))
            let ref = `tab_summon_battles_${battle_category}`
            a.href = `#${ref}`
            a.innerHTML = `${battle_category}`



            let tab_content = tab.appendChild(document.createElement("div"))
            tab_content.id = ref


            let table = tab_content.appendChild(document.createElement("table"))
            table.classList.add("outlined")


            for (let [ind, battle] of DATA_SUMMON_BATTLES.entries()) {
                let [enemy, name, bonus, category] = battle

                if (category == indCat) {
                    let row = table.appendChild(document.createElement("tr"))

                    let elem = row.appendChild(document.createElement("td"))
                    elem.innerText = name

                    elem = row.appendChild(document.createElement("td"))
                    let checkbox = elem.appendChild(document.createElement("input"))
                    checkbox.type = "checkbox"
                    checkbox.checked = this.battles_won[ind]
                    checkbox.addEventListener("input", (event) => {
                        console.log("change summoning win", name, this.battles_won[ind], "to", checkbox.checked)
                        this.battles_won[ind] = checkbox.checked
                        this.account.setModifiedFromSaveData()
                    });

                    elem = row.appendChild(document.createElement("td"))
                    elem.innerText = DATA_SUMMON_BONUSES[bonus[0]]
                    elem = row.appendChild(document.createElement("td"))
                    elem.innerText = (bonus[1]).toFixed(2)
                }
            }



        }

        // endless
        let li = header.appendChild(document.createElement("li"))
        let a = li.appendChild(document.createElement("a"))
        let ref = `tab_summon_battles_endless`
        a.href = `#${ref}`
        a.innerHTML = "Endless"



        let tab_content = tab.appendChild(document.createElement("div"))
        tab_content.id = ref

        let input = tab_content.appendChild(document.createElement("input"))
        input.type = 'number'
        input.min = 0
        input.value = this.account.options.get(319)
        input.addEventListener("input", (event) => {
            console.log("change endless wins", this.account.options.get(319), "to", Number(input.value))
            this.account.options.set(319, Number(input.value))
            this.account.setModifiedFromSaveData()
        });

        let table = tab_content.appendChild(document.createElement("table"))
        table.classList.add("outlined")
        for (let [ind, bonus] of DATA_ENDLESS.entries()) {
            let name = DATA_SUMMON_BONUSES[bonus[0]]

            let row = table.appendChild(document.createElement("tr"))
            let elem = row.appendChild(document.createElement("td"))
            elem.innerText = name
            elem = row.appendChild(document.createElement("td"))
            elem.innerText = bonus[1].toFixed(2)
        }



        return tab

    }
}

export const DATA_SUMMON_BONUSES = ["<X_TOTAL_DMG", "<X_JADE_GAIN", "<X_FARMING_SPD", "<X_ARTIFACT_FIND", "+{_LAB_CON_RANGE", "<X_ALL_ESSENCE", "<X_SNEAK_EXP", "<X_SIGIL_SPD", "<X_FARMING_EXP", "+{%_DROP_RATE", "<X_CROP_EVO", "+{%_AFK_GAINS", "+{%_SKILL_EXP", "<X_CONSTRUCT_SPD", "<X_SKILL_EFFICIENCY", "<X_COOKING_SPD", "<X_GAMING_BITS", "<X_SHINY_EXP", "+{%_ALL_STAT", "+{_LIBRARY_MAX", "+{_STAMP_LV/DAY", "+{%_VILLAGER_EXP", "+{%_BALLOT_BONUS", "+{%_CLASS_EXP", "+{_EQUINOX_MAX_LV", "+{%_MONUMENT_AFK", "<X_MEAL_BONUSES", "+{%_FOR_WORLD_7", "+{%_FOR_WORLD_7", "+{%_FOR_WORLD_7", "+{%_FOR_WORLD_7", "<X_WINNER_BONUSES"]


// each is [bonus id, bonus qtt]
export const DATA_ENDLESS = [[20, 1], [21, 0.03], [22, 0.01], [23, 0.12], [24, 1], [26, 0.07], [22, 0.02], [21, 0.04], [23, 0.15], [28, 0.1], [24, 1], [25, 0.04], [23, 0.18], [22, 0.02], [21, 0.04], [31, 0.03], [29, 0.2], [30, 0.25], [24, 2], [23, 0.2], [25, 0.05], [28, 0.3], [23, 0.24], [21, 0.04], [20, 1], [22, 0.02], [30, 0.02], [27, 0.35], [26, 0.09], [23, 0.26], [25, 0.05], [21, 0.05], [29, 0.4], [24, 1], [28, 0.45], [27, 0.5], [22, 0.02], [25, 0.06], [23, 0.3], [31, 0.03]]

const DATA_BATTLE_CATEGORIES = ["White", "Green", "Yellow", "Blue", "Purple", "Red", "Cyan"]
const DATA_SUMMON_BATTLES = [
    ["Pet1", "Pablo_and_his_Plump_Piggies", [0, 0.28], 0],
    ["Pet2", "Gam3rPr0digy_and_their_Boar_Stampede", [1, 0.525], 0],
    ["Pet3", "Donald_and_his_Quacky_Ducks", [2, 0.105], 0],
    ["Pet0", "Sandy_and_her_Nutty_Squirrels", [5, 0.245], 0],
    ["Pet4", "Popo_and_their_Largest_of_Mammalians", [3, 0.525], 0],
    ["Pet6", "Little_Susie_and_her_Bunny_Family", [1, 0.875], 0],
    ["Pet5", "MoveFan84_and_his_Famous_Nacho_Batallion", [0, 0.42], 0],
    ["Pet10", "Ronaldo_and_his_Cool_Freakin'_Birdz", [4, 1.05], 0],
    ["Pet11", "Master_Oogman_and_his_Speedy_Hedgehogs", [2, 0.14], 0],

    ["mushG", "Jonesy_and_his_Lil_Mushies", [0, 0.525], 1],
    ["mushR", "Walter_and_his_Lil_Shrooms", [6, 0.35], 1],
    ["frogG", "Lex_and_her_Hoppy_Frogs", [1, 1.05], 1],
    ["beanG", "Bongo_and_his_Lazy_Beans", [0, 0.56], 1],
    ["slimeG", "Sam_and_his_Goopy_Slimes", [4, 1.05], 1],
    ["snakeG", "Mika_and_his_Itty_Bitty_Baby_Boas", [1, 1.225], 1],
    ["carrotO", "Guy_Montag_and_his_Walking_Veggies", [2, 0.175], 1],
    ["goblinG", "Gork_and_his_Ugly_Glublins", [3, 0.7], 1],
    ["plank", "Ed_and_his_Stolen_Planks", [7, 0.35], 1],
    ["frogBIG", "Gigachad_and_his_Awesome_Gigafrogs", [4, 1.05], 1],
    ["poopSmall", "TP_Pete_Jr_and_his_Battle_Poops", [5, 0.525], 1],
    ["ratB", "Michael_and_his_Rodents", [3, 0.525], 1],
    ["branch", "Kyle_and_his_Branch_Brigade", [2, 0.14], 1],
    ["acorn", "Aaron_and_his_Aacorn_Gang", [5, 0.7], 1],
    ["mushW", "Kip_and_his_Lil_Fungi", [0, 0.665], 1],

    ["jarSand", "Karen_and_her_Pots", [8, 0.175], 2],
    ["mimicA", "Jimmy_and_his_Enthusiastic_Mimics", [6, 0.525], 2],
    ["crabcake", "Eugene_and_his_Frosted_Crabs", [9, 7], 2],
    ["coconut", "Nobby_and_his_Gang_of_Nuts", [1, 1.4], 2],
    ["sandcastle", "Tiny_Tim_and_his_Cool_Castles", [7, 0.525], 2],
    ["pincermin", "Tira_and_her_Shrewd_Pincermen", [6, 0.875], 2],
    ["potato", "Misha_and_her_Super_Spuds", [2, 0.21], 2],
    ["steak", "Wlad_and_his_Rootin'_Tootin'_Tysons", [4, 1.05], 2],
    ["moonman", "Mac_and_his_Many_Moonmoons", [10, 0.35], 2],
    ["sandgiant", "Sir_Reginald_and_his_Gentlemen_Giants", [3, 0.7], 2],
    ["snailZ", "Shelby_and_her_Shelled_Snelbies", [0, 0.875], 2],

    ["sheep", "Paulie_and_his_Sheepie_Herd", [11, 0.035], 3],
    ["flake", "Dirk_and_his_Celsius_Flakes", [8, 0.35], 3],
    ["stache", "Mr_Harrison_and_his_Mighty_Staches", [5, 1.05], 3],
    ["bloque", "Gibby_and_his_Bloque_Offensive", [0, 1.05], 3],
    ["mamoth", "Esther_and_her_Trampler_Mamooths", [7, 0.525], 3],
    ["snowball", "Frosty_and_his_Relatives", [12, 0.35], 3],
    ["penguin", "The_Accountant_and_his_Trusty_Penguins", [1, 1.75], 3],
    ["thermostat", "Fermi_and_his_Thermies", [3, 0.7], 3],
    ["glass", "Kristen_and_her_Chill_Quenchies", [9, 0.105], 3],
    ["snakeB", "Rob_and_his_Ice_Cold_Killer_Snakes", [13, 1.05], 3],
    ["speaker", "Lil_Plump_and_his_Dope_Bops", [14, 0.35], 3],
    ["eye", "Nadia_and_her_All_Seeing_Eyes", [6, 1.05], 3],
    ["ram", "Shepherd_and_his_Flock_of_Rams", [4, 1.05], 3],
    ["skele2", "Brody_and_his_Infamous_Bloodbones", [10, 0.525], 3],

    ["mushP", "ProXD_and_his_Mushrooms_of_Mischief", [15, 1.75], 4],
    ["w4a2", "Tallie_and_her_Rambunctious_TVs", [8, 0.525], 4],
    ["w4a3", "Homer_and_his_Epic_Donuts", [0, 1.225], 4],
    ["demonP", "Nostalgo_and_his_Genies_of_Olde", [2, 0.21], 4],
    ["w4b2", "Dalia_and_her_Hyperactive_Drinks", [11, 0.07], 4],
    ["w4b1", "Werm_and_his_Worms", [5, 1.225], 4],
    ["w4b3", "JelloL0ver87_and_his_Beloved_Gel_Cubes", [7, 0.7], 4],
    ["w4b4", "Megacorp_Representative_and_his_Product", [12, 0.525], 4],
    ["w4b5", "Werm's_Stepsister_and_her_Worms", [0, 1.75], 4],
    ["w4c1", "DQ_and_their_abandoned_Clammies", [1, 2.625], 4],
    ["w4c2", "Dee_and_her_'dars", [3, 0.875], 4],
    ["w4c3", "Gordon_and_his_Eloquent_Flombeiges", [9, 17.5], 4],
    ["w4c4", "Giuseppe_and_his_Power_Tools", [13, 2.1], 4],

    ["w5a1", "Jawz_and_his_Hot_Smokin_Suggmas", [16, 1.05], 5],
    ["w5a2", "Macdonald_and_his_Homemade_Maccies", [14, 0.35], 5],
    ["w5a3", "Brandon_and_his_Iconic_Brightsides", [0, 1.4], 5],
    ["w5a4", "Lola_and_her_Crazy_Crackers", [4, 1.05], 5],
    ["w5a5", "Mr_M_and_his_Holey_Moleys", [10, 0.875], 5],
    ["w5b1", "The_Don's_Molto_Bene_Moltis", [15, 3.15], 5],
    ["w5b2", "Smoggy_Shaman_and_their_Scary_Bones", [6, 1.05], 5],
    ["w5b3", "Thomas_and_his_Halftime_Breakforce", [17, 0.875], 5],
    ["w5b4", "Larry_and_his_Lava_Lamps", [8, 0.875], 5],
    ["w5b5", "OwO_and_their_Spirit_Army", [2, 0.245], 5],
    ["w5b6", "Briggs_and_his_Mole_Workforce", [5, 0.875], 5],
    ["w5c1", "Krepe_and_his_Crawlies", [3, 0.525], 5],
    ["w5c2", "Grinder23_and_his_Favorite_Mobs", [9, 35], 5],

    ["w6a1", "Spiffy_Jr_and_their_Whelming_Liquids", [18, 0.105], 6],
    ["w6a2", "iFarm_and_their_0cal_Units", [1, 1.75], 6],
    ["w6a3", "Spiffy_Sr_and_his_Bigtime_Liquids", [7, 0.7], 6],
    ["w6a4", "Bart_and_his_Trollsquad", [11, 0.07], 6],
    ["w6a5", "Grunkle_and_their_Rooted_Whimsy", [13, 2.8], 6],
    ["w6b1", "Barb_and_her_Overworked_Blobs", [12, 0.7], 6],
    ["w6b2", "Lumi_and_her_Bright_Lights", [0, 2.1], 6],
    ["w6b3", "Marge_and_her_Troll_Patrol", [15, 4.2], 6],
    ["w6b4", "Lief_and_his_Overzealous_Leeks", [4, 1.05], 6],
    ["w6c1", "Seru_and_their_Ceramic_Entities", [14, 0.7], 6],
    ["w6c2", "Mr_Walker_and_his_Untiring_Doggies", [16, 1.75], 6],
    ["w6d1", "Duke_of_Yolk_and_his_Subjects", [2, 0.28], 6],
    ["w6d2", "Sorel_and_her_Esteemed_Sludge", [17, 2.45], 6],
    ["w6d3", "Shinji_and_his_Inevitable_Army", [19, 10.5], 6],

    // ["poopD", "Bob_and_his_Boops_of_Death", [5, 25], 7],

    // ["rift1", "ENIGMA_INFINITE_and_their_Rift_Spookers", [20, 1], 7],
    // ["rift2", "ENIGMA_INFINITE_and_their_Rift_Slugs", [21, 3], 7],
    // ["rift3", "ENIGMA_INFINITE_and_their_Rift_Jocunds", [22, 1], 7],
    // ["rift4", "ENIGMA_INFINITE_and_their_Rift_Hiveminds", [23, 12], 7],
    // ["rift5", "ENIGMA_INFINITE_and_their_Rift_Stalkers", [24, 1], 7]
]