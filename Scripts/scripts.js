import {Resource_Manager, items} from "./ResourceManager.js";
import {Crash_Site} from "./Crash-site.js";
import {asciiTitle} from "./ASCII-Art.js";

var _ResourceManager = new Resource_Manager();
var _CrashSite = new Crash_Site;
var currentLocation;

var content = document.getElementById("page-content");

// Uncomment to run devSequence
//devSequence();
// Dev sequence with all UI shown and little fading
function devSequence() {
    _CrashSite.loadLocation();
    currentLocation = _CrashSite;
    var content = document.getElementById("page-content");
    fadeIn(content, 0);
}

// Uncomment to run testSequence
testSequence();
// Sequence with title, slower timing, and hidden UI
function testSequence() {

    // Hide main page content
    var content = document.getElementById("page-content");
    toggleHideUI(content);
    // Set the title text equal to the ASCII art title screen, fade out after 3 seconds
    setTitleText(asciiTitle);
    var titleDiv = document.getElementById("title");
    fadeIn(titleDiv, 30);
    setTimeout(fadeOut, 3000, title, 30);
    // Hide unused UI elements
    var buttons = document.getElementById("buttons");
    hideElement(buttons);
    var resources = document.getElementById("resource-display");
    hideElement(resources);
    var vitals = document.getElementById("vitals");
    hideElement(vitals);
    // Load content and start fading in
    _CrashSite.loadLocation();
    currentLocation = _CrashSite;
    setTimeout(fadeIn, 4000, content, 30);
}

// WIP: progress the current locations text display
function progressLocation() {
    currentLocation.progress();
}

// Set the title text, can be used for main title as well as day changes
function setTitleText(text) {
    document.getElementById("title-text").innerHTML = text;
}

// Add a text item to the text display
function addTextItem(text, emphasis = false) {
    var textDisplay = document.getElementById("text-display");
    var textBox = document.createElement("p");
    var node = document.createTextNode(text);
    textBox.appendChild(node);
    textBox.setAttribute("class", "text-item");
    if (emphasis) {
        textBox.style.fontStyle = "italic";
    }
    textBox.style.display = "none";
    textDisplay.appendChild(textBox);
}

// Add a button to the text display
function addEventButton(buttonText) {
    var textDisplay = document.getElementById("text-display");
    var button = document.createElement("button");
    button.setAttribute("class", "event-button");
    button.addEventListener("click", progressLocation, false);
    button.innerHTML = buttonText;
    button.style.display = "none";
    textDisplay.appendChild(button);
}

// Fade in items in the text display one by one
function fadeInTextDisplay(multiplier) {
    var textDisplayContents = document.getElementById("text-display").children;
    for (var i = 0; i < textDisplayContents.length; i++) {
        setTimeout(fadeIn, i * multiplier, textDisplayContents[i], 10);
    }
}

// Nuke all items in the text display div
function clearTextDisplay() {
     var textDisplay = document.getElementById("text-display");
     while (textDisplay.firstChild) {
        textDisplay.removeChild(textDisplay.firstChild);
    }
    
}

// Set the current ASCII artwork
function setArtwork(art) {
    var asciiBox = document.getElementById("ascii-art");
    var pre = document.createElement("pre");
    pre.setAttribute("class", "art-piece");
    pre.textContent = art;
    asciiBox.appendChild(pre);
}

function hideElement(element) {
    element.style.visibility= "hidden";
}

function showElement(element) {
    element.style.visbility = "visible";
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

function fadeIn(element, duration) {
    var op = 0.1;
    var timer = setInterval(function () {
        element.style.display = 'flex';
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, duration);
}

export {addTextItem, addEventButton, setArtwork, toggleHideUI, fadeInTextDisplay, clearTextDisplay};