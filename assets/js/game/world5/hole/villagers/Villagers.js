import { BaseFeature } from "../../../BaseFeature.js";

import { Engineer } from "./Engineer.js";
export class Villagers extends BaseFeature {


    constructor(account) {
        super(account);

        this.engineer = new Engineer(account)

        this.child_features.push(this.engineer)

    }

}