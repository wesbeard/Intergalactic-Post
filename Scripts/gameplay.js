import {Display_Manager} from "./DisplayManager.js";
import {Resource_Manager, items} from "./ResourceManager.js";


var _ResourceManager = new Resource_Manager();
var _DisplayManager = new Display_Manager();
// Add item to player inventory per click
function clickAccumulate(name) {
   switch(name) {
       case 'b1':
           _ResourceManager.addItem(items.SCRAP_METAL, 5);
           _DisplayManager.updateInventory(_ResourceManager);
           alert("here");
           break;
        case 'b2':
            _ResourceManager.addItem(items.WIRING, 1);
            _DisplayManager.updateInventory(_ResourceManager);
            alert("here 2");
            break;
        case 'b3':
            _ResourceManager.addItem(items.MECHANICAL_PARTS, 2);
            _DisplayManager.updateInventory(_ResourceManager);
            alert("here 3");
            break;
        default:
            alert("Not valid?");
   }
}

export {clickAccumulate};
