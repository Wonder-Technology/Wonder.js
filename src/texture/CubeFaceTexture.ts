/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceTexture{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public asset:CommonTextureAsset = null;
        public sourceRegion:RectRegion = null;
        public type:TextureType = TextureType.UNSIGNED_BYTE;

        get source(){
            if(!this.asset){
                return null;
            }

            return this.asset.source;
        }

        get format(){
            if(!this.asset){
                return null;
            }

            return this.asset.format;
        }
    }
}
