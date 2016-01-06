module wd{
    export class VideoLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        protected loadAsset(...args):wdFrp.Stream {
            var urlArr = null;

            if(JudgeUtils.isString(args[0])){
                urlArr = [args[0]];
            }
            else{
                urlArr = args[0];
            }

            return wdFrp.fromPromise(new RSVP.Promise((resolve, reject) => {
                Video.create({
                    urlArr:urlArr,
                    onLoad: (video:Video) => {
                        resolve(VideoTextureAsset.create(video));
                    },
                    onError: (err:string) => {
                        reject(err);
                    }
                });
            }));
        }
    }
}

