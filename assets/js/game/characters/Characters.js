import { BaseFeature } from "../BaseFeature.js";

import { Character } from "./Character.js";

export class Characters extends BaseFeature {
    char_count;
    constructor(account) {
        super(account);
        this.char_count = account.save_data[`playerNames`].length
        for (let i = 0; i < this.char_count; i++) {
            this[i] = new Character(account, i)
            this.child_features.push(this[i])
        }
        delete account.save_data_pruned["playerNames"]


    }

    test(collapsed = true) {
        console.log(this.getCharactersByClass("Divine_Knight"))
        console.log(this.getHighestCharacterByClass("Divine_Knight"))
        super.test(collapsed)
    }


    getCharactersByClass(class_name) {
        let list = []
        for (let i = 0; i < this.char_count; i++) {
            if (this[i].class_name == class_name) {
                list.push(this[i])
            }
        }
        return list
    }
    getHighestCharacterByClass(class_name) {

        let char = this.getCharactersByClass(class_name)[0]
        for (let i = 0; i < this.char_count; i++) {
            if (this[i].class_name == class_name && this[i].class_level > char.class_level) {
                char = this[i]
            }
        }
        return char
    }


    getCharacterByIndex(i) {
        return this[i]
    }

    getTotalClassLevels() {
        let total = 0
        for (let i = 0; i < this.char_count; i++) {
            total += this[i].class_level
        }
        return total
    }

    reduceOnChars(func, start = 0) {
        let acc = start
        for (let i = 0; i < this.char_count; i++) {
            acc = func(acc, this[i])
        }
        return acc
    }

}