import { BaseFeature } from "./BaseFeature.js";
import { World1 } from "./world1/World1.js";
import { World2 } from "./world2/World2.js";
import { World3 } from "./world3/World3.js";
import { World4 } from "./world4/World4.js";
import { World5 } from "./world5/World5.js";
import { World6 } from "./world6/World6.js";

import { General } from "./general/General.js";

import { Characters } from "./characters/Characters.js";
import { AccountOptions } from "./AccountOptions.js";

export class Account extends BaseFeature {
    save_data;
    world1;
    world2;
    world3;
    world4;
    world5;
    world6;
    general;
    characters;
    options;

    constructor(save_data) {
        super()

        this.modified = false

        this.save_data = save_data

        this.world1 = new World1(this);
        this.world2 = new World2(this);
        this.world3 = new World3(this);
        this.world4 = new World4(this);
        this.world5 = new World5(this);
        this.world6 = new World6(this);

        this.general = new General(this);
        this.characters = new Characters(this);

        this.options = new AccountOptions(this);

        this.child_features.push(this.world5)
        this.child_features.push(this.world1)
        this.child_features.push(this.world2)
        this.child_features.push(this.world3)
        this.child_features.push(this.world4)
        this.child_features.push(this.world6)
        this.child_features.push(this.general)
        this.child_features.push(this.characters)
        this.child_features.push(this.options)

        // must be at the end (or at least after all child features are added)
        super.twoStepInit()
    }

    test(collapsed = true) {
        if (collapsed) {
            console.groupCollapsed(`Testing Account`)
        } else {
            console.group(`Testing Account`)
        }
        super.test(collapsed)
        console.groupEnd()
    }


    setModifiedFromSaveData() {
        this.modified = true
        this.saveToLocalStorage()
    }


    saveToLocalStorage() {
        function replacer(key, value) {
            if (key == "account") return undefined;
            if (key == "child_features") return undefined;
            else return value;
        }
        let account_serialized = JSON.stringify(this, replacer)
        console.log(account_serialized)
        console.log(JSON.parse(account_serialized))
        localStorage.setItem("Account", account_serialized);
    }
}