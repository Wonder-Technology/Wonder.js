/// <reference path="../filePath.d.ts"/>
module wd{
    //todo refer to video.js, mediaelement.js to enhance
    //todo unify with Audio
    //todo can fallback to flash
    //todo support loop
    export class Video{
        public static create({
            urlArr,
            onLoad,
            onError
            }) {
            var obj = new this(arguments[0]);

        	obj.initWhenCreate();

        	return obj;
        }

        constructor({
            urlArr,
            onLoad= (video:Video) => {},
            onError= (err:any) => {}
            }){
            this._urlArr = wdCb.Collection.create<string>(urlArr);
            this._onLoad = onLoad;
            this._onError = onError;
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
            //this.source.load();
        }

        public play(){
            this.isStop = false;

            this.source.play();
        }

        private _getCanPlayUrl() {
            var self = this,
                canPlayUrl = null,
                extnameArr = [];

            this._urlArr.forEach((url) => {
                var extname =  wdCb.PathUtils.extname(url);

                extnameArr.push(extname);

                if (self._canplay(extname)) {
                    canPlayUrl = url;
                    return wdCb.$BREAK;
                }
            });

            Log.error(canPlayUrl === null, Log.info.FUNC_NOT_SUPPORT("browser", extnameArr.join(",")));

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

    //export type VideoConfig = {
    //    urlArr:Array<string>;
    //    onLoad:Function;
    //    onError:Function;
    //}
}
