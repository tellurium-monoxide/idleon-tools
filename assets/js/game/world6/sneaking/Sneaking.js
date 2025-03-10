import { BaseFeature } from "../../BaseFeature.js";
import { Charms } from "./Charms.js";
export class Sneaking extends BaseFeature {

    charms;
    constructor(account) {
        super(account);
        this.charms = new Charms(account)

        this.child_features.push(this.charms)
    }


}