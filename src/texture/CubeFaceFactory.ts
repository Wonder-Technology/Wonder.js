/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceFactory{
        public static create(asset:TextureAsset) {
            if(asset instanceof CommonTextureAsset){
                return CubeFaceTwoDTexture.create(asset);
            }
            else if(asset instanceof CompressedTextureAsset){
                return CubeFaceCompressedTexture.create(asset);
            }
            else{
                return dyCb.Log.error(true, dyCb.Log.info.FUNC_UNKNOW("textureAsset"));
            }
        }
    }
}
