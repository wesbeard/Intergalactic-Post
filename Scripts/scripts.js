import {Resource_Manager, items} from "./ResourceManager.js";
import {Crash_Site} from "./Crash-site.js";
import {asciiTitle} from "./ASCII-Art.js";
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI, addResourceButton} from "./DisplayManager.js";
import {GameTimer} from "./Timer.js";
import {GameEvents, GiveItemEvent} from "./GameEvents.js";


var _ResourceManager = Resource_Manager.Ship_Resources; //ship resources
var _PlayerResources = Resource_Manager.Player_Resources; //player resources
var _CrashSite = new Crash_Site();
var _DisplayManager = new Display_Manager();
var _Timer = new GameTimer();

var currentLocation;

setInterval(_Timer.TimerLoop, 1000); //The start of the game timer

var content = document.getElementById("page-content");

var multiplier = _DisplayManager.fadeMultiplier;
var currentLocation;

setInterval(_Timer.TimerLoop, 1000); //The start of the game timer

//Sets the starting values for Air food and water
_PlayerResources.addItem(items.FOOD,15);
_PlayerResources.addItem(items.WATER, 20);
_PlayerResources.addItem(items.AIR, 18);

// Uncomment to run devSequence
//devSequence();

// Uncomment to run prodSequence
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
    fadeIn(content, 0);
}

// Sequence with title, slower timing, and hidden UI
function prodSequence() {
    // Display the title text ASCII art as the title screen text, fades out after 3 seconds
    _DisplayManager.displayTitleText(asciiTitle);
    setTimeout(_DisplayManager.displayTitleText, 3000,"Sol 1", "8vh");
    // Hide unused UI elements
    var buttons = document.getElementById("buttons");
    hideElement(buttons);
    var resources = document.getElementById("resource-display");
    hideElement(resources);
    var vitals = document.getElementById("vitals");
    hideElement(vitals);
    var ascii = document.getElementById("ascii-art");
    hideElement(ascii);
    // Load content and start fading in
    _DisplayManager.initOptions();
    _CrashSite.loadLocation(6000);
    currentLocation = _CrashSite;
    //setTimeout(fadeIn, 3000, content, 30);
}

// WIP: progress the current locations text display
function progressLocation() {
    currentLocation.progress();
}

export {progressLocation}
