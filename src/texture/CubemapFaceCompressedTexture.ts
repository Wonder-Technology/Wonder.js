/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubemapFaceCompressedTexture extends CubemapFaceTexture implements ICubemapFaceCompressedTextureAsset{
        public static create(asset:CompressedTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        public mipmaps:dyCb.Collection<ICompressedTextureMipmap> = null;
        public minFilter:TextureFilterMode = null;

        public initWhenCreate(asset:CompressedTextureAsset){
            asset.copyToCubemapFaceTexture(this);
        }

        //cube compressed texture not support sourceRegion
        public draw(index:number){
            var compressedCmd = DrawCompressedTextureCommand.create(),
            gl = Director.getInstance().gl;

            compressedCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + index;
            compressedCmd.type = this.type;
            compressedCmd.format = this.format;
            compressedCmd.mipmaps = this.mipmaps;

            compressedCmd.execute();
        }
    }
}

