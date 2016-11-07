module wd{
    export class WebAudio extends BaseAudio {
        public static create(config:SoundConfig) {
            var audio = new this(config);

            audio.initWhenCreate();

            return audio;
        }

        constructor(config:SoundConfig) {
            super();

            this._config = config;

            this.urlArr = config.urlArr;
            this._onLoad = config.onLoad;
            this._onError = config.onError;
        }

        private _buffer = null;
        private _onLoad = null;
        private _onError = null;
        private _config = null;
        private _playState:ESoundPlayState = null;

        public initWhenCreate() {
            super.initWhenCreate();

            this._playState = ESoundPlayState.NONE;
        }

        public load():wdFrp.Stream {
            return this._loadBuffer(this.url);
        }

        public play() {
            var source = Sound.ctx.createBufferSource(),
                self = this;

            source.buffer = this._buffer;
            source.connect(Sound.ctx.destination);
            source.start(0);
            this._playState = ESoundPlayState.PLAYING;

            /*!
            this code has problem! it may not trigger onended when thread is blocked, use timer instead:

             source.onended = function(){
             self._status = 2;
             };

             */

            setTimeout(function () {
                self._playState = ESoundPlayState.END;
            }, this._buffer.duration * 1000);
        }

        public getPlayState() {
            return this._playState;
        }

        private _loadBuffer(url) {
            var self = this;

            return AjaxLoader.load(url, "arraybuffer")
                .do((arraybuffer) => {
                    self._decodeAudioData(arraybuffer);
                });
        }

        private _decodeAudioData(arraybuffer) {
            var self = this;

            Sound.ctx.decodeAudioData(
                arraybuffer,
                function (buffer) {
                    if (buffer) {
                        self._buffer = buffer;
                        self._onLoad(self);
                    }
                },
                function (err) {
                    self._onError(err.err);
                }
            );
        }
    }
}
