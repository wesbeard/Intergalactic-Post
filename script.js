import {Resource_Manager} from "./ResourceManager.js";
import {items} from "./ResourceManager.js";

var _ResourceManager = new Resource_Manager();

//just an example of how to add items to the resource manager
_ResourceManager.addItem(items.SCRAP_METAL, 82);
_ResourceManager.addItem(items.WIRING, 38);
_ResourceManager.addItem(items.FOOD, 2);
_ResourceManager.addItem(items.MECHANICAL_PARTS, 7);


//temp script to replace the "resource display info"
document.getElementById("resource-display").innerHTML = _ResourceManager.htmlDescription;

