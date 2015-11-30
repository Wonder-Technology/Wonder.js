/// <reference path="../../../filePath.d.ts"/>
module wd{
    export class CubemapFaceCompressedTexture extends CubemapFaceTexture implements ICubemapFaceCompressedTextureAsset{
        public static create(asset:CompressedTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        public mipmaps:wdCb.Collection<CompressedTextureMipmap> = null;
        public minFilter:TextureFilterMode = null;

        public initWhenCreate(asset:CompressedTextureAsset){
            asset.copyToCubemapFaceTexture(this);
        }

        public isSourcePowerOfTwo():boolean{
            return BasicTextureUtils.isSourcePowerOfTwo(null, null, this.width, this.height);
        }

        public needClampMaxSize(){
            return BasicTextureUtils.needClampMaxSize(GPUDetector.getInstance().maxCubemapTextureSize, this.width, this.height);
        }

        public clampToMaxSize(){
            Log.warn("CubemapFaceCompressedTexture's texture size is over maxCubemapTextureSize");
        }

        public draw(index:number){
            var compressedCmd = DrawCompressedTextureCommand.create(),
            gl = DeviceManager.getInstance().gl;

            compressedCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + index;
            compressedCmd.type = this.type;
            compressedCmd.format = this.format;
            compressedCmd.mipmaps = this.mipmaps;

            compressedCmd.execute();
        }
    }
}

