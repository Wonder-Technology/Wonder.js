/// <reference path="../../filePath.d.ts"/>
module dy{
    export class ImageTextureAsset extends TextureAsset{
        public static create(source:HTMLImageElement|HTMLCanvasElement) {
        	var obj = new this(source);

        	return obj;
        }

        constructor(source:HTMLImageElement|HTMLCanvasElement){
            super();

            this.source = source;
        }

        public mipmaps:wdCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>;

        public toTexture():Texture{
            return ImageTexture.create(this);
        }

        public toCubemapFaceTexture():CubemapFaceImageTexture{
            return CubemapFaceImageTexture.create(this);
        }

        public copyToCubemapFaceTexture(cubemapFaceTexture:ICubemapFaceTwoDTextureAsset){
            cubemapFaceTexture.source = this.source;
            cubemapFaceTexture.type = this.type;
            cubemapFaceTexture.format = this.format;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.sourceRegion = this.sourceRegion;
            cubemapFaceTexture.sourceRegionMethod = TextureSourceRegionMethod.DRAW_IN_CANVAS;
        }
    }
}
