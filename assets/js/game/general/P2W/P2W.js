import { BaseFeature } from "../../BaseFeature.js";

import { Bundles } from "./Bundles.js";
import { GemShop } from "./GemShop.js";
export class P2W extends BaseFeature {

    constructor(account) {
        super(account);
        this.bundles = new Bundles(account);
        this.gemshop = new GemShop(account);

        this.child_features.push(this.gemshop)
        this.child_features.push(this.bundles)


        this.server_gems = account.save_data["ServerGems"]
        this.server_gems_recv = account.save_data["ServerGemsReceived"]
        delete account.save_data_pruned["ServerGems"]
        delete account.save_data_pruned["ServerGemsReceived"]
    }
}