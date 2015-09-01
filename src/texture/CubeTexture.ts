/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeTexture extends Texture{
        public static create(assetArray:Array<CommonTextureAsset>);

        public static create(assetArray:Array<CommonTextureAsset>){
            var obj = new this(assetArray);

            return obj;
        }

        constructor(assetArray:Array<CommonTextureAsset>){
            super();

            this.assets.addChildren(assetArray);

            this.flipY = false;
        }

        public assets:dyCb.Collection<CommonTextureAsset> = dyCb.Collection.create<CommonTextureAsset>();

        protected target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        public copy(){
            return this.copyHelper(CubeTexture.create(this.assets.copy().toArray()));
        }


        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            //var self = this;

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels

            //if(isSourcePowerOfTwo && this.mipmaps.getCount() > 0) {
            //    this.mipmaps.forEach((mipmap:HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, index:number) => {
            //        self._drawTexture(index, mipmap);
            //    });
            //
            //    this.generateMipmaps = false;
            //}
            //else {
                this._drawTexture(0);
            //}
        }

        private _drawTexture(index:number){
            var gl = Director.getInstance().gl,
                //todo set asset's type?
                type = this.type,
                self = this;

            this.assets.forEach((asset:CommonTextureAsset, i:number) => {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, index, gl[asset.format], gl[asset.format], gl[type], self.getDrawTarget(asset.source));
            });
        }
    }
}

