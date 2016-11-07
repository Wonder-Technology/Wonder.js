module wd{
    @singleton()
    export class SoundManager{
        public static getInstance():any {}

        private constructor(){}

        public play(id:string){
            var sound:Sound = SoundLoader.getInstance().get(id),
                audioObject:Sound = null;

            if(!sound || !sound.canPlay()) {
                return;
            }

            audioObject = sound;
            this._playOnlyOneSimultaneously(audioObject);
        }

        private _playOnlyOneSimultaneously(audioObject:Sound) {
            if (audioObject.getPlayState() !== 1) {
                audioObject.play();
            }
        }
    }
}

