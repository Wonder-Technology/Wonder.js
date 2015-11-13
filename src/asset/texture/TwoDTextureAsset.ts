/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TwoDTextureAsset extends TextureAsset{
        public static create(source:HTMLImageElement|HTMLCanvasElement) {
        	var obj = new this(source);

        	return obj;
        }

        constructor(source:HTMLImageElement|HTMLCanvasElement){
            super();

            this.source = source;
        }

        public mipmaps:dyCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>;

        public toTexture():Texture{
            return TwoDTexture.create(this);
        }

        public toCubemapFaceTexture():CubemapFaceTwoDTexture{
            return CubemapFaceTwoDTexture.create(this);
        }

        public copyToCubemapFaceTexture(cubemapFaceTexture:ICubemapFaceTwoDTextureAsset){
            cubemapFaceTexture.source = this.source;
            cubemapFaceTexture.type = this.type;
            cubemapFaceTexture.format = this.format;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.sourceRegion = this.sourceRegion;
            cubemapFaceTexture.sourceRegionMethod = this.sourceRegionMethod;
        }
    }
}
