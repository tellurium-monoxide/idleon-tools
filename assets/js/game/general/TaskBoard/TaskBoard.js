import { BaseFeature } from "../../BaseFeature.js";


import { Achievements } from "./Achievements.js";
import { Merits } from "./Merits.js";
import { Tasks } from "./Tasks.js";
export class TaskBoard extends BaseFeature {

    achievements;
    merits;
    constructor(account) {
        super(account);

        this.achievements = new Achievements(account);
        this.merits = new Merits(account);
        this.tasks = new Tasks(account);

        this.child_features.push(this.achievements)
        this.child_features.push(this.merits)
        this.child_features.push(this.tasks)
    }
}