module wd{
    export class VideoManager{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public play(id:string){
            var asset = VideoLoader.getInstance().get(id),
                video:Video = null;

            Log.error(!asset, Log.info.FUNC_NOT_EXIST("video asset which id is " + id));

            video = asset.video;

            video.play();
        }
    }
}

