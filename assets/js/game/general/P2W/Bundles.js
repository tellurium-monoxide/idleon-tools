import { BaseFeature } from "../../BaseFeature.js";


export class Bundles extends BaseFeature {

    constructor(account) {
        super(account);
        let bundles = account.save_data["BundlesReceived"]
        delete account.save_data_pruned["BundlesReceived"]
    }
}