module wd{
    @singleton()
    export class VideoManager{
        public static getInstance():any {}

        private constructor(){}

        public play(id:string){
            var asset = VideoLoader.getInstance().get(id),
                video:Video = null;

            if (!asset) {
                Log.warn(`not exist video asset whose id is ${id}`);
                return ;
            }

            video = asset.video;

            video.play();
        }
    }
}

