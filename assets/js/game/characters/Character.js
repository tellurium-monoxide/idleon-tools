import { BaseFeature } from "../BaseFeature.js";


export class Character extends BaseFeature {
    char_index;
    constructor(account, char_index) {
        super(account);

        let char_names = account.save_data[`playerNames`]
        this.char_index = char_index
        this.char_name = char_names[char_index]
        this.props = {}



        for (let [prop_name, prop] of Object.entries(account.save_data)) {

            if (prop_name.endsWith(`_${this.char_index}`)) {
                this.props[prop_name] = prop
            }
        }

    }

    test() {
        console.log("Char number:", this.char_index)
        console.log(this.props)
    }
    getFeatureName() {
        return this.char_name
    }
}