import {Resource_Manager, items} from "./ResourceManager.js";
import {Crash_Site} from "./Crash-site.js";
import {asciiTitle} from "./ASCII-Art.js";
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI} from "./DisplayManager.js";
import {GameTimer} from "./Timer.js";
import {GameEvents, GiveItemEvent} from "./GameEvents.js";

var _ResourceManager = new Resource_Manager();
var _CrashSite = new Crash_Site();
var _DisplayManager = new Display_Manager();
var _Timer = new GameTimer();
var _PlayerResources = new Resource_Manager();

_DisplayManager.setStaticVitals(_PlayerResources);
_DisplayManager.setStaticResources(_ResourceManager);

var content = document.getElementById("page-content");

var multiplier = _DisplayManager.fadeMultiplier;
var currentLocation;

setInterval(_Timer.TimerLoop, 1000); //The start of the game timer

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
    setTimeout(_DisplayManager.displayTitleText, 3000,"Sol 1", "5vh");
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
    setTimeout(fadeIn, 3000, content, 30);
}

// WIP: progress the current locations text display
function progressLocation() {
    currentLocation.progress();
}

_ResourceManager.addItem(items.SCRAP_METAL, 5);
_ResourceManager.addItem(items.WIRING, 1);
_ResourceManager.addItem(items.MECHANICAL_PARTS, 1);

_PlayerResources.addItem(items.FOOD,15);
_PlayerResources.addItem(items.WATER, 20);
_PlayerResources.addItem(items.AIR, 18);

var eventTest = new GameEvents(5); //Creates a default game event that will execute in 5 'ticks'
GameTimer.AddEvent(eventTest); //adds the event to the game timer

var giveItemTest = new GiveItemEvent(100, _ResourceManager, items.ION_BATTERIES, 69); //creates an event that will give 69 ion batteries after 100 'ticks'
GameTimer.AddEvent(giveItemTest);

export {progressLocation}
