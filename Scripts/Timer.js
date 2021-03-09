import {GameEvent} from "./GameEvent.js";

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

        this.UpdateDisplay();
    }

    UpdateDisplay()
    {
        //UpdateDisplay based on events
    }
}

export {GameTimer, TimerLoop, UpdateDisplay}