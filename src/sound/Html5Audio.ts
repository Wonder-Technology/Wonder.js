module wd{
    declare var window:any;

    export class Html5Audio extends BaseAudio {
        public static create(config:SoundConfig) {
            var audio = new this(config);

            audio.initWhenCreate();

            return audio;
        }

        constructor(config:SoundConfig) {
            super();

            this.urlArr = config.urlArr;
            this._onLoad = config.onLoad;
            this._onError = config.onError;
        }

        private _audio = null;
        private _onLoad = null;
        private _onError = null;

        public load() {
            var self = this;

            this._audio = new window.Audio();

            this._audio.addEventListener("canplaythrough", function () {
                self._onLoad(self);
            }, false);

            this._audio.addEventListener("error", function () {
                self._onError("errorCode " + self._audio.error.code);
            }, false);
//
//                audio.autoplay = false;
//                audio.preload = 'auto';
//                audio.autobuffer = true;

            /*!
             audio must be reloaded in chrome, or it will only play once;
             audio must not be reloaded in firefox, or it will delay
             */
            this._audio.addEventListener("ended", function () {
                if (bowser.chrome) {
                    self.load();
                }
                else if (bowser.firefox) {
                    this.currentTime = 0;
                }
                else {
                    Log.error("audio only support chrome/firefox browser");
                }
            }, false);

            this._load();

            return wdFrp.empty();
//                setTimeout(function () {
//                }, 50);
        }

        public play() {
            this._audio.play();
        }

        public getPlayState() {
            if (this._audio.ended) {
                return ESoundPlayState.END;
            }

            if (this._audio.currentTime > 0) {
                return ESoundPlayState.PLAYING;
            }

            return ESoundPlayState.NONE;
        }

        private _load() {
            /*!
            should set src after binded event.
            because it will start loading sound after setting src, the event handler should be valid as soon as possible.
             */
            this._audio.src = this.url;
        }
    }
}
