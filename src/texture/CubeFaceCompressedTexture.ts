/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceCompressedTexture extends CubeFaceTexture implements ICubeFaceCompressedTextureAsset{
        public static create(asset:CompressedTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        public mipmaps:dyCb.Collection<ICompressedTextureMipmap> = null;
        public minFilter:TextureFilterMode = null;

        public initWhenCreate(asset:CompressedTextureAsset){
            asset.copyToCubeFaceTexture(this);
        }
    }
}

