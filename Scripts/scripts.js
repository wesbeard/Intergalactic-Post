import {Resource_Manager, items} from "./ResourceManager.js";
import {Crash_Site} from "./Crash-site.js";
import {asciiTitle} from "./ASCII-Art.js";
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI, addResourceButton} from "./DisplayManager.js";
import {GameTimer} from "./GameTimer.js";

import {GiveItemProgressEvent} from "./GameEvents.js";

var _CrashSite = new Crash_Site();
var _DisplayManager = new Display_Manager();
var _Timer = new GameTimer();

var currentLocation;

setInterval(_Timer.TimerLoop, 1000); //The start of the game timer (SHOULD ONLY BE DONE ONCE)

var content = document.getElementById("page-content");

//sets up the players starting items
Resource_Manager.Player_Resources.addItem(items.FOOD,15);
Resource_Manager.Player_Resources.addItem(items.WATER, 20);
Resource_Manager.Player_Resources.addItem(items.AIR, 18);

startSequence();

// starts the game
function startSequence() {
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

var testEvent = new GiveItemProgressEvent(50, Resource_Manager.Ship_Resources, items.PLACEHOLDER, 69, null);
GameTimer.AddEvent(testEvent);

export {progressLocation}
