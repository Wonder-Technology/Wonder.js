module wd {
    declare var window:any;

    export abstract class BaseAudio {
        protected urlArr:Array<string> = null;
        protected url:string = null;

        public abstract play(): void;
        public abstract load():wdFrp.Stream;
        public abstract getPlayState(): ESoundPlayState;

        public initWhenCreate() {
            this.url = this._getCanPlayUrl();
        }

        public canPlay(){
            return this.url !== null;
        }

        @require(function(){
            it("url should add extname", () => {
                for(let url of this.urlArr) {
                    let result = url.match(/\.(\w+)$/);

                    expect(result).not.be.a("null");
                }
            }, this);
        })
        @ensure(function(canPlayUrl:string){
            it("if browser not support audio urlArr, warn", () => {
                if(canPlayUrl === null){
                    Log.warn(`browser not support audio urlArr: ${this.urlArr}`);
                }
            }, this);
        })
        private _getCanPlayUrl() {
            var canPlayUrl = null;

            for(let url of this.urlArr){
                let result = url.match(/\.(\w+)$/);

                // if (result === null) {
                //     YE.error(true, "声音url错误，必须加上类型后缀名");
                //     // return $break;
                //     return $break;
                // }

                if (this._canPlay(result[1])) {
                    canPlayUrl = url;
                    break;
                }
            }

            // if (canPlayUrl === null) {
            //     YE.error(true, "浏览器不支持该声音格式");
            //     return;
            // }

            return canPlayUrl;
        }

        private _canPlay(mimeType) {
            var audio = new window.Audio(),
                mimeStr = SoundUtils.getMimeStr(mimeType);

            if (mimeStr === null
                || (mimeType == "mp3" && bowser.firefox)) {
                return false;
            }

            return !!audio.canPlayType && audio.canPlayType(mimeStr) !== "";
        }
    }
}
