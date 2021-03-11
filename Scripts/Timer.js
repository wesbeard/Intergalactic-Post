import { Display_Manager } from "./DisplayManager.js";
import {GameEvents, GiveItemEvent} from "./GameEvents.js";

class GameTimer
{
    static EventQueue = [];

    static AddEvent(event)
    {
        console.log("Adding event");
        GameTimer.EventQueue.push(event);
    }

    static RemoveEvent(event){
        console.log("Removing event");
        var index = GameTimer.EventQueue.indexOf(event);
        GameTimer.EventQueue.splice(index, 1);
    }

    //Main game timer, will be called every one second in html code:
    //setInterval(TimerLoop, 1000);
    TimerLoop()
    {
        console.log("tick");

        GameTimer.EventQueue.forEach(GameTimer.doIt);

        Display_Manager.updateDisplay();
    }

    static doIt(event){
        event.decrimentTick();
    }

}

export {GameTimer}