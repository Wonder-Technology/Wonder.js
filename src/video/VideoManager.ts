module wd{
    @singleton()
    export class VideoManager{
        public static getInstance():any {}

        private constructor(){}

        public play(id:string){
            var asset = VideoLoader.getInstance().get(id),
                video:Video = null;

            Log.error(!asset, Log.info.FUNC_NOT_EXIST("video asset which id is " + id));

            video = asset.video;

            video.play();
        }
    }
}

