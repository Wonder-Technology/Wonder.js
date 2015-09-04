/// <reference path="../definitions.d.ts"/>
module dy{
    export class VideoLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        protected loadAsset(arg):dyRt.Stream {
            var urlArr = null;

            if(JudgeUtils.isString(arguments[0])){
                urlArr = [arguments[0]];
            }
            else{
                urlArr = arguments[0];
            }

            return dyRt.fromPromise(new RSVP.Promise((resolve, reject) => {
                Video.create({
                    urlArr:urlArr,
                    onLoad: (video:Video) => {
                        resolve(video);
                    },
                    onError: (err:string) => {
                        reject(err);
                    }
                });
            }));
        }
    }
}

