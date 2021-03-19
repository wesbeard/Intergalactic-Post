import {items, Resource_Manager} from "./ResourceManager.js";
import { GameTimer } from "./GameTimer.js";
import {Display_Manager} from "./DisplayManager.js";
/*
Default Game event that acts as a superclass for the other game events
*/
class GameEvents
{
    constructor(maxTicks)
    {
        this.ticks = maxTicks;
    }

    decrimentTick()
    {
        this.ticks--

        if (this.ticks == 0)
        {
            this.executeEvent();
        }
    }

    executeEvent()
    {
        console.log("Executing Event");
        GameTimer.RemoveEvent(this);
    }
}

/*
Will add an item to whatever resource manager is given.
this can be used to add air for for the player or add a "crafted" item to an inventory
*/
class GiveItemEvent extends GameEvents {
    constructor(maxTicks, resourceManager, item, amount){
        super(maxTicks);
        this.item = item;
        this.amount = amount;
        this.resourceManager = resourceManager;
    }

    executeEvent(){
        this.resourceManager.addItem(this.item, this.amount);
        GameTimer.RemoveEvent(this);
    }
}

/*
This is an extention of the GiveItemEvent that will update a given progress bar element
designed to be used by the buttons buttons
 */
class GiveItemProgressEvent extends GiveItemEvent{
    constructor(maxTicks, resourceManager, item, amount, progressBar){
        super(maxTicks, resourceManager, item, amount);
        this.progressBar = progressBar + "-progress";

        this.total = maxTicks;
    }

    decrimentTick(){
        super.decrimentTick();
        var percentage = Math.floor((this.total-this.ticks) / this.total * 100);
        Display_Manager.updateProgressBar(this.progressBar, percentage);
    }
}

/*
This event will disable a button for a given amount of ticks
*/
class DisableButtonEvent extends GameEvents{
    constructor(maxTicks, buttonID, func){
        console.log("IN EVENT");
        super(maxTicks);
        this.button = document.getElementById(buttonID);
        this.func = func;
        //console.log(buttonID);
        this.button.removeEventListener("click", func);
        
    }

    executeEvent(){
        this.button.addEventListener("click", this.func, false);
        super.executeEvent();
    }
}


export{GameEvents, GiveItemEvent, GiveItemProgressEvent, DisableButtonEvent}
