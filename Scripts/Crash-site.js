
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI} from "./DisplayManager.js"

import {progressLocation} from './scripts.js';

import {asciiCrash} from "./ASCII-Art.js"

class Crash_Site {

    constructor(){
        this.stage = 1;
        this.DM = new Display_Manager();
    }

    loadLocation() {
        this.setText();
        this.setEventButtons();
        this.setLocationArtwork();
        this.DM.fadeInTextDisplay(1500);
        this.stage++;
    }
    
    progress() {
        
        this.DM.clearTextDisplay();
        this.setText();
        this.setEventButtons();
        this.DM.fadeInTextDisplay(1000);
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
                this.DM.addTextItem("\"We are also running on emergency battery power...\"");
                this.DM.addTextItem("I'm screwed", true);
                break;
        }
    }

    setEventButtons() {
        switch (this.stage) {
            case 1:
                var button = this.DM.addEventButton("Look for the mail");
                button.addEventListener("click", progressLocation, false);
                break;
            case 2:
                var button = this.DM.addEventButton("Assess life support");
                button.addEventListener("click", progressLocation, false);
                break;
        }
        
    }

    setLocationArtwork() {
        this.DM.setArtwork(asciiCrash)
    }
}

export {Crash_Site}