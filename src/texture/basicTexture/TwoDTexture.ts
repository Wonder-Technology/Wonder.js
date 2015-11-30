/// <reference path="../../filePath.d.ts"/>
module wd{
    export abstract class TwoDTexture extends BasicTexture{
        public initWhenCreate(asset:ImageTextureAsset|CompressedTextureAsset){
            super.initWhenCreate();

            asset.copyTo(this);
        }
    }
}

