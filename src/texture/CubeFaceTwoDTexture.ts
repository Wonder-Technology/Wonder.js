/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceTwoDTexture extends CubeFaceTexture{
        public static create(asset:CommonTextureAsset) {
        	var obj = new this(asset);

        	return obj;
        }

        public asset:CommonTextureAsset;

        get source(){
            if(!this.asset){
                return null;
            }

            return this.asset.source;
        }
        set source(source:any){
            this.asset.source = source;
        }

        get width(){
            return this.source.width;
        }

        get height(){
            return this.source.height;
        }
        //
        //public draw(glTarget:any, source:any){
        //    var gl = Director.getInstance().gl;
        //
        //    gl.texImage2D(glTarget, 0, gl[this.format], gl[this.format], gl[this.type], source);
        //}
    }
}
