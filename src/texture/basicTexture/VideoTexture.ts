/// <reference path="../../definitions.d.ts"/>
module dy{
    export class VideoTexture extends CommonTexture{
        public static create(asset:VideoTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        private _video:Video = null;

        public initWhenCreate(asset:VideoTextureAsset){
            super.initWhenCreate(asset);

            this._video = asset.video;
        }

        public init(){
            var self = this;

            super.init();

            EventManager.on("dy_startLoop", () => {
                if(self._video.isStop){
                    self.needUpdate = false;
                }
                else{
                    self.needUpdate = true;
                }
            });

            return this;
        }

        protected isCheckMaxSize(){
            return false;
        }
    }
}

