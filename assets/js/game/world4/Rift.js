import { BaseFeature } from "../BaseFeature.js";

export class Rift extends BaseFeature {

    constructor(account) {
        super(account);
        this.rift_floor_reached = account.save_data["Rift"][0]
        delete account.save_data_pruned["Rift"]
    }

    getLevel() {
        return this.rift_floor_reached
    }
}