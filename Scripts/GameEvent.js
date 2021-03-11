class GameEvent
{
    constructor(maxTicks)
    {
        this.ticks = maxTicks;
    }

    decrementTick()
    {
        this.ticks--

        if (this.ticks == 0)
        {
            this.executeEvent();
        }
    }

    executeEvent()
    {
        //EXECUTE EVENT
    }
}

export{GameEvent, decrementTick, executeEvent}