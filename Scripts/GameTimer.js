import { Display_Manager } from "./DisplayManager.js";
import {GameEvents, GiveItemEvent} from "./GameEvents.js";
import {Resource_Manager, items} from "./ResourceManager.js";
import { Vitals_Resource_Manager } from "./VitalsResouceManager.js";

class GameTimer
{
    static shouldTick = true;
    static currentSecond = 0;
    static currentHour = 0;
    static currentDay = 1;

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
        //console.log("tick");

        GameTimer.EventQueue.forEach(GameTimer.doIt);

        Display_Manager.updateDisplay();
        GameTimer.UpdateDayAndTime();
    }

    static UpdateDayAndTime()
    {
        GameTimer.currentSecond++;

        if (GameTimer.currentSecond == 3)
        {
            GameTimer.currentHour++
            GameTimer.currentSecond = 0;
        }
        
        if (GameTimer.currentHour == 25)
        {
            GameTimer.currentDay++;
            Display_Manager.displayTitleText("Sol 🌣 " + this.currentDay, "8vh");
            GameTimer.currentHour = 0;
            Vitals_Resource_Manager.Player_Vitals.addDailyVitals();
        }

        //console.log("Day: " + GameTimer.currentDay + " Hour: " + GameTimer.currentHour + " Second: " + GameTimer.currentSecond);
    }

    static doIt(event){
        event.decrimentTick();
    }

}

export {GameTimer}