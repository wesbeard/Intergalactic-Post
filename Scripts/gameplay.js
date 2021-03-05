import {Resource_Manager} from "./ResourceManager.js";
import {items} from "./ResourceManager.js";

// Some temp variables to demonstrate the click functionality
var i = 0;
var j = 0;
var k = 0;
// Add item to player inventory per click
function clickAccumulate(obj) {
   var id = obj.id;
   switch(id) {
       case 'metal-gather':
           i++;
           alert(i);
           break;
        case 'wiring-gather':
            j += 5;
            alert(j);
            break;
        case 'mechanical-gather':
            k += 2
            alert(k);
            break;
        default:
            alert("Not valid?");
   }
}

export {clickAccumulate};
