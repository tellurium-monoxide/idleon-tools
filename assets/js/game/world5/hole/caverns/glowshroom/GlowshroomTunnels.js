import { BaseFeature } from "../../../../BaseFeature.js";

import { Harp } from "./Harp.js";
import { Lamp } from "./Lamp.js";
import { Hive } from "./Hive.js";
import { Grotto } from "./Grotto.js";
import { Justice } from "./Justice.js";

export class GlowshroomTunnels extends BaseFeature {


    constructor(account) {
        super(account);

        this.harp = new Harp(account)
        this.lamp = new Lamp(account)
        this.hive = new Hive(account)
        this.grotto = new Grotto(account)
        this.justice = new Justice(account)
        this.child_features.push(this.harp)
        this.child_features.push(this.lamp)
        this.child_features.push(this.hive)
        this.child_features.push(this.grotto)
        this.child_features.push(this.justice)

    }

}