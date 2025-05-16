import { BaseFeature } from "../BaseFeature.js";
export class Bribes extends BaseFeature {

    constructor(account) {
        super(account);
        let bribes = (account.save_data["BribeStatus"])
        delete account.save_data_pruned["BribeStatus"]

        this.bribes = []
        this.map_name_to_index = {}
        for (let [ind, brb] of DATA_BRIBES.entries()) {
            this.bribes.push(bribes[ind] == 1)
            this.map_name_to_index[brb[0]] = ind
        }

    }
    has(name) {
        return this.bribes[this.map_name_to_index[name]]
    }
    getDisplay() {
        let display = document.createElement("table")
        for (let [ind, brb] of Object.entries(DATA_BRIBES)) {

            let name = brb[0]
            let row = display.appendChild(document.createElement("tr"))

            let name_cell = row.appendChild(document.createElement("td"))
            name_cell.innerText = name


            let input_cell = row.appendChild(document.createElement("td"))

            let input_base = input_cell.appendChild(document.createElement("input"))
            input_base.type = "checkbox"
            input_base.checked = this.bribes[ind]

            input_base.addEventListener("input", (event) => {
                console.log("change bribe", name, "from", this.bribes[ind], "to", (input_base.checked))
                this.bribes[ind] = (input_base.checked)
                this.account.setModifiedFromSaveData()
            });



        }

        return display
    }
}
const DATA_BRIBES = [
    ["INSIDER_TRADING", 8],
    ["TRACKING_CHIPS", 15],
    ["MANDATORY_FIRE_SALE", 7],
    ["SLEEPING_ON_THE_JOB", 5],
    ["ARTIFICIAL_DEMAND", 10],
    ["THE_ART_OF_THE_DEAL", 6],
    ["OVERSTOCK_REGULATIONS", 20],
    ["DOUBLE_EXP_SCHEME", 2.2],
    ["TAGGED_INDICATORS", 20],
    ["FOSSIL_FUEL_LEGISLATION", 0.2],
    ["FIVE_ACES_IN_THE_DECK", 20],
    ["FAKE_TELEPORT_TICKETS", 3],
    ["THE_ART_OF_THE_STEAL", 13],
    ["COUNTERFEIT_TELEPASSPORTS", 2],
    ["WEIGHTED_MARBLES", 10],
    ["CHANGING_THE_CODE", 1],
    ["TAXIDERMIED_COG_POUCHES", 4],
    ["GUILD_VIP_FRAUD", 10],
    ["LIBRARY_DOUBLE_AGENT", 4],
    ["THE_ART_OF_THE_FAIL", 20],
    ["PHOTOSHOPPED_DMG_RANGE", 2],
    ["GLITCHED_ACC_FORMULA", 2],
    ["FIREWALLED_DEFENCE", 2],
    ["BOTTOMLESS_BAGS", 5],
    ["AFKEYLOGGING", 2],
    ["GUILD_GP_HACK", 10],
    ["THE_ART_OF_THE_BAIL", 27],
    ["RANDOM_GARBAGE", 1],
    ["GODLIER_CREATION", 1],
    ["FISHERMASTER", 1],
    ["MUSCLES_ON_MUSCLES", 2],
    ["BOTTLE_SERVICE", 10],
    ["STAR_SCRAPER", 33],
    ["THE_ART_OF_THE_GRAIL", 34],
    ["ARTIFACT_PILFERING", 20],
    ["FORGE_CAP_SMUGGLING", 30],
    ["GOLD_FROM_LEAD", 10],
    ["NUGGET_FABRICATION", 20],
    ["DIVINE_PTS_MISCOUNTING", 30],
    ["LOOT_TABLE_TAMPERING", 20],
    ["THE_ART_OF_THE_FLAIL", 41]
]
