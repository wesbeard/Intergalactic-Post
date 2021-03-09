import {items, Resource_Manager} from "./ResourceManager.js";
import { GameTimer } from "./Timer.js";

class GameEvent
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

class GiveItemEvent extends GameEvent{
    constructor(maxTicks, resourceManager, item, amount){
        super(maxTicks);
        this.item = item;
        this.amount = amount;
        this.resourceManager = resourceManager;
    }

    executeEvent(){
        this.resourceManager.addItem(item, amount);
        //remove event from timer
    }
}

export{GameEvent, GiveItemEvent}