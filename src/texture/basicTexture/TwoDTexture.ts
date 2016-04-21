module wd{
    export abstract class TwoDTexture extends BasicTexture{
        constructor(asset:TextureAsset){
            super();

            this.asset = asset;
        }

        protected asset:TextureAsset = null;

        public clone(){
            return CloneHelper.clone(this, null, [this.asset]);
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.asset.cloneTo(this);
        }
    }
}

