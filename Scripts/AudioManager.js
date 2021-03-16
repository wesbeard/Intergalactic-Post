const Sounds = {
    GOOD_BOOP : "good-boop",
    BAD_BOOP : "bad-boop"
};

class Audio_Manager{
    

    static playSound(soundType){
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

export {Audio_Manager, Sounds}