import {Resource_Manager, items} from "./ResourceManager.js";
import {Vitals} from "./Vitals.js";
class Display_Manager{

    static vrm;
    static vv;

    constructor(){
        this.textDisplay = document.getElementById("text-display");
        this.buttons = document.getElementById("buttons");
        this.vitals = document.getElementById("vitals");
        this.centerColumn = document.getElementById("center-column");
        this.asciiArt = document.getElementById("ascii-art");
        this.resourceDisplay = document.getElementById("resource-display");
        this.titleText = document.getElementById("title-text");
    }

    // Set the title text, can be used for main title as well as day changes
    setTitleText(text) {
        this.titleText.innerHTML = text;
    }

    setStaticVitals(rm){
        Display_Manager.vrm = rm;
        Display_Manager.vv = new Vitals(rm);
    }

    //will update the vitals card to the most current condition
    updateVitals(){
        var newVitals = Display_Manager.vv.getCondition() + Display_Manager.vv.getAir() + Display_Manager.vv.getWater() +
        Display_Manager.vv.getFood();

        this.vitals.innerHTML = newVitals;
    }

    updateInventory(rm){
        this.resourceDisplay.innerHTML = rm.htmlDescription;
    }

    // Set the current ASCII artwork
    setArtwork(art) {
        var pre = document.createElement("pre");
        pre.setAttribute("class", "art-piece");
        pre.textContent = art;
        this.asciiArt.appendChild(pre);
    }

    // Add a text item to the text display
    addTextItem(text, emphasis = false) {
        var textBox = document.createElement("p");
        var node = document.createTextNode(text);
        textBox.appendChild(node);
        textBox.setAttribute("class", "text-item");
        if (emphasis) {
            textBox.style.fontStyle = "italic";
        }
        textBox.style.display = "none";
        this.textDisplay.appendChild(textBox);
    }

    // Add a button to the text display
    addEventButton(buttonText) {
        var button = document.createElement("button");
        button.setAttribute("class", "event-button");

        //We need to find a better way of doing this, I have a few ideas - Adam
        //button.addEventListener("click", progressLocation, false);

        button.innerHTML = buttonText;
        button.style.display = "none";
        this.textDisplay.appendChild(button);
        return button;
    }

    // Nuke all items in the text display div
    clearTextDisplay() {
        while (this.textDisplay.firstChild) {
        this.textDisplay.removeChild(this.textDisplay.firstChild);
        }
    }

    // Fade in items in the text display one by one
    fadeInTextDisplay(multiplier) {
        this.textDisplay = document.getElementById("text-display");
        var textDisplayContents = this.textDisplay.children;

        for (var i = 0; i < textDisplayContents.length; i++) {
            setTimeout(fadeIn, i * multiplier, textDisplayContents[i], 10);
        }
    }

} //END OF DISPLAY MANAGER

function hideElement(element) {
    element.style.visibility = "hidden";
}

function showElement(element) {
    element.style.visibility = "visible";
}

// Toggle the visibility of the given parent element
function toggleHideUI(parent, fade = true) {
    if (parent.style.display == "none" || parent.style.visbility == "hidden") {
        if (fade)
            fadeIn(parent);
        else {
            parent.style.display = "flex";
            parent.style.visbility = "visible";
        }
            
    }
    else {
        if (fade)
            fadeOut(parent);
        else
            parent.style.display = "none";
    }
}

/*
Fade functions from https://stackoverflow.com/a/6121270
*/

function fadeIn(element, duration) {
    var op = 0.1;
    var timer = setInterval(function () {
        element.style.display = 'flex';
        element.style.visibility = 'visible';
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, duration);
}

function fadeOut(element, duration) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, duration);
}

export {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI}