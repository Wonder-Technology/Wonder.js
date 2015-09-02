/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceCompressedTexture extends CubeFaceTexture{
        public static create(asset:CompressedTextureAsset) {
            var obj = new this(asset);

            return obj;
        }

        public asset:CompressedTextureAsset;

        get mipmaps(){
            return this.asset.mipmaps;
        }

        get width(){
            return this.asset.width;
        }

        get height(){
            return this.asset.height;
        }

        get source(){
            return null;
        }
    }
}

