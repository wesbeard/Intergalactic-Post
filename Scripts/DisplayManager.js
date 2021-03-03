import {Resource_Manager, items} from "./ResourceManager.js";
class Display_Manager{
    constructor(){
        this.buttons = document.getElementById("buttons");
        this.textDisplay = document.getElementById("text-display");
        this.vitals = document.getElementById("vitals");
        this.centerColumn = document.getElementById("center-column");
        this.asciiArt = document.getElementById("ascii-art");
        this.resourceDisplay = document.getElementById("resource-display");
    }

    updateVitals(rm, vitals){
        var newVitals = vitals.getCondition() + vitals.getAir() + vitals.getWater() +
        vitals.getFood();

        this.vitals.innerHTML = newVitals;

    }

    updateInventory(rm){
        this.resourceDisplay.innerHTML = rm.htmlDescription;
    }

}

function addTextItem(text, emphasis = false) {
    var textDisplay = document.getElementById("text-display");
    var textBox = document.createElement("p");
    var node = document.createTextNode(text);
    textBox.appendChild(node);
    textBox.setAttribute("class", "text-item");
    if (emphasis)
        textBox.style.fontStyle = "italic";
    textDisplay.appendChild(textBox);
}

// Add a button to the text display
function addEventButton(buttonText, onclick) {
    var textDisplay = document.getElementById("text-display");
    var button = document.createElement("button");
    button.setAttribute("class", "event-button");
    button.setAttribute("onclick", onclick);
    button.innerHTML = buttonText;
    textDisplay.appendChild(button);
}

// Set the current ASCII artwork
function setArtwork(art) {
    var asciiBox = document.getElementById("ascii-art");
    var pre = document.createElement("pre");
    pre.setAttribute("class", "art-piece");
    pre.textContent = art;
    asciiBox.appendChild(pre);
}

export {Display_Manager, addEventButton, addTextItem, setArtwork}