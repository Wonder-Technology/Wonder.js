/// <reference path="../definitions.d.ts"/>
module dy{
    /*!skybox: it's flipX when viewer is inside the skybox*/

    export class CubeTexture extends Texture{
        public static create(assets:Array<ICubemapData>){
            var obj = new this(assets);

            obj.initWhenCreate();

            return obj;
        }

        constructor(assets:Array<ICubemapData>){
            super();

            this._assets = assets;
            this.flipY = false;
        }

        public initWhenCreate(){
            this._createTextures(this._assets);
        }

        //CubeTexture only support DRAW_IN_CANVAS
        get sourceRegionMethod(){
            return TextureSourceRegionMethod.DRAW_IN_CANVAS;
        }

        public textures:dyCb.Collection<CubeFaceTexture> = dyCb.Collection.create<CubeFaceTexture>();

        private _assets:Array<ICubemapData>= null;

        protected target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        public copy(){
            return this.copyHelper(CubeTexture.create(this._assets));
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
                self = this;

            this.textures.forEach((texture:CubeFaceTexture, i:number) => {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, index, gl[texture.format], gl[texture.format], gl[texture.type], self.getDrawTarget(texture.source, texture.sourceRegion));
            });
        }

        private _createTextures(assets:Array<ICubemapData>){
            var self = this;

            assets.forEach((data:ICubemapData) => {
                var face = CubeFaceTexture.create();

                face.asset = data.asset;
                if(data.sourceRegion){
                    face.sourceRegion = data.sourceRegion;
                }

                self.textures.addChild(face);
            });
        }
    }

    export interface ICubemapData{
        asset:CommonTextureAsset;
        sourceRegion?:RectRegion;
        type?:TextureType;
    }
}

