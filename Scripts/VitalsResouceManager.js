import {Resource_Manager, items} from "./ResourceManager.js";

class Vitals_Resource_Manager extends Resource_Manager{

    static Player_Vitals = new Vitals_Resource_Manager();

    static vitalsCap = 100;
    static vitalsReplenishRate = 10;

    constructor(){
        super();
    }

    addItem(item, amount){
        var itemAmount = this.getItemCount(item);

        if(item != items.WATER && item != items.FOOD && item != items.AIR){
            console.log("%cCANNOT ADD " + amount + " " + item + "(s) TO VITALS INVENTORY", "color='red'");
        }
        else if(itemAmount >= Vitals_Resource_Manager.vitalsCap){
            console.log("Reached item cap for " + item);
        }
        else if(itemAmount + amount > Vitals_Resource_Manager.vitalsCap) {
            var adjustedAmount = amount - (amount + itemAmount - Vitals_Resource_Manager.vitalsCap);
            super.addItem(item, adjustedAmount);
        }
        else{
            super.addItem(item, amount);
        }
    }

    // Checks if any vitals are low
    checkVitals() {
        if (this.getItemCount(items.AIR) <= 0 || this.getItemCount(items.FOOD) <= 0 || this.getItemCount(items.WATER) <= 0) {
            return false;
        } else {
            return true;
        }
    }

    addDailyVitals(){
        var amount = Vitals_Resource_Manager.vitalsReplenishRate;
        this.addItem(items.AIR, amount);
        this.addItem(items.WATER, amount);
        this.addItem(items.FOOD, amount);
    }

}

export {Vitals_Resource_Manager}