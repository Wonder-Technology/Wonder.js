module wd{
    declare var document:any;

    //todo refer to video.js, mediaelement.js to enhance
    //todo unify with Audio
    //todo can fallback to flash
    //todo support loop
    export class Video{
        public static create(config:VideoConfig) {
            var obj = new this(config);

        	obj.initWhenCreate();

        	return obj;
        }

        constructor(config:VideoConfig){
            this._urlArr = wdCb.Collection.create<string>(config.urlArr);
            this._onLoad = config.onLoad;
            this._onError = config.onError;
        }

        public url:string = null;
        public source:HTMLVideoElement = null;
        public isStop:boolean = false;

        private _urlArr:wdCb.Collection<string> = null;
        private _onLoad:Function = null;
        private _onError:Function = null;


        public initWhenCreate(){
            this.url = this._getCanPlayUrl();
            this.source = document.createElement("video");
            this.source.src = this.url;
            this._bindEvent();
        }

        public play(){
            this.isStop = false;

            this.source.play();
        }

        @ensure(function(canPlayUrl:string){
            it("if browser not support video urlArr, warn", () => {
                if(canPlayUrl === null){
                    Log.warn(`browser not support video urlArr: ${this._urlArr}`);
                }
            }, this);
        })
        private _getCanPlayUrl() {
            var self = this,
                canPlayUrl = null,
                extnameArr = [];

            this._urlArr.forEach((url) => {
                var extname = wdCb.PathUtils.extname(url);

                extnameArr.push(extname);

                if (self._canplay(extname)) {
                    canPlayUrl = url;
                    return wdCb.$BREAK;
                }
            });

            return canPlayUrl;
        }

        private _canplay(extname) {
            var video = document.createElement("video"),
                mimeStr = null;

            switch (extname) {
                case '.mp4':
                    mimeStr = 'video/mp4; codecs="avc1.42e01e, mp4a.40.2"';
                    break;
                case ".ogv":
                    mimeStr = 'video/ogg; codecs="theora, vorbis"';
                    break;
                case ".webm":
                    mimeStr = 'video/webm; codecs="vp8, vorbis"';
                    break;
                default :
                    Log.error(true, Log.info.FUNC_UNEXPECT(extname));
                    break;
            }

            return !!video.canPlayType && video.canPlayType(mimeStr) !== "";
        }

        private _bindEvent(){
            var self = this;

            this.source.addEventListener("canplaythrough", function () {
                self._onLoad(self);
            }, false);
            this.source.addEventListener("error", function () {
                self._onError("errorCode " + self.source.error.code);
            }, false);
            this.source.addEventListener("ended", function () {
                self.isStop = true;
            }, false);
        }
    }

    export type VideoConfig = {
        urlArr:Array<string>;
        onLoad: (video:Video) => void;
        onError: (err:string) => void;
    }
}
