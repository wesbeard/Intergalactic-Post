import {Display_Manager} from "./DisplayManager.js";
import {Resource_Manager} from "./ResourceManager.js";
import {items} from "./ResourceManager.js";

// Some temp variables to demonstrate the click functionality
var i = 0;
var j = 0;
var k = 0;
// Add item to player inventory per click
function clickAccumulate(name) {
   switch(name) {
       case 'b1':
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
