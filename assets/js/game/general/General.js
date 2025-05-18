import { BaseFeature } from "../BaseFeature.js";

import { Vault } from "./Vault.js";
import { Grimoire } from "./Grimoire.js";
import { TaskBoard } from "./TaskBoard/TaskBoard.js";
import { P2W } from "./P2W/P2W.js";
import { Guild } from "./Guild.js";
import { Compass } from "./Compass.js";
import { GlobalCurrencies } from "./GlobalCurrencies.js";
export class General extends BaseFeature {
    grimoire;
    compass;
    taskboard;
    p2w;
    vault;
    guild;

    constructor(account) {
        super(account);
        this.vault = new Vault(account);
        this.grimoire = new Grimoire(account);
        this.compass = new Compass(account);
        this.taskboard = new TaskBoard(account);
        this.p2w = new P2W(account);
        this.guild = new Guild(account);
        this.currencies = new GlobalCurrencies(account);

        this.child_features.push(this.grimoire)
        this.child_features.push(this.compass)
        this.child_features.push(this.taskboard)
        this.child_features.push(this.p2w)
        this.child_features.push(this.vault)
        this.child_features.push(this.guild)
        this.child_features.push(this.currencies)
    }
}