/// <reference path="../definitions.d.ts"/>
module dy{
    export class VideoTexture extends TwoDTexture{
        public static create(video:any=Texture.defaultTexture){
            var obj = new this(video);

            return obj;
        }

        constructor(video:any = Texture.defaultTexture){
            super(video);

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

        public copy():any{
            return this.copyHelper(VideoTexture.create());
        }

        protected isCheckMaxSize(){
            return false;
        }
    }
}

