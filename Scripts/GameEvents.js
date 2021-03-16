import {items, Resource_Manager} from "./ResourceManager.js";
import { GameTimer } from "./GameTimer.js";

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

class GiveItemProgressEvent extends GiveItemEvent{
    constructor(maxTicks, resourceManager, item, amount, progressBar){
        super(maxTicks, resourceManager, item, amount);
        this.progressBar = progressBar;
        this.total = maxTicks;
    }

    decrimentTick(){
        super.decrimentTick();
        var percentage = Math.floor((this.total-this.ticks) / this.total * 100);
        console.log("percentage: " + percentage + "%");

        //this function doesnt exist yet
        //Display_Manager.updateProgressBar(this.progressBar, this.percentage);
    }
}

export{GameEvents, GiveItemEvent, GiveItemProgressEvent}
