import { BaseFeature } from "../BaseFeature.js";

import { Arcade } from "./Arcade.js";
import { Alchemy } from "./alchemy/Alchemy.js";

export class World2 extends BaseFeature {

    alchemy;
    arcade;

    constructor(account) {
        super(account);

        this.alchemy = new Alchemy(account);
        this.arcade = new Arcade(account);

        this.child_features.push(this.alchemy)
        this.child_features.push(this.arcade)
    }


}