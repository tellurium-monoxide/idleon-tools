import { BaseFeature } from "../BaseFeature.js";

export class Refinery extends BaseFeature {

    constructor(account) {
        super(account);

        let refinery_data = account.save_data["Refinery"]

        this.salts = Array(6).fill().map((_, i) => ({}));
        this.resources = []

        for (let salt_index = 0; salt_index < 6; salt_index++) {
            let salt = this.salts[salt_index]
            const rank = refinery_data[salt_index + 3][1]
            salt.progress = refinery_data[salt_index + 3][0]
            salt.rank = rank

            salt.index = salt_index;

            salt.data = JSON.parse(JSON.stringify(DATA_SALTS[salt.index]));



        }

    }

    twoStepInit() {
        for (let salt_index = 0; salt_index < 6; salt_index++) {
            let salt = this.salts[salt_index]



            salt.powerPerCycle = this.getPowerPerCycle(salt.rank)
            salt.powerToRankUp = this.getPowerToRankUp(salt.rank)

            salt.cyclesPerRank = Math.ceil(salt.powerToRankUp / salt.powerPerCycle)
            salt.NextCycleBreakpoint = this.calcNextCycleBreakpoint(salt.rank)

            salt.timePerCycle = DATA_CYCLE_BASE_TIMES[salt.data[1]] / this.getRefinerySpeed()
            for (let material of salt.data[2]) {
                this.resources.push(JSON.parse(JSON.stringify(material)))
                const isSalt = material[0].includes("Salts")
                material.costPerCycle = material[1] * Math.floor(Math.pow(salt.rank, (isSalt) ? 1.3 : 1.5))
                material.costPerRank = material.costPerCycle * salt.cyclesPerRank
                material.costPerHour = material.costPerCycle * 3600 / salt.timePerCycle

            }

        }
    }

    test() {
        console.log(this.getRefinerySpeed())
    }


    calcNextCycleBreakpoint(rank) {
        let initialRank = rank
        let powerPerCycle = this.getPowerPerCycle(rank)
        let powerToRankUp = this.getPowerToRankUp(rank)

        let cyclesPerRank = Math.floor(powerToRankUp / powerPerCycle)
        let nextBreakpoint = cyclesPerRank
        while (nextBreakpoint == cyclesPerRank) {
            rank += 1
            powerPerCycle = this.getPowerPerCycle(rank)
            powerToRankUp = this.getPowerToRankUp(rank)
            nextBreakpoint = Math.floor(powerToRankUp / powerPerCycle)
        }
        return {
            rank: rank,
            cyclesPerRank: nextBreakpoint,
            inc: (rank - initialRank)
        }
    }
    getPowerPerCycle(rank) {
        return Math.floor(Math.pow(rank, 1.3));
    }
    getPowerToRankUp(rank) {
        return (rank < DATA_POWER_COSTS.length)
            ? DATA_POWER_COSTS[rank]
            : DATA_POWER_COSTS.at(-1);
    }


    getRefinerySpeed(breakdown = false) {
        let mult = 3 // TODO : lab

        let highestDK = this.account.characters.getHighestCharacterByClass("Divine_Knight")
        let talent_family_bonus = highestDK.talents.getTalentBonusByName("THE_FAMILY_GUY")

        let stamp_bonus = this.account.world1.stamps.getBonusByName("REFINERY_STAMP")
        let bonusBreakdown = [
            { name: 'Base', value: 1, max: 1 },
            { name: 'Vials', value: this.account.world2.alchemy.vials.getBonusByName("Red_Malt"), max: 13 * 0.02 * (1 + 0.02 * 69 + 0.3) },
            { name: 'Salt_lick', value: this.account.world3.salt_lick.getBonusByName("Explosive_Salts") / 100, max: 2 },
            { name: 'Family', value: 0.5 * highestDK.class_level / (150 + highestDK.class_level) * (1 + talent_family_bonus / 100), max: 0.7 },
            { name: 'Sigils', value: this.account.world2.alchemy.sigils.getBonusByName("Pipe_Gauge") / 100, max: 1.5 },
            { name: 'Stamps', value: stamp_bonus, max: stamp_bonus },
            { name: 'Shinies', value: this.account.world4.breeding.shiny_pets.getLevelByEffect("Refinery_Speed") * 0.02, max: 1.2 },
            { name: 'Const_mastery', value: this.account.world3.construction.getTotalBuildingLevels() / 10 / 100, max: 3.67 }, // TODO check unlock in rift
            { name: 'Arcade', value: this.account.world2.arcade.getBonusByStat("Refinery_Speed"), max: 0.3 },
            // { name: 'Vote', value: 0, max: 0 }, // TODO if possible
        ]
        let speed = bonusBreakdown.reduce((a, b) => { return (a + b.value) }, 0)

        if (breakdown) {
            return bonusBreakdown
        } else {
            return (speed) * mult
        }
    }


    getTimePerCycle(category) {
        return DATA_CYCLE_BASE_TIMES[category] / this.getRefinerySpeed()
    }

    getTotalRanks() {
        let tot = 0
        for (let salt_index = 0; salt_index < 6; salt_index++) {
            let salt = this.salts[salt_index]
            tot += salt.rank
        }
        return tot
    }
}

const DATA_SALTS = [
    [
        "Redox_Salts", "Combustion", [["Spore_Cap", 10], ["Copper_ore", 5]]
    ],
    [
        "Explosive_Salts", "Combustion", [["Bullforg_Horn", 10], ["Foret_Fibres", 5], ["Redox_Salts", 2]]
    ],
    [
        "Spontaneity_Salts", "Combustion", [["Pocket_Sand", 50], ["Goldfish", 30], ["Fly", 40], ["Explosive_Salts", 2]]
    ],
    [
        "Dioxide_Salts", "Synthesis", [["Floof_Ploof", 10], ["Dune_Soul", 2], ["Scorpie", 1], ["Spontaneity_Salts", 1]]
    ],
    [
        "Purple_Salts", "Synthesis", [["Cracked_Glass", 25], ["Bloach", 5], ["Sentient_Cereal", 5], ["Mousey", 5], ["Dioxide_Salts", 2]]
    ],
    [
        "Nullo_Salts", "Synthesis", [["Contact_Lense", 50], ["Void_Bar", 5], ["Wispy_Lumber", 5], ["Flycicle", 5], ["Frigid_Soul", 5], ["Purple_Salts", 2]]
    ]
]

const DATA_CYCLE_BASE_TIMES = {
    "Combustion": 900,
    "Synthesis": 3600
}

const DATA_POWER_COSTS = [
    50,
    50,
    200,
    800,
    3000,
    8000,
    14000,
    20000,
    30000,
    40000,
    50000,
    65000,
    80000,
    100000,
    200000,
    300000,
    400000,
    500000,
    600000,
    700000,
    800000,
    900000,
    1000000,
    1000000,
    1000000,
    1000000
]