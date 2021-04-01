const Sounds = {
    GOOD_BOOP : "good-boop",
    BAD_BOOP : "bad-boop"
};

class Audio_Manager{
    
    Audio_Manager()
    {
        this.isMute = false;
    }

    static playSound(soundType){
        
        if (!this.isMute)
        {
            switch(soundType){
                        case Sounds.BAD_BOOP:
                            document.getElementById(Sounds.BAD_BOOP).play();
                            break;
                        case Sounds.GOOD_BOOP:
                            document.getElementById(Sounds.GOOD_BOOP).play();
                            break;
                        default:
                            console.log("SOUND NOT FOUND: " + soundType);
                            break;
        }
        }
        
    }

    toggleVolumeMute()
    {
        if (this.isMute)
        {
            this.isMute = false;
            return;
        }
        this.isMute = true;
    }

}

export {Audio_Manager, Sounds}