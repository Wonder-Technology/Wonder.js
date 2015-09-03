/// <reference path="../definitions.d.ts"/>
module dy{
    export class VideoTexture extends TwoDTexture{
        public static create(asset:CommonTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        public initWhenCreate(asset:CommonTextureAsset){
            super.initWhenCreate(asset);

            this.generateMipmaps = false;
            this.needUpdate = false;
        }

        public init(){
            var self = this;

            super.init();

            EventManager.on("dy_startLoop", () => {
                if ( self.source.readyState === self.source.HAVE_ENOUGH_DATA ) {
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

