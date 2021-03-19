import {Resource_Manager, items} from "./ResourceManager.js";
import {Vitals} from "./Vitals.js";
import {GameTimer} from "./GameTimer.js"
import { Vitals_Resource_Manager } from "./VitalsResouceManager.js";

const SPEEDS = {
    2000: "Slow",
    1000: "Fast",
    0: "Instant"
};

class Display_Manager{

    static fadeMultiplier = 0;

    static _PlayerVitals = new Vitals(Vitals_Resource_Manager.Player_Vitals);

    static pageContent = document.getElementById("page-content");
    static textDisplay = document.getElementById("text-display");
    static buttons = document.getElementById("buttons");
    static vitals = document.getElementById("vitals");
    static centerColumn = document.getElementById("center-column");
    static asciiArt = document.getElementById("ascii-art");
    static resourceDisplay = document.getElementById("resource-display");
    static titleText = document.getElementById("title-text");
    static timeDisplay = document.getElementById("time-display");
    static currentTime = document.getElementById("current-time");

    // Set the title text, can be used for main title as well as day changes
    static displayTitleText(text, fontSize = ".7vw", start = false) {
        // Hide main page content
        var content = document.getElementById("page-content");
        fadeOut(content, 20);
        // Set title text
        Display_Manager.titleText = document.getElementById("title-text");
        Display_Manager.titleText.style.fontSize = fontSize;
        Display_Manager.titleText.innerHTML = text;
        // fade in title
        // if start sequence, start immediately
        if (start) {
            fadeIn(title, 20);
            setTimeout(fadeOut, 2000, title, 20);
        }
        // else, wait to fade in and re-fade content
        else {
            setTimeout(fadeIn, 1000, title, 20);
            setTimeout(fadeOut, 3000, title, 20);
            setTimeout(fadeIn, 4000, content, 20);
        }
    }

    // Any non-gameplay display elements can go here
    static initOptions() {
        // Add text speed button
        var speedToggle = document.createElement("pre");
        speedToggle.setAttribute("id", "speed-toggle");
        speedToggle.innerHTML = "< Text Speed: " + SPEEDS[Display_Manager.fadeMultiplier] + " >";
        this.pageContent = document.getElementById("page-content");
        this.pageContent.appendChild(speedToggle);
        speedToggle.addEventListener("click", this.toggleSpeed);
        speedToggle.style.display = "none";
    }

    static toggleSpeed() {
        switch (Display_Manager.fadeMultiplier) {
            case 0:
                Display_Manager.fadeMultiplier = 2000;
                break;
            case 2000:
                Display_Manager.fadeMultiplier = 1000;
                break;
            case 1000:
                Display_Manager.fadeMultiplier = 0;
                break;
        }
        var speedToggle = document.getElementById("speed-toggle");
        speedToggle.innerHTML = "< Text Speed: " + SPEEDS[Display_Manager.fadeMultiplier] + " >";
    }

    static updateDisplay(){
        Display_Manager.updateInventory(Resource_Manager.Ship_Resources);
        Display_Manager.updateVitals();
        Display_Manager.updateTimeDisplay();
    }

    //will update the vitals card to the most current condition
    static updateVitals(){
        var newVitals = Display_Manager._PlayerVitals.getCondition() + Display_Manager._PlayerVitals.getAir() + Display_Manager._PlayerVitals.getWater() +
        Display_Manager._PlayerVitals.getFood();

        Display_Manager.vitals.innerHTML = newVitals;
    }

    // I don't know where this should go
    static upgradeLifeSupport() {
        Vitals_Resource_Manager.vitalsReplenishRate += 10;
        Display_Manager.clearTextDisplay();
        Display_Manager.addTextItem("Life support systems upgraded!", false, false, 2000);
    }

    static updateInventory(rm) {
        Display_Manager.resourceDisplay.innerHTML = rm.htmlDescription;
    }

    static updateTimeDisplay() {
        this.currentTime.innerHTML = "Sol 🌣 " + GameTimer.currentDay + " Luna ☽ " + GameTimer.currentHour;
    }

    static removeElement(elementID){
        document.getElementById(elementID).remove();
    }

    // Set the current ASCII artwork
    static setArtwork(art) {
        var pre = document.createElement("pre");
        pre.setAttribute("class", "art-piece");
        pre.textContent = art;
        Display_Manager.asciiArt.appendChild(pre);
    }

    static addButtonsButton(buttonText, buttonID) {
        var button = Display_Manager.createButton(buttonText);
        button.setAttribute("class", "action-button");
        button.setAttribute("id", buttonID);
        //button.style.display = "none";
        Display_Manager.buttons.appendChild(button);

        return button;
    }

    static addProgressBar(buttonID) {
        var progressBar = document.createElement("pre");
        progressBar.innerHTML = "[                    ]";
        progressBar.setAttribute("id", buttonID + "-progress");
        progressBar.setAttribute("class", "progress-bar");
        Display_Manager.buttons.appendChild(progressBar);
    }

    static updateProgressBar(progressID, percentage) {
        var progressBar = document.getElementById(progressID);
        var barString = "[";
        for (var i = 1; i <= 10; i++){
            if (i <= percentage / 10) {
                barString += "◄►";
            }
            else {
                barString += "  ";
            }
        }
        barString += "]";
        progressBar.innerHTML = barString;
        if (percentage >= 100) {
            setTimeout(this.updateProgressBar, 500, progressID, 0);
        }
    }

    static clearButtons() {
        while (Display_Manager.buttons.firstChild) {
            Display_Manager.buttons.removeChild(Display_Manager.buttons.firstChild);
        }
    }

    // Add a text item to the text display
    static addTextItem(text, emphasis = false, shouldHide = true, fadeOutDelay = 0) {
        var textBox = document.createElement("p");
        var node = document.createTextNode(text);
        textBox.appendChild(node);
        textBox.setAttribute("class", "text-item");
        if (emphasis) {
            textBox.style.fontStyle = "italic";
        }
        if(shouldHide){
            textBox.style.display = "none";
        }
        if (fadeOutDelay > 0) {
            setTimeout(fadeOut, fadeOutDelay, textBox, 30);
            Display_Manager.textDisplay.prepend(textBox);
            return;
        }
        Display_Manager.textDisplay.appendChild(textBox);
    }

    // Add a button to the text display (center text area)
    static addEventButton(buttonText, shouldHide = true) {
        var button = this.createButton(buttonText);
        button.setAttribute("class", "event-button");
        if(shouldHide)
        {
            button.style.display = "none";
        }
        Display_Manager.textDisplay.appendChild(button);
        return button;
    }

    // Nuke all items in the text display div
    static clearTextDisplay() {
        while (Display_Manager.textDisplay.firstChild) {
            Display_Manager.textDisplay.removeChild(Display_Manager.textDisplay.firstChild);
        }
    }

    // Fade in items in the text display one by one
    static fadeInTextDisplay() {
        this.ascii = document.getElementById("ascii-art");
        if (this.ascii.style.visibility == "hidden")
            fadeIn(ascii, 10);
        
        var textDisplayContents = Display_Manager.textDisplay.children;

        if(textDisplayContents.length > 1) {
            //if there is more than one element then it starts fading in the rest 1 at a time
            Display_Manager.fadeInEachElement(textDisplayContents, 0);
            
        }
        else if(textDisplayContents.length > 0){
            //fades in first element if there's only one
            setTimeout(fadeIn, Display_Manager.fadeMultiplier, textDisplayContents[0], 10);
        }
        
    }

    static fadeInEachElement(elements, index) {
        if(index != elements.length){ //if its not at the end of the list then add the element at the index, increment and call this funciton again
            setTimeout(fadeIn, Display_Manager.fadeMultiplier, elements[index], 10);
            index ++;
            setTimeout(Display_Manager.fadeInEachElement, Display_Manager.fadeMultiplier, elements, index);
        }
    }

    static createButton(buttonText) {
        var buttonString = "+--";
        var i;

        for (i = 0; i < buttonText.length; i++) {
            buttonString += "-";
        }
        buttonString += "--+\n|  ";
        for (i = 0; i < buttonText.length; i++) {
            buttonString += buttonText[i];
        }
        buttonString += "  |\n+--"
        for (i = 0; i < buttonText.length; i++) {
            buttonString += "-";
        }
        buttonString += "--+";

        var button = document.createElement("pre");
        button.setAttribute("class", "ascii-button");
        button.innerHTML = buttonString;
        return button;
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
        element.style.opacity = op;
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

// Creates a button for the clicking aspect
function addResourceButton(name, type) {
    var button = addEventButton(name);
    button.addEventListener("click", clickAccumulate(type));
    return button;
}


export {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI, addResourceButton}