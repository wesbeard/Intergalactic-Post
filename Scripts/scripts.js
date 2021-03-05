import {Resource_Manager, items} from "./ResourceManager.js";
import {Crash_Site} from "./Crash-site.js";
import {asciiTitle} from "./ASCII-Art.js";
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI} from "./DisplayManager.js";
import {Vitals} from "./Vitals.js";

var _ResourceManager = new Resource_Manager();
var _CrashSite = new Crash_Site();
var _Vitals = new Vitals(_ResourceManager);
var _DisplayManager = new Display_Manager();
var currentLocation;


var content = document.getElementById("page-content");

// Uncomment to run devSequence
//devSequence();

// Uncomment to run testSequence
prodSequence();

// Dev sequence with all UI shown and little fading
function devSequence() {
    var buttons = document.getElementById("buttons");
    hideElement(buttons);
    var resources = document.getElementById("resource-display");
    hideElement(resources);
    var vitals = document.getElementById("vitals");
    hideElement(vitals);
    _CrashSite.loadLocation(0, 0);
    currentLocation = _CrashSite;
    var content = document.getElementById("page-content");
    fadeIn(content, 0);
}


// Sequence with title, slower timing, and hidden UI
function prodSequence() {

    // Hide main page content
    var content = document.getElementById("page-content");
    toggleHideUI(content);
    // Set the title text equal to the ASCII art title screen, fade out after 3 seconds
    _DisplayManager.setTitleText(asciiTitle);
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
    _CrashSite.loadLocation(4000, 1000);
    currentLocation = _CrashSite;
    setTimeout(fadeIn, 3000, content, 30);
}

// WIP: progress the current locations text display
function progressLocation() {
    currentLocation.progress();
}

_ResourceManager.addItem(items.SCRAP_METAL, 5);
_ResourceManager.addItem(items.WIRING, 1);
_ResourceManager.addItem(items.MECHANICAL_PARTS, 1);

_ResourceManager.addItem(items.FOOD,15);
_ResourceManager.addItem(items.WATER, 20);
_ResourceManager.addItem(items.AIR, 18);

_DisplayManager.updateVitals(_ResourceManager, _Vitals);
_DisplayManager.updateInventory(_ResourceManager);

export {progressLocation}