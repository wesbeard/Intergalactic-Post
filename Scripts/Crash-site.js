
import {Display_Manager, hideElement, showElement, fadeIn, fadeOut, toggleHideUI} from "./DisplayManager.js";
import {progressLocation} from './scripts.js';
import {asciiCrash} from "./ASCII-Art.js";

const ButtonTypes = {
    SCRAP_GATHER : 'scrap-gather',
    MECHANICAL_GATHER : 'mechanical-gather',
    WIRE_GATHER : 'wire-gather'
};

class Crash_Site {

    constructor(){
        this.stage = 1;
    }

    loadLocation(fadeDelay = 6000) {
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
                console.log("here");
                fadeIn(document.getElementById("vitals"), 20);
                break;
            case 5:
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
                Display_Manager.addTextItem("It's working, but very slowly", true);
                Display_Manager.addTextItem("Should be enough to keep me alive for another few hours at least...");
                Display_Manager.addTextItem("On the opposite side of the ship you find the hydrolyzer", true);
                Display_Manager.addTextItem("Oh no");
                Display_Manager.addTextItem("It may be functional but the tank was ruptured in the crash");
                Display_Manager.addTextItem("That's why it's so damn wet back here", true);
                Display_Manager.addTextItem("The leak will need to be patched before I can see if it's operational");
                Display_Manager.addTextItem("But at least I've got an idea of when I'll die");
                Display_Manager.addTextItem("It's a little later than I thought");
                break;
            case 4:
                Display_Manager.addTextItem("You find automation robots");
                break;
            case 5:
                Display_Manager.addTextItem("!WIP! automation gameplay starts now");
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
                button = Display_Manager.addEventButton("Start automating");
                button.addEventListener("click", progressLocation, false);
                break;
            case 5:
                button = Display_Manager.addButtonsButton("Gather Scrap", ButtonTypes.SCRAP_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);

                button = Display_Manager.addButtonsButton("Gather Wires", ButtonTypes.WIRE_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                
                button = Display_Manager.addButtonsButton("Gather Mechanical Parts", ButtonTypes.MECHANICAL_GATHER);
                button.addEventListener("click", this.buttonsPressed, false);
                
                break;

        }
    }

    buttonsPressed(value){
        var id = value.target.id;
        console.log(id);
    }

    setLocationArtwork() {
        Display_Manager.setArtwork(asciiCrash)
    }
}

export {Crash_Site}