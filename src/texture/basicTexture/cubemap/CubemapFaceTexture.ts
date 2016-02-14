module wd{
    export abstract class CubemapFaceTexture{
        public type:ETextureType = ETextureType.UNSIGNED_BYTE;
        public format:ETextureFormat = null;
        public width:number = null;
        public height:number = null;

        public abstract draw(index:number):void;
        public abstract isSourcePowerOfTwo():boolean;
        public abstract needClampMaxSize():boolean;
        public abstract clampToMaxSize():void;
    }
}
