module wd{
    export abstract class TwoDTexture extends BasicTexture{
        public initWhenCreate(asset:TextureAsset){
            super.initWhenCreate();

            asset.copyTo(this);
        }
    }
}

