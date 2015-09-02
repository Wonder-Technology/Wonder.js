/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceTexture{
        constructor(asset:TextureAsset){
            this.asset = asset;
        }

        public asset:TextureAsset = null;
        public sourceRegion:RectRegion = null;
        public type:TextureType = TextureType.UNSIGNED_BYTE;

        get format(){
            if(!this.asset){
                return null;
            }

            return this.asset.format;
        }

        get width(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        get height(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        get source(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
        set source(source:any){
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
        //
        //public draw(glTarget:any, source:any){
        //    dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        //}
    }
}
