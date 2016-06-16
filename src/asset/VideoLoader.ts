module wd{
    @singleton()
    export class VideoLoader extends Loader{
        public static getInstance():any {}

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

