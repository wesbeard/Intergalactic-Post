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
            this.rm = rm;
        }
        else{
            console.log("vitals was not given a resource manager");
        }
        this.wounded = false;
        this.currentCondition = conditions.CRITICAL;
    }

    get checkCondition(){

        var thirsty = false;
        var hungery = false;
        var aired = false;
        
        if(this.rm.getItemCount(items.AIR) <= LIMIT){
            aired = true;
        }
        if(this.rm.getItemCount(items.WATER) <= LIMIT){
            thirsty = true;
        }
        if(this.rm.getItemCount(items.FOOD) <= LIMIT){
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

    getCondition(){
        this.currentCondition = this.checkCondition;
        if(this.currentCondition != conditions.HEALTHY){
            return "<p class='vital-category flash-red'>Status: " + this.currentCondition + "</p>";
        }
        else{
            return "<p class='vital-category'>Status: " + this.currentCondition + "</p>"
        }
    }

    getAir(){
        var count = this.rm.getItemCount(items.AIR);
        var classes = "vital-category ";
        if(count <= LIMIT){
            classes += "flash-red"
        }

        return "<p class='"+classes+"'>Air: " + count + "/100</p>";
    }

    getFood(){
        var count = this.rm.getItemCount(items.FOOD);
        var classes = "vital-category ";
        if(count <= LIMIT){
            classes += "flash-red"
        }

        return "<p class='"+classes+"'>Food: " + count + "/100</p>";
    }

    getWater(){
        var count = this.rm.getItemCount(items.WATER);
        var classes = "vital-category ";
        if(count <= LIMIT){
            classes += "flash-red"
        }

        return "<p class='"+classes+"'>Water: " + count + "/100</p>";
    }

    setWounded(wounded){
        this.wounded = wounded;
    }

}

export {Vitals}