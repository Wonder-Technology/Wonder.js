/// <reference path="../../filePath.d.ts"/>
module dy{
    export class VideoTextureAsset extends TextureAsset{
        public static create(video:Video) {
            var obj = new this(video);

            obj.initWhenCreate();

            return obj;
        }

        constructor(video:Video){
            super();

            this.video = video;
            this.source = this.video.source;
        }

        public video:Video = null;

        public initWhenCreate(){
            this.width = 0;
            this.height = 0;
            this.generateMipmaps = false;
            this.minFilter = null;
            this.magFilter = null;
            this.sourceRegion = null;
            this.sourceRegionMethod = null;
        }

        public toTexture():Texture{
            return VideoTexture.create(this);
        }

        //todo support cubemap?
        public toCubemapFaceTexture():CubemapFaceImageTexture{
            return Log.error(true, Log.info.FUNC_NOT_SUPPORT("video texture", "cubemap"));
        }

        public copyToCubemapFaceTexture(cubemapFaceTexture:ICubemapFaceTwoDTextureAsset){
            Log.error(true, Log.info.FUNC_NOT_SUPPORT("video texture", "cubemap"));
        }
    }
}

