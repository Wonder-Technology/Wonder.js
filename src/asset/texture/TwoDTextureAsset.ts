/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TwoDTextureAsset extends TextureAsset{
        public static create(source:HTMLImageElement) {
        	var obj = new this(source);

        	return obj;
        }

        constructor(source:HTMLImageElement){
            super();

            this.source = source;
        }

        public mipmaps:dyCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>;

        public toTexture():Texture{
            return TwoDTexture.create(this);
        }

        public toCubeFaceTexture():CubeFaceTwoDTexture{
            return CubeFaceTwoDTexture.create(this);
        }

        public copyToCubeFaceTexture(cubeFaceTexture:ICubeFaceTwoDTextureAsset){
            cubeFaceTexture.source = this.source;
            cubeFaceTexture.type = this.type;
            cubeFaceTexture.format = this.format;
            cubeFaceTexture.width = this.width;
            cubeFaceTexture.height = this.height;
            cubeFaceTexture.sourceRegion = this.sourceRegion;
            cubeFaceTexture.sourceRegionMethod = this.sourceRegionMethod;
        }
    }
}
