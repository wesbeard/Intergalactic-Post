import {Resource_Manager, items} from './ResourceManager.js';

const conditions = {
    HEALTHY: "Healthy", //perfect food, water, air
    HUNGRY: "Hungry", //needs food
    THIRSTY: "Thirsty", //needs water
    DIZZY: "Dizzy", //needs air
    WOUNDED: "Wounded", //maybe happens during event but wears off over time or with drugs?
    MALNOURISHED: "Malnourished", //needs food and water
    CRITICAL: "Critical", //needs food water and air
    HE_NEEDS_SOME_MILK: "He NEEDS some milk" //this boy is about to friggin die (all bad status effects)
}

const LIMIT = 20;

class Vitals{

    constructor(rm){
        if(rm instanceof Resource_Manager){
            this.ResourceManager = Resource_Manager(rm);
        }
        else{
            console.log("vitals was not given a resource manager");
        }
        this.wounded = true;
        this.currentCondition = conditions.CRITICAL;
    }

    get checkCondition(){

        var thirsty = false;
        var hungery = false;
        var aired = false;
        
        if(rm.getItemCount(items.AIR) <= LIMIT){
            aired = true;
        }
        if(rm.getItemCount(items.WATER) <= LIMIT){
            thirsty = true;
        }
        if(rm.getItemCount(items.FOOD) <= LIMIT){
            hungery = true;
        }

        if(thirsty && hungery && aired && this.wounded){
            return conditions.HE_NEEDS_SOME_MILK;
        }
        else if(thirsty && hungery && aired){
            return conditions.CRITICAL;
        }
        else if(this.wounded){
            return conditions.WOUNDED;
        }
        else if(thirsty && hungery){
            return conditions.MALNOURISHED;
        }
        else if(aired){
            return conditions.DIZZY;
        }
        else if(thirsty){
            return conditions.THIRSTY;
        }
        else if(hungery){
            return conditions.HUNGRY;
        }
        else{
            return conditions.HEALTHY;
        }

    }

}