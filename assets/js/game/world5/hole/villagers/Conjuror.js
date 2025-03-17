import { BaseFeature } from "../../../BaseFeature.js";

export class Conjuror extends BaseFeature {


    constructor(account) {
        super(account);
        let majiks = [
            account.save_data["Holes"][4],
            account.save_data["Holes"][5],
            account.save_data["Holes"][6],
        ]



        this.majik_points = []
        this.map_name_to_indexes = {}

        for (let [ind, category] of DATA_MAJIKS.entries()) {
            this.majik_points.push([])
            for (let [ind2, majik] of category.entries()) {
                this.majik_points[ind].push(majiks[ind][ind2])
                this.map_name_to_indexes[majik[0]] = [ind, ind2]
            }
        }


    }

    test() {

    }

    getLevelByName(name) {
        if (name in this.map_name_to_indexes) {
            let [ind, ind2] = this.map_name_to_indexes[name]
            return this.majik_points[ind][ind2]
        }
        throw new Error(`${name} is not a valid majik`)
    }

    getDisplay() {

        let tab = document.createElement("div")
        tab.classList.add("jquery-tab")
        let header = tab.appendChild(document.createElement("ul"))



        for (let [ind, category] of DATA_MAJIKS.entries()) {

            let li = header.appendChild(document.createElement("li"))
            let a = li.appendChild(document.createElement("a"))

            let ref = `tab_majiks_${DATA_MAJIK_CATEGORIES[ind]}`
            a.href = `#${ref}`
            a.innerHTML = `${DATA_MAJIK_CATEGORIES[ind]} Majik`



            let tab_content = tab.appendChild(document.createElement("div"))
            tab_content.id = ref


            let table = tab_content.appendChild(document.createElement("table"))
            table.classList.add("outlined")


            for (let [ind2, majik] of category.entries()) {

                let row = table.appendChild(document.createElement("tr"))

                let points = this.majik_points[ind][ind2]
                let [name, max] = majik

                let elem = row.appendChild(document.createElement("td"))
                elem.innerHTML = name

                elem = row.appendChild(document.createElement("td"))

                let input_points = elem.appendChild(document.createElement("input"))
                input_points.min = 0
                input_points.max = max
                input_points.value = points
                new InputSpinner(input_points, { "inputSize": 5 })
                input_points.addEventListener("input", (event) => {
                    console.log("change majik", name, "points from", this.majik_points[ind][ind2], "to", Number(input_points.value))
                    this.majik_points[ind][ind2] = Number(input_points.value)
                    this.account.setModifiedFromSaveData()
                });


            }

        }

        return tab
    }

}

const DATA_MAJIK_CATEGORIES = ["Hole", "Village", "Idleon"]
const DATA_MAJIKS = [
    [
        ["MONUMENTAL_VIBES", 4],
        ["STRING_IS_STRUNG", 5],
        ["WISHY_WASHY", 3],
        ["RUPIES_EVERYWHERE", 5],
    ],
    [
        ["OPAL_ENTHUSIASM", 5],
        ["CONTENTED_CREATOR", 4],
        ["COSMO,_ENHANCE!", 3],
        ["LENGTHMEISTER", 4],
        ["STUDY_ALL_NIGHTER", 5],
        ["EQUAL_SPREAD", 4],
    ],
    [
        ["POCKET_DIVINITY", 5],
        ["BEEG_BEEG_FORGE", 4],
        ["RESOURCE_BURSTING", 3],
        ["VOTER_INTEGRITY", 4],
        ["WEAPON_RELEVANCY", 5],
        ["EQUINOX_MAXIM", 4],
    ],
]