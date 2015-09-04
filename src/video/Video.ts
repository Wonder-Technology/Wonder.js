/// <reference path="../definitions.d.ts"/>
module dy{
    //todo add VideoManager
    //todo refer to video.js, mediaelement.js to enhance
    //todo unify with Audio
    //todo can fallback to flash
    export class Video{
        public static create(config:IVideoConfig) {
        	var obj = new this(config);

        	obj.initWhenCreate();

        	return obj;
        }

        constructor(config:IVideoConfig){
            this._urlArr = dyCb.Collection.create<string>(config.urlArr);
            this._onLoad = config.onLoad;
            this._onError = config.onError;
        }

        public url:string = null;

        private _urlArr:dyCb.Collection<string> = null;
        private _onLoad:Function = function(video:Video){};
        private _onError:Function = function (err:any){};
        private _video:HTMLVideoElement = null;


        public initWhenCreate(){
            this.url = this._getCanPlayUrl();

            this.load();
        }

        public load(){
            var self = this;

            this._video = document.createElement("video");
            this._video.src = this.url;
            this._video.load();

            this._video.addEventListener("canplaythrough", function () {
                self._onLoad(self);
            }, false);
            this._video.addEventListener("error", function () {
                self._onError("errorCode " + self._video.error.code);
            }, false);
        }

        public play(){
            this._video.play();
        }

        private _getCanPlayUrl() {
            var self = this,
                canPlayUrl = null,
                extnameArr = [];

            this._urlArr.forEach((url) => {
                var extname =  dyCb.PathUtils.extname(url);

                extnameArr.push(extname);

                if (self._canplay(extname)) {
                    canPlayUrl = url;
                    return dyCb.$BREAK;
                }
            });

            dyCb.Log.error(canPlayUrl === null, dyCb.Log.info.FUNC_NOT_SUPPORT("browser", extnameArr.join(",")));

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
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT(extname));
                    break;
            }

            return !!video.canPlayType && video.canPlayType(mimeStr) !== "";
        }
    }

    export interface IVideoConfig{
        urlArr:Array<string>;
        onLoad:Function;
        onError:Function;
    }
}
