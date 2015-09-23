/// <reference path="../../definitions.d.ts"/>
module dy{
    export abstract class CubemapFaceTexture{
        public type:TextureType = TextureType.UNSIGNED_BYTE;
        public format:TextureFormat = null;
        public width:number = null;
        public height:number = null;

        public abstract draw(index:number);
    }
}
