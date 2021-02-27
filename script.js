import {Resource_Manager} from "./ResourceManager.js";
import {items} from "./ResourceManager.js";

var _ResourceManager = new Resource_Manager();

//just an example of how to add items to the resource manager
_ResourceManager.addItem(items.SCRAP_METAL, 82); //how to add items (item, amount)
_ResourceManager.addItem(items.WIRING, 38);
_ResourceManager.addItem(items.FOOD, 2);
_ResourceManager.addItem(items.MECHANICAL_PARTS, 7);
_ResourceManager.addItem(items.REFINED_STEEL, 1);

_ResourceManager.removeItem(items.REFINED_STEEL, 1); //how to remove items (item, amount) returns true if successful

if(_ResourceManager.removeItem(items.ALIEN_GUTS, 10000)){ //showing how to use item removal with if statment
    console.log("item removal succ");
}
else{
    console.log("item removal failed");
}

//temp script to replace the "resource display info" (this will belong in some sort of update display loop later)
document.getElementById("resource-display").innerHTML = _ResourceManager.htmlDescription;

