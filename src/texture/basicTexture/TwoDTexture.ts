/// <reference path="../../definitions.d.ts"/>
module dy{
    export abstract class TwoDTexture extends BasicTexture{
        public initWhenCreate(asset:ImageTextureAsset|CompressedTextureAsset){
            super.initWhenCreate();

            asset.copyTo(this);
        }
    }
}

