import { BaseFeature } from "../../../BaseFeature.js";

import { Engineer } from "./Engineer.js";
import { Conjuror } from "./Conjuror.js";
import { Measurements } from "./Measurements.js";
export class Villagers extends BaseFeature {


    constructor(account) {
        super(account);

        this.engineer = new Engineer(account)
        this.conjuror = new Conjuror(account)
        this.measurements = new Measurements(account)

        this.child_features.push(this.measurements)
        this.child_features.push(this.engineer)
        this.child_features.push(this.conjuror)

    }

}