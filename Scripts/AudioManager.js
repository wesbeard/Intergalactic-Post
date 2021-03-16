const Sounds = {
    BAD_BOOP : "bad-boop"
};

class Audio_Manager{
    

    static playSound(soundType){
        switch(soundType){
            case Sounds.BAD_BOOP:
                document.getElementById(Sounds.BAD_BOOP).play();
                break;
            default:
                console.log("SOUND NOT FOUND: " + soundType);
        }
        
    }
}

export {Audio_Manager, Sounds}