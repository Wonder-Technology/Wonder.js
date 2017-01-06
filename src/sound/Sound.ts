module wd{
    declare var window:any;

    //todo use frp to replace onLoad,onError
    export class Sound {
        public static ctx = null;

        private static _audioType = null;

        public static create(config:SoundConfig) {
            var obj = new this(config);

            obj.initWhenCreate();

            return obj;
        }

        public static audioDetect() {
            try {
                let contextClass = window.AudioContext ||
                    window.webkitAudioContext ||
                    window.mozAudioContext ||
                    window.oAudioContext ||
                    window.msAudioContext;

                if (contextClass) {
                    this.ctx = new contextClass();
                    this._audioType = EAudioType.WEBAUDIO;
                }
                else {
                    this._html5AudioDetect();
                }
            }
            catch (e) {
                this._html5AudioDetect();
            }
        }

        private static _html5AudioDetect() {
            if (typeof window.Audio !== "undefined") {
                try {
                    new window.Audio();
                    this._audioType = EAudioType.HTML5AUDIO;
                }
                catch (e) {
                    this._audioType = EAudioType.NONE;
                }
            }
            else {
                this._audioType = EAudioType.HTML5AUDIO;
            }
        }

        constructor(config:SoundConfig){
            this._config = config;
        }

        public audioObj = null;

        private _config:SoundConfig = null;

        public initWhenCreate(){
            var self = this;

            switch (Sound._audioType) {
                case EAudioType.WEBAUDIO:
                    this.audioObj = WebAudio.create(this._config);
                    break;
                case EAudioType.HTML5AUDIO:
                    this.audioObj = Html5Audio.create(this._config);
                    break;
                case EAudioType.NONE:
                    Log.warn("browser not support Web Audio and Html5 Audio");
                    return;
                default:
                    return;
            }

            if(this.canPlay()) {
                //todo refactor:use frp(add catch operator)
                this.audioObj.load()
                    .subscribe(() => {}, (e) => {
                        Log.log("fail to use Web Audio to load！try use Html5 Audio to load");

                        self.audioObj = Html5Audio.create(self._config);

                        self.audioObj.load();
                    }, null)
            }
            else{
                this._config.onLoad(null);
            }
        }

        public play() {
            this.audioObj.play();
        }

        public canPlay(){
            return this.audioObj && this.audioObj.canPlay();
        }

        public getPlayState() {
            return this.audioObj.getPlayState();
        }
    }

    Sound.audioDetect();

    export type SoundConfig = {
        urlArr:Array<string>;
        onLoad: (sound:Sound) => void;
        onError: (err:string) => void;
    }
}
