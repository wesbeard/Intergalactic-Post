import {addTextItem, addEventButton, setArtwork} from "./scripts.js"
import {asciiCrash} from "./ASCII-Art.js"

class Crash_Site {
    loadLocation(){
        this.setText();
        this.setEventButtons();
        this.setLocationArtwork();
    }

    setText(){
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
    }

    setEventButtons() {
        addEventButton("Look for the mail", "buttonFunction()")
    }

    setLocationArtwork() {
        setArtwork(asciiCrash)
    }
}

export {Crash_Site}