import {Resource_Manager, items} from "./ResourceManager.js";
import {Vitals} from "./Vitals.js";
class Display_Manager{
    static _VitalsResourceManager;
    static _PlayerVitals;

    static textDisplay = document.getElementById("text-display");
    static buttons = document.getElementById("buttons");
    static vitals = document.getElementById("vitals");
    static centerColumn = document.getElementById("center-column");
    static asciiArt = document.getElementById("ascii-art");
    static resourceDisplay = document.getElementById("resource-display");
    static titleText = document.getElementById("title-text");

    // Set the title text, can be used for main title as well as day changes
    displayTitleText(text, fontSize = ".7vw") {
        // Hide main page content
        var content = document.getElementById("page-content");
        toggleHideUI(content);
        // Set title text
        this.titleText = document.getElementById("title-text");
        this.titleText.style.fontSize = fontSize;
        this.titleText.innerHTML = text;
        // fade in title
        fadeIn(title, 20);
        // Schedule fadeout for 3 seconds later
        setTimeout(fadeOut, 2000, title, 20);
    }

    setStaticVitals(rm){
        Display_Manager._VitalsResourceManager = rm;
        Display_Manager._PlayerVitals = new Vitals(rm);
    }

    //will update the vitals card to the most current condition
    updateVitals(){
        var newVitals = Display_Manager._PlayerVitals.getCondition() + Display_Manager._PlayerVitals.getAir() + Display_Manager._PlayerVitals.getWater() +
        Display_Manager._PlayerVitals.getFood();

        Display_Manager.vitals.innerHTML = newVitals;
    }

    updateInventory(rm){
        Display_Manager.resourceDisplay.innerHTML = rm.htmlDescription;
    }

    // Set the current ASCII artwork
    setArtwork(art) {
        var pre = document.createElement("pre");
        pre.setAttribute("class", "art-piece");
        pre.textContent = art;
        Display_Manager.asciiArt.appendChild(pre);
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
        Display_Manager.textDisplay.appendChild(textBox);
    }

    // Add a button to the text display
    addEventButton(buttonText) {
        var button = document.createElement("button");
        button.setAttribute("class", "event-button");

        //We need to find a better way of doing this, I have a few ideas - Adam
        //button.addEventListener("click", progressLocation, false);

        button.innerHTML = buttonText;
        button.style.display = "none";
        Display_Manager.textDisplay.appendChild(button);
        return button;
    }

    // Nuke all items in the text display div
    clearTextDisplay() {
        while (Display_Manager.textDisplay.firstChild) {
        Display_Manager.textDisplay.removeChild(Display_Manager.textDisplay.firstChild);
        }
    }

    // Fade in items in the text display one by one
    fadeInTextDisplay(multiplier) {
        this.ascii = document.getElementById("ascii-art");
        if (this.ascii.style.visibility == "hidden")
            fadeIn(ascii, 30);
        var textDisplayContents = Display_Manager.textDisplay.children;

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