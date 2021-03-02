import {Resource_Manager} from "./ResourceManager.js";
import {items} from "./ResourceManager.js";
import {Crash_Site} from "./Crash-site.js"

var _ResourceManager = new Resource_Manager();
var _CrashSite = new Crash_Site

// Load text, buttons, and art for the current location
_CrashSite.loadLocation();

// Add a text item to the text display
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

export {addTextItem, addEventButton, setArtwork};