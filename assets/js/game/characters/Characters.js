import { BaseFeature } from "../BaseFeature.js";

import { Character } from "./Character.js";

export class Characters extends BaseFeature {

    constructor(account) {
        super(account);
        for (let i = 0; i < 10; i++) {
            this[i] = new Character(account, i)
            this.child_features.push(this[i])
        }


    }


    getCharactersByClass(class_name) {
        // TODO
        let list = []
        for (let i = 0; i < 10; i++) {
            if (false) {
                list.push(this[i])
            }
        }
        return list
    }


    getCharacterByIndex(i) {
        return this[i]
    }

}