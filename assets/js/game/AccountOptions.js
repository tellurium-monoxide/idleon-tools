import { BaseFeature } from "./BaseFeature.js";

export class AccountOptions extends BaseFeature {


    constructor(account) {
        super(account);

        this.options_values = account.save_data["OptLacc"]
    }

    test() {
        console.log(this.options_values)
    }


    get(index) {
        return this.options_values[index]
    }
}


