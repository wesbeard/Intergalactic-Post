import { Display_Manager } from "./DisplayManager.js";
import {GameEvent} from "./GameEvents.js";

class GameTimer
{
    constructor()
    {
        this.ArrayList<GameEvent> EventQueue;
    }

    AddEvent(GameEvent)
    {
        EventQueue.push(GameEvent);
    }

    //Main game timer, will be called every one second in html code:
    //setInterval(TimerLoop, 1000);
    TimerLoop()
    {
        EventQueue.forEach(function (EventQueue)
        {
            GameEvent.decrimentTick();
        })

        Display_Manager.updateDisplay();
    }

}

export {GameTimer, TimerLoop, UpdateDisplay}