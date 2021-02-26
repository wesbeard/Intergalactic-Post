const items = {
    FOOD: "food",
    WATER: "water"
}

class ResourceManager{
    constructor(){
        this.inventory = {};
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

    get decription(){
        console.log(this.inventory);
        var desc = "You have:\n";

        for(var key in this.inventory){
            var value = this.inventory[key];
            desc += value + " " + key + "\n";
        }

        return desc;
    }
}

console.log("Start Resource Manager Test");

var rm = new ResourceManager();

rm.addItem(items.FOOD, 1);
rm.addItem(items.FOOD, 3);
rm.addItem(items.WATER, 2);
rm.addItem(items.WATER, 4);
console.log(rm.decription);