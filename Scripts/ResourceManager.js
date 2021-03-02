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
        console.log("%cCould not find " + item, "color:red");
    }

    /*
    Adds item(s) to the inventory
    */
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

    //returns the amount of items
    getItemCount(item){
        if(this.inventory[item] == null)
        {
            console.log("%cCould not find " + item, "color:red");
            return 0;
        }
        else{
            return this.inventory[item];
        }
    }

    /*
    Removes an item from this.inventory but only if the amount attempted to remove exists
    */
    removeItem(item, count){
        if(this.inventory[item] == null || count > this.inventory[item] || count < 0)
        {
            console.log("%cCannot remove " + count + " " + item, "color:red");
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

    /*
    Returns a plain string description of the players "inventory"
    */
    get decription(){
        console.log(this.inventory);
        var desc = "You have:\n";

        for(var key in this.inventory){
            var value = this.inventory[key];
            desc += value + " " + key + "\n";
        }

        return desc;
    }

    /*
    returns a plain string description of the players "inventory" in html format
    for the resource-display div
    */
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

var test = false;

if(test){

    console.log("%cStart Resource Manager Test", "color:green");

    var _ResourceManager = new Resource_Manager();
    
    //just an example of how to add items to the resource manager
    _ResourceManager.addItem(items.SCRAP_METAL, 82); //how to add items (item, amount)
    _ResourceManager.addItem(items.WIRING, 38);
    
    //example of removing an item (returns bool)
    _ResourceManager.removeItem(items.REFINED_STEEL, 1); //how to remove items (item, amount) returns true if successful
    
    if(_ResourceManager.removeItem(items.ALIEN_GUTS, 10000)){ //showing how to use item removal with if statment
        console.log("item removal succ");
    }
    else{
        console.log("item removal failed");
    }
    
    //temp script to replace the "resource display info" (this will belong in some sort of update display loop later)
    document.getElementById("resource-display").innerHTML = _ResourceManager.htmlDescription;
    
    console.log("Water: " + _ResourceManager.getItemCount(items.WATER));

    console.log("%cEnd of Resource manager Test", "color:red");

}