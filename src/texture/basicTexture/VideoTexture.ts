/// <reference path="../../filePath.d.ts"/>
module dy{
    export class VideoTexture extends CommonTexture{
        public static create(asset:VideoTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        private _video:Video = null;
        private _startLoopHandler:() => void = null;

        public initWhenCreate(asset:VideoTextureAsset){
            super.initWhenCreate(asset);

            this._video = asset.video;
        }

        public init(){
            var self = this;

            super.init();

            this._startLoopHandler = dyCb.FunctionUtils.bind(this, () => {
                if(self._video.isStop){
                    self.needUpdate = false;
                }
                else{
                    self.needUpdate = true;
                }
            });

            EventManager.on("dy_startLoop", this._startLoopHandler);

            return this;
        }

        public dispose(){
            EventManager.off("dy_startLoop", this._startLoopHandler);
        }

        protected needClampMaxSize(){
            return false;
        }
    }
}

