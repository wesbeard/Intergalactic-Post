import { Display_Manager } from "./DisplayManager.js";
import {GameEvents, GiveItemEvent} from "./GameEvents.js";

class GameTimer
{
    constructor()
    {
        this.shouldTick = true;
        this.currentSecond = 0;
        this.currentHour = 0;
        this.currentDay = 0
    }

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

    static doIt(event){
        event.decrimentTick();
    }

}

export {GameTimer}