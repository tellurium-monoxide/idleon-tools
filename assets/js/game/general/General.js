import { BaseFeature } from "../BaseFeature.js";

import { Vault } from "./Vault.js";
import { Achievements } from "./Achievements.js";
export class General extends BaseFeature {
    vault;
    achievements;
    constructor(account) {
        super(account);
        this.vault = new Vault(account);
        this.achievements = new Achievements(account);

        this.child_features.push(this.vault)
        this.child_features.push(this.achievements)
    }
}