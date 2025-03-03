import { BaseFeature } from "../../BaseFeature.js";
import { ShinyPets } from "./ShinyPets.js";
export class Breeding extends BaseFeature {

    shiny_pets;
    constructor(account) {
        super(account);
        this.shiny_pets = new ShinyPets(account)

        this.child_features.push(this.shiny_pets)
    }


}