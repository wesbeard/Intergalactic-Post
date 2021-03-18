import {Display_Manager} from "./DisplayManager.js";

const ButtonTypes = {
    DEFAULT_BUTTON : "Default-button"
};

class Location{

    constructor(){
        this.stage = 1;
    }

    loadLocation(){
        Display_Manager.clearTextDisplay();
        Display_Manager.clearButtons();

        this.setText();
        this.setButtons();
        this.setLocationArtwork();
        setTimeout(Display_Manager.fadeInTextDisplay, fadeDelay);
    }

    progress(){
        console.log("Current Stage: " + stage);
        this.stage++;
    }
    
    setText(){
        console.log("set text function");
        Display_Manager.addTextItem("DEFAULT TEXT", true);
    }

    setButtons(){
        console.log("set buttons function");
        button = Display_Manager.addButtonsButton("DefaultButton", ButtonTypes.DEFAULT_BUTTON);
        button.addEventListener("click", this.buttonsPressed, false);
    }

    buttonsPressed(value){
        console.log("button pressed function");
        var id = value.target.id;
        console.log("id of button pressed:" + id);
    }

    setLocationArtwork(){
        console.log("Load Location Artwork Function");
        Display_Manager.setArtwork(asciiCrash);
    }
}

export {Location};