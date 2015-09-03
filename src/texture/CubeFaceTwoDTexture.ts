/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceTwoDTexture extends CubeFaceTexture implements ICubeFaceTwoDTextureAsset{
        public static create(asset:CommonTextureAsset) {
        	var obj = new this();

            obj.initWhenCreate(asset);

        	return obj;
        }

        public sourceRegion:RectRegion = null;
        public sourceRegionMethod:TextureSourceRegionMethod = null;
        public source:any = null;

        public initWhenCreate(asset:CommonTextureAsset){
            asset.copyToCubeFaceTexture(this);

            this.sourceRegionMethod = TextureSourceRegionMethod.DRAW_IN_CANVAS;
        }
        //
        //public draw(glTarget:any, source:any){
        //    var gl = Director.getInstance().gl;
        //
        //    gl.texImage2D(glTarget, 0, gl[this.format], gl[this.format], gl[this.type], source);
        //}
    }
}
