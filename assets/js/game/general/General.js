import { BaseFeature } from "../BaseFeature.js";

import { Vault } from "./Vault.js";
import { Achievements } from "./TaskBoard/Achievements.js";
import { Merits } from "./TaskBoard/Merits.js";
export class General extends BaseFeature {
    vault;
    achievements;
    merits;
    constructor(account) {
        super(account);
        this.vault = new Vault(account);
        this.achievements = new Achievements(account);
        this.merits = new Merits(account);

        this.child_features.push(this.vault)
        this.child_features.push(this.achievements)
        this.child_features.push(this.merits)
    }
}