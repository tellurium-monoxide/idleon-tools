import { BaseFeature } from "../BaseFeature.js";

import { Vault } from "./Vault.js";
import { Grimoire } from "./Grimoire.js";
import { TaskBoard } from "./TaskBoard/TaskBoard.js";
import { P2W } from "./P2W/P2W.js";
export class General extends BaseFeature {
    vault;
    achievements;
    merits;
    constructor(account) {
        super(account);
        this.vault = new Vault(account);
        this.grimoire = new Grimoire(account);
        this.taskboard = new TaskBoard(account);
        this.p2w = new P2W(account);

        this.child_features.push(this.taskboard)
        this.child_features.push(this.p2w)
        this.child_features.push(this.vault)
        this.child_features.push(this.grimoire)
    }
}