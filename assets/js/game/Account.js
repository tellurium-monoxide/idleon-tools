
import { World1 } from "./world1/World1.js";
import { World2 } from "./world2/World2.js";
import { World3 } from "./world3/World3.js";
import { World4 } from "./world4/World4.js";

import { Achievements } from "./general/Achievements.js";

export class Account {
    save_data;
    world1;
    world2;
    world3;
    world4;
    world5;
    world6;
    achievements;
    constructor(save_data) {
        this.save_data = save_data

        this.world1 = new World1(this);
        this.world2 = new World2(this);
        this.world3 = new World3(this);
        this.world4 = new World4(this);
        // this.world5 = new World5(this);
        // this.world6 = new World6(this);
        this.achievements = new Achievements(this);
    }
}