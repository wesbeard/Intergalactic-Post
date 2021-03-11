
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI} from "./DisplayManager.js";
import {progressLocation} from './scripts.js';
import {asciiCrash} from "./ASCII-Art.js";

class Crash_Site {

    constructor(){
        this.stage = 1;
        this.DM = new Display_Manager();
    }

    loadLocation(fadeDelay = 6000) {
        this.setText();
        this.setEventButtons();
        this.setLocationArtwork();
        setTimeout(this.DM.fadeInTextDisplay, fadeDelay);
        this.stage++;
    }
    
    progress() {
        
        this.DM.clearTextDisplay();
        this.setText();
        this.setEventButtons();
        this.DM.fadeInTextDisplay();

        switch (this.stage) {
            case 4:
                console.log("here");
                fadeIn(document.getElementById("vitals"), 30);
                break;
            case 5:
                fadeIn(document.getElementById("buttons"), 30);
                fadeIn(document.getElementById("resource-display"), 30);
                break;
        }

        this.stage++;
    }

    setText() {
        switch (this.stage) {
            case 1:
                this.DM.addTextItem("The warning alarm is blairing in your ear", true);
                this.DM.addTextItem("Please, shut up");
                this.DM.addTextItem("Red lights blink accross the control board", true);
                this.DM.addTextItem("That's not good");
                this.DM.addTextItem("\"Ship integrity: critical\"", true);
                this.DM.addTextItem("\"Vitals: critical\"", true);
                this.DM.addTextItem("\"Chance of survival: low\"", true);
                this.DM.addTextItem("That was the ship's computer, SAL");
                this.DM.addTextItem("He wasn't helping");
                this.DM.addTextItem("My body feels like it's been hit by a star freighter");
                this.DM.addTextItem("Suddenly, you come to your senses", true);
                this.DM.addTextItem("Oh god, the mail");
                this.DM.addTextItem("I need to deliver the mail");
                break;
            case 2:
                this.DM.addTextItem("Where is it?");
                this.DM.addTextItem("Is it still in the ship?");
                this.DM.addTextItem("Or scattered all over the whole damn planet?");
                this.DM.addTextItem("Your concentration is broken by the voice of SAL", true);
                this.DM.addTextItem("God, does he have an annoying voice");
                this.DM.addTextItem("\"Captain, if vitals continue to drop");
                this.DM.addTextItem("you won't even be alive to deliver the mail\"");
                this.DM.addTextItem("Always the optimist, SAL");
                this.DM.addTextItem("\"I suggest you locate the oxygenator");
                this.DM.addTextItem("as well as the hydrolyzer for water generation,");
                this.DM.addTextItem("they are essential to your survival");
                this.DM.addTextItem("and may need to be repaired\"");
                this.DM.addTextItem("I'm screwed", true);
                break;
            case 3:
                this.DM.addTextItem("The back of the ship is a wreck");
                this.DM.addTextItem("I have no idea how I'll find anything");
                this.DM.addTextItem("The good news is that there are piles of letters...");
                this.DM.addTextItem("So at least some of the mail survived");
                this.DM.addTextItem("Thank god");
                this.DM.addTextItem("Heading to the starboard cabin you locate the oxygenator", true);
                this.DM.addTextItem("It's working, but very slowly", true);
                this.DM.addTextItem("Should be enough to keep me alive for another few hours at least...");
                this.DM.addTextItem("On the opposite side of the ship you find the hydrolyzer", true);
                this.DM.addTextItem("Oh no");
                this.DM.addTextItem("It may be functional but the tank was ruptured in the crash");
                this.DM.addTextItem("That's why it's so damn wet back here", true);
                this.DM.addTextItem("The leak will need to be patched before I can see if it's operational");
                this.DM.addTextItem("But at least I've got an idea of when I'll die");
                this.DM.addTextItem("It's a little later than I thought");
                break;
            case 4:
                this.DM.addTextItem("You find automation robots");
                break;
            case 5:
                this.DM.addTextItem("!WIP! automation gameplay starts now");
                break;
        }
    }

    setEventButtons() {
        var button;
        switch (this.stage) {
            case 1:
                button = this.DM.addEventButton("Look for the mail");
                break;
            case 2:
                button = this.DM.addEventButton("Assess life support");
                break;
            case 3:
                button = this.DM.addEventButton("Find a solution");
                break;
            case 4:
                button = this.DM.addEventButton("Start automating");
                break;
        }
        if (button != undefined) {
            button.addEventListener("click", progressLocation, false);
        }
    }

    setLocationArtwork() {
        this.DM.setArtwork(asciiCrash)
    }
}

export {Crash_Site}