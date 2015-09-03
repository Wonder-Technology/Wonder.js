/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeFaceTexture{
        public type:TextureType = TextureType.UNSIGNED_BYTE;
        public format:TextureFormat = null;
        public width:number = null;
        public height:number = null;
        public draw(index:number){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
