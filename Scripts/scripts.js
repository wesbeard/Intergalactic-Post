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
Resource_Manager.Player_Resources.addItem(items.FOOD, 10);
Resource_Manager.Player_Resources.addItem(items.WATER, 10);
Resource_Manager.Player_Resources.addItem(items.AIR, 10);

startSequence();

// starts the game
function startSequence() {
    // Display the title text ASCII art as the title screen text, fades out after 3 seconds
    Display_Manager.displayTitleText(asciiTitle, ".7vw", true);
    setTimeout(Display_Manager.displayTitleText, 3000,"Sol 🌣 1", "8vh", true);
    // Hide unused UI elements
    hideElement(document.getElementById("buttons"));
    hideElement(document.getElementById("resource-display"));
    hideElement(document.getElementById("vitals"));
    hideElement(document.getElementById("ascii-art"));
    hideElement(document.getElementById("time-display"));
    // Load content and start fading in
    Display_Manager.initOptions();
    _CrashSite.loadLocation(6000);
    currentLocation = _CrashSite;
    setTimeout(fadeIn, 3000, content, 30);
}

// WIP: progress the current locations text display
function progressLocation() {
    currentLocation.progress();
}

export {progressLocation}
