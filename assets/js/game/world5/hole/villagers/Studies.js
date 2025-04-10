import { BaseFeature } from "../../../BaseFeature.js";

export class Conjuror extends BaseFeature {


    constructor(account) {
        super(account);
        let majiks = [
            account.save_data["Holes"][4],
            account.save_data["Holes"][5],
            account.save_data["Holes"][6],
        ]


        console.log(majiks)
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

}