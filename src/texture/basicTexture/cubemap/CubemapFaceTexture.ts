module wd{
    export abstract class CubemapFaceTexture{
        public type:TextureType = TextureType.UNSIGNED_BYTE;
        public format:TextureFormat = null;
        public width:number = null;
        public height:number = null;

        public abstract draw(index:number):void;
        public abstract isSourcePowerOfTwo():boolean;
        public abstract needClampMaxSize():boolean;
        public abstract clampToMaxSize():void;
    }
}
