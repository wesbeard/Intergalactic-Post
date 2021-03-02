import {Resource_Manager, items} from "./ResourceManager.js";
import {Display_Manager} from "./DisplayManager.js";
import {Vitals} from "./Vitals.js";
import {Crash_Site} from "./Crash-site.js";

var _ResourceManager = new Resource_Manager();
var _CrashSite = new Crash_Site();

var _Vitals = new Vitals(_ResourceManager);
var _DisplayManager = new Display_Manager();

// Load text, buttons, and art for the current location
_CrashSite.loadLocation();

_ResourceManager.addItem(items.AIR, 98);
_ResourceManager.addItem(items.WATER, 33);
_ResourceManager.addItem(items.FOOD, 50);

_DisplayManager.updateVitals(_ResourceManager, _Vitals);
_DisplayManager.updateInventory(_ResourceManager);