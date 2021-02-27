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

//console.log("Start Resource Manager Test");
//var rm = new ResourceManager();
//document.getElementById("resource-display").innerHTML = rm.htmlDescription;