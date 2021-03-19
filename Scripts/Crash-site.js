import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI, addResourceButton} from "./DisplayManager.js"
import {Resource_Manager, items} from "./ResourceManager.js";
import {progressLocation} from './scripts.js'
import {asciiCrash} from "./ASCII-Art.js"
import {GameEvents, GiveItemEvent, GiveItemProgressEvent, DisableButtonEvent} from "./GameEvents.js"
import { GameTimer } from "./GameTimer.js";
import {Audio_Manager, Sounds} from "./AudioManager.js";
import { Vitals } from "./Vitals.js";
import { Vitals_Resource_Manager } from "./VitalsResouceManager.js";
import {Location} from "./Location.js";

var _ResourceManager = new Resource_Manager();

const ButtonTypes = {
    SCRAP_GATHER : 'scrap-gather',
    MECHANICAL_GATHER : 'mechanical-gather',
    WIRE_GATHER : 'wire-gather',
    FOOD_GATHER : 'food-gather',
    WATER_GATHER : 'water-gather'
};

class Crash_Site extends Location{
    static CS;
    static resources = new Resource_Manager();

    constructor(){
        super();
        this.stage = 1;
        Crash_Site.CS = this;
        Crash_Site.resources.addItem(items.FOOD, 35);
        Crash_Site.resources.addItem(items.WATER, 35);
        Crash_Site.resources.addItem(items.MECHANICAL_PARTS, 10);
        Crash_Site.resources.addItem(items.WIRING, 15);
        Crash_Site.resources.addItem(items.SCRAP_METAL, 12);
        Crash_Site.resources.addItem(items.PLACEHOLDER, 1);
    }

    loadLocation(fadeDelay = 6000) {
        setTimeout(fadeIn, fadeDelay, document.getElementById("speed-toggle"));
        Display_Manager.clearTextDisplay();
        Display_Manager.clearButtons();
        this.setText();
        this.setEventButtons();
        this.setLocationArtwork();
        setTimeout(Display_Manager.fadeInTextDisplay, fadeDelay);
        this.stage++;
    }
    
    progress() {
        
        Display_Manager.clearTextDisplay();
        this.setText();
        this.setEventButtons();
        Display_Manager.fadeInTextDisplay();

        switch (this.stage) {
            case 4:
                fadeIn(document.getElementById("vitals"), 20);
                fadeIn(document.getElementById("time-display"), 20);
                break;
            case 6:
                fadeIn(document.getElementById("buttons"), 20);
                fadeIn(document.getElementById("resource-display"), 20);
                break;
        }

        this.stage++;
    }

    setText() {
        switch (this.stage) {
            case 1:
                Display_Manager.addTextItem("The warning alarm is blairing in your ear", true);
                Display_Manager.addTextItem("Please, shut up");
                Display_Manager.addTextItem("Red lights blink accross the control board", true);
                Display_Manager.addTextItem("That's not good");
                Display_Manager.addTextItem("\"Ship integrity: critical\"", true);
                Display_Manager.addTextItem("\"Vitals: critical\"", true);
                Display_Manager.addTextItem("\"Chance of survival: low\"", true);
                Display_Manager.addTextItem("That was the ship's computer, SAL");
                Display_Manager.addTextItem("He wasn't helping");
                Display_Manager.addTextItem("My body feels like it's been hit by a star freighter");
                Display_Manager.addTextItem("Suddenly, you come to your senses", true);
                Display_Manager.addTextItem("Oh god, the mail");
                Display_Manager.addTextItem("I need to deliver the mail");
                break;
            case 2:
                Display_Manager.addTextItem("Where is it?");
                Display_Manager.addTextItem("Is it still in the ship?");
                Display_Manager.addTextItem("Or scattered all over the whole damn planet?");
                Display_Manager.addTextItem("Your concentration is broken by the voice of SAL", true);
                Display_Manager.addTextItem("God, does he have an annoying voice");
                Display_Manager.addTextItem("\"Captain, if vitals continue to drop");
                Display_Manager.addTextItem("you won't even be alive to deliver the mail\"");
                Display_Manager.addTextItem("Always the optimist, SAL");
                Display_Manager.addTextItem("\"I suggest you locate the oxygenator");
                Display_Manager.addTextItem("as well as the hydrolyzer for water generation,");
                Display_Manager.addTextItem("they are essential to your survival");
                Display_Manager.addTextItem("and may need to be repaired\"");
                Display_Manager.addTextItem("I'm screwed", true);
                break;
            case 3:
                Display_Manager.addTextItem("The back of the ship is a wreck");
                Display_Manager.addTextItem("I have no idea how I'll find anything");
                Display_Manager.addTextItem("The good news is that there are piles of letters...");
                Display_Manager.addTextItem("So at least some of the mail survived");
                Display_Manager.addTextItem("Thank god");
                Display_Manager.addTextItem("Heading to the starboard cabin you locate the oxygenator", true);
                Display_Manager.addTextItem("It seemed to have stopped working, thats no good", true);
                Display_Manager.addTextItem("There should be enough air in here to keep me alive for a few hours at least");
                Display_Manager.addTextItem("but I should get to work on fixing that while I still have air to think");
                Display_Manager.addTextItem("On the opposite side of the ship you find the hydrolyzer", true);
                Display_Manager.addTextItem("Oh no");
                Display_Manager.addTextItem("It might still be functional, but the tank was ruptured in the crash");
                Display_Manager.addTextItem("That's why it's so damn wet back here", true);
                Display_Manager.addTextItem("The leak will need to be patched before I can see if it's operational");
                Display_Manager.addTextItem("But at least I've got an idea of when I'll die");
                Display_Manager.addTextItem("...It's a little later than I thought");
                break;
            case 4:
                Display_Manager.addTextItem("I'll need to repair these somehow...");
                Display_Manager.addTextItem("My mail delivery personnel training did NOT prepare me for this");
                Display_Manager.addTextItem("Honestly, nothing could have prepared me for this");
                Display_Manager.addTextItem("The voice of SAL breaks the silence", true);
                Display_Manager.addTextItem("\"Captain, if you do nothing your life");
                Display_Manager.addTextItem("support will run out in less than one sol\"");
                Display_Manager.addTextItem("What the hell is a \"sol\"?");
                Display_Manager.addTextItem("\"One revolution around this system's star, captain\"");
                Display_Manager.addTextItem("The locals also base time off of Lunas,");
                Display_Manager.addTextItem("one revolution of this planets moon around the planet");
                Display_Manager.addTextItem("SAL, why can't we just use normal time?");
                Display_Manager.addTextItem("\"Do you want to look like a tourist, captain?\"");
                Display_Manager.addTextItem("I guess not...");
                Display_Manager.addTextItem("\"Captain, need I remind you of your impending death?\"");
                Display_Manager.addTextItem("No, SAL", true);
                Display_Manager.addTextItem("I'll need to look for some scrap around here...");
                Display_Manager.addTextItem("Spare wiring, mechanical parts, that sort of thing");
                break;
            case 5:
                Display_Manager.addTextItem("Climbing into the hold of the ship you find... nothing");
                Display_Manager.addTextItem("Wait, there is something!");
                Display_Manager.addTextItem("Not something useful, of course");
                Display_Manager.addTextItem("It's just your mail delivery excellence medal");
                Display_Manager.addTextItem("It'd fallen off the wall from its place of honor");
                Display_Manager.addTextItem("In your 37 years delivering parcel between galaxies");
                Display_Manager.addTextItem("You'd never missed a delivery, ever");
                Display_Manager.addTextItem("Looks like that was about to end");
                Display_Manager.addTextItem("Not that it matters if you're dead...");
                Display_Manager.addTextItem("You do, finally, notice something of use");
                Display_Manager.addTextItem("The metal shelving that held the mail bins had crumpled on impact");
                Display_Manager.addTextItem("No wonder the mail is all over the place");
                Display_Manager.addTextItem("I'll have to reorganize it all later...");
                Display_Manager.addTextItem("I can however use the shelving for a temporary source of scrap metal");
                Display_Manager.addTextItem("Maybe I'm not doomed after all...");
                break;
        }
    }

    setEventButtons() {
        var button;
        switch (this.stage) {
            case 1:
                button = Display_Manager.addEventButton("Look for the mail");
                button.addEventListener("click", progressLocation, false);
                break;
            case 2:
                button = Display_Manager.addEventButton("Assess life support");
                button.addEventListener("click", progressLocation, false);
                break;
            case 3:
                button = Display_Manager.addEventButton("Find a solution");
                button.addEventListener("click", progressLocation, false);
                break;
            case 4:
                button = Display_Manager.addEventButton("Look around (or die)");
                button.addEventListener("click", progressLocation, false);
                break;
            case 5:
                button = Display_Manager.addEventButton("Scavenge for resources");
                button.addEventListener("click", progressLocation, false);
                break;
            case 6:
                //This is how you add a button
                button = Display_Manager.addButtonsButton("Gather Scrap", ButtonTypes.SCRAP_GATHER); //it takes the buttons name and the ID it will use
                button.addEventListener("click", this.buttonsPressed, false);
                Display_Manager.addProgressBar(ButtonTypes.SCRAP_GATHER);

                button = Display_Manager.addButtonsButton("Gather Wires", ButtonTypes.WIRE_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                Display_Manager.addProgressBar(ButtonTypes.WIRE_GATHER);
                
                button = Display_Manager.addButtonsButton("Gather Parts", ButtonTypes.MECHANICAL_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                Display_Manager.addProgressBar(ButtonTypes.MECHANICAL_GATHER);

                button = Display_Manager.addButtonsButton("Gather Food", ButtonTypes.FOOD_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                Display_Manager.addProgressBar(ButtonTypes.FOOD_GATHER);

                button = Display_Manager.addButtonsButton("Gather Water", ButtonTypes.WATER_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                Display_Manager.addProgressBar(ButtonTypes.WATER_GATHER);
                
                break;
            case 7:
                console.log("CASE 7");
                break;
        }
    }

    buttonsPressed(value){
        if (Vitals_Resource_Manager.Player_Vitals.checkVitals()) {
            var id = value.target.id; //gives you the id of the button pressed so you can use it in a switch statement

            Vitals_Resource_Manager.Player_Vitals.removeItem(items.FOOD, 1);
            Vitals_Resource_Manager.Player_Vitals.removeItem(items.WATER, 1);
            Vitals_Resource_Manager.Player_Vitals.removeItem(items.AIR, 1);

            // Move into an event or something later idk
            if (Resource_Manager.Ship_Resources.getItemCount(items.SCRAP_METAL) == 4) {
                Display_Manager.addTextItem("Fix your life support", false, false, 0);
                Display_Manager.addTextItem("This will make your vitals replenish 20% every day", false, false, 0);
                var repairButton = Display_Manager.addEventButton("Repair", false);
                repairButton.addEventListener("click", Display_Manager.upgradeLifeSupport, false);
            }
            
            switch(id) {

                case ButtonTypes.MECHANICAL_GATHER:
                    Crash_Site.CS.scavengeParts();
                    break;
                case ButtonTypes.FOOD_GATHER:
                    Crash_Site.CS.scavengeFood();
                    break;
                case ButtonTypes.WATER_GATHER:
                    Crash_Site.CS.scavengeWater();
                    break;
                case ButtonTypes.SCRAP_GATHER:
                    Crash_Site.CS.scavengeMetal();
                    break;

                case ButtonTypes.WIRE_GATHER:
                    Crash_Site.CS.scavengeWire();
                    break;

                case ButtonTypes.MECHANICAL_GATHER:
                    Crash_Site.CS.scavengeParts();
                    break;
                default:
                    alert("Not valid?");
            }
        } 
        else {
            Display_Manager.addTextItem("I need to wait for life support to regenerate", false, false, 3000);
            Display_Manager.addTextItem("Shouldn't gather any more today...", false, false, 3000);
        }
    }

    scavengeMetal(){
        
        if(Crash_Site.resources.removeItem(items.SCRAP_METAL, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            var metalEvent = new GiveItemProgressEvent(2, Resource_Manager.Ship_Resources, items.SCRAP_METAL, 1, ButtonTypes.SCRAP_GATHER);
            GameTimer.AddEvent(metalEvent);
            var stopButton = new DisableButtonEvent(2, ButtonTypes.SCRAP_GATHER, this.buttonsPressed);
            GameTimer.AddEvent(stopButton);
            Display_Manager.addTextItem("You start to gather some Scrap Metal", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("You cant find any more scrap around the ship", false, false);
            Display_Manager.removeElement(ButtonTypes.SCRAP_GATHER);
            Display_Manager.removeElement(ButtonTypes.SCRAP_GATHER+"-progress");
        }
    }

    scavengeWire(){
        if(Crash_Site.resources.removeItem(items.WIRING, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            var wiringEvent = new GiveItemProgressEvent(5, Resource_Manager.Ship_Resources, items.WIRING, 1, ButtonTypes.WIRE_GATHER);
            GameTimer.AddEvent(wiringEvent);
            var stopButton2 = new DisableButtonEvent(5, ButtonTypes.WIRE_GATHER, this.buttonsPressed);
            GameTimer.AddEvent(stopButton2);
            Display_Manager.addTextItem("You scrounge around for some Wiring", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("You check behind every panel, switch, and lever", false, false);
            Display_Manager.addTextItem("but you cant find any more wires.", false, false);
            Display_Manager.removeElement(ButtonTypes.WIRE_GATHER);
            Display_Manager.removeElement(ButtonTypes.WIRE_GATHER+"-progress");
        }
    }

    scavengeParts(){
        if(Crash_Site.resources.removeItem(items.MECHANICAL_PARTS, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            var mechEvent = new GiveItemProgressEvent(10, Resource_Manager.Ship_Resources, items.MECHANICAL_PARTS, 1, ButtonTypes.MECHANICAL_GATHER);
            GameTimer.AddEvent(mechEvent);
            var stopButton3 = new DisableButtonEvent(10, ButtonTypes.MECHANICAL_GATHER, this.buttonsPressed);
            GameTimer.AddEvent(stopButton3);
            Display_Manager.addTextItem("You pick through the ship for spare Mechanical Parts", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("If you take any more mechanical parts from the ship", false, false);
            Display_Manager.addTextItem("it just might collapse on you...", false, false);
            Display_Manager.removeElement(ButtonTypes.MECHANICAL_GATHER);
            Display_Manager.removeElement(ButtonTypes.MECHANICAL_GATHER+"-progress");
        }
    }

    scavengeFood(){
        if (Crash_Site.resources.removeItem(items.FOOD, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            Vitals_Resource_Manager.Player_Vitals.addItem(items.FOOD, 5);
            Display_Manager.addTextItem("You manage to find some food", false, false, 2000)
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("The best you could find is some crumbs...", false, false);
            Display_Manager.removeElement(ButtonTypes.FOOD_GATHER);
            Display_Manager.removeElement(ButtonTypes.FOOD_GATHER+"-progress");
        }
    }

    scavengeWater(){
        if (Crash_Site.resources.removeItem(items.WATER, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            Vitals_Resource_Manager.Player_Vitals.addItem(items.WATER, 5);
            Display_Manager.addTextItem("You manage to find some water", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("You try to find more water, but couldn't", false, false);  
            Display_Manager.removeElement(ButtonTypes.WATER_GATHER);
            Display_Manager.removeElement(ButtonTypes.WATER_GATHER+"-progress");
        }
    }

    setLocationArtwork() {
        Display_Manager.setArtwork(asciiCrash)
    }
}

export {Crash_Site}