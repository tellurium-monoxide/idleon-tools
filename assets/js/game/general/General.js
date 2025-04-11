import { BaseFeature } from "../BaseFeature.js";

import { Vault } from "./Vault.js";
import { Grimoire } from "./Grimoire.js";
import { Achievements } from "./TaskBoard/Achievements.js";
import { Merits } from "./TaskBoard/Merits.js";
import { P2W } from "./P2W/P2W.js";
export class General extends BaseFeature {
    vault;
    achievements;
    merits;
    constructor(account) {
        super(account);
        this.vault = new Vault(account);
        this.grimoire = new Grimoire(account);
        this.achievements = new Achievements(account);
        this.merits = new Merits(account);
        this.p2w = new P2W(account);

        this.child_features.push(this.vault)
        this.child_features.push(this.grimoire)
        this.child_features.push(this.achievements)
        this.child_features.push(this.merits)
        this.child_features.push(this.p2w)
    }
}