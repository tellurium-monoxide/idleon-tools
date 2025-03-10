import { BaseFeature } from "../../BaseFeature.js";

import { Kitchens } from "./Kitchens.js";
import { Meals } from "./Meals.js";
export class Cooking extends BaseFeature {

    kitchens;
    meals;

    constructor(account) {
        super(account);
        this.meals = new Meals(account)
        this.kitchens = new Kitchens(account)

        this.child_features.push(this.meals)
        this.child_features.push(this.kitchens)
    }
}