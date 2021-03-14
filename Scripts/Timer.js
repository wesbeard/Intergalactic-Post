import {GameEvent} from "./GameEvent.js";

class GameTimer
{
    constructor()
    {
        this.ArrayList<GameEvent> EventQueue;
        this.shouldTick = true;
        this.currentSecond = 0;
        this.currentHour = 0;
        this.currentDay = 0
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
            if (shouldTick)
            {
                GameEvent.decrimentTick();
            }
        })

        this.UpdateDisplay();
        this.UpdateDayAndTime();
    }

    UpdateDayAndTime()
    {
        this.currentSecond++;

        if (this.currentSecond == 120)
        {
            this.currentHour++
            this.currentSecond = 0;
        }
        
        if (this.currentHour == 24)
        {
            this.currentDay++;
            this.currentHour = 0;
        }

        console.log("Day: " + this.currentDay.toString() 
                  + " Hour: " + this.currentHour.toString()
                  + " Second: " + this.currentSecond.toString());
    }

    UpdateDisplay()
    {
        //UpdateDisplay based on events
    }
}

export {GameTimer, TimerLoop, UpdateDisplay}