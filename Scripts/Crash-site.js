import {addTextItem, 
        addEventButton, 
        setArtwork, 
        fadeInTextDisplay,
        clearTextDisplay} from "./scripts.js"
import {asciiCrash} from "./ASCII-Art.js"

class Crash_Site {

    stage = 1;

    loadLocation() {
        this.setText();
        this.setEventButtons();
        this.setLocationArtwork();
        setTimeout(fadeInTextDisplay, 5000, 1500);
        this.stage++;
    }
    
    progress() {
        clearTextDisplay();
        this.setText();
        this.setEventButtons();
        fadeInTextDisplay();
        this.stage++;
    }

    setText() {
        switch (this.stage) {
            case 1:
                addTextItem("The warning alarm is blairing in your ear", true);
                addTextItem("Please, shut up");
                addTextItem("Red lights blink accross the control board", true);
                addTextItem("That's not good");
                addTextItem("\"Ship integrity: critical\"", true);
                addTextItem("\"Vitals: critical\"", true);
                addTextItem("\"Chance of survival: low\"", true);
                addTextItem("That was the ship's computer, SAL");
                addTextItem("He wasn't helping");
                addTextItem("My body feels like it's been hit by a star freighter");
                addTextItem("Suddenly, you come to your senses", true);
                addTextItem("Oh god, the mail");
                addTextItem("I need to deliver the mail");
                break;
            case 2:
                addTextItem("Where is it?");
                addTextItem("Is it still in the ship?");
                addTextItem("Or scattered all over the whole damn planet?");
                addTextItem("Your concentration is broken by the voice of SAL", true);
                addTextItem("God, does he have an annoying voice");
                addTextItem("\"Captain, if vitals continue to drop");
                addTextItem("you won't even be alive to deliver the mail\"");
                addTextItem("Always the optimist, SAL");
                addTextItem("\"I suggest you locate the oxygenator");
                addTextItem("as well as the hydrolyzer for water generation,");
                addTextItem("they are essential to your survival");
                addTextItem("and may need to be repaired\"");
                addTextItem("\"We are also running on emergency battery power...\"");
                addTextItem("I'm screwed", true);
                break;
        }
    }

    setEventButtons() {
        switch (this.stage) {
            case 1:
                addEventButton("Look for the mail");
                break;
            case 2:
                addEventButton("Assess life support");
                break;
        }
        
    }

    setLocationArtwork() {
        setArtwork(asciiCrash)
    }
}

export {Crash_Site}