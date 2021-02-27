const items = {
    FOOD: "Food",
    WATER: "Water",
    MECHANICAL_PARTS: "Mechanical parts",
    CIRCUT_BOARDS: "Circuit Boards",
    WIRING: "Wiring",
    SCRAP_METAL: "Scrap Metal",
    REFINED_STEEL: "Refined Steel",
    ALLOY_STEEL: "Alloy Steel",
    ION_BATTERIES: "Ion Batteries",
    MICRO_COMPUTER: "Micro-Computer",
    ALIEN_GUTS: "Alien Guts"
}

class Resource_Manager{
    constructor(){
        this.inventory = {};
    }

    getIndexOf(item){
        var x = Object.keys(this.inventory).length;
        var counter = 0;
        for(var i in this.inventory){
            if(item == i)
            {
                return counter;
            }
            counter++;
        }
    }

    addItem(item, count){
        if(this.inventory[item] != null)
        {
            this.inventory[item] += count;
            console.log("you have added " + count + " " + item + " to your inventory. TOTAL: " + this.inventory[item]);
        }
        else{
            console.log("you have found " + count + " " + item + ", adding to inventory")
            this.inventory[item] = count;
        }
    }

    removeItem(item, count){
        if(this.inventory[item] == null || count > this.inventory[item] || count < 0)
        {
            console.log("cannot remove " + count + " " + item);
            return false;
        }
        else if(this.inventory[item] - count == 0) {
            console.log("removing " + item);
            delete this.inventory[item];
            return true;
        }
        else{
            console.log("removing " + count + " " + item);
            this.inventory[item] -= count;
            return true;
        }
    }

    get decription(){
        console.log(this.inventory);
        var desc = "You have:\n";

        for(var key in this.inventory){
            var value = this.inventory[key];
            desc += value + " " + key + "\n";
        }

        return desc;
    }

    get htmlDescription(){
        var desc = "";
        for(var key in this.inventory){
            var value = this.inventory[key];
            desc += "<p class='resource'>" + key + ": " + value + "</p>";
        }
        return desc;
    }

}

export {Resource_Manager, items}

// console.log("Start Resource Manager Test");
// var rm = new Resource_Manager();

// rm.addItem(items.WATER, 11);
// rm.addItem(items.FOOD, 20);
// rm.addItem(items.ION_BATTERIES, 3);
// rm.addItem(items.WIRING, 3);

// rm.removeItem(items.FOOD, 20);
// rm.removeItem(items.WATER, 1);

// rm.decription;