import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI, addResourceButton} from "./DisplayManager.js"
import {Resource_Manager, items} from "./ResourceManager.js";
import {progressLocation} from './scripts.js'
import {asciiCrash} from "./ASCII-Art.js"
import {GameEvents, GiveItemEvent} from "./GameEvents.js"
import { GameTimer } from "./GameTimer.js";
import {Audio_Manager, Sounds} from "./AudioManager.js";

var _ResourceManager = new Resource_Manager();

const ButtonTypes = {
    SCRAP_GATHER : 'scrap-gather',
    MECHANICAL_GATHER : 'mechanical-gather',
    WIRE_GATHER : 'wire-gather'
};

class Crash_Site {

    static resources = new Resource_Manager();

    constructor(){
        this.stage = 1;
        Crash_Site.resources.addItem(items.FOOD, 20);
        Crash_Site.resources.addItem(items.WATER, 35);
        Crash_Site.resources.addItem(items.MECHANICAL_PARTS, 10);
        Crash_Site.resources.addItem(items.WIRING, 15);
        Crash_Site.resources.addItem(items.SCRAP_METAL, 12);
        Crash_Site.resources.addItem(items.PLACEHOLDER, 1);
    }

    loadLocation(fadeDelay = 6000) {
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
                //console.log("here");
                fadeIn(document.getElementById("vitals"), 20);
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
                button = Display_Manager.addEventButton("Scavenge scrap");
                button.addEventListener("click", progressLocation, false);
                break;
            case 6:
                //This is how you add a button
                button = Display_Manager.addButtonsButton("Gather Scrap", ButtonTypes.SCRAP_GATHER); //it takes the buttons name and the ID it will use
                button.addEventListener("click", this.buttonsPressed, false);

                button = Display_Manager.addButtonsButton("Gather Wires", ButtonTypes.WIRE_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                
                button = Display_Manager.addButtonsButton("Gather Parts", ButtonTypes.MECHANICAL_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                
                break;
            case 7:
                console.log("CASE 7");
                break;

        }
    }

    buttonsPressed(value){
        var id = value.target.id; //gives you the id of the button pressed so you can use it in a switch statement
        //console.log(id);
        
        switch(id) {

            case ButtonTypes.SCRAP_GATHER:
                Crash_Site.scavengeMetal();
                break;

            case ButtonTypes.WIRE_GATHER:
                Crash_Site.scavengeWire();
                break;

            case ButtonTypes.MECHANICAL_GATHER:
                Crash_Site.scavengeParts();
                break;
            default:
                alert("Not valid?");
        }

        var rs = Crash_Site.resources;
        var count = rs.getItemCount(items.WIRING) + rs.getItemCount(items.SCRAP_METAL) + rs.getItemCount(items.MECHANICAL_PARTS) + rs.getItemCount(items.PLACEHOLDER);

        if(count == 1){
            Crash_Site.resources.removeItem(items.PLACEHOLDER, 1);
        }
        else if(count == 0){
            Crash_Site.endOfDays();
        }

    }

    static endOfDays(){
        var button = Display_Manager.addEventButton("Take your next step", false);
        button.addEventListener("click", progressLocation, false);
    }

    static scavengeMetal(){
        
        if(Crash_Site.resources.removeItem(items.SCRAP_METAL, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            var metalEvent = new GiveItemEvent(5, Resource_Manager.Ship_Resources, items.SCRAP_METAL, 1);
            GameTimer.AddEvent(metalEvent);
            Display_Manager.addTextItem("You start to gather some Scrap Metal", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("You search all over the ship but you cant find any more scrap", false, false);
            Display_Manager.removeElement(ButtonTypes.SCRAP_GATHER);
        }
    }

    static scavengeWire(){
        if(Crash_Site.resources.removeItem(items.WIRING, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            var wiringEvent = new GiveItemEvent(5, Resource_Manager.Ship_Resources, items.WIRING, 1);
            GameTimer.AddEvent(wiringEvent);
            Display_Manager.addTextItem("You scrounge around for some Wiring", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("You check behind every panel, switch, and lever", false, false);
            Display_Manager.addTextItem("but you cant find any more wires.", false, false);
            Display_Manager.removeElement(ButtonTypes.WIRE_GATHER);
        }
    }

    static scavengeParts(){
        if(Crash_Site.resources.removeItem(items.MECHANICAL_PARTS, 1)){
            Audio_Manager.playSound(Sounds.GOOD_BOOP);
            var mechEvent = new GiveItemEvent(5, Resource_Manager.Ship_Resources, items.MECHANICAL_PARTS, 1);
            GameTimer.AddEvent(mechEvent);
            Display_Manager.addTextItem("You pick through the ship for spare Mechanical Parts", false, false, 2000);
        }
        else{
            Audio_Manager.playSound(Sounds.BAD_BOOP);
            Display_Manager.addTextItem("If you take any more mechanical parts from the ship", false, false);
            Display_Manager.addTextItem("it just might collapse on you...", false, false);
            Display_Manager.removeElement(ButtonTypes.MECHANICAL_GATHER);
        }
    }

    setLocationArtwork() {
        Display_Manager.setArtwork(asciiCrash)
    }
}

export {Crash_Site}