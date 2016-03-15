module wd{
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

        public toTexture():ImageTexture{
            return ImageTexture.create(this);
        }

        public toCubemapFaceTexture():CubemapFaceImageTexture{
            return CubemapFaceImageTexture.create(this);
        }

        public cloneToCubemapFaceTexture(cubemapFaceTexture:ICubemapFaceTwoDTextureAsset){
            cubemapFaceTexture.source = this.source;
            cubemapFaceTexture.type = this.type;
            cubemapFaceTexture.format = this.format;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.sourceRegion = this.sourceRegion;
            cubemapFaceTexture.sourceRegionMethod = ETextureSourceRegionMethod.DRAW_IN_CANVAS;
        }
    }
}
